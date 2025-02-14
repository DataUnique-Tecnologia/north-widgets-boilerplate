import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Button, Col, FloatButton, Row } from "antd";
import { useMemo } from "react";
import ChartConfigs from "./ChartConfigs";
import { ColumnsInfoType } from "./types/ColumnsInfoType";
import { ConfigsType } from "./types/ConfigsType";
import { VegaLite, VisualizationSpec } from 'react-vega'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const render = createRender(() => {
	const [columnsInfo] = useModelState<ColumnsInfoType>('columns_info')
	const [datasource] = useModelState<any[]>('datasource')
	const [modelConfigs, setModelConfigs] = useModelState<ConfigsType>('configs')

	const [isConfigsVisible, setIsConfigsVisible] = React.useState<boolean>(true)

	const [configs, setConfigs] = React.useState<ConfigsType>(modelConfigs)

	React.useEffect(() => {
		if (configs && JSON.stringify(configs) !== JSON.stringify(modelConfigs)) {
			setModelConfigs(configs)
		}
	}, [configs])

	const spec: VisualizationSpec = useMemo(() => {
		const { x_axys, y_axys, histogram, mark, arc } = configs;
		const staticSpec: VisualizationSpec = {
			$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
			mark: {
				type: mark.type,
				tooltip: true,
				point: mark.type === 'line'
			},
			data: { values: datasource }
		};

		if (histogram) {
			const encoding = {
				x: {
					field: histogram.column,
					bin: true
				},
				y: { aggregate: 'count' }
			}
			return {
				...staticSpec,
				encoding
			}
		} else if (arc) {
			const encoding = {
				theta: {
					field: arc.theta,
					stack: 'normalize',
					type: 'quantitative'
				},
				color: { field: arc.group_by }
			}
			return {
				...staticSpec,
				encoding
			}
		}

		const xColumnInfo = columnsInfo.find(col => col.column === x_axys?.column)
		const yColumnInfo = columnsInfo.find(col => col.column === y_axys?.column)
		const isXColumnNumeric = xColumnInfo?.type.includes('float') || xColumnInfo?.type.includes('int')
		const isYColumnNumeric = yColumnInfo?.type.includes('float') || yColumnInfo?.type.includes('int')

		const encoding = {
			x: {
				field: x_axys?.column,
				sort: x_axys?.order_by,
				title: x_axys?.title,
				type: isXColumnNumeric && ['bar', 'line', 'area', 'point'].includes(mark.type)
					? 'quantitative' : undefined
			},
			y: {
				field: y_axys?.column,
				title: y_axys?.title,
				stack: mark.configs.normalized
					? 'normalize' : undefined,
				aggregate: y_axys?.aggregate !== 'none'
					? y_axys?.aggregate : undefined,
				type: isYColumnNumeric && ['bar', 'line', 'area', 'point'].includes(mark.type)
					? 'quantitative' : undefined
			},
			color: {
				field: y_axys?.group_by !== 'none'
					? y_axys?.group_by : undefined
			},
			xOffset: {
				field: y_axys?.group_by !== 'none' && !mark.configs.stacked
					? y_axys?.group_by : undefined
			}
		};

		console.log({ encoding, mark })
		return {
			$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
			mark: {
				type: mark.type,
				point: mark.type === 'line'
			},
			encoding,
			data: { values: datasource }
		};
	}, [configs, datasource]);

	return (
		<div style={{ position: 'relative' }}>
			<Button
				size="small"
				shape="circle"
				style={{
					zIndex: 99,
					position: 'absolute',
					top: isConfigsVisible ? 0 : 5,
					left: isConfigsVisible ? 104 : 5,
					opacity: 0.5
				}}
				icon={isConfigsVisible ? <FaEye /> : <FaEyeSlash />}
				onClick={() => setIsConfigsVisible(!isConfigsVisible)}
			/>
			<Row>
				{
					isConfigsVisible && <Col span={8}>
						<ChartConfigs
							configs={configs}
							setConfigs={setConfigs}
							columnsInfo={columnsInfo}
						/>
					</Col>
				}
				<Col span={16}>
					<VegaLite
						width={400}
						height={400}
						spec={spec}
					/>
				</Col>
			</Row>
		</div>
	);
});

export default { render };
