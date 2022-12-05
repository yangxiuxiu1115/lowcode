import React, { useEffect, useState } from 'react'

import { List, Card } from 'antd'
import style from './Material.module.scss'

import { getMaterails } from '@/server/material'

const { Meta } = Card

const Material = () => {
  const [material, setMaterial] = useState([])

  useEffect(() => {
    getMaterails().then((responce) => {
      setMaterial(JSON.parse(responce.data.list))
    })
  }, [])

  return (
    <div className={style.material}>
      <List
        grid={{ column: 3 }}
        dataSource={material}
        renderItem={(item: any) => (
          <List.Item>
            <Card hoverable>
              <Meta title={item.name} />
            </Card>
            {item.name}
          </List.Item>
        )}
      />
    </div>
  )
}

export default Material
