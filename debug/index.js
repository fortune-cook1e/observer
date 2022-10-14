import { observable, observe } from '../lib/esm/index.js'

const origin = {
  name: 'gaga'
}

const target = observable(origin)

observe(origin => {
  console.log('dasdada')
})
