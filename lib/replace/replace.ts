export interface ReplaceOptions {
  reg: RegExp | string;
  replace:
    | string
    | ((match: RegExpExecArray[] | RegExpMatchArray) => string | void);
}

export class ZyReplace {
  protected _str: string = "";
  constructor(str: string) {
    if (!str) return;
    this._str = str.toString();
  }

  public replace(
    reg: RegExp | string,
    replaceFn:
      | string
      | ((match: RegExpExecArray[] | RegExpMatchArray) => string | void)
  ) {
    if (!arguments.length) return new ZyReplace(this._str);
    if (reg instanceof RegExp) {
      let matchArr = this.reg2Arr(reg);
      if (replaceFn instanceof Function) {
        const result = replaceFn(matchArr) || "";
        if (typeof result === "string") {
          return new ZyReplace(result);
        }
      } else if (typeof replaceFn === "string") {
        const result = this._str.replace(reg, replaceFn);
        return new ZyReplace(result);
      }
    } else if (typeof reg === "string") {
      if (replaceFn instanceof Function) {
        const result = this._str.match(reg) || [];
        return new ZyReplace(replaceFn(result) || "");
      } else if (typeof replaceFn === "string") {
        const result = this._str.replace(reg, replaceFn);
        return new ZyReplace(result);
      }
    }
    throw new TypeError(
      "replaceFn must be a function or string & reg must be a RegExp or string"
    );
  }

  protected reg2Arr(reg: RegExp) {
    const hasGlobalTag = reg.flags.includes("g");
    if (hasGlobalTag) {
      return Array.from(this._str.matchAll(reg));
    }
    return this._str.match(reg) || [];
  }

  public valueOf() {
    return this._str;
  }

  public toString() {
    return String(this._str);
  }
}
