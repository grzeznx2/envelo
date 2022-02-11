import { Screen } from './components/Screen'
import Validator from './components/Validator'

const container = document.getElementById('container')!

const fieldsetArray = [
  {
    type: 'text',
    labelText: 'Numer telefonu',
    maxLength: 9,
    validators: [Validator.isPhone('Proszę podać 9-cyfrowy numer telefonu')],
  },
  {
    type: 'text',
    labelText: 'Kod odbioru',
    maxLength: 4,
    validators: [Validator.isAccessCode('Proszę podać 4-cyfrowy kod odbioru')],
  },
]

new Screen(container, fieldsetArray)
