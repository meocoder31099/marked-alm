import { marked } from "./markedAnilist.js";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom'

const uniqueId = () => Math.random().toString();

const window = new JSDOM('').window;
const sanitize = (stringHTML) => {
  const e = DOMPurify(window);
  return (
    e.addHook("afterSanitizeAttributes", (currentNode) => {
      "target" in currentNode &&
        (currentNode.setAttribute("target", "_blank"),
          currentNode.setAttribute("rel", "noopener noreferrer"));
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

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`;
const lexer = new marked.Lexer();
lexer.rules.heading = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/;

marked.setOptions({
  renderer,
  lexer,
});


// Markdown to HTML
const markedAnilistParser = (markdown) => {
  markdown = markdown.replace(
    /(http)(:([\/|.|\w|\s|-])*\.(?:jpg|.jpeg|gif|png|mp4|webm))/gi,
    "$1s$2"
  )
  markdown = markdown.replace(
    /img\s?(\d+%?)?\s?\((.[\S]+)\)/gi,
    "<img width='$1' src='$2'>"
  );
  markdown = markdown.replace(
    /(^|>| )@([A-Za-z0-9]+)/gm,
    "$1<a target='_blank' href='https://anilist.co/user/$2'>@$2</a>"
  );
  markdown = markdown.replace(
    /youtube\s?\([^]*?([-_0-9A-Za-z]{10,15})[^]*?\)/gi,
    (_, $1) => {
      const target = uniqueId();
      return `<span rel="${target}"></span>`;
    }
  );
  markdown = markdown.replace(
    /webm\s?\(h?([A-Za-z0-9-._~:\/?#\[\]@!$&()*+,;=%]+)\)/gi,
    (_, $1) => {
      const target = uniqueId();
      return `<span rel="${target}"></span>`;
    }
  );
  markdown = markdown.replace(/~{3}([^]*?)~{3}/gm, "+++$1+++");
  markdown = markdown.replace(/~!([^]*?)!~/gm, '<div rel="spoiler">$1</div>');

  let html = marked(markdown)
  html = sanitize(html);
  html = html.replace(/\+{3}([^]*?)\+{3}/gm, "<center>$1</center>");
  html = html.replace(
    /<div rel="spoiler">([\s\S]*?)<\/div>/gm,
    (_, $1) => {
      const target = uniqueId();
      return `<p rel="${target}"></p>`
    }
  );
  html = html.replace(
    /(?:<a href="https?:\/\/anilist.co\/(anime|manga)\/)([0-9]+).*?>(?:https?:\/\/anilist.co\/(?:anime|manga)\/[0-9]+).*?<\/a>/gm,
    (_, $1, $2) => {
      const target = uniqueId();
      const mediaType = $1 === "anime" ? "ANIME" : "MANGA";
      return `<span rel="${target}"></span>`
    }
  );

  return html
}

export default markedAnilistParser