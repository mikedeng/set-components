---
title: passwordRule 获取密码 rule
order: 1
---

| 参数名 | 作用 | 默认值
:--|:--:|---:
| minLen | 最小长度  | 6
| message | 返回值提示信息 | 密码至少 6 位且必需包括字母、数字、特殊字符!

返回值
Object: { pattern, message }


```jsx
  import { passwordRule } from "../index";
  const TestPasswordRule = () =>  {
    const rule = passwordRule(6)

    return <div>
    const rule = passwordRule(6)
    <div>
      rule.pattern.test('1234!a'): {
        rule.pattern.test('1234a!').toString()
      }
    </div>
    <div>
      rule.pattern.test('1234ab'): {
          rule.pattern.test('1234ab').toString()
        }
    </div>
    </div>
  }
  
  ReactDOM.render(<TestPasswordRule />, mountNode);
```
