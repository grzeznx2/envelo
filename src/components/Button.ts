import Element from './Element'
import Spinner from './Spinner'

export default class Button extends Element<HTMLButtonElement> {
  element: HTMLButtonElement | null
  text: string

  constructor(parent: HTMLElement, text: string, clickHandler: EventListener) {
    super(parent)
    this.element = null
    this.text = text
    this._initialize(text, clickHandler)
  }

  private _initialize(text: string, clickHandler: EventListener) {
    this.element = this.createElement<HTMLButtonElement>('button', {
      innerHTML: text,
      classList: ['button'],
    })
    this.element.addEventListener('click', clickHandler)
    this.parent.appendChild(this.element)
  }

  generateSpinner() {
    if (!this.element) return
    this.element.innerHTML = ''

    this.updateDisable(true)
    new Spinner(this.element)
  }

  removeSpinner() {
    if (!this.element) return
    this.element.innerHTML = this.text
    this.updateDisable(false)
  }

  updateDisable(disabled: boolean) {
    if (disabled) {
      this.element?.setAttribute('disabled', 'true')
    } else {
      this.element?.removeAttribute('disabled')
    }
  }
}
