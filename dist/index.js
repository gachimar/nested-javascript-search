import { escape } from "./regexescaper.js";
/**
     * Funcion principal de busqueda.
     *
     * @param {Array} json          // Array a investigar.
     * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
     * @param {Array} blacklist     // Nombre de las keys a ignorar.
     * @returns { Array }
     */
export function search(json, parametro, blacklist = []) {
    const scapedParam = escape(parametro);
    const parametroRegex = new RegExp(scapedParam, "gi");
    const arrayFiltrada = searcher(json, parametroRegex, blacklist);
    return arrayFiltrada;
}
// Json es cualquier json o array clave valor (Funciona sin clave, genial),
// parametro debe ser una expresión regular a evaluar.
/**
 * Function to iterate in the given array and look for matches in the key values.
 *
 * @param {Array} json          // Array a investigar.
 * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
 * @param {Array} blacklist     // Nombre de las keys a ignorar.
 * @returns
 */
export function searcher(json, parametro, blacklist) {
    // La voy a llenar de los elementos del array los cuales al menos
    // en sus elementos o elementos anidados hay una coincidencia.
    const filterBySearchArray = [];
    // Recorrer todos los elementos del array del json
    try {
        json.forEach((element) => {
            // Esto es por si no es clave valor, verifique inmediatamente
            // el valor del elemento actual del array, si encuentra un
            // numero o string, verificar match.
            if (['string', 'number'].includes(typeof element)) {
                const hallado = String(element).match(parametro);
                if (hallado !== null) {
                    filterBySearchArray.push(element);
                    return;
                }
            }
            // Si no es lo anterior y es un array, entonces llamar de nuevo
            // en la funcion si hay mas elementos dentro del array.
            else if (Array.isArray(element)) {
                const recursivo = searcher(element, parametro, blacklist);
                if (recursivo.length > 0) {
                    filterBySearchArray.push(element);
                    return;
                }
            }
            // Recorrer todas las claves del objeto
            if (typeof element == "object") {
                for (const key in element) {
                    if (blacklist.includes(key)) {
                        continue;
                    }
                    // Si es clave valor y encuentra un numero o string, verificar match.
                    if (['string', 'number'].includes(typeof element[key])) {
                        const hallado = String(element[key]).match(parametro);
                        if (hallado !== null) {
                            filterBySearchArray.push(element);
                            return;
                        }
                    }
                    // Si no es lo anterior y es un array, entonces llamar de nuevo
                    // en la funcion si hay mas elementos dentro del array.
                    else if (Array.isArray(element[key])) {
                        const recursivo = searcher(element[key], parametro, blacklist);
                        if (recursivo.length > 0) {
                            filterBySearchArray.push(element);
                            return;
                        }
                    }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        throw new Error('The given element is not an iterable array.');
    }
    return filterBySearchArray;
}
