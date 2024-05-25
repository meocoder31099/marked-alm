'use strict';
const newline = /^\n+/;
const heading = /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/;
const hr = /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/;
const list =
  /^( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n+(?=\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$))|\n+(?= {0,3}\[((?:\\[\[\]]|[^\[\]])+)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)((?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))))? *(?:\n+|$))|\n{2,}(?! )(?!\1(?:[*+-]|\d+\.) )\n*|\s*$)/;
export const ruleBlockItem =
  /^( *)((?:[*+-]|\d{1,9}[.)])) ?[^\n]*(?:\n(?!\1(?:[*+-]|\d{1,9}[.)]) ?)[^\n]*)*/gm; //List block items
export const ruleBlockBullet = /(?:[*+-]|\d{1,9}[.)])/; // List block bullet
export const html =
  /^ *(?:<!--[\s\S]*?--> *(?:\n|\s*$)|<((?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\b)\w+(?!:|[^\w\s@]*@)\b)[\s\S]+?<\/\1> *(?:\n{2,}|\s*$)|<(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\b)\w+(?!:|[^\w\s@]*@)\b(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?> *(?:\n{2,}|\s*$))/;
export const lheading = /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/;
export const paragraph =
  /^([^\n]+(?:\n?(?! *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\2 *(?:\n+|$)|( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n+(?=\3?(?:(?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$))|\n+(?= {0,3}\[((?:\\[\[\]]|[^\[\]])+)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)((?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))))? *(?:\n+|$))|\n{2,}(?! )(?!\1(?:[*+-]|\d+\.) )\n*|\s*$)| {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)| *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)|([^\n]+)\n *(=|-){2,} *(?:\n+|$)| {0,3}>|<(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\b)\w+(?!:|[^\w\s@]*@)\b)[^\n]+)+)/;
const code = /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/;
const strong = /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/;

const blockRules: Record<string, RegExp> = {
  space: newline,
  heading,
  hr,
  list,
  blockItem: ruleBlockItem,
  blockBullet: ruleBlockBullet,
  html,
};
const inlineRules: Record<string, RegExp> = {
  codespan: code,
  strong,
};
const blockRuleOrder = ['space', 'heading', 'hr', 'list', 'html'];
const inlineRuleOrder = ['strong', 'codespan'];

export { blockRules, blockRuleOrder, inlineRules, inlineRuleOrder };
