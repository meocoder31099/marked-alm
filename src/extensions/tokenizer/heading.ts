"use strict";
import type { TokenizerThis, Tokens } from "marked";

function heading(this: TokenizerThis, cap: RegExpExecArray): Tokens.Heading {
  const text = cap[2].trim();
  const token: Tokens.Heading = {
    // Token to generate
    type: "heading", // Should match "name" above
    raw: cap[0], // Text to consume from the source,
    depth: cap[1].length,
    text: text,
    tokens: [], // Array where child inline tokens will be generated. Queue this data to be processed for inline tokens
  };
  this.lexer.inlineTokens(token.text, token.tokens);
  return token;
}

export default heading;
