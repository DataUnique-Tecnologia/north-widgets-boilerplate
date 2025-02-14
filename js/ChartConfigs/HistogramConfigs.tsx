import { Flex, Form, Select } from 'antd'
import React, { useMemo } from 'react'
import { ColumnsInfoType } from '../types/ColumnsInfoType'
import styled from '@emotion/styled'
import { FaAngleDown } from 'react-icons/fa'
import { ConfigsType } from '../types/ConfigsType'

type FormData = ConfigsType['histogram']

const StyledGroupTitle = styled.h4(() => ({
    margin: '0 0 4px 0'
}))

export default function HistogramConfigs({
    columnsInfo,
    onChange,
    initialValue
}: {
    columnsInfo: ColumnsInfoType
    onChange: (value: FormData) => void
    initialValue?: Partial<FormData>
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

    const handleValuesChange = async () => {
        try {
            const formValues = form.getFieldsValue()
            onChange(formValues);
        } catch (error) { }
    }

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
                initialValues={initialValue??initialValues}
                onValuesChange={handleValuesChange}
            >
                <Flex vertical>
                    <StyledGroupTitle>Eixo X</StyledGroupTitle>
                    <Form.Item initialValue={initialValue?.column} name={'column'} noStyle>
                        <Select
                            suffixIcon={<FaAngleDown />}
                            placeholder="Coluna"
                            options={columnsOptions}
                        />
                    </Form.Item>
                </Flex>
                {/* <Flex justify='space-between' align='center'>
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
                </Flex> */}
            </Form>
        </>
    )
}
