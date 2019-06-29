import React from "react";
import nzh from "nzh/cn";
import { message } from "antd";
import _ from "lodash";
import { parse, stringify } from "qs";
import VARIABLES from "./variables";

export function getPageQuery() {
  return parse(window.location.href.split("?")[1]);
}

export function getPagePath() {
  return window.location.href.split("?")[0];
}

export function getQueryPath(path = "", query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function Interval(fn, ms) {
  const obj = {
    timer_id: null,
    start() {
      const that = this;
      if (this.timer_id) {
        that.clear();
      }

      fn();
      this.timer_id = setTimeout(() => {
        fn();
        that.start();
      }, ms);
    },
    clear() {
      clearTimeout(this.timer_id);
    }
  };

  return obj;
}

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

export function renderTableIndex(pageNum, pageSize) {
  return (text, record, index) => {
    const genNumber = Number.parseInt(index, 10) + 1 + (pageNum - 1) * pageSize;
    const newNumber = Number.isNaN(genNumber)
      ? nzh.decodeS(genNumber)
      : genNumber;
    return newNumber.toString();
  };
}

export function getOptionName(options, value) {
  const { name = "" } = options.find(e => e.code === value?.toString()) || {};
  return name;
}

export const emptify = (val, placeholder = "--") => {
  return !val ? placeholder : val;
};

export const showMessage = msg => {
  if (!msg) {
    return false;
  }

  message.config({ top: "50%" });
  message.info(msg);
  return true;
};

export const showError = msg => {
  if (!msg) {
    return false;
  }
  message.config({ top: "50%" });
  message.error(msg);
  return true;
};

export const formatLongName = (value, maxLen) => {
  return value?.length > maxLen ? `${value.substring(0, maxLen)}...` : value;
};

export const omitStr = (str, len) => {
  if (!str) {
    return "";
  }

  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }

  return str;
};

export const renderLongName = (value, len) => {
  return (
    <a style={{ color: VARIABLES["@text-secondary-color"] }} title={value}>
      {formatLongName(value, len)}
    </a>
  );
};

export const getCronOptions = () => {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const daysofWeek = _.range(1, 7).map((day, index) => {
    return { value: `* * * * ${day}`, name: `每周${days[index]}` };
  });

  const daysofMonth = _.range(1, 31).map(day => {
    return { value: `* * ${day} * *`, name: `每月${day}日` };
  });

  return [...daysofWeek, ...daysofMonth];
};

export function groupByColSpan(array, size) {
  let lastIndex = 0;
  const groups = array.map((item, index) => {
    const remainCounts = size - (lastIndex % size);
    const span = item.colSpan || 1;
    if (span > remainCounts) {
      lastIndex += remainCounts;
    }

    const _group = Math.floor(lastIndex / size) + 1;
    lastIndex += span;

    return Object.assign(item, { _group });
  });

  const newGroups = _.compact(groups);
  const groupedObj = _.groupBy(newGroups, "_group");
  return Object.keys(groupedObj).map(key => {
    const values = groupedObj[key];
    return values.map(e => {
      delete e._group;
      return e;
    });
  });
}
