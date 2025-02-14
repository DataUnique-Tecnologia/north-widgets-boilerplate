import { Collapse, Flex, Form, Input, Select } from 'antd'
import React, { useMemo } from 'react'
import { ColumnsInfoType, ColumnsType } from '../types/ColumnsInfoType'
import styled from '@emotion/styled'
import { FaAngleDown, FaCaretRight } from 'react-icons/fa'
import { ConfigsType } from '../types/ConfigsType'

type FormData = Omit<ConfigsType, 'histogram' | 'mark' | 'arc'>

const StyledCollapse = styled(Collapse)(() => ({
  '.ant-collapse-expand-icon': {
    height: '19px !important'
  },
  '.ant-collapse-header': {
    padding: '0 !important',
    fontSize: 12
  }
}))

const StyledGroupTitle = styled.h4(() => ({
  margin: '0 0 4px 0'
}))

const StyledSubSelect = styled(Select)(() => ({
  minWidth: '80px',
  '.ant-select-selection-item': {
    fontSize: '12px',
    fontWeight: 700
  },

  '.ant-select-selection-placeholder': {
    fontSize: '12px',
    fontWeight: 700
  },
}))

const StyledSubSelectTitle = styled.h6(() => ({
  margin: 0,
  opacity: 0.5,
  fontSize: '12px',
  fontWeight: 700
}))

const StyledSelectLabel = styled.span(() => ({
  fontSize: 12,
  fontWeight: 700
}))

const StyledSelectDesc = styled.span(() => ({
  fontSize: 8
}))

export default function DefaultXYConfigs({
  columnsInfo,
  onChange,
  initialValue
}: {
  columnsInfo: ColumnsInfoType
  onChange: (values: FormData) => void
  initialValue?: Partial<FormData>
}) {

  const [form] = Form.useForm<FormData>()
  const yColumn = Form.useWatch(['y_axys', 'column'])

  const columnsOptions = useMemo(() => {
    return columnsInfo.map(({ column }) => (
      { label: column, value: column }
    ))
  }, [columnsInfo])

  const handleValuesChange = async () => {
      try {
        const formValues = form.getFieldsValue()
        onChange(formValues);
      } catch (error) { }
    }

  const getAggOptions = (type?: ColumnsType) => {
    if (type && ['object', 'str', 'bool'].includes(type)) {
      return [
        {
          label: 'Ausentes',
          value: 'missing',
          desc: "A contagem de valores nulos ou indefinidos do campo."
        },
        {
          label: 'Válidos',
          value: 'valid',
          desc: "A contagem de valores do campo que não são nulos, indefinidos ou NaN."
        },
        {
          label: 'Contagem',
          value: 'count',
          desc: "A contagem total de objetos de dados no grupo."
        },
      ]
    }
    return [
      {
        label: 'Ausentes',
        value: 'missing',
        desc: "A contagem de valores nulos ou indefinidos do campo."
      },
      {
        label: 'Válidos',
        value: 'valid',
        desc: "A contagem de valores do campo que não são nulos, indefinidos ou NaN."
      },
      {
        label: 'Máximo',
        value: 'max',
        desc: "O valor máximo do campo."
      },
      {
        label: 'Mínimo',
        value: 'min',
        desc: "O valor mínimo do campo."
      },
      {
        label: 'Média',
        value: 'mean',
        desc: "A média (valor médio) dos valores do campo."
      },
      {
        label: 'Soma',
        value: 'sum',
        desc: "A soma dos valores do campo."
      },
      {
        label: 'Contagem',
        value: 'count',
        desc: "A contagem total de objetos de dados no grupo."
      },
      {
        label: 'Mediana',
        value: 'median',
        desc: "O valor mediano do campo."
      },
      {
        label: 'Média',
        value: 'average',
        desc: "A média (valor médio) dos valores do campo. Idêntico a 'mean'."
      },
      {
        label: "Distintos",
        value: "distinct",
        desc: "A contagem de valores distintos do campo."
      }
    ]
  }

  const initialValues: FormData = {
    x_axys: {
      column: undefined,
      order_by: 'ascending',
      group_by: 'none'
    },
    y_axys: {
      column: undefined,
      aggregate: 'none',
      group_by: 'none',
    },
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
          <Form.Item initialValue={initialValue?.x_axys?.column} name={['x_axys', 'column']} noStyle>
            <Select
              suffixIcon={<FaAngleDown />}
              placeholder="Coluna"
              options={columnsOptions}
            />
          </Form.Item>
        </Flex>
        <StyledCollapse
          size='small'
          ghost
          expandIcon={({ isActive }) => (
            <FaCaretRight
              size={12}
              style={{ rotate: isActive ? '90deg' : '0deg' }}
            />
          )}
          items={[{
            key: 1,
            children: <Form.Item initialValue={initialValue?.x_axys?.title} name={['x_axys', 'title']} noStyle>
              <Input placeholder='Eixo X' size='small' />
            </Form.Item>,
            label: 'Renomear'
          }]}
        />
        <Flex justify='space-between' align='center'>
          <StyledSubSelectTitle>Ordenação</StyledSubSelectTitle>
          <Form.Item initialValue={initialValue?.x_axys?.order_by} name={['x_axys', 'order_by']} noStyle>
            <StyledSubSelect
              suffixIcon={<FaAngleDown />}
              size='small'
              placeholder='Ordenação'
              variant='borderless'
              options={[
                { label: 'Crescente', value: 'ascending' },
                { label: 'Decrescente', value: 'descending' }
              ]}
            />
          </Form.Item>
        </Flex>
        {/* <Flex justify='space-between' align='center'>
          <StyledSubSelectTitle>Agrupar por</StyledSubSelectTitle>
          <Form.Item name={['x_axys', 'group_by']} noStyle>
            <StyledSubSelect
              suffixIcon={<FaAngleDown />}
              size='small'
              placeholder='Agrupar por'
              variant='borderless'
              options={[
                { label: 'Nenhum', value: undefined },
                ...columnsOptions
              ]}
            />
          </Form.Item>
        </Flex> */}
        <Flex vertical gap={4} style={{ marginTop: '12px' }}>
          <StyledGroupTitle>Eixo Y</StyledGroupTitle>
          <Flex vertical>
            <Form.Item initialValue={initialValue?.y_axys?.column} name={['y_axys', 'column']} noStyle>
              <Select
                suffixIcon={<FaAngleDown />}
                placeholder="Coluna"
                options={columnsOptions}
              />
            </Form.Item>
          </Flex>
          <StyledCollapse
            size='small'
            ghost
            expandIcon={({ isActive }) => (
              <FaCaretRight
                size={12}
                style={{ rotate: isActive ? '90deg' : '0deg' }}
              />
            )}
            items={[{
              key: 1,
              children: <Form.Item initialValue={initialValue?.y_axys?.title} name={['y_axys', 'title']} noStyle>
                <Input placeholder='Eixo Y' size='small' />
              </Form.Item>,
              label: 'Renomear'
            }]}
          />
          <Flex justify='space-between' align='center'>
            <StyledSubSelectTitle>Agregação</StyledSubSelectTitle>
            <Form.Item initialValue={initialValue?.y_axys?.aggregate} name={['y_axys', 'aggregate']} noStyle>
              <StyledSubSelect
                suffixIcon={<FaAngleDown />}
                size='small'
                placeholder='Agregação'
                variant='borderless'
                options={[
                  { label: 'Nenhum', value: 'none' },
                  ...getAggOptions(columnsInfo.find(col =>
                    col.column === yColumn
                  )?.type)
                ]}
                optionRender={({ data, label }) => (
                  <Flex vertical>
                    <StyledSelectLabel>
                      {label}
                    </StyledSelectLabel>
                    <StyledSelectDesc>
                      {data.desc}
                    </StyledSelectDesc>
                  </Flex>
                )}
              />
            </Form.Item>
          </Flex>
          <Flex justify='space-between' align='center'>
            <StyledSubSelectTitle>Agrupar por</StyledSubSelectTitle>
            <Form.Item
              name={['y_axys', 'group_by']}
              initialValue={initialValue?.y_axys?.group_by}
              noStyle
            >
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
        </Flex>
      </Form>
    </>
  )
}

