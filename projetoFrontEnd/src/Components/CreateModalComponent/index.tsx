import { useState } from 'react';
import { Modal, Box, TextField, Button, ThemeProvider, createTheme, Autocomplete } from '@mui/material';
import { BaseType } from '../../Types/BaseType';

interface CreateModalComponentProps<T extends BaseType> {
    open: boolean;
    columnTypes: Record<keyof T, string>; // Ajuste aqui
    onClose: () => void;
    onSubmit: (data: T) => void;
}

const formatLabel = (text: string): string => {
    return text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase());
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

    const handleAutoComplete = (coluna: string) => {
        if (coluna === 'tumor') {
            return [
                "Sem Tumor",
                "Com Tumor (Leve)",
                "Com Tumor (Moderado)",
                "Com Tumor (Grave)"
            ];
        }

        if (coluna === 'permissao') {
            return [
                "Moderador",
                "Visitante"
            ];
        }

        return ["AAA", "BBB", "CCC"];
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        height: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        color: '#fff',
                        overflow: "auto"
                    }}
                >
                    <h2>Criação de novo registro</h2>
                    {Object.entries(columnTypes)
                        .filter(([column]) => column !== 'id')
                        .map(([column, type]) => (
                            type === 'comboBox' ? (
                                <Autocomplete
                                    key={column}
                                    options={handleAutoComplete(column)}
                                    onChange={(_, value) => handleChange(column as keyof T, value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label={formatLabel(column as string)} />
                                    )}
                                />
                            ) : (
                                <TextField
                                    key={column}
                                    label={formatLabel(column as string)}
                                    type={type === 'date' ? 'date' : 'text'}
                                    onChange={(e) => handleChange(column as keyof T, e.target.value)}
                                    InputLabelProps={type === 'date' ? { shrink: true } : {}}
                                    InputProps={type === 'date' ? { type: 'date' } : {}}
                                />
                            )
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