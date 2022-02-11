type HTMLElementOptions = {
  innerHTML?: string
  classList?: string[]
  maxLength?: number
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
      } else if (key === 'maxLength') {
        element.setAttribute('maxLength', `${options.maxLength!}`)
      }
    })

    return element
  }

  remove(): void {
    if (this.element) this.parent.removeChild(this.element)
  }
}
