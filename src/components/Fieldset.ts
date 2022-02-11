import Element from './Element'
import Validator, { TValidator } from './Validator'

export default class Fieldset extends Element<HTMLFieldSetElement> {
  element: HTMLFieldSetElement | null
  isValid: boolean
  onChangeCb: Function
  type: string
  errors: string[]
  value: string
  validators: TValidator[]

  constructor(
    parent: HTMLElement,
    labelText: string,
    type: string,
    validators: TValidator[],
    onChangeCb: Function
  ) {
    super(parent)
    this.element = null
    this.isValid = true
    this.onChangeCb = onChangeCb
    this.type = type
    this.errors = []
    this.value = ''
    this.validators = validators
    this._initialize(labelText)
  }

  _initialize(labelText: string) {
    this.element = this.createElement<HTMLFieldSetElement>('fieldset', { classList: ['fieldset'] })

    const label = this.createElement<HTMLLabelElement>('label', {
      classList: ['fieldset__label'],
      innerHTML: labelText,
    })

    const input = this.createElement('input', {
      classList: ['fieldset__input'],
    })

    input.addEventListener('input', e => {
      this.value = (<HTMLInputElement>e.target).value
      this.onChangeCb()
    })
    this.element.appendChild(label)
    this.element.appendChild(input)
    this.parent.appendChild(this.element)
  }

  validate() {
    this.errors = []
    this.validators.forEach(validator => {
      const errorMessage = Validator.validate(validator, this.value)
      if (errorMessage) {
        this.errors.push(errorMessage)
      }
    })
  }
}
