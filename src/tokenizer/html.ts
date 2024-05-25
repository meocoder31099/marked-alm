'use strict';
import type { Tokens } from 'marked';
import { html as ruleHtml } from '../extensions/rules.ts';

function html(src: string): Tokens.HTML | undefined {
  const cap = ruleHtml.exec(src);
  if (cap) {
    return {
      type: 'html',
      block: true,
      raw: cap[0],
      pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
      text: cap[0],
    };
  }
}

export default html;
