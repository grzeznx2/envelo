import Element from './Element'

export default class Modal extends Element<HTMLDivElement> {
  element: HTMLDivElement | null
  content: HTMLElement
  constructor(parent: HTMLElement, title: string, subtitle: string, content: HTMLElement) {
    super(parent)
    this.element = null
    this.content = content
    this._initialize(title, subtitle, content)
  }

  _initialize(titleText: string, subtitleText: string, content: HTMLElement) {
    const modalContainer = this.createElement<HTMLDivElement>('div', {
      classList: ['modal-container'],
    })
    const modalContainerContent = this.createElement<HTMLDivElement>('div', {
      classList: ['modal-container__content'],
    })
    const modal = this.createElement<HTMLDivElement>('div', { classList: ['modal'] })
    modalContainerContent.appendChild(modal)

    const title = this.createElement<HTMLHeadingElement>('h1', {
      classList: ['modal__title'],
      innerHTML: titleText,
    })
    const subtitle = this.createElement<HTMLParagraphElement>('p', {
      classList: ['modal__subtitle'],
      innerHTML: subtitleText,
    })

    content.classList.add('modal__button-container')
    modal.appendChild(title)
    modal.appendChild(subtitle)
    modal.appendChild(content)
    modalContainerContent.appendChild(modal)
    modalContainer.appendChild(modalContainerContent)

    this.element = modalContainer
    this.parent.appendChild(this.element)
  }

  remove() {
    if (!this.element) return
    this.parent.removeChild(this.element)
  }
}
