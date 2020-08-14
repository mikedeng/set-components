---
title: Single Check
order: 0
---

默认示例

```jsx
import React from "react";
import { Popconfirm } from "antd";
import EnhanceTable from "../index.js";

const userStatus = [
  {
    value: 1,
    label: "启用"
  },
  {
    value: 0,
    label: "禁用"
  }
];

const fields = [
  {
    key: "userName",
    name: "真实姓名"
  },
  {
    key: "userId",
    name: "用户ID"
  },
  {
    key: "property",
    name: "资产(万)",
    type: "decimal"
  },
  {
    key: "addtime",
    name: "加入时间",
    type: "date"
  },
  {
    key: "status",
    name: "状态",
    enums: userStatus
  }
];

const forkDatas = [
  {
    id: 1,
    userName: "Dom",
    userId: "mike",
    property: 4564384,
    addtime: Date.now(),
    status: 0
  },
  {
    id: 2,
    userName: "Simon",
    userId: "simona",
    property: 123456,
    addtime: Date.now(),
    status: 1
  }
];

class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      selectedRowKeys: []
    };
  }
  getExtraFields() {
    return [
      {
        key: "operate",
        name: "操作",
        width: 180,
        fixed: "right",
        render: (text, detail) => (
          <div>
            <a
              onClick={() => {
                this.handleOperate("update", detail);
              }}
            >
              修改
            </a>
            <Popconfirm
              title="确认删除？"
              onConfirm={() => {
                this.handleOperate("delete", detail);
              }}
            >
              <a style={{ marginLeft: 10 }}>删除</a>
            </Popconfirm>
          </div>
        )
      }
    ];
  }

  render() {
    const { pageNum, pageSize, selectedRowKeys } = this.state;
    const forkProps = {
      fields,
      onSearch: ({ pageNum, pageSize }) => this.setState({ pageNum, pageSize }),
      search: { pageNum, pageSize },
      datas: forkDatas,
      extraFields: this.getExtraFields(),
      showTotal: false,
      checkMode: "single",
      onCheck: (keys, values) => {
        this.setState({ selectedRowKeys: keys });
      },
      selectedRowKeys
    };

    return (
      <div>
        <EnhanceTable
          {...forkProps}
          pageSizeOptions={["3", "10", "20"]}
          total={100}
        />
      </div>
    );
  }
}
ReactDOM.render(<Basic />, mountNode);
```
