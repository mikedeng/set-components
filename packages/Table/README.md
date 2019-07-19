---
title: Table 自定义动态表单组件
---

Table 组件主要是要解决中台业务每个表单页面都会使用 antd 的 table，但相似度极高。所以用  一个组件将 table 包起来，并加入了一些通用的处理逻辑

## 代码演示

## API

### DynamicForm 输入

| 参数名   |       作用       | 必传 |   类型 |                                  默认值                                  |
| :------- | :--------------: | ---: | -----: | :----------------------------------------------------------------------: |
| fields   |     渲染属性     |   是 |  array |                                    --                                    |
| onSearch |   翻页查询操作   |   是 |    fun | 无：如果 onSearch 方法不存在，传了 actions，或默认去调用 actons.onSearch |
| search   |    初始化分页    |   是 | object |                       { pageSize: 10, pageNo: 1 }                        |
| datas    |   要渲染的数据   |   是 |  array |                                    []                                    |
| total    |       总数       |   是 | number |                                    --                                    |
| rowKey   |      主键名      |   否 | string |                                    id                                    |
| loading  |     加载标示     |   否 | object |                   --： 其中含一个 list 属性的 bool 值                    |
| rowKey   |      主键名      |   否 | string |                                    id                                    |
| footer   | 总条数自定义显示 |   否 |    fun |                            t => `共 ${t} 条`                             |
| pageName |    页码属性名    |   否 | string |                pageNo: 除了 pageNo，还对 pageNum 做了兼容                |
| noPage   |   是否显示分页   |   否 |   bool |                                  false                                   |
| checkMode | 选择模式 | 否 | option (single or multiple) | 无 |        |
| checkControl | 选择框的控件 | 否 | option (radio or checkbox) | checkbox |
| onCheck | 选中回调 | 否 | func(keys, rows) | 无 |
| checkOnClickRow | 当点击行时，选中或者取消选中 | 否 | bool | true|
| selectedRowKeys | 选择的行key | 否 | array | false|
| ... | table 其他可设置属性 | 否 | -- | --|
