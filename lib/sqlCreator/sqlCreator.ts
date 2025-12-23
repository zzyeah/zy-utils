import { ZyReplace } from "../replace/replace";
// import { createExport } from "../common/decorator/decorator";
import { SqlInsertData } from "./bean/sqlInsertData.bean";

class SqlCreatorBase {
  constructor(opts) {}
  static INSERT(tableName: string, sqlData: SqlInsertData[]) {
    const dataConfig = sqlData[0];
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
    return result;
  }
}

// export const SqlCreator = createExport(SqlCreatorBase);
export const SqlCreator = new SqlCreatorBase({});
// SqlCreatorBase.INSERT("", []);
