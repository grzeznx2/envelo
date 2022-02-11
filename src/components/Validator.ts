export type TValidator = {
  type: string
  errorMessage: string
}

export type GetValidator = (errorMessage: string) => TValidator

export default class Validator {
  static isPhone: GetValidator = (errorMessage: string) => ({ type: 'IS_PHONE', errorMessage })
  static isAccessCode: GetValidator = (errorMessage: string) => ({
    type: 'IS_ACCESS_CODE',
    errorMessage,
  })

  static validate(validator: TValidator, value: string) {
    const { type } = validator

    let isValid = true
    let errorMessage = ''

    if (type === 'IS_PHONE')
      isValid =
        isValid && value.replace(' ', '').length === 9 && /\d{9}/.test(value.replace(' ', ''))
    if (type === 'IS_ACCESS_CODE')
      isValid =
        isValid && value.replace(' ', '').length === 4 && /\d{4}/.test(value.replace(' ', ''))

    if (!isValid) errorMessage = validator.errorMessage

    return errorMessage
  }
}
