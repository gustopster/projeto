import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';

interface PaginaDeBoasVindasProps {
    nomeDoUsuario: string;
}

const PaginaDeBoasVindas: React.FC<PaginaDeBoasVindasProps> = ({ nomeDoUsuario }) => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#81980f',
            },
            secondary: {
                main: '#00bcd4',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    color: '#fff',
                }}
            >
                <h1>Bem-vindo ao Sistema, {nomeDoUsuario}!</h1>
            </Box>
        </ThemeProvider>
    );
};

export default PaginaDeBoasVindas;