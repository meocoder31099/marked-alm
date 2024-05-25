"use strict";
import space from "./space.ts";
import heading from "./heading.ts";
import hr from "./hr.ts";
import list from "./list.ts";
import html from "./html.ts";
import strong from "./strong.ts";
import codespan from "./codespan.ts";

export const block: Record<string, Function> = {
  space,
  heading,
  hr,
  list,
  html,
};
export const inline: Record<string, Function> = {
  strong,
  codespan,
};
