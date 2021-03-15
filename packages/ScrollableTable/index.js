import React from 'react';
import classnames from 'classnames';
import Styled from 'styled-components';
import Scroll from './Scroll';

const Table = (props) => {
	const {
		rowKey,
		columns,
		width,
		style,
		dataSource,
		height = 330,
		length = 7,
		speed = 5,
		onRow,
		rowStyle,
		scrollStyle,
	} = props;
	const hasWidthsColumns = columns?.filter((e) => !!e.width);
	const specifiedColumnsWidth = hasWidthsColumns?.reduce((s, c) => {
		return s + c.width;
	}, 0);

	const leftColumns = columns?.length - hasWidthsColumns?.length;
	const leftWidth = width - specifiedColumnsWidth;
	const evenLen = leftColumns && Number.parseInt(leftWidth / leftColumns, 10);

	const clickRow = (row) => {
		if (typeof onRow === 'function') {
			onRow(row);
		}
	};

	return (
		<Container style={{ width, ...style }}>
			<div className="row" style={{ width }}>
				{columns?.map((column) => {
					return (
						<div key={column.dataIndex} style={{ width: column.width ? column.width : evenLen }}>
							{column.dataName}
						</div>
					);
				})}
			</div>
			<ul>
				<Scroll stop={dataSource?.length <= length} height={height} speed={speed} style={{ ...scrollStyle }}>
					{dataSource?.map((item, index) => (
						<li
							className={classnames('row', index % 2 === 0 ? 'even' : 'odd')}
							style={rowStyle && rowStyle(item)}
							key={rowKey(item)}
							onClick={() => clickRow(item)}
						>
							{columns?.map((column) => {
								return (
									<div
										key={column.dataIndex}
										style={{ width: column.width ? column.width : evenLen }}
									>
										{column?.render
											? column.render(item[column.dataIndex], item)
											: item[column.dataIndex]}
									</div>
								);
							})}
						</li>
					))}
				</Scroll>
			</ul>
		</Container>
	);
};

const Container = Styled.div`
  z-index: 1;
  font-size: 14px;

  ul {
    padding-left: 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    /* color: #fff; */
    & > div {
      padding: 5px 8px;
      text-align: center;
    }
  }

  .row:not(:first-of-type) {
    margin-top: 2px;
  }

  .rect {
    // background: url(/rect.png);
    background-position: center;
    background-size: cover;
  }

  .even {
    /* background: #1f2f74; */
  }

  .odd {
    /* background-color: transparent; */
  }

`;

export default Table;
