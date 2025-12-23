const regex = /(?<first>foo)(?<second>bar)?/d;
const match = regex.exec("foobarfoo");
// console.log(match.groups); // { first: 'foo', second: 'bar' }
// console.log(match.indices); // [ [ 0, 6 ], [ 0, 3 ], [ 3, 6 ] ]

import utils, { strSplice2Array } from "@dist/zy-utils";
import { ZyReplace } from "@lib/_index";
import { SqlCreator } from "@lib/sqlCreator/sqlCreator";
import { DynHtmlPrint } from "./bean/dynHtmlPrint/dynHtmlPrint.bean";
import data from "/HAINAN_MERGEY8_DB_ver.ftl?url&raw";
const arr = utils.strSplice2Array(data, {
  len: 1333,
  overLen: 3999,
  overIndex: 9,
});
// arr.map((item) => console.log(item));
const sqlData: DynHtmlPrint[] = [
  {
    XF_PRODUCT: "TTPOS.DESKTOP",
    XF_DOCTYPE: "SALESINV",
    XF_FORMID: "CN_MERGEY8",
    XF_SYNTAX1: null,
    XF_SYNTAX2: null,
    XF_SYNTAX3: null,
    XF_SYNTAX4: null,
    XF_SYNTAX5: null,
    XF_SYNTAX6: null,
    XF_SYNTAX7: null,
    XF_SYNTAX8: null,
    XF_SYNTAX9: null,
    XF_LASTMODTIME: "2024-11-21 10:50:34.653",
    XF_SYNTAX10: null,
  },
];
arr.forEach((a, i) => {
  let content = a;
  content = new ZyReplace(content).replace(`'`, `''`);
  sqlData[0]["XF_SYNTAX" + (i + 1)] = content;
});

const dataConfig = sqlData[0];
// console.log(dataConfig);

const dbName = "XF_DYNHTMLPRINT";
let result = `INSERT INTO\n ${dbName} `;
Object.keys(dataConfig).forEach((key, i, arr) => {
  if (i === 0) {
    result += `(${key}, `;
    return;
  }
  if (i === arr.length - 1) {
    result += `${key})\nVALUES\n `;
    return;
  }
  result += `${key}, `;
});
Object.values(dataConfig).forEach((value, i, arr) => {
  if (i === 0) {
    result += `(N'${value}', `;
    return;
  }
  if (i === arr.length - 1) {
    result += `N'${new ZyReplace(value).replace(/\n$/, "")}');`;
    return;
  }
  result += `N'${value}', `;
});
