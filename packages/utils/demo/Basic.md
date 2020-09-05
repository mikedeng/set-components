---
title: Tree
order: 0
---

默认示例

```jsx
import { Tree } from "../index";

const Utils = () => {
  const treeData = [
			{
				id: 1,
				name: 'name1',
			},
			{
				id: 2,
				name: 'name2',
				children: [
					{
						id: 22,
						name: 'name22',
						children: [
							{
								id: 222,
								name: 'name222',
							},
						],
					},
				],
			},
    ];

const tree =  new Tree(treeData, {valueField: 'id', titleField: 'name', callback(e){ return {...e, disableCheckbox: false }} });
const newTree3 = tree.map((e) => ({ ...e, disableCheckbox: true }));

return  <div>
  tree.data[1].title:  {
    tree.data[1].title
  }
  </div>
}

ReactDOM.render(<Utils />, mountNode);
```
