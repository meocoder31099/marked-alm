'use strict';
import type { Hooks, CreateHooksOptions } from './hooks/index.ts';
import extensions from "./extensions/index.ts";
import { createHooks } from "./hooks/index.ts";
import tokenizer from "./tokenizer/index.ts";

interface MarkedAlm {
  extensions: typeof extensions,
  hooks: Hooks,
  tokenizer: typeof tokenizer
}
type CreateMarkedAlm = ({ preprocessOptions, postprocessOptions }: CreateHooksOptions) => MarkedAlm

const markedAlm: CreateMarkedAlm = ({ preprocessOptions, postprocessOptions }) => {
  const hooks = createHooks({ preprocessOptions, postprocessOptions });
  return { extensions, hooks, tokenizer };
}

export { markedAlm }