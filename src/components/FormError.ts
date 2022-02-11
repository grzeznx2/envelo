import Element from './Element'

export default class FormError extends Element<HTMLDivElement> {
  element: HTMLDivElement | null
  constructor(parent: HTMLElement, message: string) {
    super(parent)
    this.element = null
    this._initialize(message)
  }

  _initialize(message: string) {
    this.element = this.createElement<HTMLDivElement>('div', { classList: ['form-error'] })
    const span = this.createElement('span', {
      innerHTML: message,
      classList: ['form-error__message'],
    })
    this.element.appendChild(span)
    this.parent.appendChild(this.element)
  }
}
