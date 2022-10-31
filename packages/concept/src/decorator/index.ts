import { App, ViewNode, BaseNode } from '../concepts'

const Instansition = new Map()

const defineReactive = <T extends Array<Object>>(
  object: T,
  parent: App | ViewNode
) => {
  return new Proxy(object, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key)
      if (/^\d+$/.test(key as string)) {
        if (!(value instanceof BaseNode)) {
          const newValue = new ViewNode(value)
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
    },
  })
}

const getInstansition = (target: any, attr: any) => {
  const object: Map<string, any> = Instansition.get(target)
  const instansition = object.get(attr)
  return instansition
}
const setInstansition = (target: any, attr: any, value: any) => {
  let object: Map<string, any> = Instansition.get(target)
  if (!object) {
    object = new Map()
    Instansition.set(target, object)
  }
  const instansition = defineReactive(value, target)
  object.set(attr, instansition)
}

export function property(target: any, attr: any) {
  Object.defineProperty(target, attr, {
    get() {
      return getInstansition(target, attr)
    },
    set(value) {
      setInstansition(target, attr, value)
    },
  })
}
