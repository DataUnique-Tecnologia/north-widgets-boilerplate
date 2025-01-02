import { Flex, Form, Select } from 'antd'
import React, { useMemo } from 'react'
import { ColumnsInfoType } from '../types/ColumnsInfoType'
import styled from '@emotion/styled'
import { FaAngleDown } from 'react-icons/fa'
import { debounce } from 'lodash'
import { ConfigsType } from '../types/ConfigsType'

type FormData = ConfigsType['arc']

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

export default function ArcConfigs({
    columnsInfo,
    onChange
}: {
    columnsInfo: ColumnsInfoType
    onChange: (value: FormData) => void
}) {

    const [form] = Form.useForm<FormData>()

    const columnsOptions = useMemo(() => {
        return columnsInfo.map(({ column }) => (
            { label: column, value: column }
        ))
    }, [columnsInfo])

    const thetaColumnsOptions = useMemo(() => {
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
        theta: undefined,
        group_by: undefined
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
                    <StyledGroupTitle>Dados para fatias</StyledGroupTitle>
                    <Form.Item name={'theta'} noStyle>
                        <Select
                            suffixIcon={<FaAngleDown />}
                            placeholder="Coluna"
                            options={thetaColumnsOptions}
                        />
                    </Form.Item>
                </Flex>
                <Flex justify='space-between' align='center'>
                    <StyledSubSelectTitle>Agrupar por</StyledSubSelectTitle>
                    <Form.Item name={'group_by'} noStyle>
                        <StyledSubSelect
                            suffixIcon={<FaAngleDown />}
                            size='small'
                            placeholder='Agrupar por'
                            variant='borderless'
                            options={[
                                { label: 'Nenhum', value: 'none' },
                                ...columnsOptions
                            ]}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </>
    )
}
