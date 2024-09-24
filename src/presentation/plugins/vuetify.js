/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#3D315B',
          'primary-darken-1': '#2C2341',
          secondary: '#F5E3E0',
          accent: '#006D77',
          background: '#E8B4BC',
          'secondary-darken-1': '#D89AA5',
        },
      },
    },
  },
})
