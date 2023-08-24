export const openLink = ( url: string, type: 'email' | 'phone' | undefined, blank = false ) => {
  const targetLink = ( blank ) ? '_bank' : ''
  switch ( type ) {
    case 'email':
      window.open( `mailto:${ url }`, targetLink )
      break
    case 'phone':
      window.open( `tel:${ url }`, targetLink )
      break
    default:
      window.open( url, targetLink )
  }
}

export const colors = [ '#D6E4FF', '#ADC8FF', '#84A9FF', '#6690FF', '#3366FF', '#254EDB', '#1939B7', '#102693',
  '#091A7A', '#EFFBD0', '#DCF7A3', '#BDE872', '#9AD24D', '#6EB51C', '#569B14', '#41820E', '#2E6808', '#215605',
  '#D0F8FF', '#A1EBFF', '#72D9FF', '#4EC6FF', '#14A5FF', '#0E80DB', '#0A60B7', '#064493', '#03307A', '#FFF7CC',
  '#FFEC99', '#FFDE66', '#FFD13F', '#FFBB00', '#DB9A00', '#B77C00', '#936000', '#7A4C00', '#FFE6D5', '#FFC7AC',
  '#FFA182', '#FF7D63', '#FF4130', '#DB2323', '#B71825', '#930F25', '#7A0925' ]