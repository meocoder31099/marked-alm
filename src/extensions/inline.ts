'use strict';
import type { Token, TokenizerExtension } from 'marked';
import { inlineRules, inlineRuleOrder } from './rules.ts';
import { inline as tokenizer } from './tokenizer/index.ts';

const inline: TokenizerExtension = {
  name: 'inline-afm',
  level: 'inline', // Is this a block-level or inline-level tokenizer?
  tokenizer(src: string, _tokens: Token[]) {
    let cap;
    for (const ruleName of inlineRuleOrder) {
      cap = inlineRules[ruleName].exec(src);
      if (cap) {
        const token = tokenizer[ruleName].call(this, cap);
        return token;
      }
    }
  },
};

export default inline;
