import React from 'react';
import { AppBar, Toolbar, Box, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
    const location = useLocation();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#121212',
                boxShadow: 'none',
            }}>
            <Toolbar>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/animais/"
                        underline='none'
                        variant='h6'
                        color={location.pathname === '/animais/' ? 'success' : 'inherit'}
                        sx={{
                            margin: '0 8px',
                            fontWeight: location.pathname === '/animais/' ? 'bold' : 'normal',
                        }}
                        title='Acessar tabela de Animais'>
                        Animais
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/solicitantes/"
                        underline='none'
                        variant='h6'
                        color={location.pathname === '/solicitantes/' ? 'success' : 'inherit'}
                        sx={{
                            margin: '0 8px',
                            fontWeight: location.pathname === '/solicitantes/' ? 'bold' : 'normal',
                        }}
                        title='Acessar tabela de Solicitantes'>
                        Solicitantes
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/exames/"
                        underline='none'
                        variant='h6'
                        color={location.pathname === '/exames/' ? 'success' : 'inherit'}
                        sx={{
                            margin: '0 8px',
                            fontWeight: location.pathname === '/exames/' ? 'bold' : 'normal',
                        }}
                        title='Acessar tabela de Exames'>
                        Exames
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;