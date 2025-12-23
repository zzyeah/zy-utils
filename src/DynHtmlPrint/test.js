"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex = /(?<first>foo)(?<second>bar)?/d;
var match = regex.exec("foobarfoo");
// console.log(match.groups); // { first: 'foo', second: 'bar' }
// console.log(match.indices); // [ [ 0, 6 ], [ 0, 3 ], [ 3, 6 ] ]
var zy_utils_1 = require("@dist/zy-utils");
var _index_1 = require("@lib/_index");
var HAINAN_MERGEY8_DB_ver_ftl_url_raw_1 = require("/HAINAN_MERGEY8_DB_ver.ftl?url&raw");
var arr = zy_utils_1.default.strSplice2Array(HAINAN_MERGEY8_DB_ver_ftl_url_raw_1.default, {
    len: 1333,
    overLen: 3999,
    overIndex: 9,
});
// arr.map((item) => console.log(item));
var sqlData = [
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
arr.forEach(function (a, i) {
    var content = a;
    content = new _index_1.ZyReplace(content).replace("'", "''");
    sqlData[0]["XF_SYNTAX" + (i + 1)] = content;
});
var dataConfig = sqlData[0];
// console.log(dataConfig);
var dbName = "XF_DYNHTMLPRINT";
var result = "INSERT INTO\n ".concat(dbName, " ");
Object.keys(dataConfig).forEach(function (key, i, arr) {
    if (i === 0) {
        result += "(".concat(key, ", ");
        return;
    }
    if (i === arr.length - 1) {
        result += "".concat(key, ")\nVALUES\n ");
        return;
    }
    result += "".concat(key, ", ");
});
Object.values(dataConfig).forEach(function (value, i, arr) {
    if (i === 0) {
        result += "(N'".concat(value, "', ");
        return;
    }
    if (i === arr.length - 1) {
        result += "N'".concat(new _index_1.ZyReplace(value).replace(/\n$/, ""), "');");
        return;
    }
    result += "N'".concat(value, "', ");
});
