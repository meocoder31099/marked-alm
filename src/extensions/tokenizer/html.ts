"use strict";
import type { Token, Tokens, TokenizerThis } from "marked";

export interface CustomToken extends Omit<Tokens.HTML, 'type'> {
  type: "block-afm",
  markedType: "html",
  tokens: Token[]
}

function html(this: TokenizerThis, cap: RegExpExecArray): CustomToken {
  const token: CustomToken = {
    type: "block-afm",
    markedType: "html",
    block: true,
    raw: cap[0],
    pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
    text: cap[0],
    tokens: [],
  };
  this.lexer.inlineTokens(cap[0], token.tokens);
  return token;
}

export default html;
