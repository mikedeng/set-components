import React, { Component } from "react";
import moment from "moment";
import { DatePicker } from "antd";

export default class DateFormItem extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        data: nextProps.value || null
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  dataChange = e => {
    this.triggerChange(e ? e.format("YYYY-MM-DD") : null);
  };

  render() {
    const { config } = this.props;
    const { data } = this.state;
    return (
      <span>
        <DatePicker
          allowClear={false}
          value={data && moment(data)}
          placeholder={config.disabled ? "" : `请选择${config.label}`}
          style={{ width: "100%" }}
          disabled={config.disabled}
          onChange={e => this.dataChange(e)}
        />
      </span>
    );
  }
}
