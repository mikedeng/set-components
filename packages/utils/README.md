---
title: utils 工具类
---

## passwordRule
获取密码 rule

### 入参
| 参数名 | 作用 | 默认值
:--|:--:|---:
| minLen | 最小长度  | 6
| message | 返回值提示信息 | 密码至少 6 位且必需包括字母、数字、特殊字符!

### 返回值
Object: { pattern, message }


## formatDate
格式化日期

| 参数名 | 作用 | 默认值
:--|:--:|:---:
| value | 日期  | 
| format | 格式 | YMDHms
| emptyPlaceholder | 日期为空时的点位符 | ""