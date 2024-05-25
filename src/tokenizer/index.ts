'use strict';
import html from './html.ts';
import paragraph from './paragraph.ts';
import lheading from './lheading.ts';

export default {
  tokenizer: {
    lheading,
    paragraph,
    html,
  },
};
