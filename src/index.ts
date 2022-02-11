import { Screen } from './components/Screen'
import Validator from './components/Validator'

const container = document.getElementById('container')!

const fieldsetArray = [
  {
    type: 'text',
    labelText: 'Numer telefonu',
    validators: [Validator.isPhone('Proszę podać 9-cyfrowy numer telefonu')],
  },
  {
    type: 'text',
    labelText: 'Kod odbioru',
    validators: [Validator.isAccessCode('Proszę podać 4-cyfrowy kod odbioru')],
  },
]

new Screen(container, fieldsetArray)
