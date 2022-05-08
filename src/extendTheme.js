import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config });


// const customTheme = extendTheme({ 
//   initialColorMode: 'default',
//   useSystemColorMode: false,
//   semanticTokens: {
//     colors: {
//       text: {
//         default: 'gray.900',
//         _dark: 'gray.50',
//       },
//       buttoncolor: {
//         default: 'brand.500',
//         _dark: 'brand.100'
//       },
//     },
//   },
//   colors: {
//     brand: {
//       100: '#f7fafc',
//       500: '#f77070',
//     },
//     grey: {
//       100: '#eff3fa',
//     },
//     blue: {
//       100: '#1976d2',
//       500: '#0098ae',
//     },
//     red:  {
//       100: '#ff3d3d',
//       200: '#f77070',
//     },
//   },
//   fontsWeights: {
//     hairline: 100,
//     thin: 200,
//     light: 300,
//     normal: 400,
//     medium: 500,
//     semibold: 600,
//     bold: 700,
//     extrabold: 800
//   }
// })

export default theme;