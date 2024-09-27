import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const HeaderComponent: React.FC = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#121212',
            }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                        Gerenciamento de Animais
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;