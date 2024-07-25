const searcher = require('../dist/index')

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

console.log(searcher.search(myArray,'coffee'))   // [ { id: 1, name: 'bar', nestedArray: [ [Object] ] } ]

console.log(searcher.search(myArray,'foo'))      // [ { id: 0, name: 'foo', nested: { name: 'cake' } } ]

console.log(searcher.search(myArray,'cake'))      // [] This version only search inside arrays of objects.