---
title: 基本用法
order: 0
---

默认示例

```jsx
import React, { Component } from "react";
import FormFactory from "../index";

class FormFactoryDemo extends Component {
  constructor(props) {
    this.searchRef = React.createRef();
  }

  state = {
    personTypes: []
  };

  handlePersonTypeChange = values => {
    console.log(`values: `, values);
    this.setState({ personTypes: values });
  };

  render() {
    const { personTypes } = this.state;
    const searchFormConfig = {
      grid: { xs: 8, sm: 8, md: 8, lg: 8, xl: 6, xxl: 6 },
      formItemWidth: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          xl: { span: 10 },
          xxl: { span: 10 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          xl: { span: 10 },
          xxl: { span: 14 }
        }
      },
      formName: "defectSearchForm"
    };

    const searchForm = [
      {
        type: "Input",
        label: "缺陷线索编号",
        key: "no",
        placeholder: "请输入缺陷编号"
      },
      // {
      //   type: "SelectChange",
      //   label: "产品类别",
      //   key: "productCategory",
      //   placeholder: "请选择",
      //   changeDispatch: "defect/categoryChange",
      //   clearField: "productName",
      //   optionList: selectCataList
      //     ? selectCataList.map(item => {
      //         return { value: item.name, label: item.name };
      //       })
      //     : []
      // },

      {
        type: "Input",
        label: "产品品牌",
        key: "productBrand",
        placeholder: "请选择"
      },
      {
        type: "Input",
        label: "产品名称",
        key: "productName",
        placeholder: "请输入产品名称"
      },
      {
        type: "DatePicker",
        label: "报告时间起",
        key: "reportStartTime",
        placeholder: "请选择日期"
      },
      {
        type: "DatePicker",
        label: "止",
        key: "reportEndTime",
        placeholder: "请选择日期"
      },
      {
        type: "Select",
        label: "生产所属省",
        key: "producerProvinceId",
        placeholder: "请选择",
        optionList: provinceList
          ? provinceList.map(item => {
              return { value: item.id, label: item.name };
            })
          : []
      },
      {
        type: "Select",
        label: "是否伤害",
        key: "hurtWhether",
        placeholder: "请选择",
        optionList: [
          {
            value: "是",
            label: "是"
          },
          {
            value: "否",
            label: "否"
          }
        ]
      },
      {
        type: "Input",
        label: "姓名",
        key: "name",
        placeholder: "请输入名称"
      },
      {
        type: "Input",
        label: "手机",
        key: "telephone",
        placeholder: "请输入手机"
      },
      {
        type: "Input",
        label: "问题描述",
        key: "hurtDesc",
        placeholder: "请输入问题描述"
      },
      {
        type: "Input",
        label: "生产者名称",
        key: "producerName",
        placeholder: "请输入生产者名称"
      },
      {
        type: "Select",
        label: "评估意见",
        key: "evaluateOpinion",
        placeholder: "请选择",
        optionList: [
          {
            value: "通过",
            label: "通过"
          },
          {
            value: "不通过",
            label: "不通过"
          }
        ]
      },
      {
        type: "MulSelect",
        label: "状态",
        key: "statusId",
        placeholder: "请选择",
        optionList: statusDict
          ? statusDict.map(item => {
              return { value: item.id, label: item.name };
            })
          : []
      },
      {
        type: "Input",
        label: "会商编号",
        key: "informationNum",
        placeholder: "请输入会商编号"
      },
      {
        type: "MulSelect",
        label: "来源",
        key: "departmentId",
        placeholder: "请选择",
        optionList: department
          ? department.map(item => {
              return { value: item.id, label: item.name };
            })
          : []
      },
      {
        type: "Select",
        label: "是否重复",
        key: "repeat",
        placeholder: "请选择",
        optionList: [
          {
            value: true,
            label: "是"
          },
          {
            value: false,
            label: "否"
          }
        ]
      },
      {
        type: "Input",
        label: "故障标签",
        placeholder: "请输入故障标签",
        key: "faultTags"
      },
      {
        type: "Select",
        label: "故障等级",
        key: "faultLevel",
        placeholder: "请选择",
        optionList: [
          {
            value: "高",
            label: "高"
          },
          {
            value: "较高",
            label: "较高"
          },
          {
            value: "中",
            label: "中"
          },
          {
            value: "较低",
            label: "较低"
          },
          {
            value: "低",
            label: "低"
          }
        ]
      }
    ];

    const btnList = [
      {
        label: "重置",
        type: "",
        bindFuction: form => {
          form.resetFields();
          dispatch({
            type: "defect/clearCond"
          }).then(() => this.getDefectList());
        }
      },
      {
        label: "查询",
        type: "primary",
        bindFuction: form => {
          form.validateFields((errors, values) => {
            dispatch({
              type: "defect/setDefectConf",
              payload: Object.assign({}, values, {
                currentPage: 1,
                pageSize: 10
              })
            }).then(() => this.getDefectList());
          });
        }
      }
    ];

    return (
      <div style={{ width: 300 }}>
        <FormFactory
          formBasicConfig={searchFormConfig}
          renderForm={searchForm}
          btnList={btnList}
          ref={this.searchRef}
        />
      </div>
    );
  }
}

ReactDOM.render(<FormFactoryDemo />, mountNode);
```
