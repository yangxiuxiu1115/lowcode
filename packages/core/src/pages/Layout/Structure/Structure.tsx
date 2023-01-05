import React, { FC, useEffect, useRef, useState, ComponentType } from 'react'
import { Menu, MenuProps } from 'antd'

import {
  BarChartOutlined,
  FileOutlined,
  ApartmentOutlined
} from '@ant-design/icons'

import { ViewNode } from '@lowcode/concept'

import style from './Structure.module.scss'
import Material from './Material/Material'

const items: MenuProps['items'] = [
  {
    label: 'Outline Tree',
    icon: <FileOutlined />,
    key: '1'
  },
  {
    key: '2',
    label: '组件库',
    icon: <ApartmentOutlined />
  },
  {
    key: '3',
    label: '源码面板',
    icon: <BarChartOutlined />
  }
]
interface ICache {
  [key: string]: ComponentType<
    { hidden: boolean; resetMenu: () => void } & IStructureProps
  >
}

const componentMap: ICache = {
  2: Material
}

interface IStructureProps {
  selectNode?: ViewNode
  changeSelectNode: (node?: ViewNode) => void
}

const Structure: FC<IStructureProps> = ({ selectNode, changeSelectNode }) => {
  const [selectKey, setSelectKey] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [cache, setCache] = useState<ICache>({})
  const structureRef = useRef<HTMLDivElement>(null)

  const resetMenu = () => {
    setSelectKey('')
    setSelectedKeys([])
  }

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el && structureRef.current?.contains(el)) {
        return
      }
      if (selectKey) {
        resetMenu()
      }
    }
    document.addEventListener('click', handle)
    return () => {
      document.removeEventListener('click', handle)
    }
  }, [selectKey])

  const menuClick = ({ key }: { key: string }) => {
    if (key === selectKey) {
      resetMenu()
      return
    }
    if (key === '2' && !cache[key]) {
      setCache({
        ...cache,
        [key]: componentMap[key]
      })
    }
    setSelectKey(key)
    setSelectedKeys([key])
  }
  return (
    <div className={style.structure} ref={structureRef}>
      <Menu
        mode="inline"
        items={items}
        onClick={menuClick}
        selectedKeys={selectedKeys}></Menu>
      <div className="containter">
        {Object.keys(cache).map((key) => {
          const Component = cache[key]
          return (
            <Component
              key={key}
              hidden={key !== selectKey}
              resetMenu={resetMenu}
              selectNode={selectNode}
              changeSelectNode={changeSelectNode}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Structure
