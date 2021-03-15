---
title: 基本用法
order: 0
---

```jsx
import React from 'react';
import Table from '../index.js';
import dataSource from '../data.js';

const Basic = (props) => {
	const getRowStyle = (row) => {
		return {  };
	};

	const columns = [
		{
			dataIndex: 'name',
			dataName: '人员照片',
			width: 120,
			render(text, record) {
				return text;
			},
		},
		{
			dataIndex: 'idcard',
			dataName: '人员信息',
			render: (text, record) => (
				<div style={{ textAlign: 'left' }}>
					<p style={{ margin: 0, paddingBottom: 6 }}>{record.name}</p>
					<p style={{ margin: 0, paddingBottom: 6 }}>{record.type}</p>
					<p style={{ margin: 0, paddingBottom: 6 }}>{record.idcard}</p>
					<p style={{ margin: 0 }}>{record.emergencyLocation}</p>
				</div>
			),
		},
		{
			dataIndex: 'idcard2',
			dataName: '',
			render(value, row) {
				return (
					<a style={{ color: '#4cb0b0', textAlign: 'right' }} onClick={(e) => goMix(e, row)}>
						分析
					</a>
				);
			},
			width: 50,
		},
	];

	const clickRow = (row) => {
		console.log(`row: `, row);
	};

	return (
		<Table
			style={{ marginTop: 20 }}
			rowKey={(row) => row.uuid}
			rowStyle={(row) => getRowStyle(row)}
			scrollStyle={{ overflow: 'auto' }}
			columns={columns}
			onRow={clickRow}
			dataSource={dataSource}
			width={366}
			height={440}
			length={0}
			speed={5}
		/>
	);
};

ReactDOM.render(<Basic />, mountNode);
```
