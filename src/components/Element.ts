type Options = {
  innerHTML: string
  classList: string[]
}

export default abstract class Element<T extends HTMLElement> {
  parent: HTMLElement
  abstract element: T | null

  constructor(parent: HTMLElement) {
    this.parent = parent
  }

  createElement(type: string, options: Options): T {
    const element = document.createElement(type) as T

    Object.keys(options).forEach(key => {
      if (key === 'innerHTML') {
        element.innerHTML = options[key]
      } else if (key === 'classList') {
        options[key].forEach(className => element.classList.add(className))
      }
    })

    return element
  }

  remove(): void {
    if (this.element) this.parent.removeChild(this.element)
  }
}
