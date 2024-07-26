// const searcher = require('../dist/index')
import { search } from '../dist/index.js'

const myArray = [
    {
        id:0,
        name:'foo',
        nested: {
            name:'cake'
        }
    },
    {
        id:1,
        name:'bar',
        nestedArray:[
            {
                name:'coffee'
            }
        ]
    },
]

console.log(search(myArray,'coffee'))       // [ { id: 1, name: 'bar', nestedArray: [ [Object] ] } ]

console.log(search(myArray,'foo'))          // [ { id: 0, name: 'foo', nested: { name: 'cake' } } ]

console.log(search(myArray,'cake'))         // [] This version only search inside arrays of objects.