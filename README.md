# nested-javascript-search

This searcher checks the elements of an array and search for string match.

## Installation

```bash
# Using npm
npm i nested-javascript-search
```

## Usage

At first import the library to your project.

```JavaScript

import { search } from 'nested-javascript-search'

// or by using a CDN.

import { search } from 'https://unpkg.com/nested-javascript-search@latest/dist/nested-javascript-search.min.js'
```

You can also use it in your html using a script tag with "module" as type.

```html

<script type="module">
    import search from 'https://unpkg.com/nested-javascript-search@latest/dist/nested-javascript-search.min.js'
    
    // Then you can use search as a function here.
</script>

```

Then you can call to the search function.

```JavaScript

search(myArray, myStringToMatch)

```

## Example

Filter the array elements by searching into the nested array. It will then return the main array element due to the nested string match.

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
        ]
    },
]

console.log(search(myArray,'coffee'))   // [ { id: 1, name: 'bar', nestedArray: [ [Object] ] } ]

console.log(search(myArray,'foo'))      // [ { id: 0, name: 'foo', nested: { name: 'cake' } } ]

console.log(search(myArray,'cake'))      // [] This version only search inside arrays of objects.
 
```
This searcher only works with arrays, so it wont work with values as nested objects.

## Author

[Gabriel de Jesús Chirinos Marcano](https://github.com/gachimar)
