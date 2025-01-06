import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    grana: {
      main: '#B71C1C', // Color principal
      light: '#E57373', // Tonalidad más clara
      dark: '#880E4F',  // Tonalidad más oscura
      contrastText: '#FFFFFF', // Color del texto
    },
    azulOscuro: {
        main: '#004b95', // Color principal
        light: '#5c82c4', // Tonalidad más clara
        dark: '#002a61',  // Tonalidad más oscura
        contrastText: '#FFFFFF', // Color del texto que contrasta
    },
  },
});

export default theme;
