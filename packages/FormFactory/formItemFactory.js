import React, { Component, Fragment } from "react";
import { Form, Input, Select, Radio, InputNumber } from "antd";
import uuidV4 from "uuid/v4";
// import { Array.isArray } from "util";
import Debounce from "lodash-decorators/debounce";
import Bind from "lodash-decorators/bind";
import UploadFormItem from "./uploadFormItem";
import DateFormItem from "./dateFormItem";
import MulSelect from "./MulSelect";
// import downLoad from "@/utils/download";
// import Authorized from "@/utils/Authorized";

const { Item } = Form;
const { Option } = Select;
const { Group } = Radio;
const { TextArea } = Input;

class FormItemFactory extends Component {
  @Bind()
  @Debounce(200)
  onSelectRemote(e) {
    const { config } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: config.dispatchPath,
      payload: {
        key: config.key,
        value: e
      }
    });
  }

  renderByType = config => {
    const { setFieldsValue, getFieldValue, dispatch } = this.props;
    let formItem;
    const inputPlaceholder = config.disabled ? "" : `请填写${config.label}`;
    const selectPlaceholder = config.disabled ? "" : `请选择${config.label}`;

    switch (config.type) {
      case "Input":
        formItem = (
          <Input placeholder={inputPlaceholder} disabled={config.disabled} />
        );
        break;
      case "TextArea":
        formItem = (
          <TextArea
            placeholder={inputPlaceholder}
            disabled={config.disabled}
            autosize
          />
        );
        break;
      case "InputNumber":
        formItem = (
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder={inputPlaceholder}
            disabled={config.disabled}
          />
        );
        break;
      case "Select":
        formItem = (
          <Select
            disabled={config.disabled}
            placeholder={selectPlaceholder}
            mode={config.mode}
            showArrow
          >
            {Array.isArray(config.optionList) &&
              config.optionList.map(opt => (
                <Option value={opt.value} key={uuidV4()}>
                  {opt.label}
                </Option>
              ))}
          </Select>
        );
        break;

      case "MulSelect":
        formItem = <MulSelect config={config} />;
        break;

      case "SelectChange":
        formItem = (
          <Select
            disabled={config.disabled}
            placeholder={selectPlaceholder}
            onChange={e => {
              dispatch({
                type: config.changeDispatch,
                payload: {
                  key: e
                }
              });
              if (config.clearField) {
                setFieldsValue({
                  [config.clearField]: null
                });
              }
            }}
          >
            {Array.isArray(config.optionList) &&
              config.optionList.map(opt => (
                <Option value={opt.value} key={uuidV4()}>
                  {opt.label}
                </Option>
              ))}
          </Select>
        );
        break;

      case "SelectRemote":
        formItem = (
          <Select
            showSearch
            defaultActiveFirstOption={false}
            placeholder={selectPlaceholder}
            notFoundContent={null}
            filterOption={false}
            disabled={config.disabled}
            onSearch={e => this.onSelectRemote(e)}
            onChange={e => {
              if (config.onChangeEvent) {
                config.onChangeEvent(setFieldsValue, e);
              }
            }}
          >
            {Array.isArray(config.optionList) &&
              config.optionList.map(opt => (
                <Option value={opt.value} key={uuidV4()}>
                  {opt.label}
                </Option>
              ))}
          </Select>
        );
        break;
      case "DatePicker":
        formItem = <DateFormItem config={config} />;
        break;
      case "RadioGroup":
        formItem = (
          <Group>
            {Array.isArray(config.optionList) &&
              config.optionList.map(opt => (
                <Radio
                  value={opt.value}
                  key={uuidV4()}
                  disabled={config.disabled}
                >
                  {opt.label}
                </Radio>
              ))}
          </Group>
        );
        break;
      case "Upload":
        formItem = (
          <UploadFormItem
            disabled={config.disabled}
            config={config}
            dispatch={dispatch}
          />
        );
        break;
      case "LinkFun":
        formItem = (
          <a onClick={() => config.execFun(getFieldValue(config.key))}>
            {getFieldValue(config.key)}
          </a>
        );
        break;
      case "Files": {
        const valueStr = getFieldValue(config.key);
        // console.log(valueStr);
        let values = [];
        try {
          values = valueStr ? JSON.parse(valueStr) : [];
        } catch (err) {
          console.log(err);
        }

        formItem = (
          <Fragment>
            {Array.isArray(values) &&
              values.map((item, index) => (
                <div key={uuidV4()}>
                  {values.length > 1 && `${index + 1}.`}
                  {item.viewFileName}
                  {/* <Authorized authority="b_download"> */}
                  {/* <a
                    onClick={() =>
                      downLoad("/attachment/download", {
                        newData: item.newData,
                        filePathPrefix: item.filePath,
                        fileSuffix: item.fileSuffix,
                        realFileName: item.realFileName,
                        viewFileName: item.viewFileName
                      })
                    }
                    style={{ marginLeft: 20 }}
                  >
                    下载
                  </a> */}
                  {/* </Authorized> */}
                </div>
              ))}
          </Fragment>
        );
        break;
      }

      default:
        formItem = <Input placeholder={inputPlaceholder} />;
    }

    return formItem;
  };

  render() {
    const { getFieldDecorator, config } = this.props;
    if (config.layout) {
      return (
        <Item label={config.label} {...config.layout.formItemWidth}>
          {getFieldDecorator(`${config.key}`, {
            rules: config.rules || [],
            initialValue: config.initialValue
          })(this.renderByType(config))}
        </Item>
      );
    }
    return (
      <Item label={config.label}>
        {getFieldDecorator(`${config.key}`, {
          rules: config.rules || [],
          initialValue: config.initialValue
        })(this.renderByType(config))}
      </Item>
    );
  }
}

export default FormItemFactory;
