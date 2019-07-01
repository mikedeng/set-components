---
title: 基本用法
order: 0
---

默认示例

```jsx
import React, { Component } from "react";
import EnityType from "../index";

const personTypesOpts = [
  {
    code: "1",
    name: "testsf",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "101", name: "test01", checked: false },
      { code: "103", name: "test02", checked: false },
      { code: "104", name: "test03", checked: false }
    ],
    children: [
      { code: "101", name: "test01", checked: false },
      { code: "103", name: "test02", checked: false },
      { code: "104", name: "test03", checked: false }
    ],
    subCodes: ["101", "103", "104"]
  },
  {
    code: "2",
    name: "testsk",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "201", name: "test04", checked: false },
      { code: "202", name: "test05", checked: false },
      { code: "203", name: "test06", checked: false }
    ],
    children: [
      { code: "201", name: "test04", checked: false },
      { code: "202", name: "test05", checked: false },
      { code: "203", name: "test06", checked: false }
    ],
    subCodes: ["201", "202", "203"]
  },
  {
    code: "3",
    name: "test07",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "301", name: "testsb", checked: false },
      { code: "302", name: "testsh", checked: false },
      { code: "303", name: "testse", checked: false }
    ],
    children: [
      { code: "301", name: "testsb", checked: false },
      { code: "302", name: "testsh", checked: false },
      { code: "303", name: "testse", checked: false }
    ],
    subCodes: ["301", "302", "303"]
  },
  {
    code: "4",
    name: "testzdx",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "401", name: "testse", checked: false },
      { code: "402", name: "testsh", checked: false },
      { code: "403", name: "testsp", checked: false },
      { code: "404", name: "testsdd", checked: false }
    ],
    children: [
      { code: "401", name: "testse", checked: false },
      { code: "402", name: "testsh", checked: false },
      { code: "403", name: "testsp", checked: false },
      { code: "404", name: "testsdd", checked: false }
    ],
    subCodes: ["401", "402", "403", "404"]
  },
  {
    code: "5",
    name: "testsd",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "501", name: "testsb", checked: false },
      { code: "502", name: "testsq", checked: false },
      { code: "503", name: "testsh", checked: false }
    ],
    children: [
      { code: "501", name: "testsb", checked: false },
      { code: "502", name: "testsq", checked: false },
      { code: "503", name: "testsh", checked: false }
    ],
    subCodes: ["501", "502", "503"]
  },
  {
    code: "6",
    name: "testst",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [
      { code: "601", name: "testsh", checked: false },
      { code: "602", name: "testse", checked: false },
      { code: "603", name: "testsq", checked: false },
      { code: "604", name: "testsb", checked: false },
      { code: "605", name: "testsd", checked: false }
    ],
    children: [
      { code: "601", name: "testsh", checked: false },
      { code: "602", name: "testse", checked: false },
      { code: "603", name: "testsq", checked: false },
      { code: "604", name: "testsb", checked: false },
      { code: "605", name: "testsd", checked: false }
    ],
    subCodes: ["601", "602", "603", "604", "605"]
  },
  {
    code: "7",
    name: "testzs",
    checked: false,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    childDicList: [{ code: "701", name: "testsb", checked: false }],
    children: [{ code: "701", name: "testsb", checked: false }],
    subCodes: ["701"]
  }
];

class CheckTypes extends Component {
  state = {
    personTypes: []
  };

  handlePersonTypeChange = values => {
    console.log(`values: `, values);
    this.setState({ personTypes: values });
   };

  render() {
    const { personTypes } = this.state;

    return (
      <div style={{ width: 300 }}>
        <EnityType
          options={personTypesOpts}
          value={personTypes}
          style={{ marginTop: "8px", width: "100%" }}
          className="checkTypes"
          onChange={values => this.handlePersonTypeChange(values)}
        />
      </div>
    );
  }
}

ReactDOM.render(<CheckTypes />, mountNode);
```
