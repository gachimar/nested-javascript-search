
/**
 * Function to prevent unexpected regex expressions from the required string.
 * 
 * @param {String} str 
 * @returns { String }
 */
 const escape = function (str = ''){
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Funcion principal de busqueda.
 * 
 * @param {Array} json          // Array a investigar.
 * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
 * @param {Array} whitelist     // Nombre de las keys a ignorar.
 * @returns { Array }
 */
const search = function (json, parametro, whitelist = []){
    const scapedParam =  escape(parametro);
    const parametroRegex = new RegExp(scapedParam, "gi")
    const arrayFiltrada = searcher(json, parametroRegex, whitelist)
    return arrayFiltrada
} 

// Json es cualquier json o array clave valor (Funciona sin clave, genial),
// parametro debe ser una expresión regular a evaluar.
/**
 * Function to iterate in the given array and look for matches in the key values.
 * 
 * @param {Array} json          // Array a investigar.
 * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
 * @param {Array} whitelist     // Nombre de las keys a ignorar.
 * @returns 
 */
const searcher = function(json, parametro, whitelist){
 
    // La voy a llenar de los elementos del array los cuales al menos
    // en sus elementos o elementos anidados hay una coincidencia.
    const filterBySearchArray = [];

    // Recorrer todos los elementos del array del json
    try {
        json.forEach((element) => {
            // Recorrer todas las claves del objeto
            for (const key in element) {
                if (whitelist.includes(key)) {
                    continue
                }

                // Esto es por si no es clave valor, verifique inmediatamente
                // el valor del elemento actual del array, si encuentra un
                // numero o string, verificar match.
                if ( ['string', 'number'].includes(typeof element) ){
                    const hallado = element.toString().match(parametro)
                    if (hallado !== null) {
                        filterBySearchArray.push(element)
                        return
                    }
                }

                // Si es clave valor y encuentra un numero o string, verificar match.
                if ( ['string', 'number'].includes(typeof element[key]) ) {
                    const hallado = element[key].toString().match(parametro)
                    if (hallado !== null) {
                        filterBySearchArray.push(element)
                        return
                    }
                } 
                // Si no es lo anterior y es un array, entonces llamar de nuevo
                // en la funcion si hay mas elementos dentro del array.
                else if (Array.isArray(element[key])) {
                    const recursivo = searcher(element[key], parametro, whitelist);
                    if (recursivo.length > 0) {
                        filterBySearchArray.push(element)
                        return;
                    }
                }
            }
        });  
    } catch (error) {
        throw new Error('The given element is not an iterable array.') 
    }

    return filterBySearchArray;
}

export { search }
