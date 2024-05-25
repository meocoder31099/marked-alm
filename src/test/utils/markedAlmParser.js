import { marked } from "marked";
import { markedAlm } from "marked-alm";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const sanitize = (stringHTML) => {
  const e = DOMPurify(window);
  return (
    e.addHook("afterSanitizeAttributes", (currentNode) => {
      if ("target" in currentNode) {
        currentNode.setAttribute("target", "_blank");
        currentNode.setAttribute("rel", "noopener noreferrer");
      }
    }),
    e.sanitize(stringHTML, {
      ALLOWED_TAGS: [
        "a",
        "b",
        "blockquote",
        "br",
        "center",
        "del",
        "div",
        "em",
        "font",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "hr",
        "i",
        "img",
        "li",
        "ol",
        "p",
        "pre",
        "code",
        "span",
        "strike",
        "strong",
        "ul",
      ],
      ALLOWED_ATTR: [
        "align",
        "height",
        "href",
        "src",
        "target",
        "width",
        "rel",
      ],
    })
  );
};

const { extensions, hooks, tokenizer } = markedAlm({
  preprocessOptions: {
    youtube(data) {
    },
    video({ }) {
      // console.log(a);
    },
  },
  postprocessOptions: {
    sanitize(htmlString) {
      return sanitize(htmlString);
    },
    spoiler({ }) { },
    media({ }) { },
  },
});

marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

marked.use(extensions);
marked.use(hooks);
marked.use(tokenizer);

const markedAlmParser = (markdown) => {
  const html = marked(markdown);
  return html;
};

export default markedAlmParser;
