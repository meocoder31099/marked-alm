"use strict";
import type { Tokens } from "marked";

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const getEscapeReplacement = (ch: string): string => escapeReplacements[ch] || ch;

function escape$1(html: string, encode: boolean) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

function codespan(cap: RegExpExecArray): Tokens.Codespan {
  let text = cap[2];
  const hasNonSpaceChars = /[^ ]/.test(text);
  const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
  if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
    text = text.substring(1, text.length - 1);
  }
  text = escape$1(text, true);
  return {
    type: "codespan",
    raw: cap[0],
    text,
  };
}

export default codespan;
