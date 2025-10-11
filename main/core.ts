let CTABLE: string[] = [];

export function setCTable(table: string[]) {
  CTABLE = table;
}

export function search(kw: string): string[] {
  const ret: string[] = [];
  const chs = kw.split("").filter((item) => !/\s+/.test(item));
  for (let i = 0; i < chs.length; i++) {
    const ch = chs[i];
    for (let j = 0; j < CTABLE.length; j++) {
      const item = CTABLE[j];
      if (item.startsWith(ch)) {
        ret.push(item);
        break;
      }
    }
  }
  return ret;
}
