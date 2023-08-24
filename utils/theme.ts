const Theme = {
  'color-primary-100': '#F3FBFD',
  'color-primary-200': '#E7F7FC',
  'color-primary-300': '#D8EEF7',
  'color-primary-400': '#CAE2EF',
  'color-primary-500': '#B6D2E5',
  'color-primary-600': '#85A7C4',
  'color-primary-700': '#5B7EA4',
  'color-primary-800': '#3A5984',
  'color-primary-900': '#223E6D',
  'color-success-100': '#F0FCD0',
  'color-success-200': '#DEF9A2',
  'color-success-300': '#C2ED71',
  'color-success-400': '#A4DC4C',
  'color-success-500': '#7BC619',
  'color-success-600': '#61AA12',
  'color-success-700': '#4A8E0C',
  'color-success-800': '#367207',
  'color-success-900': '#285F04',
  'color-info-100':    '#CBF8FE',
  'color-info-200':    '#98EBFD',
  'color-info-300':    '#64D6FB',
  'color-info-400':    '#3DBEF7',
  'color-info-500':    '#0099F2',
  'color-info-600':    '#0076D0',
  'color-info-700':    '#0058AE',
  'color-info-800':    '#003E8C',
  'color-info-900':    '#002C74',
  'color-warning-100': '#FFF6D0',
  'color-warning-200': '#FFEBA1',
  'color-warning-300': '#FFDD73',
  'color-warning-400': '#FFCF50',
  'color-warning-500': '#FFB916',
  'color-warning-600': '#DB9710',
  'color-warning-700': '#B7790B',
  'color-warning-800': '#935C07',
  'color-warning-900': '#7A4804',
  'color-danger-100':  '#FFEFE4',
  'color-danger-200':  '#FFDBCA',
  'color-danger-300':  '#FFC3B0',
  'color-danger-400':  '#FFAD9C',
  'color-danger-500':  '#FF877C',
  'color-danger-600':  '#DB5A5A',
  'color-danger-700':  '#B73E48',
  'color-danger-800':  '#932739',
  'color-danger-900':  '#7A172F'
}

export const SetCssVar = ( obj, prefix = '--nw' ) => {
  if ( process.client ) {
    let vars = ( obj ) ? obj : Theme
    for ( let prop in vars ) {
      //eslint-disable-next-line no-prototype-builtins
      if ( vars.hasOwnProperty( prop ) ) {
        document.documentElement.style.setProperty( `${ prefix }-${ prop }`, vars[ prop ] )
      }
    }
    return vars
  }
}

export const useHexToRgb = hex => {
  //console.log( 'hex', hex )
  return ( hex ) ? hex.replace( /^#?([a-f\d])([a-f\d])([a-f\d])$/i, ( m, r, g, b ) => '#' + r + r + g + g + b + b )
      .substring( 1 ).match( /.{2}/g )
      .map( x => parseInt( x, 16 ) ) : ''
}