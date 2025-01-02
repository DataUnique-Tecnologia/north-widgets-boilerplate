import { Divider, Flex, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { MdBarChart, MdStackedBarChart, MdAreaChart, MdScatterPlot, MdPieChart, MdSsidChart } from 'react-icons/md'
import { ColumnsInfoType } from '../types/ColumnsInfoType'
import { ChartType, VegaChartType } from '../types/ChartTypes'
import DefaultXYConfigs from './DefaultXYConfigs'
import HistogramConfigs from './HistogramConfigs'
import { ConfigsType } from '../types/ConfigsType'
import ArcConfigs from './ArcConfigs'

export default function ChartConfigs({
    columnsInfo,
    setConfigs
}: {
    columnsInfo: ColumnsInfoType
    setConfigs: Dispatch<SetStateAction<ConfigsType>>
}) {
    const [chartType, setChartType] = useState<ChartType>('bar')

    const chartOptions: DefaultOptionType[] = [
        {
            label: 'Gráfico de barras',
            value: 'bar',
        },
        {
            label: 'Gráfico de barras empilhadas',
            value: 'stacked_bar',
        },
        {
            label: 'Gráfico de barras empilhadas 100%',
            value: 'normalized_stacked_bar',
        },
        {
            label: 'Gráfico de área',
            value: 'stacked_area',
        },
        {
            label: 'Gráfico de área 100%',
            value: 'normalized_stacked_area',
        },
        {
            label: 'Gráfico de linha',
            value: 'line',
        },
        {
            label: 'Gráfico de dispersão',
            value: 'point',
        },
        {
            label: 'Gráfico de pizza',
            value: 'arc',
        },
        {
            label: 'Histograma',
            value: 'histogram_bar',
        },
    ]

    const renderChartLabels = ({ value, label }: DefaultOptionType) => {
        switch (value as ChartType) {
            case 'bar':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdBarChart />
                    </div>
                    {label}
                </Flex>
            case 'stacked_bar':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdStackedBarChart />
                    </div>
                    {label}
                </Flex>
            case 'normalized_stacked_bar':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdStackedBarChart />
                    </div>
                    {label}
                </Flex>
            case 'stacked_area':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdAreaChart />
                    </div>
                    {label}
                </Flex>
            case 'normalized_stacked_area':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdAreaChart />
                    </div>
                    {label}
                </Flex>
            case 'point':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdScatterPlot />
                    </div>
                    {label}
                </Flex>
            case 'arc':
                return <Flex align="end" gap={2}>
                    <div>
                        <MdPieChart />
                    </div>
                    {label}
                </Flex>
            case 'histogram_bar':
                return <Flex align="end" gap={2}>
                    <div>
                        <BiBarChartAlt2 />
                    </div>
                    {label}
                </Flex>
            case 'line':
                return <Flex align="end" gap={4}>
                    <div>
                        <MdSsidChart />
                    </div>
                    {label}
                </Flex>
        }
    }

    const handleChangeChartType = (value: ChartType) => {
        setChartType(value)

        const markType = value.split('_').at(-1) as VegaChartType
        const isNormalized = ['bar', 'area'].includes(markType) && value.toLowerCase().includes('normalized')
        const isStacked = markType !== 'bar' || value.toLowerCase().includes('stacked')
        const isHistogram = value.includes('histogram')

        const mark = {
            type: markType,
            configs: { normalized: isNormalized, stacked: isStacked }
        }

        setConfigs(prev => {
            if (isHistogram) {
                return {
                    mark,
                    histogram: {
                        bin_by: 'auto',
                        format: 'count'
                    }
                }
            } else if (markType === 'arc') {
                return {
                    mark,
                    arc: { group_by: 'none' }
                }
            }

            return ({
                ...prev,
                mark
            })
        })
    }

    return (
        <>
            <h4 style={{ marginBlock: '4px' }}>
                Tipo de gráfico
            </h4>
            <Select
                placeholder={'Tipo de gráfico'}
                value={chartType}
                options={chartOptions}
                style={{ width: '100%' }}
                labelRender={renderChartLabels}
                optionRender={renderChartLabels}
                onChange={handleChangeChartType}
            />
            <Divider />
            {
                chartType === 'histogram_bar'
                    ? <HistogramConfigs
                        onChange={(value) => {
                            setConfigs(prev => ({
                                ...prev,
                                histogram: value,
                                arc: undefined,
                                x_axys: undefined,
                                y_axys: undefined,
                            }))
                        }}
                        columnsInfo={columnsInfo}
                    />
                    : chartType === 'arc'
                        ? <ArcConfigs
                            onChange={(value) => {
                                setConfigs(prev => ({
                                    ...prev,
                                    arc: value,
                                    histogram: undefined,
                                    x_axys: undefined,
                                    y_axys: undefined,
                                }))
                            }}
                            columnsInfo={columnsInfo}
                        />
                        : <DefaultXYConfigs
                            onChange={(value) => {
                                setConfigs(prev => ({
                                    ...prev,
                                    ...value,
                                    arc: undefined,
                                    histogram: undefined
                                }))
                            }}
                            columnsInfo={columnsInfo}
                        />
            }

        </>
    )
}
