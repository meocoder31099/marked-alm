import markedAnilistParser from "./markedAnilistParser.js";
import markedAlmParser from "./markedAlmParser.js";
import markdown2HTMLCompare from "./markdown2HTMLCompare.js";

// console.log(markedAlmParser('Hello\n== Hello\n=============='));
// console.log(markedAnilistParser('Hello\n== Hello\n=============='));

// console.log({markedAlm: markedAlmParser('---\n***\n-----------------\n******************\n<hr>')});
// console.log({anilist: markedAnilistParser('---\n***\n-----------------\n******************\n<hr>')});

// console.log({markedAlm: markedAlmParser(`# <center>[__100 Days Anime Challenge__](https://anilist.co/forum/thread/65300)\n# <center> Day 1 First anime I ever watched\n<p><center> https://anilist.co/anime/6033/Dragon-Ball-Z-Kai/\nCourtesy of the infamous 4Kids TV. There was also Pokemon and Sonic X, but this is the one that I remember the most.\nIt's not on my list cuz screw that - there's a later question where I can answer with my \"official\" first anime.\n\n<hr>\nThis seems fun, let's see how far I get.\n<hr>\nTemplate\n~!img400(https://i.imgur.com/84tKjQy.png)!~`)});
// console.log({anilist: markedAnilistParser(`# <center>[__100 Days Anime Challenge__](https://anilist.co/forum/thread/65300)\n# <center> Day 1 First anime I ever watched\n<p><center> https://anilist.co/anime/6033/Dragon-Ball-Z-Kai/\nCourtesy of the infamous 4Kids TV. There was also Pokemon and Sonic X, but this is the one that I remember the most.\nIt's not on my list cuz screw that - there's a later question where I can answer with my \"official\" first anime.\n\n<hr>\nThis seems fun, let's see how far I get.\n<hr>\nTemplate\n~!img400(https://i.imgur.com/84tKjQy.png)!~`)});

// console.log({markedAlm: markedAlmParser(`# h1 #h1`)});
// console.log({anilist: markedAnilistParser(`# h1 #h1`)});

// console.log({markedAlm: markedAlmParser(`- hello\n- world`)});
// console.log({anilist: markedAnilistParser(`- hello\n- world`)});

// console.log({markedAlm: markedAlmParser(`* lv1.1\n   1. lv2.1\n      + lv3.1\n       + lv3.2\n   2. lv2.2\n* lv1.2`)});
// console.log({anilist: markedAnilistParser(`* lv1.1\n   1. lv2.1\n      + lv3.1\n       + lv3.2\n   2. lv2.2\n* lv1.2`)});

// console.log({markedAlm: markedAlmParser(`normal **markdown** text\n\n\`\`\`\nsome(code) { markdown(wont**work**here) }\n\`\`\`\n\nmore _normal_ text`)});
// console.log({anilist: markedAnilistParser(`normal **markdown** text\n\n\`\`\`\nsome(code) { markdown(wont**work**here) }\n\`\`\`\n\nmore _normal_ text`)});

// console.log({markedAlm: markedAlmParser('```\nsome(code) { markdown(wont**work**here) }\n```')});
// console.log({anilist: markedAnilistParser('```\nsome(code) { markdown(wont**work**here) }\n```')});

// console.log({markedAlm: markedAlmParser(`> hello\n>> world`)});
// console.log({anilist: markedAnilistParser(`> hello\n>> world`)});

// console.log({markedAlm: markedAlmParser(`~~~<a>__⭑ ★ ⭑ ˗ ˏˋ ❀ ´ˎ ˗ ⭑ ★ ⭑ __</a>~~~ \n~~~__Birthday Post Time__~~~\n~~~<a>__꒷⏝꒷꒦꒷⏝꒷꒦꒷⏝꒷__</a>~~~\n~~~img400(https://files.catbox.moe/hde8wp.png)\nimg400(https://files.catbox.moe/vdi4ct.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517871) By @ACBirthdays~~~\n~~~img400(https://files.catbox.moe/kf30f0.png)\nimg400(https://files.catbox.moe/6skdam.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517873) By @ACBirthdays~~~\n~~~__¡!Happi Happi Birthday both of you!¡__~~~\n~~~<a>•| ⊱✿⊰ |•</a>~~~`)});
// console.log({anilist: markedAnilistParser(`~~~<a>__⭑ ★ ⭑ ˗ ˏˋ ❀ ´ˎ ˗ ⭑ ★ ⭑ __</a>~~~ \n~~~__Birthday Post Time__~~~\n~~~<a>__꒷⏝꒷꒦꒷⏝꒷꒦꒷⏝꒷__</a>~~~\n~~~img400(https://files.catbox.moe/hde8wp.png)\nimg400(https://files.catbox.moe/vdi4ct.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517871) By @ACBirthdays~~~\n~~~img400(https://files.catbox.moe/kf30f0.png)\nimg400(https://files.catbox.moe/6skdam.gif)\n\n[_Thread_ ](https://anilist.co/forum/thread/66854/comment/2517873) By @ACBirthdays~~~\n~~~__¡!Happi Happi Birthday both of you!¡__~~~\n~~~<a>•| ⊱✿⊰ |•</a>~~~`)});

// console.log({markedAlm: markedAlmParser(`~~~<a>__⭑ ★ ⭑ ˗ ˏˋ ❀ ´ˎ ˗ ⭑ ★ ⭑ __</a>~~~`)});
// console.log({anilist: markedAnilistParser(`~~~<a>__⭑ ★ ⭑ ˗ ˏˋ ❀ ´ˎ ˗ ⭑ ★ ⭑ __</a>~~~`)});

// console.log({markedAlm: markedAlmParser(`__hello__ **world** <b>hello</b> <strong>hello</strong>`)});
// console.log({anilist: markedAnilistParser(`__hello__ **world** <b>hello</b> <strong>hello</strong>`)});

// console.log({
//   markedAlm: markedAlmParser('<h2><p align="center">[All days](https://anilist.co/activity/668238059)</p></h2>\n')
// });
// console.log({
//   anilist: markedAnilistParser('<h2><p align="center">[All days](https://anilist.co/activity/668238059)</p></h2>\n')
// });

// console.log({
//     markedAlm: markedAlmParser(`[x]: x

// \\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](`)
// });
// console.log({
//     anilist: markedAnilistParser(`[x]: x

// \\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](\\[\\](`)
// });

// console.log({markedAlm: markedAlmParser('~!meocoder!~')});
// console.log({anilist: markedAnilistParser('~!meocoder!~')});

// console.log({
//   markedAlm: markedAlmParser("webm(http://files.kiniro.uk/video/sonic.webm)"),
// });

export { markedAnilistParser, markedAlmParser, markdown2HTMLCompare };
