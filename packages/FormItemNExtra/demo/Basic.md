---
title: 基本用法
order: 0
---

默认示例

```jsx
import React, { Component } from "react";
import { Form, Input } from "antd";

class TestFormItemNExtra extends Component {
  render() {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue }
    } = this.props;

    const MaxName = 20;
    const MAX300 = 300;

    return (
      <Form style={{ width: 400 }}>
        <Form.Item label="模型名称">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            {getFieldDecorator("name", {
              rules: [{ max: MaxName, message: `输入模型最长为${MaxName}` }],
              initialValue: "1"
            })(<Input placeholder="请输入名称" />)}
            <span style={{ marginLeft: 5 }}>
              {(getFieldValue("name") || "").length}/{MaxName}
            </span>
          </div>
        </Form.Item>

        <Form.Item label="模型简介">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            {getFieldDecorator("profile", {
              rules: [
                { required: true, message: "请输入模型简介!" },
                { max: MAX300, message: `最大长度为${MAX300}` }
              ],
              initialValue: ""
            })(
              <Input.TextArea
                autoSize={{ minRows: 10 }}
                placeholder="请输入模型简介"
                style={{ paddingRight: 75 }}
              />
            )}
            <span style={{ marginLeft: 5 }}>
              {(getFieldValue("profile") || "").length}/{MAX300}
            </span>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const NewForm = Form.create()(TestFormItemNExtra);

ReactDOM.render(<NewForm />, mountNode);
```
