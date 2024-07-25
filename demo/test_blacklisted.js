const searcher = require('../dist/index')

const myArray = [
    {
        id:0,
        name:'foo',
        lastname: 'bar'
        
    },
    {
        id:1,
        name:'bar',
        lastname: 'footer'
    },
]

const blacklist = [
    'name'
]

console.log(searcher.search(myArray,'foo', blacklist))  