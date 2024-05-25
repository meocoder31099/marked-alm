"use strict";
import type { Tokens, TokenizerThis, } from "marked";
import { ruleBlockItem, ruleBlockBullet } from "../rules.ts";

function list(this: TokenizerThis, cap: RegExpExecArray): Tokens.List {
  const options = this.lexer.options;
  let raw = cap[0];
  const bull = cap[2];
  const isordered = bull.length > 1;
  const isparen = bull[bull.length - 1] === ")";

  const list: Tokens.List = {
    type: "list",
    raw,
    ordered: isordered,
    start: isordered ? +bull.slice(0, -1) : "",
    loose: false,
    items: [],
  };

  // Get each top-level item.
  const itemMatch = cap[0].match(ruleBlockItem);
  // Return early if no matching item exists
  if (!itemMatch) return list

  let next = false,
    item,
    space,
    b,
    addBack,
    loose,
    istask,
    ischecked;

  const l = itemMatch?.length;
  for (let i = 0; i < l; i++) {
    item = itemMatch[i];
    raw = item;

    // Remove the list item's bullet
    // so it is seen as the next token.
    space = item.length;
    item = item.replace(/^ *([*+-]|\d+[.)]) ?/, "");

    // Outdent whatever the
    // list item contains. Hacky.
    if (~item.indexOf("\n ")) {
      space -= item.length;
      item = !options.pedantic
        ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "")
        : item.replace(/^ {1,4}/gm, "");
    }

    // Determine whether the next list item belongs here.
    // Backpedal if it does not belong in this list.
    if (i !== l - 1) {
      b = ruleBlockBullet.exec(itemMatch[i + 1])?.[0];
      if (b &&
        (
          isordered
            ? b.length === 1 || (!isparen && b[b.length - 1] === ")")
            : b.length > 1 || (b !== bull)
        )
      ) {
        addBack = itemMatch.slice(i + 1).join("\n");
        list.raw = list.raw.substring(0, list.raw.length - addBack.length);
        i = l - 1;
      }
    }

    // Determine whether item is loose or not.
    // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
    // for discount behavior.
    loose = next || /\n\n(?!\s*$)/.test(item);
    if (i !== l - 1) {
      next = item.charAt(item.length - 1) === "\n";
      if (!loose) loose = next;
    }

    if (loose) {
      list.loose = true;
    }

    // Check for task list items
    istask = /^\[[ xX]\] /.test(item);
    ischecked = undefined;
    if (istask) {
      ischecked = item[1] !== " ";
      item = item.replace(/^\[[ xX]\] +/, "");
    }

    const itemData: Tokens.ListItem = {
      type: "list_item",
      raw: raw,
      task: istask,
      checked: ischecked,
      loose: loose,
      text: item.trimEnd(),
      tokens: [],
    };
    this.lexer.state.top = false;
    this.lexer.blockTokens(itemData.text, itemData.tokens);

    list.items.push(itemData);
  }
  return list;
}

export default list;
