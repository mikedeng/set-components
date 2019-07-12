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
