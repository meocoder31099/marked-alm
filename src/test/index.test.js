import { describe, expect, test } from '@jest/globals';
import { markdown2HTMLCompare, markedAlmParser } from './utils/index.js'

describe('inline', () => {

  test('newlines', () => {
    const markdownString = `Hello\nWorld`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('italic text', () => {
    const markdownString = `_hello_ *world* <i>hello</i> <em>hello</em>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('bold text', () => {
    const markdownString = `__hello__ **world** <b>hello</b> <strong>hello</strong>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('strikethrough text', () => {
    const markdownString = `~~hello~~ <del>hello</del> <strike>hello</strike>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('alignment center', () => {
    const markdownString = `~~~meocoder~~~`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('alignment', () => {
    const markdownString = `~~~meocoder~~~ <p align="center">Aligns center.</p> <p align="left">Aligns left.</p> <p align="right">Aligns right.</p> <p align="justify">Aligns justify.</p>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('quoted text', () => {
    const markdownString = `> hello\n> world`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('links', () => {
    const markdownString = `[Link title](https://anilist.co/) <a href="https://anilist.co">Link title</a> <https://www.google.com>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('images', () => {
    const markdownString = `![fallback text](https://anilist.co/img/icons/icon.svg) <img alt="fallback text" src="https://anilist.co/img/icons/icon.svg">`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h1', () => {
    const markdownString = `# h1 #h1`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h2', () => {
    const markdownString = `## h2 ##h2`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h3', () => {
    const markdownString = `### h3 ###h3`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h4', () => {
    const markdownString = `#### h4 ####h4`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h5', () => {
    const markdownString = `##### h5 #####h5`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (heading) h6', () => {
    const markdownString = `###### h6 ######h6`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (Alternatively h1)', () => {
    const markdownString = `Hello\n== \nHello\n==============`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (Alternatively h2)', () => {
    const markdownString = `Hello\n-- \nHello\n--------------`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('horizontal lines', () => {
    const markdownString = `---\n***\n-----------------\n******************\n<hr>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('horizontal lines', () => {
    const markdownString = `- - -\n* * *\n- - - - - - -\n* * * * * *`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('bullet-point lists (-)', () => {
    const markdownString = `- hello\n- world`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('bullet-point lists (*)', () => {
    const markdownString = `* hello\n* world`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('bullet-point lists (+)', () => {
    const markdownString = `+ hello\n+ world`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('numbered lists', () => {
    const markdownString = `1. hello\n2. world\n2. meocoder`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('code (For "inline" code, use backticks)', () => {
    const markdownString = `blah blah \`markdown **does\nnot** work here\` blah blah`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('code (use the HTML <code>...</code> tag, you can use Markdown in your code)', () => {
    const markdownString = `blah blah <code>markdown **works\nfine** here</code> blah blah`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('code (For "blocks" of code, simply prefix each line with four spaces)', () => {
    const markdownString = `normal **markdown** text\n\n        some(code) { markdown(wont**work**here) }\n\nmore _normal_ text`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('code (For "blocks" of code, surround it with triple-backticks)', () => {
    const markdownString = `normal **markdown** text\n\n\`\`\`\nsome(code) { markdown(wont**work**here) }\n\`\`\`\n\nmore _normal_ text`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('code (For "blocks" of code, use the HTML <pre>...</pre> tag)', () => {
    const markdownString = `normal **markdown** text\n\n<pre>\nsome(code) { markdown(wont**work**here) }\n<pre>\n\nmore _normal_ text`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('cool text effects', () => {
    const markdownString = `&#120200;&#120212;&#120212;&#120209; &#120165;&#120150;&#120169;&#120165; ℯ&#119995;&#119995;ℯ&#119992;&#120009;&#120008;`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('displaying special characters normally', () => {
    const markdownString = `\*hello world\* becomes *hello world*\n\_hello world\_ becomes _hello world_`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('displaying special characters normally (use HTML)', () => {
    const markdownString = `&amp;hello &lpar;meocoder`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('underlined text', () => {
    const markdownString = `<u>meocoder<u>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

});

describe('combined', () => {

  test('italic text + bold text', () => {
    const markdownString = `_**hello world**_`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('linked images (basic)', () => {
    const markdownString = `[![image](https://anilist.co/img/icons/icon.svg)](https://anilist.co/)`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('linked images (with custom image size)', () => {
    const markdownString = `[ img365(https://anilist.co/img/icons/icon.svg) ](https://anilist.co/)`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('colored text', () => {
    const markdownString = `blah <a>hello world</a> blah`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

});

describe('multiline', () => {

  test('sub-lists', () => {
    const markdownString = `+ lv1\n   + lv2\n       + lv3\n           + lv4`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('mix-and-match numbered and bulleted lists', () => {
    const markdownString = `* lv1.1\n   1. lv2.1\n      + lv3.1\n       + lv3.2\n   2. lv2.2\n* lv1.2`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

});

describe('nested', () => {

  test('quoted text', () => {
    const markdownString = `> hello\n>> world`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (Alternatively h1)', () => {
    const markdownString = `Hello\n== Hello\n==============`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('text size (Alternatively h2)', () => {
    const markdownString = `Hello\n-- Hello\n--------------`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

});

describe('special case', () => {

  test('spoiler text', () => {
    const markdownString = `~!meocoder!~`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('spoiler text (Using HTML, this might not be the case in the future)', () => {
    const markdownString = `<div rel="spoiler">some spoiler text</div>`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('links to anime pages on Anilist will show a preview', () => {
    const markdownString = `https://anilist.co/anime/66/Azumanga-Daioh/`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('links to manga pages on Anilist will show a preview', () => {
    const markdownString = `https://anilist.co/manga/30085/Azumanga-Daioh/`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('Images (Anilist-specific) way to specify a size', () => {
    const markdownString = `img360(https://anilist.co/img/icons/icon.svg)`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('youtube videos', () => {
    const markdownString = `youtube(https://www.youtube.com/watch?v=D0q0QeQbw9U)`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('other videos', () => {
    const markdownString = `webm(https://files.kiniro.uk/video/sonic.webm)`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

  test('Embedded images are automatically converted to https:// if they start with a plain http:// prefix', () => {
    const markdownString = `http://`
    expect(markdown2HTMLCompare(markdownString)).toBe(true);
  });

});

// describe('combined2', () => {

//     test('italic text + bold text', () => {
//         const markdownString = `_1_ _12_`
//         expect(markdown2HTMLCompare(markdownString)).toBe(true);
//     });

// });

describe('security', () => {

  const timeExec = (markdown) => {
    const start = performance.now();
    markedAlmParser(markdown)
    const end = performance.now();
    return end - start
  }

  test('https://github.com/markedjs/marked/security/advisories/GHSA-5v2h-r2cx-5xgj (ReDoS) in `block.def`', () => {
    const markdownString = `[x]: x\n\n\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](`
    expect(timeExec(markdownString)).toBeLessThan(1000)
  });

  test('https://github.com/markedjs/marked/security/advisories/GHSA-rrrm-qjm4-v8hf (ReDoS) in `inline.reflinkSearch`', () => {
    const markdownString = `[x]:${' '.repeat(1500)}x ${' '.repeat(1500)} x`
    expect(timeExec(markdownString)).toBeLessThan(1000)
  });

  test('https://github.com/markedjs/marked/security/advisories/GHSA-4r62-v4vq-hr96 (ReDoS) Underscore', () => {
    const markdownString = `_______________________________ ____________________ __________________________ a`
    expect(timeExec(markdownString)).toBeLessThan(1000)
  });

});

// const markdownHackString = `[x]: x

// \\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](`

const anilistData = [
  `# ~~~__100 DAYS ANIME CHALLENGE__~~~\n~~~_Day 64 - Anime/Series You Want To But Haven't Watched Yet_~~~\n________________________\n~~~Fate Series\nI've been wanting to watch it but it always gets delayed.... Im gonna watch it when break starts, probably.~~~\n~~~img2220(https://i.pinimg.com/originals/61/0b/df/610bdf583a51a2f0d801ea024cfca9c3.gif)~~~\n________________________\n~~~ ~!img2220(https://i.ibb.co/HHmDB9Q/9VBijLp.png)!~ ~~~`,
  `~~~img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>Ohayo, Have a Cute Day everyone</a>~~~__\n~~~img500(https://i.imgur.com/I4JYvuE.gif)~~~\n~~~img500(https://media1.tenor.com/m/l7PZ-vCq4FsAAAAC/rias-gremory-highschool-dxd.gif)~~~\n~~~img500(https://i.imgur.com/I4JYvuE.gif)~~~`,
  `~~~ guitar solo is so nony approved\n6:42-7:40 tickles me brain\nyoutube(https://youtu.be/Qkc849LJWeU?si=QWZmLB23KD4NQGfj)~~~`,
  `song of the day 22 - 27 i think\n\nyoutube(https://youtu.be/gQzKOENLcrE?si=Omfh5WscQOtwOarM)\nyoutube(https://youtu.be/6dXHrPOSLJc?si=9TYFHrukeDFTAybh)\nyoutube(https://youtu.be/Wl8fKAYQuPk?si=4QVOd0gaK-TGOv-7)\nyoutube(https://youtu.be/iIsHg3BHpB0?si=o8mMaVuML1iD5AHT)\nyoutube(https://www.youtube.com/watch?v=BEn_XG9wPfc&list=PLBt2DDKZ5A40lUjF7fLpi_IE1ljkECrYi&index=1&pp=gAQBiAQB8AUB)\nyoutube(https://www.youtube.com/watch?v=YAc_JF3KyaA&list=PLBt2DDKZ5A40lUjF7fLpi_IE1ljkECrYi&index=2&pp=gAQBiAQB8AUB)`,
  `<center><h1>**Cardcaptor Sakura 30 Days Challange** \n\n____\n\n<h2>**Day 6: Favourite Canon Couple**\n\nImg600(https://i.imgur.com/2RZl74C.png)\n\n\n\n\n\n____ \n\nimg600(https://i.imgur.com/dbVa4oJ.jpg)`,
  `~~~img220(https://scontent.ftll3-2.fna.fbcdn.net/v/t39.30808-6/417492050_7035650606555690_9010486433258308386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_ohc=N4F5gn-qCxQAX8DYPxK&_nc_ht=scontent.ftll3-2.fna&oh=00_AfB62GQ1Vx1TLAgKqQzKDbG9JKYV6c9XCbIe6U_82MnASA&oe=65A414E5)\`\`~~~~~~~~~\n<br>\nIto Shinsui   (1898-1972)  \nEvening Snowscape of Komoro 1948`,
  `# <center>[__100 Days Anime Challenge__](https://anilist.co/forum/thread/65300)\n# <center> Day 1 First anime I ever watched\n<p><center> https://anilist.co/anime/6033/Dragon-Ball-Z-Kai/\nCourtesy of the infamous 4Kids TV. There was also Pokemon and Sonic X, but this is the one that I remember the most.\nIt's not on my list cuz screw that - there's a later question where I can answer with my \"official\" first anime.\n\n<hr>\nThis seems fun, let's see how far I get.\n<hr>\nTemplate\n~!img400(https://i.imgur.com/84tKjQy.png)!~`,
  `[ img99%(https://files.catbox.moe/k3ucsj.png) ](https://anilist.co/forum/thread/70668/comment/2517104)\n[ img99%(https://files.catbox.moe/qw3io7.gif) ](https://anilist.co/forum/thread/67326/comment/2517049)\n[ img99%(https://cdn.discordapp.com/attachments/1085425937933418578/1194167405891555358/ForeSix_Celebrates_01-09-24.png) ](https://anilist.co/forum/thread/68059/comment/2517029)\n# ~~~<a>✦ January 9th Birthdays ✦</a>~~~\n~~~Hosted by @Lugnica, @xSensei, and @ForeSix. Click the banners for the events.~~~\n## ~~~__[Yuu Otosaka](https://anilist.co/character/88950/Yuu-Otosaka)__~~~\n~~~img75%(https://i.pinimg.com/originals/33/4e/68/334e688d9ed128041b133b6cb46d20a0.gif)\nimg75%(https://i.pinimg.com/originals/92/fc/15/92fc15d934367cf67abae81e9a42af99.gif)~~~\n## ~~~__<a>Thoma</a>__~~~\n~~~img75%(https://64.media.tumblr.com/f7da3fb81aa01a43c95e8c1f0bdb0291/7208dfd4118a79ab-16/s540x810/3773408b48f77c665ef5798ec094dab367763fea.gif)~~~\n## ~~~__[Yachiyo Nanami](https://anilist.co/character/151327/Yachiyo-Nanami)__~~~\n~~~img75%(https://64.media.tumblr.com/daefd3d7d9a87c56254402c5c259c7fa/3129b2847e25b79c-c3/s540x810/b112ec60bbc56c0036bfc211b57282e050e2e36a.gif)\nimg75%(https://64.media.tumblr.com/d95f902a1e8791a7b4aa30b3316b032a/029a68f48f065871-1b/s540x810/5fb9f89a9b134a6404de0c0cb7f9a643bfd577ef.gif)~~~\n## ~~~__[Honoka Tsukii](https://anilist.co/character/204407/Honoka-Tsukii)__~~~\n~~~img75%(https://files.catbox.moe/ov31j6.png)~~~`,
  `i love scanlating (beyblade x chapter 7 now out from team kid named bird)\nimg200(https://cdn.discordapp.com/attachments/1116929304178200596/1194507226379993108/image.png?ex=65b09a8b&is=659e258b&hm=3441746fee0555aaa7e535ae247788f7064def099554626778bf5e625ce3db49&)`,
  `img(https://files.catbox.moe/kf30f0.png)\n\n~~~ ~!img(https://i.imgur.com/L0Zk0hS.jpg)!~ ~~~\n~~~[Event Link](https://anilist.co/forum/thread/66854/comment/2517873)~~~`,
  `~~~ I got nominated to do my top 5 OPs by @NyxCrab .\nDecided to deviate a bit and do 4 Top 5 lists for each decade since I have nothing else to do. ~~~\n\n~~~ My favorite openings change almost every month, so these are not set in stone. This took me 2 hours to finish: ~~~\n\n___\n~~~__<h2>Top 5 Anime Openings (2021≤)__~~~\n\n___\n\n~~~__<h3>No. 5__~~~\n~~~https://anilist.co/anime/155783/Tengoku-Daimakyo/ ~~~\n\n~~~ ~! youtube(GuAcdIqcanA) !~ ~~~\n\n___\n\n~~~__<h3>No. 4__~~~\n~~~ https://anilist.co/anime/114745/Made-in-Abyss-The-Golden-City-of-the-Scorching-Sun/ ~~~\n\n~~~ ~! youtube(4QFe2FH13wE) !~ ~~~\n\n___\n\n~~~__<h3>No. 3__~~~\n~~~ https://anilist.co/anime/128546/Vivy-Fluorite-Eyes-Song/ ~~~\n\n~~~ ~! youtube(2p8ig-TrYPY) !~ ~~~\n\n___\n\n~~~__<h3>No. 2__~~~\n~~~ https://anilist.co/anime/136484/Link-Click-Season-2/ ~~~\n\n~~~ ~! youtube(mas76qT3JVM) !~ ~~~\n___\n\n~~~__<h3>No. 1__~~~\n~~~ https://anilist.co/anime/113717/Ranking-of-Kings/ ~~~\n\n~~~ ~! youtube(dWZAH5w8jkQ) !~ ~~~\n___\n\n~~~ <h2>__More in the replies__~~~`,
  `---\n# ~~~__100 Day Manga Challenge - Day 97__~~~\n##~~~__Most Inspiring Manga__~~~\n~~~~~~\n\n---\n\n~~~ https://anilist.co/manga/30656/Vagabond/~~~\n\n---\n\n~!img300(https://cdn.discordapp.com/attachments/897814032180994070/1159820132923748454/image0.png?ex=653269ac&is=651ff4ac&hm=b5fb70520e1eda81b9cf1ac9e7fbadaffad26d626487bd564ec98071a1318a3c&)!~`,
  `~~~\n#Happy Birthday <a>[Yukichi Fukuzawa!](https://anilist.co/character/89196/Yukichi-Fukuzawa)</a>\nJanuary 10, 2024\n###───────[✦✦](https://anilist.co/user/ssumaiya/)───────\nimg400(https://i.pinimg.com/originals/62/71/2a/62712a2d81aafac663c19a9dc58dd300.gif)\n\n───────✦✦───────\n[Thread](https://anilist.co/forum/thread/66854/comment/2517873) by @ACBirthdays || [Thread](https://anilist.co/forum/thread/68059/comment/2517819) by @ForeSix\n~~~`,
  `~~~<a>__⭑ ★ ⭑ ˗ ˏˋ ❀ ´ˎ ˗ ⭑ ★ ⭑ __</a>~~~ \n~~~__Birthday Post Time__~~~\n~~~<a>__꒷⏝꒷꒦꒷⏝꒷꒦꒷⏝꒷__</a>~~~\n~~~img400(https://files.catbox.moe/hde8wp.png)\nimg400(https://files.catbox.moe/vdi4ct.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517871) By @ACBirthdays~~~\n~~~img400(https://files.catbox.moe/kf30f0.png)\nimg400(https://files.catbox.moe/6skdam.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517873) By @ACBirthdays~~~\n~~~__¡!Happi Happi Birthday both of you!¡__~~~\n~~~<a>•| ⊱✿⊰ |•</a>~~~`,
  "#487831 is bad .·´¯`(>▂<)´¯`·.",
  "<center>img(https://i.postimg.cc/C12Dc44H/100-Days-Anime-Challenge-3.gif)\n<h2><p align=\"center\">[All days](https://anilist.co/activity/668238059)</p></h2>\n<hr>\n<h1><b>Day 10 - Favorite male VA</b></h1>\n\nimg150(https://s4.anilist.co/file/anilistcdn/staff/large/n95591-WQGdD3ubbeoq.jpg)\n\n<h1>[Kenjirou Tsuda](https://anilist.co/staff/95591/Kenjirou-Tsuda)</h1>\n<h2><b>I wondered about [Kazuhiko Inoue](https://anilist.co/staff/95021/Kazuhiko-Inoue) for putting his voice to [Kakashi](https://anilist.co/character/85/Kakashi-Hatake), because he was so loud and masculine. But if we are talking about a really powerful and deep voice, it belongs to [Kenjirou Tsuda](https://anilist.co/staff/95591/Kenjirou-Tsuda), and he is my favorite voice actor. Although I haven't watched too many anime where he did the voiceover, the ones I have watched have convinced me that he is awesome.</b></h2>\n\n<hr>\n~!<a href=\"https://i.imgur.com/ZcqRCUB.png\"><img width='500' src='https://i.imgur.com/ZcqRCUB.png'></a>\n[Creator of the challenge](https://anilist.co/forum/thread/65300) @Laevateinn !~\n<hr>\nI'm doing this with @Shinikaly\n[Her activity](link)\n<h5 p align=\"left\">[Previous day](https://anilist.co/activity/672188563)</p>",
  "~~~img520(https://i.imgur.com/tIm5jZR.png)\n# ___<a> Day 83: Who do you ship (non-canon)? </a>___\n\ni have manyyy but here is mitsukou\n\nimg250(https://media.tenor.com/NN3NJOio-3AAAAAC/mitsuba-sousuke-mitsuba.gif)\n\nhttps://anilist.co/anime/108463/Toiletbound-Hanakokun/\n~!img520(https://media.discordapp.net/attachments/1144308540660514886/1160302895032442940/9VBijLp.png?ex=65342b47&is=6521b647&hm=14eeb6e98870f848192f867b5af200667093a6baf30e0e1342c2b3b9a6a3b195&)!~\n~~~",
  "~~~img520(https://i.imgur.com/tIm5jZR.png)\n# ___<a> Day 82: Sailor uniform or coat uniform? </a>___\n\ni have no preference but this what came to mind when i\nread sailor uniform\n\nimg250(https://64.media.tumblr.com/91165a978ddd66be85443ab92bb2014d/d176254eee883757-6c/s540x810/e72d1d6b80b35510c280769a798232da7730a3a0.gif)\n\nhttps://anilist.co/anime/131548/Akebis-Sailor-Uniform/\n~!img520(https://media.discordapp.net/attachments/1144308540660514886/1160302895032442940/9VBijLp.png?ex=65342b47&is=6521b647&hm=14eeb6e98870f848192f867b5af200667093a6baf30e0e1342c2b3b9a6a3b195&)!~\n~~~",
  "# __ <a>  ~~~30 Day Anime Challenge~~~ </a>__\n~~~with @haruhxl <3 ~~~\n~~~───※ ·❆· ※───~~~\n\n# ~~~DAY 1: Favourite embarrassing scene in an anime\n~~~\n\n~~~youtube(https://www.youtube.com/watch?v=7B_HDVmyjxk)~~~\n\n~~~I FELT HAYASAKA IN THIS SCENE\n\nhttps://anilist.co/anime/101921/Kaguyasama-Love-is-War/\n\n───※ ·❆· ※───~~~\n\n~~~~!img400(https://i.postimg.cc/MK0qP1pm/30-day-anime-challenge-1.png)!~ ~~~",
  "__My notes from Berserk of Glutony__\n---\n-- -\n\nEpisode Notes\n--------------------------\nep 1 • A good introduction to the world, that fact that the perceived useless skill was OP was a bit too obvious in my opinion\n\nep 6 • So far it's not anything groundbreaking but it's a fun watch\n\nep 9 • This should be interesting... | A lust sin is kinda cool\n\nep 10 • So we'll get another sin... Seeing as we have Gluttony (w Greed), Wrath (w Sloth) and Lust (w ???)  I'd assume we are getting Envy or Pride, I'd guess Envy.\n\nep 12 • Though maybe a bit short, it felt like a good end to the series.\n-- -\nCharacter Notes\n--------------------------\nRoxy: She feels annoyingly good, which is kind of a good thing, but as the same time it's annoying, her whole character is basically that other than her being a love interest for the MC\n\nFate: He feels a bit everyman trope-ish, his design is very basic, which ig is a bit fitting, he doesn't really have any interesting character traits seeing as he can be summed up in just \"really op skill, good-hearted and in love with Roxy\".\n\nGreed (yes, the sword): Basically the one \"character\" driving the story forward, without him Fate wouldn't be able to do pretty much anything, at least that's what it feels like. It seems like Fate was destined to meet Greed but even so it seems like Fate is too reliant on him. The transformation/progression stuff is kinda cool tho, since it shows off the Greed/Gluttony synergy.\n\nMayne: She's cool, but also a bit basic. I feel like her sin lacked explanation so I don't really have a clue what she does, her axe also seems a bit confusing. I do love the design of her character tho.\n-- -\nReview\n--------------------------\nA nothing special but fun to watch Shonen.\n\nThe anime reminds me a bit of Assassin reborn as an aristocrat. \n\nWorld: BoG is set in a general RPG fantasy world, a setting that you can't really go wrong with. The world isn't very innovative but the idea of weapons and skills of seven deadly sons felt a bit unique at least.\n\nCharacters: The characters overall felt a bit flat, as in the whole character was made up of one or two traits.\n\nAnimation: The animation was good, nothing groundbreaking but it didn't look bad.\n\nOverall I recommend the anime if you want to watch a fun fantasy shonen, it won't blow you away but it's an entertaining watch.",
  "~~~img520(https://i.imgur.com/tIm5jZR.png)\n# ___<a> Day 79: Best anime villain</a>___\n\nspoilers for csm !!\n~!makima because she was interesting, im not the biggest fan of her\nbut everything about her is cool!~\n\nhttps://anilist.co/anime/127230/Chainsaw-Man/\n~!img520(https://media.discordapp.net/attachments/1144308540660514886/1160302895032442940/9VBijLp.png?ex=65342b47&is=6521b647&hm=14eeb6e98870f848192f867b5af200667093a6baf30e0e1342c2b3b9a6a3b195&)!~\n~~~",
  "<center>nsfw game theory rump shaking\n~!webm(https://cdn.discordapp.com/attachments/788472381047177240/1195404886796402828/abstractenvy-1744980279788286226-20240110_081133-vid1_1.mp4?ex=65b3de8e&is=65a1698e&hm=2673316422ed94f68a107bb87e0a8f5c6cca2f2206b6bc42788be90e660320ff&)!~",
  "~~~img520(https://i.imgur.com/tIm5jZR.png)\n# ___<a> Day 78: A series you like because of nostalgia </a>___\n\nthe first precure series i watched !!\n\nimg250(https://64.media.tumblr.com/fbd6967bec7434eb4d941b432bda3822/c2b27d7646057950-a3/s1280x1920/055f66c680c675c3bd33087ecb11935f524dd23c.gif)\n\nhttps://anilist.co/anime/12191/Glitter-Force/\n~!img520(https://media.discordapp.net/attachments/1144308540660514886/1160302895032442940/9VBijLp.png?ex=65342b47&is=6521b647&hm=14eeb6e98870f848192f867b5af200667093a6baf30e0e1342c2b3b9a6a3b195&)!~\n~~~",
  "Daily OP #211\n\nUrusei Yatsura (2022) Season “3”\n\nYouTube(https://youtu.be/3OhStDNna-k?si=aq-L8HJsRaHYJnWC)\n\n~! https://anilist.co/anime/155645/Urusei-Yatsura-2022-Season-3/!~",
  "hiya there ^_^\nI've got the two openings to the Ah! My Goddess TV series stuck in my head.\nThey're my most favorite OPs ever.\n\n-__Ah! My Goddess OP 1 - Open Your Mind__-\nyoutube(https://youtu.be/p63_vr0AkgU?si=OUaoEyDecGSfGIer)\n-__Ah! My Goddess: Flights of Fancy – Opening Theme – Shiawase no Iro__-\nyoutube(https://youtu.be/QG0Mfhl7ws8?si=0sHyAXAhfl9bDDvZ)",
  "#~~~____&#119812;&#119810;&#119810;&#119815;&#119816;____~~~\n\n~~~ ~![img360(https://i.imgur.com/318pQkC.png) ](https://www.pixiv.net/en/artworks/115048823)!~ ~~~",
  "~~~**[Attack on Titan](https://anilist.co/anime/16498/Attack-on-Titan/)**~~~\n~~~━━━━━ <a>ꕤ</a> ━━━━━~~~\n~~~_\"A hero would sacrifice you to save the world, but a villain would sacrifice the world to save you\"_~~~\n~~~img400(https://media0.giphy.com/media/xUA7b4LNqswUGX2REs/source.gif)~~~\n\n~~~<a>Original Creator:</a> Hajime Isayama\n\n<a>Director:</a> Tetsurou Araki, Masashi Koizuka, Hiroyuki Tanaka\n\n<a>Studio:</a> WIT & MAPPA~~~\n___\n~~~Side comment: <a>This might be my all-time favorite anime quote as it speaks volumes to the counter perspective on most tragic hero vs. villain stories.</a>~~~",
  "~~~[img(https://files.catbox.moe/sulkl2.jpg) ](https://twitter.com/aikeepng/status/1745782554480029914?t=LK_JM9AchMysmpEsfpsmXg&s=19)\n#*[I didn't choose this town. I dream of getting out.](https://open.spotify.com/track/0BMiGGDjwqiYtSKMQP13zd?si=GGL4YyBRSmSnjZ23s17iuw&context=spotify%3Aplaylist%3A37i9dQZEVXbmqbvnn5mRTY)*~~~",
  "~~~img330(https://files.catbox.moe/nnp0al.jpeg)~~~\n\n##~~~┍━━━━━━✿━━━━━━┑~~~\n##~~~[Source](https://www.pixiv.net/en/artworks/98547036)~~~\n##~~~┕━━━━━━✿━━━━━━┙ ~~~",
  "~~~____[Day 851](https://anilist.co/user/868735)____\ncool as heck\n[img360(https://imgur.com/ZDpNrJx.jpg) ](https://www.reddit.com/r/BlueArchive/s/mxMed1zhtK)\n##### night~~~",
  "~~~img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>(Early) Happy Birthday for Four Seiyuus </a>~~~__\n~~~[ img500(https://cdn.discordapp.com/attachments/949701069590654976/1195395205277433856/ota-seishow-shino_shimoji-banner-chevreuse.png) ](https://anilist.co/forum/thread/52661/comment/2519609)\n[ img500(https://imgpile.com/images/9ZpaNu.png) ](https://anilist.co/forum/thread/52661/1)~~~\n# __~~~<a>Chiaki Kobayashi, Daisuke Hirakawa and Kazuhiro Yamaji </a>~~~__\n~~~__This Four Seiyuus share Birthday in June 4\nClick on <a> Banner</a> if you wants to do it  Event__~~~\n~~~__Event by @OtakuAcademia  \n  __~~~\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>Shino Shimoji Roles:</a>~~~__\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n~~~img500(https://64.media.tumblr.com/9328c31d786bab6a98b585081c5ba57c/077603b81911d5db-a6/s640x960/1ee27f98a57ef2805240b2d908ec8d62707f4223.gifv)~~~\n~~~img500(https://media1.tenor.com/m/tIC_2EQTK8sAAAAC/shy-anime.gif)~~~\n~~~img500(https://i.pinimg.com/originals/61/b0/07/61b007092c0cf4062b6ff1e0fb174b95.gif)~~~\n~~~img500(https://i.pinimg.com/736x/b1/92/c9/b192c96c9915de94ca2bfb07892db3f7.jpg)~~~\n~~~img500(https://i.pinimg.com/236x/6f/39/09/6f390956c819c74fd6136adc8dd858d0.jpg)~~~\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>Chiaki Kobayashi Roles:</a>~~~__\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n~~~img500(https://64.media.tumblr.com/c9536966ab0f4f459d51bacb6a5efaa4/ecb0c892cbe2e264-36/s400x600/b708aa93543c7d61529f265bacd96bed60d796ba.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/ded59e3d830f8644b70545218ba27693/64122097c9a25700-b5/s640x960/6e9cc0f2cbdb5de4ca69c9e1e85271b8f3740a48.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/d923382456409d8be6075cb911d62084/81deae6f05a6c614-67/s640x960/f41b2d0b6b929e3880b9ef488b722da128f2a102.gifv)~~~\n~~~Img500(https://media1.tenor.com/m/rJ7G4nF6ud4AAAAC/%E7%8B%A9%E9%BE%8D%E4%BA%BA%E6%8B%89%E6%A0%BC%E7%B4%8D-raguna-kurimuzon.gif)~~~\n~~~Img500(https://media.tenor.com/LL2qsGGuAFkAAAAC/yuuichi-katagiri.gif)~~~\n~~~Img500(https://64.media.tumblr.com/8ede54e5a0fe4e8e14f62597a778ea15/c5916162e80da0f2-4f/s540x810/0996b485a79e25b8394a0b1ad5d6afa73271e361.gif)~~~\n~~~Img500(https://64.media.tumblr.com/319549937398ae14a9656b41653aa2df/e1cca4de7c6cbbf1-25/s1280x1920/5c1cc87c0447500d8bd1821596605f8f284fdf03.jpg)~~~\n~~~Img300(https://media.discordapp.net/attachments/843441176794759218/1104757611749982359/Shogo_Taguchi_official.png)~~~\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>Daisuke Hirakawa Roles:</a>~~~__\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n~~~Img500(https://64.media.tumblr.com/6d2bd00f3edff94cd35d9c765b8e2dcf/2cd72372098d3279-97/s540x810/c2ad9a65c1a0b369ee31a6703f708fac6f9eb973.gif)~~~\n~~~Img500(https://64.media.tumblr.com/9af9e2fcf22113bacd65d59cb1a4ef1c/568e2716f8f660c7-ae/s540x810/1a3b3e2bbc2424c6a3a27234ff29a59c37ef67cb.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/611e0943c03b79a2c17a1128cc7f8e34/f2f3229f4b3eeaa4-6f/s540x810/8921814c37e47359aa18dde937cabd8bc300f3a7.gif)~~~\n~~~Img500(https://i.pinimg.com/originals/93/27/4c/93274c1e773c520d5fa76241fb99ba6b.gif)~~~\n~~~Img500(https://64.media.tumblr.com/095035fc0e078bc904cec7220e04ce11/df047b466ae4d343-7d/s500x750/f26566642cc4cb0ea3337894692f9f5a01295be0.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/5109aa979fb454d73033da06884947db/tumblr_pi58aypRL81s1n6fio1_1280.gifv)~~~\n~~~Img500(https://i.pinimg.com/originals/8c/43/d1/8c43d14d97fd612d30bd43de9a4f7477.jpg)~~~\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n# __~~~<a>Kazuhiro Yamaji Roles:</a>~~~__\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~\n~~~img500(https://64.media.tumblr.com/897e703907663ba9effd05c75f793e11/4b0b73757b8f1e3a-8d/s640x960/0dd85e8534292d3f8bfee71ca744842cbb79741a.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/e9ebc41217584b1b1eb29dcdd226a11d/ddd3f5d503ae21c2-bd/s400x600/08f23499d19d85aac49a5912d33136cfbcec3a1d.gif)~~~\n~~~Img500(https://64.media.tumblr.com/6a084450c03e89d44ec3bc39211fb00d/tumblr_om191oQ5fj1ukemvbo1_540.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/c310497a5fdc3713d257f1fe2980a22a/tumblr_ojqbdpHBC21sdsya3o2_400.gif)~~~\n~~~Img500(https://64.media.tumblr.com/14925679b726e6196ab9b3a940c4aea7/c1c814bbb3504643-d0/s540x810/5d2363aaec00a5712b2779116b481871c04a73ec.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/5155f1b229abc7ca4fec5a8ae3b5416b/63a025e32fa4b8d3-e3/s500x750/a0e4a16b9a724e91c40c4f45cef9aacdc36c9391.gifv)~~~\n~~~Img500(https://media.discordapp.net/attachments/843441176794759218/1104766940624457758/20230507_154909.gif)~~~\n~~~Img500(https://64.media.tumblr.com/5c11bc9fb985518749dab63c6fce3865/36536472b1f12a32-9c/s540x810/0a8afff14fc2595213a60bf46f40dd937d97f6f0.gifv)~~~\n~~~Img500(https://64.media.tumblr.com/4a58f5bada2e196b1ab87f3b8b3ef021/ccdf212d52d70af4-40/s1280x1920/b019bb67a23526599e6e7d0f4809428facbd6450.gif)~~~\n~~~Img300(https://i.pinimg.com/564x/c7/01/86/c70186646b795ede67b258e6ac9c171d.jpg)~~~\n~~~Img300(https://i.pinimg.com/736x/00/cc/9c/00cc9ca091870708a7e9d533b97650e5.jpg)~~~\n~~~Img500(https://i.imgur.com/I4JYvuE.gif)~~~",
  "~~~\n#__<a>MY TOP 15 FAVORITE ANIME OF 2023</a>__\n\n◇\n\n*15. __<a>Tomo-chan Is a Girl</a>__*\n\nImg500(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4J3IN79PbwrYZ3taqC-PrQLJrzuDio6XhgwEZfqJlYsbEA7DUw50N-OF9L0y0Cbatlx26HtfAaIuMeimlluvng3W9sB9MpguqcdiUck2yTL84O7fRKMEV6uMnW86KUj_pzMYfiFrec04ZxtadapNDsvxSyFCMbLme35HeZMsGoG2WcAma5Q/s1600/Tomo-chan%20wa%20Onnanoko!%20-%20OP%20-%20Tomo-chan%20Pink%20Heart.gif)\n\nhttps://anilist.co/anime/151806/Tomochan-Is-a-Girl/\n\n*14. __<a>Buddy Daddies</a>__*\n\nImg500(https://64.media.tumblr.com/3f755ec71b417a97ae3ea379b8cec2c7/b1baeff84a766c9f-46/s540x810/91db0f590dce25a7dfd727d4749c35a7c242e094.gifv)\n\nhttps://anilist.co/anime/155907/Buddy-Daddies/\n\n*13. __<a>The Apothecary Diaries</a>__*\n\nImg500(https://i0.wp.com/drunkenanimeblog.com/wp-content/uploads/2023/11/Apothecary-Diaries-ep5.gif?fit=666%2C336&ssl=1)\n\nhttps://anilist.co/anime/161645/The-Apothecary-Diaries/\n\n*12. __<a>Undead Murder Farce</a>__*\n\nImg500(https://64.media.tumblr.com/fd52b0b0fc583c64d5e7f4fa2772124a/7b6a8620b31ca79a-7f/s540x810/cb7eedadbb3bde83602e0c852b0820693ebb03a5.gifv)\n\nhttps://anilist.co/anime/162983/Undead-Murder-Farce/\n\n*11. __<a>Sasaki and Miyano: Graduation</a>__*\n\nImg500(https://64.media.tumblr.com/18c371b1029fa1566284a5169bbfc97c/6f7d739cd21ec5ec-9c/s1280x1920/582de8fee3fd7aac80c495e58f2dc6dc18988cc3.gifv)\n\nhttps://anilist.co/anime/146743/Sasaki-and-Miyano-Graduation/\n\n*10. __<a>Overtake</a>__*\n\nImg500(https://64.media.tumblr.com/7beced3f34f1470821cebdc53ef89908/6894a53b930633cf-2e/s540x810/30980030ea977f83aad6d2d8cb967c430409a0ab.gifv)\n\nhttps://anilist.co/anime/160515/OVERTAKE/\n\n*9. __<a>Oshi no ko</a>__*\n\nImg500(https://64.media.tumblr.com/46cdf39dcadba36897b4bb37838afa75/f37d7f9d8a187268-df/s540x810/6fd5ca8dae6df67f9795a7076308a968c1931f14.gifv)\n\nhttps://anilist.co/anime/150672/Oshi-No-Ko/\n\n*8. __<a>Attack on Titan: Final Chapter 2</a>__*\n\nImg500(https://64.media.tumblr.com/d2d5ee50235173cb8a07cfd84e11849c/07ada80f4b35359c-b9/s540x810/ac1406adb1fc9f3aff5d41777b9ea9cfe8278211.gifv)\n\nhttps://anilist.co/anime/162314/Attack-on-Titan-Final-Season-THE-FINAL-CHAPTERS-Special-2/\n\n*7. __<a>Pluto</a>__*\n\nImg500(https://64.media.tumblr.com/4982c889cf6f70a5fb070f1063def4a7/290509baf10c3d46-f7/s540x810/542860771d0ada0b5f82de0519751c827a09410a.gifv)\n\nhttps://anilist.co/anime/99088/PLUTO/\n\n*6. __<a>Frieren: Beyond Journey's End</a>__*\n\nImg500(https://64.media.tumblr.com/380b88df3fe3dd0b9a2f0c9113068cd4/3a443fde84c4d318-f4/s500x750/759664d219ca62dae8f21a73262c3fac98ddabb1.gifv)\n\nhttps://anilist.co/anime/154587/Frieren-Beyond-Journeys-End/\n\n*5. __<a>Link Click (Season 2)</a>__*\n\nImg500(https://64.media.tumblr.com/97386c554d88194ad01c57b111f1711b/573e25a4dbe2a5cb-25/s540x810/1d63c0599e2f74c066e83bb544e44a5d7c333ac4.gifv)\n\nhttps://anilist.co/anime/136484/Link-Click-Season-2/\n\n*4. __<a>Jujutsu Kaisen (Season 2)</a>__*\n\nImg500(https://64.media.tumblr.com/a0c98c1ee977f5a5b3f73991af24dd2e/f0670e861800ba58-2a/s540x810/d786da599650c7a1ef1abd134bebc24d65e9fa99.gifv)\n\nhttps://anilist.co/anime/145064/JUJUTSU-KAISEN-Season-2/\n\n*3. __<a>Vinland Saga (Season 2)</a>__*\n\nImg500(https://64.media.tumblr.com/30e90ad83d9677fe8005600cff9bf465/a35a2d815b8a7053-e0/s640x960/b345a2b732b99ce5b28d066f4161218fbc28fe60.gifv)\n\nhttps://anilist.co/anime/136430/Vinland-Saga-Season-2/\n\n*2. __<a>My New Boss is Goofy</a>__*\n\nImg500(https://64.media.tumblr.com/17f661149b7c26fc103b4b15f24def67/85b58677472bebdc-95/s1280x1920/b65242236de3f6b42dc17461ed369d93de892a2b.gifv)\n\nhttps://anilist.co/anime/165070/My-New-Boss-is-Goofy/\n\n*1.  __<a>Tsurune: The Linking Shot</a>__*\n\nImg500(https://64.media.tumblr.com/0f7112c4cd0ab0624b0b21f892a983d9/2a36b9a0b33e3076-27/s540x810/729fd4790b57b446abdc359a1cebb2cf15eb694b.gifv)\n\nhttps://anilist.co/anime/153841/Tsurune--The-Linking-Shot-/\n~~~",
  "[<img src=\"https://i.imgur.com/cDJbN7p.png\" align=\"left\" width=\"60\">](https://www.takaratomy.co.jp/products/miracletunes/drama_miracletunes/)\n~~~Watched Episode 7-8 of [Idol × Warrior Miracle Tunes!](https://www.serializd.com/show/96823/season/138969/1)~~~",
  "Here's a fun fact: [due.moe](https://due.moe) calculated and served manga chapter and volume count data over 60,000 separate times last week.\n\nAdditionally, the error rate for unresolved manga served is less than 0.3% of all requests served.\n\n<center>\n<img src=\"https://media1.tenor.com/m/davKUmYegaUAAAAC/tsndere.gif\" width=\"50%\"></center>",
  "<h3>__I'm caught up......__ img22(https://i.postimg.cc/bw9b2VcL/whyyy.gif) img22(https://i.postimg.cc/bw9b2VcL/whyyy.gif) img22(https://i.postimg.cc/bw9b2VcL/whyyy.gif)\nhttps://anilist.co/manga/140407/The-Greatest-Estate-Developer/\nThe year's barely started and this is already a <a>high-favorite</a> of mine.\n\n**PLEASE get on this if you haven't already or at least pop it in your planning.\nNon-stop entertainment with a despicable fun MC. You won't regret it.**\n\n<a>Also based????????\nimg200(https://i.ibb.co/nBT74qX/image.png)\n~!<a>Lloyd Frontera my goat............</a>\nimg200(https://i.imgur.com/TLoFLEQ.png)\nimg200(https://i.imgur.com/4XEQ2Wq.png)\nimg200(https://i.imgur.com/eE8Pfqu.png)\nimg200(https://i.imgur.com/opDoFD7.png)\nimg200(https://i.imgur.com/qwGfZvz.png)!~",
  "# ~~~ __Top 5 Openings All Time Favourite Anime OPs__~~~\n\n----\nThank you for the nomination @Ampri\nI just hope I don't lag doing this \nand I'm glad I already had a Top 10 list.\n\n\n----\n# ~~~__5:  To the Beginning - Kalafina__~~~\n_~~~ Fate/Zero Season 2~~~_\n~~~youtube(https://youtu.be/2psgnTAVz0E?si=REuY-X1meo0YAhN1)~~~\n\n# __~~~4: Colors - FLOW~~~__\n_~~~Code Geass~~~_\n~~~youtube(https://youtu.be/FUH9S44D1BM?si=FqyivIVfqAuxbXaq)~~~\n\n# __~~~3: ADAMAS - LiSA~~~__\n_~~~Sword Art Online: Alicization~~~_\n~~~youtube(https://www.youtube.com/watch?v=v2tmzEuVEz8&list=PLBM2r0XIRf5lMaI8rCNuEEuril5UpfXOc&index=3)~~~\n\n# __~~~2: Kiminosei - the peggies~~~__\n_~~~Rascal Does Not Dream of Bunny Girl Senpai~~~_\n~~~youtube(https://www.youtube.com/watch?v=KbT3JsJmd14&list=PLBM2r0XIRf5lMaI8rCNuEEuril5UpfXOc&index=2)~~~\n\n# __~~~1: Sorairo Days - Shoko Nakagawa~~~__\n~~~youtube(https://www.youtube.com/watch?v=PKRUKalbx3s&list=PLBM2r0XIRf5lMaI8rCNuEEuril5UpfXOc&index=1&t=128s)~~~\n\n-----\nI nominate @EpicBean @GoatQuote @Jewhin @Mooyashi @WizardM \nAnyone seeing this is welcome to participate too of course",
  "~~~https://anilist.co/anime/158927/SPY-x-FAMILY-Season-2/\n__i just had to write about this <a>arc</a> omg ♡__~~~\n#~~~___<a>cruise ship arc</a>___~~~\n~~~__episodes 5 - 9__\ncriminally illegal for this arc to be that good\n#───── •✧• ─────~~~\n~~~these 5 episodes had no reason to be so beautifully exceptional. spy x family always had its comedic confusions. in the first season, there were many wholesome moments, comedic glory, and even some action-packed scenes. however, i think this arc alone topped almost all of last season. from start to finish, i felt like i understood yor more in a much deeper sense. seeing her juggling her work, her lies, her feelings, and her overwhelming sense of responsibility was so well written. throughout the whole arc, we see her trying to figure out who she is doing \"this\" (the missions and killings) for. \n>\"What am I doing this for?\" - yor forger</blockquote> \nthroughout episode 7, we see yor practically going through a crisis of her identity and responsibility as the \"thorn princess.\" there were so many times i felt for yor, understanding that yearning of knowing what one was truly meant to do. this show just has an amazing ability to go from something so comedic and instantly change the tone and scene to something serious and important. \n\nthis episode also had a lot of cute moments with loid and anya ♡ \nand while this arc did showcase yor, it showcased the growing bond between loid and anya...   ~~~\n\n~~~img450(https://i.imgur.com/w8BQSbs.png)~~~\n~~~img450(https://i.imgur.com/022a2VE.png)~~~\n\n~~~now i am no film major, but episode 8 was cinematic heaven. the fight between yor and the group trying to kill olka  was just pure crack for the eyes. the cinematography was on point and the transitions they used was so well laid out. from anya to yor to the workers winning in the casino. \n\neverything about this episode and the fight scene was almost perfect. seeing yor just effortlessly killing those people filled me with so much hype and serotonin. \n\nIMG450(https://i.imgur.com/GiUfVip.jpg)\n>\"I don't care if there is blood on these hands...\" - yor forger</blockquote>\nnow while all the fighting was amazing and the action scenes with the hilariously serious director were top-notch, in my opinion, the climax of this whole episode was when yor were nearly about to give up. instead, she thought of her family, her brother, her past, and most importantly, loid. she remembered the words loid said to her long ago. it wrenched my heart to see yor finally accepting who she was and that no matter what, there would be people by her side. ~~~\n~~~img450(https://i.imgur.com/V1oltKM.png)~~~\n\n~~~the last episode of the arc was just pure intense action but jam-packed with the one true hero... anya! i loved seeing her panic and attempt to help yor and loid in her little way. ironically, the random actions she does end up helping them in the end. anya will always be there to help and that's what i love about her. she always ends up saving yor and loid in some childlike way. some might say she is the true hero of this arc, not yor and loid (haha). \n\nit was so satisfying to see yor successfully finish her mission. i think olka gave her a new sense of meaning and vision to her life. it was so bittersweet to see them part, but it was so heartwarming to see yor realize that what she does helps people like olka and her baby... \n>\"Your hands... are what connected him to his future.\" - Olka </blockquote>\nimg450(https://i.imgur.com/MJcgtx9.png)~~~\n#~~~───── •✧• ─────~~~",
  "<center> \n\nimg(https://i.postimg.cc/7hL086n5/Border-Frame-A4.gif)\n\n##___<a>Bridget and Christopher Rosette layout is here, WOOOH!</a>___\n\n~!___Sorry for the delay. Today was a boring and exhausting day for me.___!~\n\nimg(https://i.postimg.cc/sfwgk4XX/Chalk-Line-4.gif) \n\n___Heya, how have you been? After two weeks on a trip that gave me a lot and at the same time gave me nothing, it was already time for the profile to leave Christmas behind and welcome something new.___\n\n___On the left as the new face of the profile, we have <a>Bridget</a> from the Guilty Gear franchise, a somewhat controversial girl. I know the most basic things about her due to the controversy that happened last year. Apart from that, her design and weapons in the games seem very interesting to me.___\n\n___On the right as a secondary character we have <a>Christopher Rosette</a> from Chrono Crusade. I saw this girl a few months ago in a gif that I thought was quite funny. Anyway, as a large part of the characters shown here, I don't know much about her.___\n\n___You already know the usual. <a>Appreciate them!</a>___\n\nimg(https://i.postimg.cc/sfwgk4XX/Chalk-Line-4.gif) \n<img align=\"left\" src=\"https://64.media.tumblr.com/3fc0469a58a8e38d8654f980bcdd77ea/a7f92c82bcb5801b-77/s540x810/ba0f79a04e667a602929faac6b84005b56d0c9c4.gif\" width=50%> <img align=\"right\" src=\"https://pa1.aminoapps.com/6456/118b859dbed832ceb7a1d3797f81fa36218d08c3_hq.gif\" width=48%>\nimg(https://i.postimg.cc/sfwgk4XX/Chalk-Line-4.gif) \n\nimg(https://i.postimg.cc/FRp3Bc3t/Border-Frame-B4.gif)",
  "# ~~~__100 DAYS ANIME CHALLENGE__~~~\n~~~_Day 68 - Anime Closest to Your Heart, Why?_~~~\n________________________\n~~~I dont really know....~~~\n________________________\n~~~ ~!img2220(https://i.ibb.co/HHmDB9Q/9VBijLp.png)!~ ~~~",
  "~~~<a>━━⊱ Art of the day ⊰━━</a>\n\nimg380(https://i.pinimg.com/564x/08/5d/6b/085d6b06586b58c8e0384f6f57d53ae1.jpg)\n\n[━⋆ Credits⋆━](https://twitter.com/ryosuketarou)~~~",
  "~~~Thanks for the nom, @ibitsu, & @ElMonjeSabe\n___\n\nMy Top 10 OP/EDs of all time (not in order)\n\n1 - youtube(https://www.youtube.com/watch?v=vQiodbKEW6s&list=RDvQiodbKEW6s&start_radio=1)\n\nTsukasa Tsukuyomi - Koi no Uta\n\nhttps://anilist.co/anime/116267/TONIKAWA-Over-The-Moon-For-You/\n___\n\n2 - youtube(https://www.youtube.com/watch?v=bsGAsJBW6zM&pp=ygURYXp1bWFuZ2EgZGFpb2ggb3A%3D)\n\nSong: Soramimi Cake - Oranges & Lemons\n\nhttps://anilist.co/anime/66/Azumanga-Daioh/\n___\n\n3 - youtube(https://www.youtube.com/watch?v=PvyaVqfylu4&pp=ygUUY2FsbCBvZiB0aGUgbmlnaHQgZWQ%3D)\n\nSong: Yofukasi no Uta - Creepy Nuts\n\nhttps://anilist.co/anime/141391/Call-of-the-Night/\n___\n\n4 - youtube(https://www.youtube.com/watch?v=ZYlaUrj2Zkk)\n\nSong: Idol - Yoasobi\n\nhttps://anilist.co/anime/150672/Oshi-No-Ko\n___\n\n5 - youtube(https://www.youtube.com/watch?v=TyqDOOpJlcA&pp=ygUSeWEgYm95IGtvbmdtaW5nIG9w)\n\nSong: Chitty Chitty Bang Bang - Queendom\n\nhttps://anilist.co/anime/141774/Ya-Boy-Kongming/\n___\n\n6 - youtube(https://www.youtube.com/watch?v=wbQEA_nxLaE)\n\nSong: Distortion - Kessoku Band\n\nhttps://anilist.co/anime/130003/BOCCHI-THE-ROCK/\n___\n\n7 - youtube(https://www.youtube.com/watch?v=9hiTaB9zJFQ&pp=ygUVMTAwIGdpcmxmcmllbmRzIGVkIDEx)\n\nhttps://anilist.co/anime/162694/The-100-Girlfriends-Who-Really-Really-Really-Really-REALLY-Love-You/\n___\n\n8 - youtube(https://www.youtube.com/watch?v=skIBek7JltY)\n\nSong: S.O.S. - Sweet Arms\n\nhttps://anilist.co/anime/116605/Date-A-Live-IV/\n___\n\n9 - youtube(https://www.youtube.com/watch?v=SUw7R1gBWR4&pp=ygUNbHVja3kgc3RhciBvcA%3D%3D)\n\nSong: Motekke Sailor Fuku \n\nhttps://anilist.co/anime/1887/LuckyStar/\n___\n\n10 - youtube(https://www.youtube.com/watch?v=tF4faMbs5oQ&pp=ygUKZHJzdG9uZSBvcA%3D%3D)\n\nSong: Good Morning World - Burnout Syndromes\n\nhttps://anilist.co/anime/105333/Dr-STONE/\n___\nI nominate anyone who wants to do this, just make sure to @ me. Otherwise, if you don't want to do it, or have already done this, feel free to ignore.~~~",
  "_Stan Lee's Stripperella_ is not something I thought would have existed until now.",
  "<center>i love my profile layout rn but i also love to change my profiles up a lot,, i am so conflicted >_<",
  "~~~\n\n# __FAVOURITE__\n#__MANGA / MANHWA COVERS__\n\n![img](https://files.catbox.moe/llewma.png)\n\n#<a>___The Fox Lord's Bride ~ Taisho Romance Chronicles___</a>\n#__VOLUME 1__\n#__By__<a> [__Momono Moto__](https://anilist.co/staff/106113/Momono-Moto)</a>\n\n[![image](https://files.catbox.moe/p4ouhz.jpg)](https://vyvymanga.net/manga/youko-no-dannasama-taisho-hanayome-kitan)\n\n![img](https://files.catbox.moe/ubr7tr.png)\n\n~~~",
  "#~~~Daily Manga Panel #188~~~\nimg(https://i.imgur.com/aTfVcPU.png)",
  "_For archiving purposes, please ignore_\n___\n\n~~~__PAST INITIATIVES__~~~\n\n<a href = \"https://anilist.co/activity/600018345\" ><img src=\"https://otaku-academia-web.firebaseapp.com/images/flavors-of-anime/flavors-of-animanga-banner.png\" border=\"0\" alt=\"The Flavors of Animanga Challenge\" /></a>\n\n<a href = \"https://anilist.co/forum/thread/50836/comment/2517233\"> <img src=\"https://cdn.discordapp.com/attachments/949701069590654976/1194275424906252359/ota-festivity-chevreuse-banner.png\" alt = \"Chevreuse Festivity\" border=\"0\" /> </a>\n\n<a href = \"https://anilist.co/forum/thread/52661/comment/2516254\"><img src=\"https://cdn.discordapp.com/attachments/949701069590654976/1193900145134280784/ota-seishow-misato_fukuen-banner.png\" alt=\"Misato Fukuen Showcase\" border=\"0\"></a>\n\n<a href = \"https://anilist.co/forum/thread/52661/comment/2510990\"><img src=\"https://cdn.discordapp.com/attachments/949701069590654976/1192499767805218826/ota-seishow-ryouka_yuzuki-banner_candace.png\" alt=\"Ryouka Yuzuki Showcase\" border=\"0\"></a>\n\n<a href = \"https://anilist.co/activity/612051686\"> <img src=\"https://cdn.discordapp.com/attachments/969539223512285204/1145012040583352411/ota-hashira_conference.png\" alt=\"Hashira Conference Banner\" border=\"0\" /> </a>\n___\n\n~~~__INCENTIVES__~~~\n\n[ img(https://cdn.discordapp.com/attachments/969539223512285204/1146802351387201606/ota-recognition-rites.png) ](https://anilist.co/activity/614287868)\n\n[__Grading Sheet for Honorable Mentions__](https://docs.google.com/spreadsheets/d/1YzSaDJK4jy_vTzwnd2JXAMMdSvywyPdPLnzkra8TGVw/edit#gid=0)\n\n[__INCENTIVE: SERIES TRADE-OFF__](https://anilist.co/activity/587415448)\n\n[__INCENTIVE: ONEGAI__](https://anilist.co/activity/622022861)\n\n___\n~~~__RESERVED LINKS__\n\n[Otaku Box](https://files.catbox.moe/s366s5.txt) / [Otaku Academia](https://files.catbox.moe/jm1egp.txt) / [2](https://discord.com/channels/1093907539772579981/1107236003598565376/1107236051312988251) / [__Fourth Quadmester__](https://anilist.co/activity/463327364)  / [Legacy Logo](https://cdn.discordapp.com/attachments/969539223512285204/969552049010262036/bio-intro.png)\n\n[Teaser Banners](https://anilist.co/activity/664803894)\n\n[May to June 2023 Grading Sheet](https://docs.google.com/spreadsheets/d/1sG66O-MFzVdwrSq-vD59FLE-XRdBXgehHkaWPqNkTEk/edit?usp=sharing)\n\n~! [June 4 Seishow by Xerx105](https://anilist.co/activity/672680984) !~\n\n___\nimg(https://cdn.discordapp.com/attachments/1093907540359794820/1107241198684471316/ota-logo-with-full-name.png)\n\n__STORAGE ROOM__\n\n~~~\n___",
  "##~~~&#119813;&#119851;&#119848;&#119846; &#119808;&#119849;&#119851;&#119842;&#119845; &#120783;&#120791;-&#120784;&#120791;, &#119827;&#119848;&#119844;&#119858;&#119848; &#119856;&#119842;&#119845;&#119845; &#119841;&#119848;&#119852;&#119853; &#119853;&#119856;&#119848; &#119836;&#119848;&#119847;&#119836;&#119854;&#119851;&#119851;&#119838;&#119847;&#119853; &#119829;&#119842;&#119847;&#119845;&#119834;&#119847;&#119837; &#119826;&#119834;&#119840;&#119834; &#119853;&#119841;&#119838;&#119834;&#119853;&#119851;&#119842;&#119836;&#119834;&#119845; &#119849;&#119851;&#119848;&#119837;&#119854;&#119836;&#119853;&#119842;&#119848;&#119847;&#119852;.~~~\n## ~~~&#119822;&#119847;&#119838; &#119849;&#119845;&#119834;&#119858; &#119856;&#119842;&#119845;&#119845; &#119839;&#119848;&#119836;&#119854;&#119852; &#119848;&#119847; &#119827;&#119841;&#119848;&#119851;&#119839;&#119842;&#119847;&#119847;, &#119853;&#119841;&#119838; &#119848;&#119853;&#119841;&#119838;&#119851; &#119848;&#119847; &#119810;&#119834;&#119847;&#119854;&#119853;&#119838;, &#119834;&#119847;&#119837; &#119838;&#119834;&#119836;&#119841; &#119856;&#119842;&#119845;&#119845; &#119841;&#119834;&#119855;&#119838; &#119838;&#119842;&#119840;&#119841;&#119853; &#119849;&#119838;&#119851;&#119839;&#119848;&#119851;&#119846;&#119834;&#119847;&#119836;&#119838;&#119852;.~~~\n## ~~~&#119827;&#119841;&#119838; &#119836;&#119834;&#119852;&#119853; &#119839;&#119838;&#119834;&#119853;&#119854;&#119851;&#119838;&#119852; &#119826;&#119841;&#119848;&#119841;&#119838;&#119842; &#119815;&#119834;&#119852;&#119841;&#119842;&#119846;&#119848;&#119853;&#119848; &#119834;&#119852; &#119827;&#119841;&#119848;&#119851;&#119839;&#119842;&#119847;&#119847;, [&#119825;&#119858;&#119848; &#119818;&#119842;&#119853;&#119834;&#119846;&#119854;&#119851;&#119834;](https://anilist.co/staff/128201/Kitamura-Ryou) &#119834;&#119852; &#119810;&#119834;&#119847;&#119854;&#119853;&#119838;, &#119826;&#119838;&#119842;&#119843;&#119842;&#119851;&#119848; &#119821;&#119834;&#119844;&#119834;&#119846;&#119854;&#119851;&#119834; &#119834;&#119852; &#119827;&#119841;&#119848;&#119851;&#119852;, &#119834;&#119847;&#119837; &#119827;&#119834;&#119844;&#119838;&#119852;&#119841;&#119842; &#119815;&#119834;&#119858;&#119834;&#119852;&#119841;&#119842;&#119847;&#119848; &#119834;&#119852; &#119827;&#119841;&#119848;&#119851;&#119844;&#119838;&#119845;&#119845;.~~~\n## ~~~&#119808;&#119837;&#119837;&#119842;&#119853;&#119842;&#119848;&#119847;&#119834;&#119845; &#119836;&#119834;&#119852;&#119853; &#119846;&#119838;&#119846;&#119835;&#119838;&#119851;&#119852; &#119841;&#119834;&#119855;&#119838; &#119835;&#119838;&#119838;&#119847; &#119834;&#119847;&#119847;&#119848;&#119854;&#119847;&#119836;&#119838;&#119837; &#119839;&#119848;&#119851; &#119852;&#119838;&#119855;&#119838;&#119851;&#119834;&#119845; &#119848;&#119853;&#119841;&#119838;&#119851; &#119851;&#119848;&#119845;&#119838;&#119852;, &#119842;&#119847;&#119836;&#119845;&#119854;&#119837;&#119842;&#119847;&#119840; &#119809;&#119843;&#119848;&#119851;&#119847;, &#119813;&#119845;&#119848;&#119844;&#119842;, &#119832;&#119845;&#119855;&#119834;, &#119825;&#119834;&#119840;&#119847;&#119834;&#119851;, &#119834;&#119847;&#119837; &#119830;&#119842;&#119845;&#119845;&#119842;&#119835;&#119834;&#119845;&#119837;.~~~\n## ~~~[&#119811;&#119834;&#119842;&#119852;&#119854;&#119844;&#119838; &#119821;&#119842;&#119852;&#119841;&#119842;&#119837;&#119834;](https://anilist.co/staff/147042/Nishida-Daisuke) &#119856;&#119851;&#119848;&#119853;&#119838; &#119853;&#119841;&#119838; &#119853;&#119838;&#119857;&#119853;&#119852; &#119834;&#119847;&#119837; &#119837;&#119842;&#119851;&#119838;&#119836;&#119853;&#119838;&#119837; &#119835;&#119848;&#119853;&#119841; &#119849;&#119845;&#119834;&#119858;&#119852;.~~~\n\n~~~https://anilist.co/manga/30642/Vinland-Saga/\n\n[img(https://cdn.animenewsnetwork.com/thumbnails/max600x600/cms/news.7/206422/vinland.webp) ](https://www.animenewsnetwork.com/news/2024-01-13/vinland-saga-manga-gets-2-stage-plays-in-april/.206422)~~~",
  "#~~~┍━━━━ ༺❀༻ ━━━━┑~~~\n#~~~Good morning ^^~~~\n#~~~┕━━━━ ༺❀༻ ━━━━┙~~~\n\n~~~img330(https://files.catbox.moe/isw775.jpeg)~~~\n\n##~~~┍━━━━━━✿━━━━━━┑~~~\n##~~~[Source](https://www.pixiv.net/en/artworks/60563056)~~~\n##~~~┕━━━━━━✿━━━━━━┙ ~~~"
]

// console.log({markdown: anilistData[15]});

describe('data from user anilist', () => {

  for (const [index, markdown] of anilistData.entries()) {
    test(`user's markdown ${index}`, () => {
      expect(markdown2HTMLCompare(markdown)).toBe(true)
    });
  }

});