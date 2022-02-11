import Button from './Button'
import Element from './Element'
import Form, { FieldsetArray } from './Form'
import Modal from './Modal'
import Timer from './Timer'

export class Screen extends Element<HTMLDivElement> {
  element: HTMLDivElement | null
  contentContainer: HTMLDivElement | null
  timer: Timer | null
  modal: Modal | null
  fieldsetArray: FieldsetArray

  constructor(parent: HTMLElement, fieldsetArray: FieldsetArray) {
    super(parent)
    this.element = null
    this.contentContainer = null
    this.timer = null
    this.modal = null
    this.fieldsetArray = fieldsetArray
    this._initialize()
  }

  _clear() {
    if (!this.element) return
    this.element.innerHTML = ''
  }

  _initialize() {
    this.element = this.createElement<HTMLDivElement>('div', { classList: ['screen'] })
    this.parent.appendChild(this.element)
    this._renderFirstView()
  }

  _renderFirstView() {
    if (!this.element) return
    this._clear()

    const headerContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['screen__header-container'],
    })
    const contentContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['screen__content-container'],
    })
    const title = this.createElement<HTMLHeadingElement>('h1', {
      classList: ['screen__title'],
      innerHTML: 'Envelo',
    })
    const subtitle = this.createElement<HTMLParagraphElement>('p', {
      classList: ['screen__subtitle'],
      innerHTML:
        'Możesz mieć swoją przesyłkę w kilkanaście sekund. Rozpocznij klikając w przycisk.',
    })

    headerContainer.appendChild(title)
    headerContainer.appendChild(subtitle)

    this.contentContainer = contentContainer

    this.element.appendChild(headerContainer)
    this.element.appendChild(contentContainer)

    new Button(this.contentContainer, 'Odbierz paczkę', () => this._renderSecondView())
  }

  _renderSecondView() {
    if (!this.contentContainer) return
    this.contentContainer.innerHTML = ''
    new Form(this.contentContainer, () => this._renderModal(), this.fieldsetArray)
    this.timer = new Timer()
    this.timer.start()
  }

  firstButtonHandler() {
    this.modal?.remove()
    this._renderFirstView()
  }
  secondButtonHandler() {
    this.modal?.remove()
    this._renderSecondView()
  }

  _renderModal() {
    if (!this.timer) return
    this.timer.stop()
    const duration = this.timer.getDuration()
    const modalContent = document.createElement('div')
    new Button(modalContent, 'To wszystko na dziś', () => this.firstButtonHandler())
    new Button(modalContent, 'Odbierz kolejną paczkę', () => this.secondButtonHandler())
    this.modal = new Modal(
      this.parent,
      'Paczka odebrana',
      `Zrobiłeś to w czasie ${duration} sekund. Czy możemy zrobić dla Ciebie coś jeszcze?`,
      modalContent
    )
  }
}
