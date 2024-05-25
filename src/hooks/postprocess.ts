'use strict';
import type { PostprocessOptions } from './index.ts';
import { uniqueId } from '../utils/index.ts';

export interface Spoiler {
  type: 'spoiler';
  selector: string;
  spoiler: {
    contents: string;
  };
  renderer?: string
}

export interface Media {
  type: 'media';
  selector: string;
  media: {
    id: string;
    type: 'ANIME' | 'MANGA';
  };
  renderer?: string
}

function postprocess(this: PostprocessOptions, htmlString: string): string {
  htmlString = this?.sanitize(htmlString);

  // Center tags parser
  htmlString = htmlString.replace(/\+{3}([^]*?)\+{3}/gm, '<center>$1</center>');
  // Spoiler block parser
  htmlString = htmlString.replace(
    /<div rel="spoiler">([\s\S]*?)<\/div>/gm,
    (_, $1) => {
      const target = uniqueId();
      const data: Spoiler = {
        type: 'spoiler',
        selector: `[rel="${target}"]`,
        spoiler: {
          contents: $1
        }
      };
      this?.spoiler?.(data);
      return data?.renderer || `<p rel="${target}"></p>`;
    },
  );
  // Media parser
  htmlString = htmlString.replace(
    /(?:<a href="https?:\/\/anilist.co\/(anime|manga)\/)([0-9]+).*?>(?:https?:\/\/anilist.co\/(?:anime|manga)\/[0-9]+).*?<\/a>/gm,
    (_, $1, $2) => {
      const target = uniqueId();
      const mediaType = $1 === 'anime' ? 'ANIME' : 'MANGA';
      const data: Media = {
        type: 'media',
        selector: `[rel="${target}"]`,
        media: { type: mediaType, id: $2 },
      };
      this?.media?.(data);
      return data?.renderer || `<span rel="${target}"></span>`;
    },
  );
  return htmlString;
}

export default postprocess;
