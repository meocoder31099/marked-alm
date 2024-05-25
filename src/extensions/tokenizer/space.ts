"use strict";
import type { Tokens } from "marked";

function space(cap: RegExpExecArray): Tokens.Space | undefined {
  if (cap[0].length > 1) {
    return {
      type: "space",
      raw: cap[0],
    };
  }
}

export default space;
