import { ZyPromise } from "./promise/promise";
import { ZyReplace } from "./replace/replace";
import { strSplice2Array } from "./splice/_index";
import { SqlCreator } from "./sqlCreator/sqlCreator";

export * from "./splice/_index";
export * from "./promise/_index";
export * from "./replace/_index";
export * from "./common/_index";
export * from "./event/_index";

const zyUtils = {
  strSplice2Array,
  ZyPromise,
  ZyReplace,
  SqlCreator,
};

export default zyUtils;
