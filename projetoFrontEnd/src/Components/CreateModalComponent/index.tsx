import { useState } from 'react';
import { Modal, Box, TextField, Button, ThemeProvider, createTheme } from '@mui/material';
import { BaseType } from '../../Types/BaseType';

interface CreateModalComponentProps<T extends BaseType> {
    open: boolean;
    columnTypes: Record<keyof T, string>; // Ajuste aqui
    onClose: () => void;
    onSubmit: (data: T) => void;
}

// Função para formatar camelCase para texto legível
const formatLabel = (text: string): string => {
    return text
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insere espaço antes de letras maiúsculas
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Insere espaço entre letras maiúsculas seguidas por minúsculas
        .replace(/^./, (str) => str.toUpperCase()); // Coloca a primeira letra em maiúscula
};

const CreateModalComponent = <T extends BaseType>({
    open,
    columnTypes,
    onClose,
    onSubmit,
}: CreateModalComponentProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({});

    const handleChange = (column: keyof T, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [column]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData as T);
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
            <Modal open={open} onClose={onClose}>
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
                    <h2>Criação de novo registro</h2>
                    {Object.entries(columnTypes)
                        .filter(([column]) => column !== 'id')
                        .map(([column, type]) => (
                            <TextField
                                key={column}
                                label={formatLabel(column as string)} // Chama a função de formatação
                                type={type === 'date' ? 'date' : 'text'}
                                onChange={(e) => handleChange(column as keyof T, e.target.value)}
                                InputLabelProps={type === 'date' ? { shrink: true } : {}}
                                InputProps={type === 'date' ? { type: 'date' } : {}}
                            />
                        ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Criar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default CreateModalComponent;