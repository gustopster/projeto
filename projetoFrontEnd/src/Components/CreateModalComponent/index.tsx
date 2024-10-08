import { useCallback, useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, ThemeProvider, createTheme, Autocomplete } from '@mui/material';
import { BaseType } from '../../Types/BaseType';
import { getExames } from '../../Services/Exames';
import { useAuth } from '../../Contexts/AuthContext';

interface CreateModalComponentProps<T extends BaseType> {
    open: boolean;
    columnTypes: Record<keyof T, string>;
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
    const [options, setOptions] = useState<string[]>([]);
    const [currentColumn, setCurrentColumn] = useState<string>('');
    const { username } = useAuth();

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

    const handleAutoComplete = useCallback(async (coluna: string) => {
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

        if (coluna === 'exames') {
            try {
                const result = await getExames();
                const exames = result.map(values => values.nome);
                return exames;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        if (coluna === 'solicitante' && username) {
            return [username]
        }
        return [];
    }, []);

    useEffect(() => {
        setOptions([]);
        if (currentColumn) {
            handleAutoComplete(currentColumn).then(setOptions);
        }
    }, [currentColumn, handleAutoComplete]);

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '75vw',
                        height: '75vh',
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
                                    options={currentColumn === column ? options : []}
                                    onFocus={() => setCurrentColumn(column)}
                                    onChange={(_, value) => handleChange(column as keyof T, value)}
                                    value={column === 'solicitante' ? username : undefined}
                                    disabled={column === 'solicitante' && username !== null}
                                    renderInput={(params) => (
                                        <TextField {...params} label={formatLabel(column as string)} />
                                    )}
                                    noOptionsText={"Carregando..."}
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