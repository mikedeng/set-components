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

/*
 @minLen 密码最小长度
 @msg 提示信息
*/
export function passwordRule(minLen = 6, message) {
  return {
    pattern: new RegExp(
      `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\;\'\<\>\?\,\.\/])(?=.{${minLen},})`
    ),
    message: message || `密码至少 ${minLen} 位且必需包括字母、数字、特殊字符!`
  };
}
