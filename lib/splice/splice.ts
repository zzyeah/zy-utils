export interface StrSplice2Array {
  len: number;
  overLen: number;
  overIndex: number; // 真实第几项 9
}

export function strSplice2Array(
  str: string,
  { len, overLen, overIndex }: StrSplice2Array
) {
  const result: string[] = [];
  const length = str.length;
  overIndex--;
  if (length <= len) {
    return [str];
  }

  let indexLen = Math.ceil(length / len); // 总循环长度
  let remainingLen = 0; // 超过长度后的剩余长度
  let remainingIndex = 0; // 剩余的循环次数
  const beforeOverIndex = overIndex - 1;
  if (indexLen > beforeOverIndex) {
    remainingLen = length - len * overIndex;
    remainingIndex = Math.ceil(remainingLen / overLen);
  }
  const pollIndex = remainingIndex
    ? beforeOverIndex + remainingIndex
    : indexLen;
  let end = 0;
  for (let i = 0; i <= pollIndex; i++) {
    let start = end || i * len;
    end = start + len;
    if (i > beforeOverIndex) {
      end = start + overLen;
    }
    result.push(str.slice(start, end));
  }
  return result;
}

export default { strSplice2Array };
