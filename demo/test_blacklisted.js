import { search } from '../dist/index.js'

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

console.log(search(myArray,'foo', blacklist))  