import nzh from "nzh/cn";

export function renderTableIndex(pageNum, pageSize) {
  return (text, record, index) => {
    const genNumber = Number.parseInt(index, 10) + 1 + (pageNum - 1) * pageSize;
    const newNumber = Number.isNaN(genNumber)
      ? nzh.decodeS(genNumber)
      : genNumber;
    return newNumber.toString();
  };
}