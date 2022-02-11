import Button from './Button'
import Element from './Element'
import Fieldset from './Fieldset'
import FormError from './FormError'
import { sleep } from '../utils'
import { TValidator } from './Validator'

export type FieldsetArray = {
  type: string
  labelText: string
  maxLength: number
  validators: TValidator[]
}[]

export default class Form extends Element<HTMLFormElement> {
  element: HTMLFormElement | null
  errorContainer: HTMLDivElement | null
  submitHandler: Function
  fieldsets: Fieldset[]
  submitButton: Button | null
  isValid: boolean

  constructor(parent: HTMLElement, submitHandler: Function, fieldsetArray: FieldsetArray) {
    super(parent)
    this.element = null
    this.errorContainer = null
    this.submitHandler = submitHandler
    this.fieldsets = []
    this.submitButton = null
    this.isValid = false
    this._initialize(fieldsetArray)
  }

  _initialize(fieldsetArray: FieldsetArray) {
    this.element = this.createElement<HTMLFormElement>('form', { classList: ['form'] })
    const fieldsetContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['form__fieldset-container'],
    })
    const errorContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['form__error-container'],
    })
    const buttonContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['form__button-container'],
    })

    fieldsetArray.forEach(fieldset => {
      this.fieldsets.push(
        new Fieldset(
          fieldsetContainer,
          fieldset.labelText,
          fieldset.type,
          fieldset.validators,
          () => this.checkValidity(),
          fieldset.maxLength
        )
      )
    })
    this.submitButton = new Button(buttonContainer, 'Odbierz paczkę', () => this.submit())
    this.errorContainer = errorContainer
    this.element.appendChild(fieldsetContainer)
    this.element.appendChild(errorContainer)
    this.element.appendChild(buttonContainer)
    this.element.addEventListener('submit', e => e.preventDefault())
    this.submitButton.updateDisable(!this.isValid)
    this.parent.appendChild(this.element)
  }

  async submit() {
    if (!this.submitButton) return
    this.submitButton.generateSpinner()
    await sleep(2)
    this.submitButton.removeSpinner()
    this.submitHandler()
  }

  checkValidity() {
    if (!this.submitButton || !this.errorContainer) return
    this.errorContainer.innerHTML = ''

    this.isValid = true
    this.fieldsets.forEach(fieldset => {
      fieldset.validate()
      fieldset.errors.forEach(error => {
        this.isValid = false
        new FormError(this.errorContainer!, error)
      })
    })
    this.submitButton.updateDisable(!this.isValid)
  }
}
