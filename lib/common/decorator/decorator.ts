import fs from "fs";

export enum CreateExportParams {
  ALL = "all",
  CMS = "CommonJS",
  ESM = "ESModule",
}

export function createExport(
  component,
  param: CreateExportParams = CreateExportParams.ALL
){
  console.log(param);

  return (...arg) => {
    const comp = component(...arg);
    if(fs) {
      try {
        fs.readFile(`${__dirname}${component.name}`, () => {});
      } catch (error) {
        console.log(error);
      }
      console.log(arg);
      return comp;  
    }
    else return comp
  };
}
