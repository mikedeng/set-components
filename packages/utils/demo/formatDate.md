---
title: formatDate 格式化日期
order: 2
---

格式化日期

| 参数名 | 作用 | 默认值
:--|:--:|:---:
| value | 日期  | 
| format | 格式 | YMDHms
| emptyPlaceholder | 日期为空时的点位符 | ""


```jsx
  import { formatDate, YMD, YMDHms } from "../index";
  import moment from "moment";
  const TestFormatDate = () =>  {

    return <div>
    <div>
      formatDate(moment()): {
        formatDate(moment())
      }
    </div>
    <div>
      formatDate(moment(), YMD): {
        formatDate(moment(), YMD)
      }
    </div>
    <div>
      formatDate(moment(), YMDHms): {
        formatDate(moment(), YMDHms)
      }
    </div>
    </div>
  }
  
  ReactDOM.render(<TestFormatDate />, mountNode);
```
