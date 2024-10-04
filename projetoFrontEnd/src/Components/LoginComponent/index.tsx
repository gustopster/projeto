import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { Modal, Box, TextField, Button, createTheme } from '@mui/material';

const LoginComponent: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        if (username) {
            const success = await login(username);
            if (success) {
                setOpen(false);
            } else {
                setErrorMessage('Usuário não encontrado.');
            }
        }
    };

    const handleCancel = () => {
        window.location.reload();
        setOpen(false);
    };

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
            <Modal
                open={open}
                onClose={handleCancel}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        color: '#fff',
                    }}
                >
                    <h2>Seja Bem-vindo</h2>
                    <TextField
                        label="Usuário"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ bgcolor: 'background.default' }}
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostra o erro, se houver */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button color="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default LoginComponent;