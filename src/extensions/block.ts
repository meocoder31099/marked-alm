'use strict';
import type { Token, TokenizerAndRendererExtension } from 'marked';
import type { CustomToken } from './tokenizer/html.ts';

import { blockRules, blockRuleOrder } from './rules.ts';
import { block as tokenizer } from './tokenizer/index.ts';
import renderer from './renderer/index.ts';

const block: TokenizerAndRendererExtension = {
  name: 'block-afm',
  level: 'block', // Is this a block-level or inline-level tokenizer?
  tokenizer(src: string, _tokens: Token[]) {
    let cap;
    for (const ruleName of blockRuleOrder) {
      if (!blockRules[ruleName].test(src)) continue;
      cap = blockRules[ruleName].exec(src);
      if (cap) {
        const token = tokenizer[ruleName].call(this, cap);
        return token;
      }
    }
  },
  renderer(token: CustomToken | Token): string | undefined {
    if (token?.type === 'block-afm' && token?.markedType === 'html') {
      const html = renderer[token.markedType].call(this, token);
      if (html) return html;
    }
  },
};

export default block;
