import React from "react";
import moment from "moment";
import { YMDHms } from "./constants";
import VARIABLES from "./variables";

export function formatDate(value, format = YMDHms, emptyPlaceholder = "") {
  if (!value) {
    return emptyPlaceholder;
  }

  const newVal = moment(value);
  if (!newVal.isValid()) {
    return emptyPlaceholder;
  }

  return newVal.format(format);
}

export function formatLongName(value, maxLen, omitSign = "...") {
  return value?.length > maxLen
    ? `${value.substring(0, maxLen)}${omitSign}`
    : value;
}

export function renderLongName(value, len) {
  return (
    <a style={{ color: VARIABLES["@text-secondary-color"] }} title={value}>
      {formatLongName(value, len)}
    </a>
  );
}

export function emptify(val, placeholder = "--") {
  return !val ? placeholder : val;
}

export function omitStr(str, len) {
  if (!str) {
    return "";
  }

  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }

  return str;
}
