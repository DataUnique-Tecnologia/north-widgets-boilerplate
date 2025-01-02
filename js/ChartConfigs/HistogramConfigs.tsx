import { Flex, Form, Select } from 'antd'
import React, { useMemo } from 'react'
import { ColumnsInfoType } from '../types/ColumnsInfoType'
import styled from '@emotion/styled'
import { FaAngleDown } from 'react-icons/fa'
import { debounce } from 'lodash'
import { ConfigsType } from '../types/ConfigsType'

type FormData = ConfigsType['histogram']

const StyledGroupTitle = styled.h4(() => ({
    margin: '0 0 4px 0'
}))

const StyledSubSelect = styled(Select)(() => ({
    '.ant-select-selection-item': {
        fontSize: '12px',
        fontWeight: 700
    },

    '.ant-select-selection-placeholder': {
        fontSize: '12px',
        fontWeight: 700
    }
}))

const StyledSubSelectTitle = styled.h6(() => ({
    margin: 0,
    opacity: 0.5,
    fontSize: '12px',
    fontWeight: 700
}))

export default function HistogramConfigs({
    columnsInfo,
    onChange
}: {
    columnsInfo: ColumnsInfoType
    onChange: (value: FormData) => void
}) {

    const [form] = Form.useForm<FormData>()

    const columnsOptions = useMemo(() => {
        return columnsInfo.flatMap(({ column, type }) => {
            if (['int', 'float', 'int8', 'int16', 'int32', 'int64',
                'float16', 'float32', 'float64', 'datetime64[ns]',
                'timedelta64[ns]'].includes(type)) {
                return [{ label: column, value: column }]
            }
            return []
        })
    }, [columnsInfo])

    const handleValuesChange = useMemo(() => (
		debounce(async () => {
			try {
				const formValues = form.getFieldsValue()
				onChange(formValues);
			} catch (error) { }
		}, 1500)
	), [])

    const initialValues: FormData = {
        column: undefined,
        format: 'count',
        bin_by: 'auto'
    };

    return (
        <>
            <Form
                form={form}
                layout='vertical'
                initialValues={initialValues}
                onValuesChange={handleValuesChange}
            >
                <Flex vertical>
                    <StyledGroupTitle>Eixo X</StyledGroupTitle>
                    <Form.Item name={'column'} noStyle>
                        <Select
                            suffixIcon={<FaAngleDown />}
                            placeholder="Coluna"
                            options={columnsOptions}
                        />
                    </Form.Item>
                </Flex>
                <Flex justify='space-between' align='center'>
                    <StyledSubSelectTitle>Agrupar por intervalos</StyledSubSelectTitle>
                    <Form.Item name={'bin_by'} noStyle>
                        <StyledSubSelect
                            suffixIcon={<FaAngleDown />}
                            size='small'
                            placeholder='Agrupar por intervalos'
                            variant='borderless'
                            options={[
                                { label: 'Automático', value: 'auto' },
                                { label: 'Tamanho do intervalo', value: 'step_size' },
                                { label: 'Máximo de intervalos', value: 'max_bins' },
                            ]}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </>
    )
}
