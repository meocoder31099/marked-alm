'use strict';
import type { Tokens, TokenizerThis } from 'marked';
import { lheading as ruleLheading } from '../extensions/rules.ts';

function lheading(
  this: TokenizerThis,
  src: string,
): Tokens.Heading | undefined {
  const cap = ruleLheading.exec(src);
  if (cap) {
    return {
      type: 'heading',
      raw: cap[0],
      depth: cap[2].charAt(0) === '=' ? 1 : 2,
      text: cap[1],
      tokens: this.lexer.inline(cap[1]),
    };
  }
}

export default lheading;
