/**
 * Xin lưu ý rằng đoạn mã này không phải là một tính năng được hỗ trợ chính thức.
 * Thay vào đó, nó được trích xuất từ việc phân tích mã nguồn của https://anilist.co.
 * Vì vậy, sử dụng đoạn mã này có thể không hiệu quả hoặc gặp phải một số khó khăn.
 * Tuy nhiên, chúng tôi tin rằng đoạn mã này có thể cung cấp giải pháp thay thế cho một số vấn đề nhất định.
 * Vui lòng sử dụng đoạn mã này cẩn thận và với trách nhiệm.
 */
"use strict";
var n = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: m,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: m,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: m,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/,
};
function r(t) {
  (this.tokens = []),
    (this.tokens.links = {}),
    (this.options = t || g.defaults),
    (this.rules = n.normal),
    this.options.gfm &&
    (this.options.tables ? (this.rules = n.tables) : (this.rules = n.gfm));
}
(n._label = /(?:\\[\[\]]|[^\[\]])+/),
  (n._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/),
  (n.def = f(n.def)
    .replace("label", n._label)
    .replace("title", n._title)
    .getRegex()),
  (n.bullet = /(?:[*+-]|\d+\.)/),
  (n.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/),
  (n.item = f(n.item, "gm").replace(/bull/g, n.bullet).getRegex()),
  (n.list = f(n.list)
    .replace(/bull/g, n.bullet)
    .replace(
      "hr",
      "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
    )
    .replace("def", "\\n+(?=" + n.def.source + ")")
    .getRegex()),
  (n._tag =
    "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"),
  (n.html = f(n.html)
    .replace("comment", /<!--[\s\S]*?-->/)
    .replace("closed", /<(tag)[\s\S]+?<\/\1>/)
    .replace("closing", /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/)
    .replace(/tag/g, n._tag)
    .getRegex()),
  (n.paragraph = f(n.paragraph)
    .replace("hr", n.hr)
    .replace("heading", n.heading)
    .replace("lheading", n.lheading)
    .replace("tag", "<" + n._tag)
    .getRegex()),
  (n.blockquote = f(n.blockquote).replace("paragraph", n.paragraph).getRegex()),
  (n.normal = v({}, n)),
  (n.gfm = v({}, n.normal, {
    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
  })),
  (n.gfm.paragraph = f(n.paragraph)
    .replace(
      "(?!",
      "(?!" +
      n.gfm.fences.source.replace("\\1", "\\2") +
      "|" +
      n.list.source.replace("\\1", "\\3") +
      "|"
    )
    .getRegex()),
  (n.tables = v({}, n.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
  })),
  (r.rules = n),
  (r.lex = function (t, e) {
    var n = new r(e);
    return n.lex(t);
  }),
  (r.prototype.lex = function (t) {
    return (
      (t = t
        .replace(/\r\n|\r/g, "\n")
        .replace(/\t/g, "    ")
        .replace(/\u00a0/g, " ")
        .replace(/\u2424/g, "\n")),
      this.token(t, !0)
    );
  }),
  (r.prototype.token = function (t, e) {
    var r, i, o, a, s, c, l, u, f, h, d;
    t = t.replace(/^ +$/gm, "");
    while (t)
      if (
        ((o = this.rules.newline.exec(t)) &&
          ((t = t.substring(o[0].length)),
            o[0].length > 1 &&
            this.tokens.push({
              type: "space",
            })),
          (o = this.rules.code.exec(t)))
      )
        (t = t.substring(o[0].length)),
          (o = o[0].replace(/^ {4}/gm, "")),
          this.tokens.push({
            type: "code",
            text: this.options.pedantic ? o : o.replace(/\n+$/, ""),
          });
      else if ((o = this.rules.fences.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "code",
            lang: o[2],
            text: o[3] || "",
          });
      else if ((o = this.rules.heading.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "heading",
            depth: o[1].length,
            text: o[2],
          });
      else if (e && (o = this.rules.nptable.exec(t))) {
        for (
          t = t.substring(o[0].length),
          c = {
            type: "table",
            header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
            align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            cells: o[3].replace(/\n$/, "").split("\n"),
          },
          u = 0;
          u < c.align.length;
          u++
        )
          /^ *-+: *$/.test(c.align[u])
            ? (c.align[u] = "right")
            : /^ *:-+: *$/.test(c.align[u])
              ? (c.align[u] = "center")
              : /^ *:-+ *$/.test(c.align[u])
                ? (c.align[u] = "left")
                : (c.align[u] = null);
        for (u = 0; u < c.cells.length; u++)
          c.cells[u] = c.cells[u].split(/ *\| */);
        this.tokens.push(c);
      } else if ((o = this.rules.hr.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "hr",
          });
      else if ((o = this.rules.blockquote.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "blockquote_start",
          }),
          (o = o[0].replace(/^ *> ?/gm, "")),
          this.token(o, e),
          this.tokens.push({
            type: "blockquote_end",
          });
      else if ((o = this.rules.list.exec(t))) {
        for (
          t = t.substring(o[0].length),
          a = o[2],
          d = a.length > 1,
          this.tokens.push({
            type: "list_start",
            ordered: d,
            start: d ? +a : "",
          }),
          o = o[0].match(this.rules.item),
          r = !1,
          h = o.length,
          u = 0;
          u < h;
          u++
        )
          (c = o[u]),
            (l = c.length),
            (c = c.replace(/^ *([*+-]|\d+\.) +/, "")),
            ~c.indexOf("\n ") &&
            ((l -= c.length),
              (c = this.options.pedantic
                ? c.replace(/^ {1,4}/gm, "")
                : c.replace(new RegExp("^ {1," + l + "}", "gm"), ""))),
            this.options.smartLists &&
            u !== h - 1 &&
            ((s = n.bullet.exec(o[u + 1])[0]),
              a === s ||
              (a.length > 1 && s.length > 1) ||
              ((t = o.slice(u + 1).join("\n") + t), (u = h - 1))),
            (i = r || /\n\n(?!\s*$)/.test(c)),
            u !== h - 1 &&
            ((r = "\n" === c.charAt(c.length - 1)), i || (i = r)),
            this.tokens.push({
              type: i ? "loose_item_start" : "list_item_start",
            }),
            this.token(c, !1),
            this.tokens.push({
              type: "list_item_end",
            });
        this.tokens.push({
          type: "list_end",
        });
      } else if ((o = this.rules.html.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: this.options.sanitize ? "paragraph" : "html",
            pre:
              !this.options.sanitizer &&
              ("pre" === o[1] || "script" === o[1] || "style" === o[1]),
            text: o[0],
          });
      else if (e && (o = this.rules.def.exec(t)))
        (t = t.substring(o[0].length)),
          o[3] && (o[3] = o[3].substring(1, o[3].length - 1)),
          (f = o[1].toLowerCase()),
          this.tokens.links[f] ||
          (this.tokens.links[f] = {
            href: o[2],
            title: o[3],
          });
      else if (e && (o = this.rules.table.exec(t))) {
        for (
          t = t.substring(o[0].length),
          c = {
            type: "table",
            header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
            align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n"),
          },
          u = 0;
          u < c.align.length;
          u++
        )
          /^ *-+: *$/.test(c.align[u])
            ? (c.align[u] = "right")
            : /^ *:-+: *$/.test(c.align[u])
              ? (c.align[u] = "center")
              : /^ *:-+ *$/.test(c.align[u])
                ? (c.align[u] = "left")
                : (c.align[u] = null);
        for (u = 0; u < c.cells.length; u++)
          c.cells[u] = c.cells[u]
            .replace(/^ *\| *| *\| *$/g, "")
            .split(/ *\| */);
        this.tokens.push(c);
      } else if ((o = this.rules.lheading.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "heading",
            depth: "=" === o[2] ? 1 : 2,
            text: o[1],
          });
      else if (e && (o = this.rules.paragraph.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "paragraph",
            text:
              "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1],
          });
      else if ((o = this.rules.text.exec(t)))
        (t = t.substring(o[0].length)),
          this.tokens.push({
            type: "text",
            text: o[0],
          });
      else if (t) throw new Error("Infinite loop on byte: " + t.charCodeAt(0));
    // console.log('fences', this.rules.fences);
    // console.log(this.tokens);
    return this.tokens;
  });
var i = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: m,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: m,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/,
};
function o(t, e) {
  if (
    ((this.options = e || g.defaults),
      (this.links = t),
      (this.rules = i.normal),
      (this.renderer = this.options.renderer || new a()),
      (this.renderer.options = this.options),
      !this.links)
  )
    throw new Error("Tokens array requires a `links` property.");
  this.options.gfm
    ? this.options.breaks
      ? (this.rules = i.breaks)
      : (this.rules = i.gfm)
    : this.options.pedantic && (this.rules = i.pedantic);
}
function a(t) {
  this.options = t || {};
}
function s() { }
function c(t) {
  (this.tokens = []),
    (this.token = null),
    (this.options = t || g.defaults),
    (this.options.renderer = this.options.renderer || new a()),
    (this.renderer = this.options.renderer),
    (this.renderer.options = this.options);
}
function l(t, e) {
  return t
    .replace(e ? /&/g : /&(?!#?\w+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function u(t) {
  return t.replace(
    /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
    function (t, e) {
      return (
        (e = e.toLowerCase()),
        "colon" === e
          ? ":"
          : "#" === e.charAt(0)
            ? "x" === e.charAt(1)
              ? String.fromCharCode(parseInt(e.substring(2), 16))
              : String.fromCharCode(+e.substring(1))
            : ""
      );
    }
  );
}
function f(t, e) {
  return (
    (t = t.source),
    (e = e || ""),
    {
      replace: function (e, n) {
        return (
          (n = n.source || n),
          (n = n.replace(/(^|[^\[])\^/g, "$1")),
          (t = t.replace(e, n)),
          this
        );
      },
      getRegex: function () {
        return new RegExp(t, e);
      },
    }
  );
}
function h(t, e) {
  return (
    d[" " + t] ||
    (/^[^:]+:\/*[^\/]*$/.test(t)
      ? (d[" " + t] = t + "/")
      : (d[" " + t] = t.replace(/[^\/]*$/, ""))),
    (t = d[" " + t]),
    "//" === e.slice(0, 2)
      ? t.replace(/:[\s\S]*/, ":") + e
      : "/" === e.charAt(0)
        ? t.replace(/(:\/*[^\/]*)[\s\S]*/, "$1") + e
        : t + e
  );
}
(i._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  (i._email =
    /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  (i.autolink = f(i.autolink)
    .replace("scheme", i._scheme)
    .replace("email", i._email)
    .getRegex()),
  (i._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/),
  (i._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/),
  (i.link = f(i.link)
    .replace("inside", i._inside)
    .replace("href", i._href)
    .getRegex()),
  (i.reflink = f(i.reflink).replace("inside", i._inside).getRegex()),
  (i.normal = v({}, i)),
  (i.pedantic = v({}, i.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  })),
  (i.gfm = v({}, i.normal, {
    escape: f(i.escape).replace("])", "~|])").getRegex(),
    url: f(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
      .replace("email", i._email)
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: f(i.text)
      .replace("]|", "~]|")
      .replace(
        "|",
        "|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|"
      )
      .getRegex(),
  })),
  (i.breaks = v({}, i.gfm, {
    br: f(i.br).replace("{2,}", "*").getRegex(),
    text: f(i.gfm.text).replace("{2,}", "*").getRegex(),
  })),
  (o.rules = i),
  (o.output = function (t, e, n) {
    var r = new o(e, n);
    return r.output(t);
  }),
  (o.prototype.output = function (t) {
    var e,
      n,
      r,
      i,
      o = "";
    // console.log(t); log inline src
    while (t) // Inline parser
      if ((i = this.rules.escape.exec(t)))
        (t = t.substring(i[0].length)), (o += i[1]);
      else if ((i = this.rules.autolink.exec(t)))
        (t = t.substring(i[0].length)),
          "@" === i[2]
            ? ((n = l(this.mangle(i[1]))), (r = "mailto:" + n))
            : ((n = l(i[1])), (r = n)),
          (o += this.renderer.link(r, null, n));
      else if (this.inLink || !(i = this.rules.url.exec(t))) {
        if ((i = this.rules.tag.exec(t)))
          !this.inLink && /^<a /i.test(i[0])
            ? (this.inLink = !0)
            : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1),
            (t = t.substring(i[0].length)),
            (o += this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(i[0])
                : l(i[0])
              : i[0]);
        else if ((i = this.rules.link.exec(t)))
          // console.log(t),
          (t = t.substring(i[0].length)),
            (this.inLink = !0),
            (o += this.outputLink(i, {
              href: i[2],
              title: i[3],
            })),
            (this.inLink = !1);
        else if (
          (i = this.rules.reflink.exec(t)) ||
          (i = this.rules.nolink.exec(t))
        ) {
          if (
            ((t = t.substring(i[0].length)),
              (e = (i[2] || i[1]).replace(/\s+/g, " ")),
              (e = this.links[e.toLowerCase()]),
              !e || !e.href)
          ) {
            (o += i[0].charAt(0)), (t = i[0].substring(1) + t);
            continue;
          }
          (this.inLink = !0), (o += this.outputLink(i, e)), (this.inLink = !1);
        } else if ((i = this.rules.strong.exec(t))) // inline
          (t = t.substring(i[0].length)),
            (o += this.renderer.strong(this.output(i[2] || i[1])));
        else if ((i = this.rules.em.exec(t)))
          (t = t.substring(i[0].length)),
            (o += this.renderer.em(this.output(i[2] || i[1])));
        else if ((i = this.rules.code.exec(t)))
          (t = t.substring(i[0].length)),
            (o += this.renderer.codespan(l(i[2].trim(), !0)));
        else if ((i = this.rules.br.exec(t)))
          (t = t.substring(i[0].length)), (o += this.renderer.br());
        else if ((i = this.rules.del.exec(t)))
          (t = t.substring(i[0].length)),
            (o += this.renderer.del(this.output(i[1])));
        else if ((i = this.rules.text.exec(t)))
          (t = t.substring(i[0].length)),
            (o += this.renderer.text(l(this.smartypants(i[0]))));
        else if (t)
          throw new Error("Infinite loop on byte: " + t.charCodeAt(0));
      } else
        (i[0] = this.rules._backpedal.exec(i[0])[0]),
          (t = t.substring(i[0].length)),
          "@" === i[2]
            ? ((n = l(i[0])), (r = "mailto:" + n))
            : ((n = l(i[0])), (r = "www." === i[1] ? "http://" + n : n)),
          (o += this.renderer.link(r, null, n));
    return o;
  }),
  (o.prototype.outputLink = function (t, e) {
    var n = l(e.href),
      r = e.title ? l(e.title) : null;
    return "!" !== t[0].charAt(0)
      ? this.renderer.link(n, r, this.output(t[1]))
      : this.renderer.image(n, r, l(t[1]));
  }),
  (o.prototype.smartypants = function (t) {
    return this.options.smartypants
      ? t
        .replace(/---/g, "—")
        .replace(/--/g, "–")
        .replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘")
        .replace(/'/g, "’")
        .replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“")
        .replace(/"/g, "”")
        .replace(/\.{3}/g, "…")
      : t;
  }),
  (o.prototype.mangle = function (t) {
    if (!this.options.mangle) return t;
    for (var e, n = "", r = t.length, i = 0; i < r; i++)
      (e = t.charCodeAt(i)),
        Math.random() > 0.5 && (e = "x" + e.toString(16)),
        (n += "&#" + e + ";");
    return n;
  }),
  (a.prototype.code = function (t, e, n) {
    if (this.options.highlight) {
      var r = this.options.highlight(t, e);
      null != r && r !== t && ((n = !0), (t = r));
    }
    return e
      ? '<pre><code class="' +
      this.options.langPrefix +
      l(e, !0) +
      '">' +
      (n ? t : l(t, !0)) +
      "\n</code></pre>\n"
      : "<pre><code>" + (n ? t : l(t, !0)) + "\n</code></pre>";
  }),
  (a.prototype.blockquote = function (t) {
    return "<blockquote>\n" + t + "</blockquote>\n";
  }),
  (a.prototype.html = function (t) {
    return t;
  }),
  (a.prototype.heading = function (t, e, n) {
    return (
      "<h" +
      e +
      ' id="' +
      this.options.headerPrefix +
      n.toLowerCase().replace(/[^\w]+/g, "-") +
      '">' +
      t +
      "</h" +
      e +
      ">\n"
    );
  }),
  (a.prototype.hr = function () {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }),
  (a.prototype.list = function (t, e, n) {
    var r = e ? "ol" : "ul",
      i = e && 1 !== n ? ' start="' + n + '"' : "";
    return "<" + r + i + ">\n" + t + "</" + r + ">\n";
  }),
  (a.prototype.listitem = function (t) {
    return "<li>" + t + "</li>\n";
  }),
  (a.prototype.paragraph = function (t) {
    return "<p>" + t + "</p>\n";
  }),
  (a.prototype.table = function (t, e) {
    return (
      "<table>\n<thead>\n" +
      t +
      "</thead>\n<tbody>\n" +
      e +
      "</tbody>\n</table>\n"
    );
  }),
  (a.prototype.tablerow = function (t) {
    return "<tr>\n" + t + "</tr>\n";
  }),
  (a.prototype.tablecell = function (t, e) {
    var n = e.header ? "th" : "td",
      r = e.align
        ? "<" + n + ' style="text-align:' + e.align + '">'
        : "<" + n + ">";
    return r + t + "</" + n + ">\n";
  }),
  (a.prototype.strong = function (t) {
    return "<strong>" + t + "</strong>";
  }),
  (a.prototype.em = function (t) {
    return "<em>" + t + "</em>";
  }),
  (a.prototype.codespan = function (t) {
    return "<code>" + t + "</code>";
  }),
  (a.prototype.br = function () {
    return this.options.xhtml ? "<br/>" : "<br>";
  }),
  (a.prototype.del = function (t) {
    return "<del>" + t + "</del>";
  }),
  (a.prototype.link = function (t, e, n) {
    if (this.options.sanitize) {
      try {
        var r = decodeURIComponent(u(t))
          .replace(/[^\w:]/g, "")
          .toLowerCase();
      } catch (o) {
        return n;
      }
      if (
        0 === r.indexOf("javascript:") ||
        0 === r.indexOf("vbscript:") ||
        0 === r.indexOf("data:")
      )
        return n;
    }
    this.options.baseUrl && !p.test(t) && (t = h(this.options.baseUrl, t));
    var i = '<a href="' + t + '"';
    return e && (i += ' title="' + e + '"'), (i += ">" + n + "</a>"), i;
  }),
  (a.prototype.image = function (t, e, n) {
    this.options.baseUrl && !p.test(t) && (t = h(this.options.baseUrl, t));
    var r = '<img src="' + t + '" alt="' + n + '"';
    return (
      e && (r += ' title="' + e + '"'),
      (r += this.options.xhtml ? "/>" : ">"),
      r
    );
  }),
  (a.prototype.text = function (t) {
    return t;
  }),
  (s.prototype.strong =
    s.prototype.em =
    s.prototype.codespan =
    s.prototype.del =
    s.prototype.text =
    function (t) {
      return t;
    }),
  (s.prototype.link = s.prototype.image =
    function (t, e, n) {
      return "" + n;
    }),
  (s.prototype.br = function () {
    return "";
  }),
  (c.parse = function (t, e) {
    var n = new c(e);
    return n.parse(t);
  }),
  (c.prototype.parse = function (t) {
    (this.inline = new o(t.links, this.options)),
      (this.inlineText = new o(
        t.links,
        v({}, this.options, {
          renderer: new s(),
        })
      )),
      (this.tokens = t.reverse());
    var e = "";
    while (this.next()) e += this.tok();
    return e;
  }),
  (c.prototype.next = function () {
    return (this.token = this.tokens.pop());
  }),
  (c.prototype.peek = function () {
    return this.tokens[this.tokens.length - 1] || 0;
  }),
  (c.prototype.parseText = function () {
    var t = this.token.text;
    while ("text" === this.peek().type) t += "\n" + this.next().text;
    return this.inline.output(t);
  }),
  (c.prototype.tok = function () {
    switch (this.token.type) {
      case "space":
        return "";
      case "hr":
        return this.renderer.hr();
      case "heading":
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          u(this.inlineText.output(this.token.text))
        );
      case "code":
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped
        );
      case "table":
        var t,
          e,
          n,
          r,
          i = "",
          o = "";
        for (n = "", t = 0; t < this.token.header.length; t++)
          n += this.renderer.tablecell(
            this.inline.output(this.token.header[t]),
            {
              header: !0,
              align: this.token.align[t],
            }
          );
        for (
          i += this.renderer.tablerow(n), t = 0;
          t < this.token.cells.length;
          t++
        ) {
          for (e = this.token.cells[t], n = "", r = 0; r < e.length; r++)
            n += this.renderer.tablecell(this.inline.output(e[r]), {
              header: !1,
              align: this.token.align[r],
            });
          o += this.renderer.tablerow(n);
        }
        return this.renderer.table(i, o);
      case "blockquote_start":
        o = "";
        while ("blockquote_end" !== this.next().type) o += this.tok();
        return this.renderer.blockquote(o);
      case "list_start":
        o = "";
        var a = this.token.ordered,
          s = this.token.start;
        while ("list_end" !== this.next().type) o += this.tok();
        return this.renderer.list(o, a, s);
      case "list_item_start":
        o = "";
        while ("list_item_end" !== this.next().type)
          o += "text" === this.token.type ? this.parseText() : this.tok();
        return this.renderer.listitem(o);
      case "loose_item_start":
        o = "";
        while ("list_item_end" !== this.next().type) o += this.tok();
        return this.renderer.listitem(o);
      case "html":
        var c =
          this.token.pre || this.options.pedantic
            ? this.token.text
            : this.inline.output(this.token.text);
        return this.renderer.html(c);
      case "paragraph":
        return this.renderer.paragraph(this.inline.output(this.token.text));
      case "text":
        return this.renderer.paragraph(this.parseText());
    }
  });
var d = {},
  p = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function m() { }
function v(t) {
  for (var e, n, r = 1; r < arguments.length; r++)
    for (n in ((e = arguments[r]), e))
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return t;
}
function g(t, e, n) {
  if ("undefined" === typeof t || null === t)
    throw new Error("marked(): input parameter is undefined or null");
  if ("string" !== typeof t)
    throw new Error(
      "marked(): input parameter is of type " +
      Object.prototype.toString.call(t) +
      ", string expected"
    );
  if (n || "function" === typeof e) {
    n || ((n = e), (e = null)), (e = v({}, g.defaults, e || {}));
    var i,
      o,
      a = e.highlight,
      s = 0;
    try {
      i = r.lex(t, e);
    } catch (f) {
      return n(f);
    }
    o = i.length;
    var u = function (t) {
      if (t) return (e.highlight = a), n(t);
      var r;
      try {
        r = c.parse(i, e);
      } catch (f) {
        t = f;
      }
      return (e.highlight = a), t ? n(t) : n(null, r);
    };
    if (!a || a.length < 3) return u();
    if ((delete e.highlight, !o)) return u();
    for (; s < i.length; s++)
      (function (t) {
        "code" !== t.type
          ? --o || u()
          : a(t.text, t.lang, function (e, n) {
            return e
              ? u(e)
              : null == n || n === t.text
                ? --o || u()
                : ((t.text = n), (t.escaped = !0), void (--o || u()));
          });
      })(i[s]);
  } else
    try {
      return e && (e = v({}, g.defaults, e)), c.parse(r.lex(t, e), e);
    } catch (f) {
      if (
        ((f.message +=
          "\nPlease report this to https://github.com/markedjs/marked."),
          (e || g.defaults).silent)
      )
        return (
          "<p>An error occurred:</p><pre>" + l(f.message + "", !0) + "</pre>"
        );
      throw f;
    }
}
(m.exec = m),
  (g.options = g.setOptions =
    function (t) {
      return v(g.defaults, t), g;
    }),
  (g.defaults = {
    gfm: !0,
    tables: !0,
    breaks: !1,
    pedantic: !1,
    sanitize: !1,
    sanitizer: null,
    mangle: !0,
    smartLists: !1,
    silent: !1,
    highlight: null,
    langPrefix: "lang-",
    smartypants: !1,
    headerPrefix: "",
    renderer: new a(),
    xhtml: !1,
    baseUrl: null,
  }),
  (g.Parser = c),
  (g.parser = c.parse),
  (g.Renderer = a),
  (g.TextRenderer = s),
  (g.Lexer = r),
  (g.lexer = r.lex),
  (g.InlineLexer = o),
  (g.inlineLexer = o.output),
  (g.parse = g);

export const marked = g;
