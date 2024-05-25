import markedAlmParser from "./markedAlmParser.js";
import markedAnilistParser from "./markedAnilistParser.js";
import { HtmlDiffer } from 'html-differ'

const htmlDiffer = new HtmlDiffer({
  ignoreAttributes: ['rel'],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false,
  ignoreDuplicateAttributes: false
});

const markdown2HTMLCompare = (markdown) => {
  const markedAnilistHTML = markedAnilistParser(markdown)
  const markedAlmHTML = markedAlmParser(markdown)
  return htmlDiffer.isEqual(markedAnilistHTML, markedAlmHTML)
}

export default markdown2HTMLCompare