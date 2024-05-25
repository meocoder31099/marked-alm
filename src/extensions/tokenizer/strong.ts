"use strict";
import type { Tokens, TokenizerThis } from "marked";

function strong(this: TokenizerThis, cap: RegExpExecArray): Tokens.Strong {
  const text = cap[2] || cap[1];
  return {
    type: "strong",
    raw: cap[0],
    text,
    tokens: this.lexer.inlineTokens(text),
  };
}

export default strong;
