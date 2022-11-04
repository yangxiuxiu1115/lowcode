import React from 'react'
import { ViewNodeType } from '@lowcode/concept'

const materials: ViewNodeType[] = [
  {
    name: 'Button',
    slot: false,
    text: '按钮',
    property: {
      block: {
        type: 'switch',
        value: false,
        label: '将按钮宽度调整为其父宽度的选项',
      },
      danger: {
        type: 'switch',
        value: false,
        label: '设置危险按钮',
      },
      disabled: {
        type: 'switch',
        value: false,
        label: '按钮失效状态',
      },
      shape: {
        type: 'select',
        value: 'default',
        label: '设置按钮形状',
        options: [
          { value: 'default', label: '默认形状' },
          { value: 'round', label: '椭圆形' },
          { value: 'circle', label: '圆形' },
        ],
      },
      size: {
        type: 'select',
        value: 'middle',
        label: '设置按钮大小',
        options: [
          { value: 'middle', label: '默认大小' },
          { value: 'large', label: '偏大' },
          { value: 'small', label: '偏小' },
        ],
      },
      type: {
        type: 'select',
        value: 'default',
        label: '设置按钮类型',
        options: [
          { value: 'primary', label: '主要按钮' },
          { value: 'default', label: '次要按钮' },
          { value: 'ghost', label: '幽灵按钮' },
          { value: 'dashed', label: '虚线按钮' },
          { value: 'link', label: '链接按钮' },
          { value: 'text', label: '文本按钮' },
        ],
      },
    },
  },
  {
    name: 'Divider',
    slot: false,
    text: '分割线',
    property: {
      dashed: {
        type: 'switch',
        value: false,
        label: '是否虚线',
      },
    },
  },
]

const Material = () => {
  return <div>Components</div>
}

export default Material
