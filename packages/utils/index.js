
export function uniqObjInArray(objarray) {
  const len = objarray.length;
  const tempJson = {};
  const res = [];
  for (let i = 0; i < len; i += 1) {
    tempJson[JSON.stringify(objarray[i])] = true;
  }
  const keyItems = Object.keys(tempJson);
  for (let j = 0; j < keyItems.length; j += 1) {
    res.push(JSON.parse(keyItems[j]));
  }
  return res;
}

export function getOptionName(options, value) {
  const { name = "" } = options.find(e => e.code === value?.toString()) || {};
  return name;
}

export * from "./constants";
export * from "./text";
export * from "./getCronOptions";
export * from "./groupByColSpan";
export * from "./Interval";
export * from "./url";
export * from "./message";
export * from "./table";
export * from "./number";
export * from "./options";
export * from "./tree";
