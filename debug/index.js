import { observable, observe } from '../lib/esm/index.js'

const origin = {
  name: 'gaga',
  age: 20
}

const target = observable(origin)

observe(origin => {
  console.log('gagaga', target.name, target.age)
})

setTimeout(() => {
  target.name = '13231'
}, 1000)

setTimeout(() => {
  target.age = 30
}, 2000)
