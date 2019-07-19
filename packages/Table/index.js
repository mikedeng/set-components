import React from "react";
import { Table as DefaultTable } from "antd";
import table from "./table";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

const { createColumns } = table;
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
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

  getSelections = () => {
    let onRow;
    const {
      checkMode,
      selectedRowKeys = [],
      onCheck,
      checkOnClickRow = true
    } = this.props;

    if (checkMode && checkOnClickRow) {
      onRow = record => {
        const primaryKey = this.rowKeyValue(record);

        const newKeys = [...selectedRowKeys];
        const keyIndex = newKeys.findIndex(item => item === primaryKey);

        const { rows } = this.state;
        const newRows = [...rows];

        return {
          onClick: () => {
            if (keyIndex !== -1) {
              const rowIndex = newRows.findIndex(
                item => this.rowKeyValue(item) === primaryKey
              );

              newKeys.splice(keyIndex, 1);
              newRows.splice(rowIndex, 1);

              this.setState({ rows: newRows }, () => {
                onCheck(newKeys, newRows);
              });
            } else {
              if (checkMode === "single") {
                this.setState({ rows: [record] }, () => {
                  onCheck([primaryKey], [record]);
                });
              } else if (checkMode === "multiple") {
                newKeys.push(primaryKey);
                newRows.push(record);
                this.setState({ rows: newRows }, () => {
                  onCheck(newKeys, newRows);
                });
              }
            }
          }
        };
      };
    }

    return onRow;
  };

  rowKeyValue = row => {
    const { rowKey = "id" } = this.props;
    return _.isFunction(rowKey) ? rowKey(row) : row[rowKey];
  };

  render() {
    const {
      fields,
      datas,
      loading = {},
      rowKey = "id",
      checkMode,
      checkControl,
      onCheck,
      selectedRowKeys = [],
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
            const lastRow = rows.find(e => this.rowKeyValue(e) === lastKey);
            this.setState({ rows: [lastRow] }, () => {
              onCheck([lastKey], [lastRow]);
            });
          },
          selectedRowKeys,
          type: checkControl || "checkbox",
          columnTitle: " "
        };
      } else if (checkMode === "multiple") {
        rowSelection = {
          onChange: (keys, rows) => {
            this.setState({ rows }, () => {
              onCheck(keys, rows);
            });
          },
          selectedRowKeys,
          type: "checkbox"
        };
      }
    }

    const onRow = this.getSelections();
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
