import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

const Portal: FC<{ children: ReactNode; to: string }> = ({
  children,
  to
}) => {
  return createPortal(children, document.querySelector(to)!)
}

export default Portal
