import React from "react";
import { Table as DefaultTable } from "antd";
import table from "./table";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

const { createColumns } = table;
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitalColumns(fields) {
    const { extraFields = [] } = this.props;
    return createColumns(fields)
      .enhance(extraFields)
      .values();
  }

  getPagniation() {
    const {
      search = {},
      total = 0,
      onSearch,
      rowKey = "id",
      footer,

      noPage = false,
      pageName = "pageNum",
      pageSizeOptions,
      pagination,
      showTotal = true,
      ...others
    } = this.props;

    const page = search.pageNum ? "pageNum" : pageName;
    const onChange = (pn, psize) => onSearch({ [page]: pn, pageSize: psize });

    let newPagination = noPage
      ? false
      : {
          total,
          current: search[page],
          pageSize: search.pageSize,
          onChange,
          showTotal: showTotal
            ? t => (footer ? footer({ total, ...search }) : `共 ${t} 条`)
            : null
        };

    if (pageSizeOptions && pageSizeOptions.length > 0) {
      newPagination = {
        ...newPagination,
        showSizeChanger: true,
        onShowSizeChange: onChange,
        pageSizeOptions
      };
    }

    return { ...newPagination, ...pagination };
  }

  render() {
    const {
      fields,
      datas,
      loading = {},
      rowKey = "id",
      className,
      checkMode,
      checkControl,
      checkOnClick,
      selectedRowKeys,
      ...others
    } = this.props;

    const columns = this.getInitalColumns(fields);
    const newPagination = this.getPagniation();

    let rowSelection;
    if (checkMode) {
      if (checkMode === "single") {
        rowSelection = {
          onChange: (keys, rows) => {
            const lastKey = keys[keys.length - 1];
            const lastRow = rows.find(e => e.id === lastKey);
            onCheck(...[lastRow]);
          },
          selectedRowKeys,
          type: checkControl || "checkbox",
          columnTitle: " "
        };
      } else if (checkMode === "multiple") {
        rowSelection = {
          onChange: (keys, rows) => {
            onCheck(...rows);
          },
          selectedRowKeys,
          type: "checkbox"
        };
      }
    }

    let onRow;
    if (checkOnClick) {
      onRow = record => {
        return {
          onClick: () => {
            onCheck(record);
          }
        };
      };
    }

    const tableProps = {
      columns,
      bordered: true,
      dataSource: datas,
      loading: loading.list,
      rowKey,
      rowSelection,
      onRow,
      ...others,
      pagination: newPagination
    };

    return (
      <LocaleProvider locale={zh_CN}>
        <DefaultTable {...tableProps} />
      </LocaleProvider>
    );
  }
}
