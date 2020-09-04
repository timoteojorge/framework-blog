import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#57bbbc',
        },
        secondary: {
            main: '#EF5781',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#ebe9d7',
        },
    },
});

theme.typography.h3 = {
    fontSize: '3rem',    
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    },
}
theme.typography.h4 = {
    fontSize: '2.125rem',    
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}
theme.typography.h5 = {
    fontSize: '1.5rem',    
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}

export default theme;