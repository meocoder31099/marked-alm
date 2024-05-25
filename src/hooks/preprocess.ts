'use strict';
import type { PreprocessOptions } from './index.ts';
import { uniqueId } from '../utils/index.ts';

export interface Youtube {
  type: 'youtube';
  selector: string;
  youtube: {
    id: string;
  };
  renderer?: string
}

export interface User {
  type: 'user';
  user: {
    username: string;
  };
  renderer?: string
}

export interface Video {
  type: 'video';
  selector: string;
  video: {
    src: string;
  };
  renderer?: string
}

function preprocess(this: PreprocessOptions, markdown: string): string {
  markdown = markdown.replace(
    /(http)(:([\/|.|\w|\s|-])*\.(?:jpg|.jpeg|gif|png|mp4|webm))/gi,
    '$1s$2',
  );
  // Image parser
  markdown = markdown.replace(
    /img\s?(\d+%?)?\s?\((.[\S]+)\)/gi,
    //   (_, $1, $2) => {
    //     const target = `image_${$2}`;
    //     childrenComponents.push({
    //       type: "image",
    //       target: `[rel="${target}"]`,
    //       props: { src: $2 },
    //     });
    //     return `<span rel="${target}"></span>`;
    //     // "<img width='$1' src='$2'>"
    //   }
    "<img width='$1' src='$2'>",
  );
  // User info link parser
  markdown = markdown.replace(
    /(^|>| )@([A-Za-z0-9]+)/gm,
    (_, $1, $2) => {
      const data: User = {
        type: 'user',
        user: {
          username: $2
        }
      };
      this?.user?.(data);
      return `${$1}${data?.renderer || `<a target='_blank' href='https://anilist.co/user/${$2}'>@${$2}</a>`}`;
    },
  );
  // Youtube parser
  markdown = markdown.replace(
    /youtube\s?\([^]*?([-_0-9A-Za-z]{10,15})[^]*?\)/gi,
    (_, $1) => {
      const target = uniqueId();
      const data: Youtube = {
        type: 'youtube',
        selector: `[rel="${target}"]`,
        youtube: { id: $1 },
      };
      this?.youtube?.(data);
      return data?.renderer || `<span rel="${target}"></span>`;
    },
  );
  // Video parser
  markdown = markdown.replace(
    /webm\s?\(h?([A-Za-z0-9-._~:\/?#\[\]@!$&()*+,;=%]+)\)/gi,
    (_, $1) => {
      const target = uniqueId();
      const data: Video = {
        type: 'video',
        selector: `[rel="${target}"]`,
        video: { src: `h${$1}` },
      };
      this?.video?.(data);
      return data?.renderer || `<span rel="${target}"></span>`;
    },
  );
  // Preprocessing for center tags
  markdown = markdown.replace(/~{3}([^]*?)~{3}/gm, '+++$1+++');
  // Preprocessing for spoiler block
  markdown = markdown.replace(/~!([^]*?)!~/gm, '<div rel="spoiler">$1</div>');

  return markdown;
}

export default preprocess;
