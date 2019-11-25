import React, { Component } from 'react';
import { Select } from 'antd';
import uuidV4 from 'uuid/v4';
import { isArray } from 'util';

const { Option } = Select;

export default class DateFormItem extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const aaa = {
        data: nextProps.value || null,
      };
      return aaa;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      // id: value.id,
    };
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  dataChange = e => {
    // if (e) {
    this.triggerChange(isArray(e) ? e.toString() : null);
    // }
  };

  render() {
    const { config } = this.props;
    const { data } = this.state;
    return (
      <Select
        value={
          // eslint-disable-next-line
          data ? data.split(',').map(item => (!isNaN(item) ? Number.parseInt(item, 10) : item)) : []
        }
        disabled={config.disabled}
        placeholder={config.disabled ? '' : `请选择${config.label}`}
        mode="multiple"
        showArrow
        onChange={e => this.dataChange(e)}
      >
        {isArray(config.optionList) &&
          config.optionList.map(opt => (
            <Option value={opt.value} key={uuidV4()} title={opt.label}>
              {opt.label}
            </Option>
          ))}
      </Select>
    );
  }
}
