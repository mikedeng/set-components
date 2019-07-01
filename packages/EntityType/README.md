---
title: EnityType
---

Table组件主要是要解决中台业务每个表单页面都会使用antd的table，但相似度极高。所以用一个组件将table包起来，并加入了一些通用的处理逻辑
## 代码演示

## API

### DynamicForm 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| options | 渲染属性 | 是 | array | -- 
| value | 翻页查询操作 | 是 | fun | 无：如果onSearch方法不存在，传了actions，或默认去调用actons.onSearch
| style | 翻页查询操作 | 否 |  object | 无：对象中得包含一个onSearch方法 
| className | 初始化分页 | 是 |  object | { pageSize: 10, pageNo: 1 } 
| onChange | 要渲染的数据 | 是 | array | []
| ... | table其他可设置属性 | 否 | -- | --  