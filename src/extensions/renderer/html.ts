"use strict";
import type { RendererThis } from "marked";
import type { CustomToken } from '../tokenizer/html.ts';

function html(this: RendererThis, token: CustomToken) {
  return `${this.parser.parseInline(token.tokens)}`; // parseInline to turn child tokens into HTML
}

export default html;
