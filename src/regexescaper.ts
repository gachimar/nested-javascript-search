/**
     * Function to prevent unexpected regex expressions from the required string.
     * 
     * @param {String} str 
     * @returns { String }
     */
export function escape(str = ''){
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}