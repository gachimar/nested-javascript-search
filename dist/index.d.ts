/**
     * Funcion principal de busqueda.
     *
     * @param {Array} json          // Array a investigar.
     * @param {String} parametro    // Cadena de texto a evaluar con los elementos.
     * @param {Array} blacklist     // Nombre de las keys a ignorar.
     * @returns { Array }
     */
export declare function search(json: Array<any>, parametro: string, blacklist?: Array<any>): any[];
