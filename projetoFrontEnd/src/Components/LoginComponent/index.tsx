import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { Modal, Box, TextField, Button, createTheme } from '@mui/material';
import { AxiosError } from 'axios';

const LoginComponent: React.FC = () => {
    const { login, authSenha, setIsAuthenticated, authSenhaDefinir } = useAuth();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [mostrarCampoSenha, setMostrarCampoSenha] = useState<boolean>(false);
    const [senhaVazia, setSenhaVazia] = useState<boolean>(false);

    const handleLogin = async () => {
        if (username) {
            const success = await login(username);
            if (success instanceof AxiosError) {
                setErrorMessage(success.response?.data as string);
            } else {
                setErrorMessage(null);
                if (success) {
                    setMostrarCampoSenha(true);
                    setSenhaVazia(false);
                } else {
                    setSenhaVazia(true);
                    setMostrarCampoSenha(false);
                }
            }
        }
    };

    const handleVerificarSenha = async () => {
        if (username && senha) {
            try {
                const resultado = senhaVazia
                    ? await authSenhaDefinir(username, senha)
                    : await authSenha(username, senha);
                console.log(resultado)
                if (resultado instanceof AxiosError) {
                    setIsAuthenticated(false);
                    setErrorMessage('Senha Inválida.');
                } else {
                    setIsAuthenticated(resultado);
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    setErrorMessage('Erro ao verificar a senha.');
                }
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
                        disabled={mostrarCampoSenha || senhaVazia}
                    />
                    {mostrarCampoSenha && (
                        <TextField
                            label="Senha"
                            type="password"
                            variant="outlined"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            sx={{ bgcolor: 'background.default' }}
                            helperText="Informe sua senha cadastrada."
                        />
                    )}
                    {senhaVazia && (
                        <TextField
                            label="Nova Senha"
                            type="password"
                            variant="outlined"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            sx={{ bgcolor: 'background.default' }}
                            helperText="Primeiro login detectado. Defina uma nova senha até 16 caracteres."
                        />
                    )}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button color="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        {mostrarCampoSenha || senhaVazia ? (
                            <Button variant="contained" color="primary" onClick={handleVerificarSenha}>
                                {senhaVazia ? 'Definir Senha' : 'Autenticar'}
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default LoginComponent;