
//--------------------------------------------------------------------------

const isDate = ( value ) => {

    const date = new Date(value);

    return ( date instanceof Date && !isNaN( date.valueOf() ) );
}

//--------------------------------------------------------------------------

module.exports = { isDate };