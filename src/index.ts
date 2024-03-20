import { escape } from "./utils/regexescaper";

export class Buscador {
    
    /**
     * Funcion principal de busqueda.
     * 
     * @param {Array} json          // Array a investigar.
     * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
     * @param {Array} blacklist     // Nombre de las keys a ignorar.
     * @returns { Array }
     */
    search (json : Array<any>, parametro : string, blacklist : Array<any> = []){
        const scapedParam =  escape(parametro);
        const parametroRegex : RegExp = new RegExp(scapedParam, "gi")
        const arrayFiltrada = this.searcher(json, parametroRegex, blacklist)
        return arrayFiltrada
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
    searcher(json : Array<any>, parametro : RegExp, blacklist : Array<any>){
        
        
        // La voy a llenar de los elementos del array los cuales al menos
        // en sus elementos o elementos anidados hay una coincidencia.
        const filterBySearchArray : Array<any> = []
    
        // Recorrer todos los elementos del array del json
        try {
            json.forEach((element) => {

                // Esto es por si no es clave valor, verifique inmediatamente
                // el valor del elemento actual del array, si encuentra un
                // numero o string, verificar match.
                if ( ['string', 'number'].includes(typeof element) ){
                    const hallado = String(element).match(parametro)
                    if (hallado !== null) {
                        filterBySearchArray.push(element)
                        return
                    }
                }

                // Si es clave valor y encuentra un numero o string, verificar match.
                if ( ['string', 'number'].includes(typeof element) ) {
                    const hallado = String(element).match(parametro)
                    
                    if (hallado !== null) {
                        filterBySearchArray.push(element)
                        return
                    }
                } 

                // Si no es lo anterior y es un array, entonces llamar de nuevo
                // en la funcion si hay mas elementos dentro del array.
                else if (Array.isArray(element)) {
                    const recursivo = this.searcher(element, parametro, blacklist);
                    if (recursivo.length > 0) {
                        filterBySearchArray.push(element)
                        return
                    }
                }
                
                // Recorrer todas las claves del objeto
                if (typeof element == "object"){
                    for (const key in element) {
                        console.log('Elemento: ', typeof element);
                        if (blacklist.includes(key)) {
                            continue
                        }
                        
                        // Esto es por si no es clave valor, verifique inmediatamente
                        // el valor del elemento actual del array, si encuentra un
                        // numero o string, verificar match.
                        if ( ['string', 'number'].includes(typeof element) ){
                            const hallado = String(element).match(parametro)
                            if (hallado !== null) {
                                filterBySearchArray.push(element)
                                return
                            }
                        }
        
                        // Si es clave valor y encuentra un numero o string, verificar match.
                        if ( ['string', 'number'].includes(typeof element[key]) ) {
                            const hallado = String(element[key]).match(parametro)
                            
                            if (hallado !== null) {
                                filterBySearchArray.push(element)
                                return
                            }
                        } 
    
                        // Si no es lo anterior y es un array, entonces llamar de nuevo
                        // en la funcion si hay mas elementos dentro del array.
                        else if (Array.isArray(element[key])) {
                            const recursivo = this.searcher(element[key], parametro, blacklist);
                            if (recursivo.length > 0) {
                                filterBySearchArray.push(element)
                                return
                            }
                        }
                    }   
                }
                
            });  
        } catch (error) {
            console.log(error)
            throw new Error('The given element is not an iterable array.') 
        }
        
        return filterBySearchArray;
    }
}
