"use strict";
import type { Tokens } from "marked";

function hr(cap: RegExpExecArray): Tokens.Hr {
  return {
    type: "hr",
    raw: cap[0],
  };
}

export default hr;
