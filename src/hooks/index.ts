'use strict';
import type { Youtube, User, Video } from './preprocess.ts';
import type { Spoiler, Media } from './postprocess.ts';
import preprocess from './preprocess.ts';
import postprocess from './postprocess.ts';

export type Sanitize = (htmlString: string) => string;
export type YoutubeCallback = (value: Youtube) => void;
export type UserCallback = (value: User) => void;
export type VideoCallback = (value: Video) => void;
export type SpoilerCallback = (value: Spoiler) => void;
export type MediaCallback = (value: Media) => void;
export interface PreprocessOptions {
  youtube?: YoutubeCallback;
  user?: UserCallback,
  video?: VideoCallback;
}
export interface PostprocessOptions {
  sanitize: Sanitize;
  spoiler?: SpoilerCallback,
  media?: MediaCallback;
}
type Preprocess = typeof preprocess;
type Postprocess = typeof postprocess;
export interface Hooks {
  hooks: {
    preprocess: Preprocess;
    postprocess: Postprocess;
  };
}
export interface CreateHooksOptions {
  preprocessOptions: PreprocessOptions;
  postprocessOptions: PostprocessOptions;
}
export type CreateHooks = ({
  preprocessOptions,
  postprocessOptions,
}: CreateHooksOptions) => Hooks;

const createHooks: CreateHooks = ({
  postprocessOptions,
  preprocessOptions,
}) => {
  const preprocessFn: Preprocess = preprocess.bind(preprocessOptions);
  const postprocessFn: Postprocess = postprocess.bind(postprocessOptions);
  return {
    hooks: {
      preprocess: preprocessFn,
      postprocess: postprocessFn,
    },
  };
};

export { createHooks };
