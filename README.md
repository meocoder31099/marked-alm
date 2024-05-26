# Anilist-Flavored Markdown (unofficial)

[![npm](https://badgen.net/npm/v/marked-alm)](https://www.npmjs.com/package/marked-alm)
[![install size](https://badgen.net/packagephobia/install/marked-alm)](https://packagephobia.now.sh/result?p=marked-alm)
[![downloads](https://badgen.net/npm/dt/marked-alm)](https://www.npmjs.com/package/marked-alm)
[![github actions](https://github.com/meocoder31099/marked-alm/workflows/Tests/badge.svg)](https://github.com/meocoder31099/marked-alm/actions)
[![snyk](https://snyk.io/test/marked-alm/marked/badge.svg)](https://snyk.io/test/npm/marked-alm)

- An extension for the [Marked](https://github.com/markedjs/marked) library that supports parsing the AniList [markdown spec](https://anilist.co/forum/thread/6125).
- This library is not officially supported by AniList, so future changes to AniList may break its functionality.

## Demo

Check out the [example](https://github.com/meocoder31099/marked-alm-svelte-examples.git) of how to use this library with the Svelte framework. Other front-end frameworks can be used similarly


## Installation

**npm:**

```sh
npm install marked-alm
```
**yarn:**

```sh
yarn add marked-alm
```

**CDN:**

```html
<!-- Using jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/marked-alm/marked-alm.min.js"></script>
<!-- Or using unpkg CDN -->
<script src="https://unpkg.com/marked-alm/marked-alm.min.js"></script>
```

## Usage

```typescript
import { marked } from "marked";
import { markedAlm } from "marked-alm";
import createDOMPurify from "dompurify";

// Create an HTML sanitizer function
// the code below is similar to the code found in the source code of https://anilist.co

const DOMPurify = createDOMPurify(); // In Node.js, this line of code will cause an error
// because Node.js does not have a global window variable.
// Therefore, you need to use JSDOM to create a mock window.
// Please refer to the dompurify documentation for implementation details.

DOMPurify.addHook("afterSanitizeAttributes", (currentNode) => {
  "target" in currentNode &&
    (currentNode.setAttribute("target", "_blank"),
      currentNode.setAttribute("rel", "noopener noreferrer"));
});
const sanitize = (htmlString: string) => {
  return DOMPurify.sanitize(htmlString, {
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
  });
};

// Create marked alm
const { extensions, hooks, tokenizer } = markedAlm({
  preprocessOptions: {
    // Handle youtube embedded in markdown
    youtube({ type, selector, youtube, renderer }) {
      // type: 'youtube'
      // selector: the selector of the placeholder tag added by the parser to the HTML parsed from markdown
      // youtube: { id: string } - the data for the YouTube video
      // renderer: a string of HTML used to override the default placeholder tag (not recommended as it can lead to various issues, use with caution)
    },

    // Handle user taged in markdown
    user({ type, user, renderer }) {
      // type: 'user'
      // user: { username: string } - the data for the Anilist user
      // renderer: a string of HTML used to override the default placeholder tag (not recommended as it can lead to various issues, use with caution)
    },

    // Handle video embedded in markdown
    video({ type, selector, video, renderer }) {
      // type: 'video'
      // selector: the selector of the placeholder tag added by the parser to the HTML parsed from markdown
      // video: { src: string } - the data for the video
      // renderer: a string of HTML used to override the default placeholder tag (not recommended as it can lead to various issues, use with caution)
    }
  },

  postprocessOptions: {
    // Add html sanitization
    sanitize(htmlString) {
      // Accepts an unsanitized HTML string and returns a sanitized HTML string
      return sanitize(htmlString)
    },
    // Handle Spoiler
    spoiler({ type, selector, spoiler, renderer }) {
      // type: 'spoiler'
      // selector: the selector of the placeholder tag added by the parser to the HTML parsed from markdown
      // spoiler: { contents: string } - the data for the spoiler
      // renderer: a string of HTML used to override the default placeholder tag (not recommended as it can lead to various issues, use with caution)
    }
    // Handle Anime/Manga embedded in markdown
    media({ type, selector, media, renderer }) {
      // type: 'media'
      // selector: the selector of the placeholder tag added by the parser to the HTML parsed from markdown
      // media: { id: string; type: "ANIME" | "MANGA" } - the data for the media
      // renderer: a string of HTML used to override the default placeholder tag (not recommended as it can lead to various issues, use with caution)
    },
  }
});

// Config marked
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

// Add marked alm extension to marked
marked.use(extensions);
marked.use(hooks);
marked.use(tokenizer);

const markdownParser = (markdown: string) => {
  const htmlString = marked(markdown) as string;
  return htmlString
};

// Please see the Demo section above for a better understanding of how to use it.
```
