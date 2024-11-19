import { ZyPromise } from "./promise/promise";
import { strSplice2Array } from "./splice/_index";
export * from "./splice/_index";
export * from './promise/_index';

const zyUtils = {
  strSplice2Array,
  ZyPromise
};

export default zyUtils;
