import React, { FC, useEffect, useState } from 'react'

import { Form, InputNumber, Select, Input, Switch, Button } from 'antd'

import { ViewNode } from '@lowcode/concept'
import { antdSetting } from '@lowcode/material'
import type { IProperty } from '@lowcode/material'

import { getNodePath } from '@/utils/index'

import style from './Attribute.module.scss'

interface AttributeProps {
  selectNode: ViewNode
  changeSelectNode: (node?: ViewNode) => void
}
type AttributeType = {
  [key in string]: IProperty
}

const BaseAttributeItem: FC<{ item: IProperty; name: string }> = ({
  item,
  name
}) => {
  return (
    <Form.Item tooltip={item.label} label={name} name={name}>
      {item.type === 'number' ? (
        <InputNumber />
      ) : item.type === 'select' ? (
        <Select>
          {item.options!.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <Input />
      )}
    </Form.Item>
  )
}

const SwitchAttributeItem: FC<{ item: IProperty; name: string }> = ({
  item,
  name
}) => {
  return (
    <Form.Item
      tooltip={item.label}
      label={name}
      name={name}
      valuePropName="checked">
      <Switch defaultChecked={item.value as boolean} />
    </Form.Item>
  )
}

const Attribute: FC<AttributeProps> = ({ selectNode, changeSelectNode }) => {
  const [form] = Form.useForm()
  const [attribute, setAttribute] = useState<AttributeType>({})

  const onFinish = (values: any) => {
    const path = getNodePath(selectNode)
    selectNode.update({ path, content: values })
    changeSelectNode(selectNode)
  }

  useEffect(() => {
    const property = antdSetting.default.find((item) => {
      return (
        selectNode?.parentname === item.parentname &&
        selectNode?.typename === item?.typename
      )
    })!.property
    setAttribute(property)

    const init = {
      ...selectNode.property
    }
    for (const key in property) {
      if (init[key]) {
        continue
      }
      init[key] = property[key].value
    }
    form.setFieldsValue(init)
  }, [selectNode])

  return (
    <div className={style.attribute}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelWrap
        name="property"
        labelAlign="left"
        onFinish={onFinish}>
        {Object.keys(attribute).map((key) => {
          const val = attribute[key]
          return val.type === 'switch' ? (
            <SwitchAttributeItem
              item={val}
              name={key}
              key={`${key}-${val.type}`}
            />
          ) : (
            <BaseAttributeItem
              item={val}
              name={key}
              key={`${key}-${val.type}`}
            />
          )
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Attribute
