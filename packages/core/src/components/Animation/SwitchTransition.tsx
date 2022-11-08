import React, {
  cloneElement,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

let isMounted = false
const addAnimation = (isEnter: boolean, className?: string) => {
  if (className) {
    return ['animate__animated', `animate__${className}`]
  } else {
    if (isEnter) {
      return ['animate__animated', 'animate__bounceInRight']
    } else {
      return ['animate__animated', 'animate__bounceOutRight']
    }
  }
}
const DEFAULT_ENTER_ANIMATION = 'animate__bounceInRight'
const DEFAULT_LEAVE_ANIMATION = 'animate__bounceOutRight'

const SwitchTransition: FC<{
  children: ReactElement
  start?: string
  end?: string
  state: number | boolean | string
}> = ({ children, start, end, state }) => {
  const [current, setCurrent] = useState<ReactElement>(children)
  const animationRef = useRef<HTMLDivElement>(null)

  const removeClass = useCallback(
    function (el: HTMLDivElement | null) {
      el?.classList.remove('animate__animated')
      if (start) {
        el?.classList.remove(`animate__${start}`)
      } else {
        el?.classList.remove(DEFAULT_ENTER_ANIMATION)
      }
      if (end) {
        el?.classList.remove(`animate__${end}`)
      } else {
        el?.classList.remove(DEFAULT_LEAVE_ANIMATION)
      }
    },
    [start, end]
  )

  const animationend = useCallback(
    function (this: HTMLDivElement) {
      this.removeEventListener('animationend', animationend)
      if (!isMounted) {
        removeClass(this)
        isMounted = true
      } else {
        isMounted = false
        setCurrent(children)
      }
    },
    [children]
  )

  const effect = useCallback(() => {
    if (!isMounted) {
      if (children.type === current.type) {
        removeClass(animationRef.current)
      }
      animationRef.current?.classList.add(...addAnimation(true, start))
    } else {
      if (current) {
        animationRef.current?.classList.add(...addAnimation(false, end))
      }
    }
    animationRef.current?.addEventListener('animationend', animationend)
  }, [start, end, children])

  useEffect(() => {
    effect()
  }, [state, current])

  return (
    <>
      {cloneElement(current, {
        ref: animationRef,
      })}
    </>
  )
}

export default SwitchTransition
