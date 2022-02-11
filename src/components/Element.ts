type HTMLElementOptions = {
  innerHTML?: string
  classList?: string[]
}

export default abstract class Element<T extends HTMLElement> {
  parent: HTMLElement
  abstract element: T | null

  constructor(parent: HTMLElement) {
    this.parent = parent
  }

  createElement<U extends HTMLElement>(type: string, options: HTMLElementOptions): U {
    const element = document.createElement(type) as U

    Object.keys(options).forEach(key => {
      if (key === 'innerHTML') {
        element.innerHTML = options[key] as string
      } else if (key === 'classList') {
        const { classList } = options
        classList!.forEach(className => element.classList.add(className))
      }
    })

    return element
  }

  remove(): void {
    if (this.element) this.parent.removeChild(this.element)
  }
}
