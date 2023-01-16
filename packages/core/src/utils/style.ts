const setStyle = (
  el: HTMLElement,
  property: { [key in keyof CSSStyleDeclaration]?: string }
) => {
  Object.keys(property).forEach((key: any) => {
    el.style[key] = property[key]!
  })
}

export default setStyle
