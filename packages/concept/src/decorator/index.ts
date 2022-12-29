import { App, ViewNode, BaseNode, ViewNodeType } from '../concepts'
import type { PropertyType } from '../concepts'

const Instansition = new Map()

const getComponent = (type: PropertyType) => {
  switch (type) {
    case 'ViewNode':
      return ViewNode

    default:
      return ViewNode
  }
}

const defineReactive = <T extends Object[]>(
  object: T,
  parent: App | ViewNode,
  type: PropertyType
) => {
  return new Proxy(object, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key)
      if (/^\d+$/.test(key as string)) {
        if (!(value instanceof BaseNode)) {
          const Constructor = getComponent(type)
          const newValue = new Constructor(value as ViewNodeType)
          newValue.setParent(parent)
          Reflect.set(target, key, newValue, receiver)
          return newValue
        }
      }
      return value
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      return true
    }
  })
}

const getInstansition = (target: any, attr: any) => {
  const object: Map<string, any> = Instansition.get(target)
  const instansition = object.get(attr)
  return instansition
}
const setInstansition = <T extends Object[]>(
  target: any,
  attr: any,
  value: any,
  type: PropertyType
) => {
  let object: Map<string, any> = Instansition.get(target)
  if (!object) {
    object = new Map()
    Instansition.set(target, object)
  }
  const instansition = defineReactive<T>(value, target, type)
  object.set(attr, instansition)
}

export function property<T extends Object[]>(
  target: any,
  attr: any,
  type: PropertyType
) {
  Object.defineProperty(target, attr, {
    get() {
      return getInstansition(target, attr)
    },
    set(value) {
      setInstansition<T>(target, attr, value, type)
    }
  })
}
