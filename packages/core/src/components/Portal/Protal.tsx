import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

const Protal: FC<{ children: ReactNode; parentSelect: string }> = ({
  children,
  parentSelect
}) => {
  return createPortal(children, document.querySelector(parentSelect)!)
}

export default Protal
