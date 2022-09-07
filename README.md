# nested-javascript-search

This searcher checks the elements of an array and search for string match.

## Installation



```powershell
# Using npm
npm i nested-javascript-search
```

## Usage

```JavaScript

import { search } from 'nested-javascript-search'

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
            {name:'coffee'}
    },
]

console.log(search(myArray,'coffee'))   // [ { id: 1, name: 'bar', nestedArray: [ [Object] ] } ]

console.log(search(myArray,'foo'))      // [ { id: 0, name: 'foo', nested: { name: 'cake' } } ]

console.log(search(myArray,'cake'))      // [] This version only search inside arrays of objects.
 
```
This searcher only works with arrays, so it wont work with values as nested objects.

## Author

[Gabriel de Jesús Chirinos Marcano](https://github.com/gachimar)
