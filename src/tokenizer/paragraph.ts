'use strict';
import type { Tokens, TokenizerThis } from 'marked';
import { paragraph as ruleParagraph } from '../extensions/rules.ts';

function paragraph(this: TokenizerThis, src: string): Tokens.Paragraph | false {
  const cap = ruleParagraph.exec(src);
  if (cap) {
    const text =
      cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
    return {
      type: 'paragraph',
      raw: cap[0],
      text,
      tokens: this.lexer.inline(text),
    };
  }
  // return false to use original codespan tokenizer
  return false;
}

export default paragraph;
