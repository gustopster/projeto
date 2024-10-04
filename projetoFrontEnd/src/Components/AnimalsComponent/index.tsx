import { useEffect, useMemo, useState } from 'react';
import { Animal } from '../../Types/AnimalsType';
import { createAnimal, deleteAnimal, getAnimals, updateAnimal } from '../../Services/Animals';
import { MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_ShowHideColumnsButton, MRT_TableOptions, MRT_ToggleFullScreenButton } from 'material-react-table';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from '../ConfirmComponent/indexContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useCreateModal } from '../CreateModalComponent/indexContext';

const AnimalsComponent: React.FC = () => {

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAnimals = async () => {
        try {
            const data = await getAnimals();
            setAnimals(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                setError(error.message);
            } else {
                console.error('Erro desconhecido');
                setError('Erro desconhecido');
            }
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const columns = useMemo<MRT_ColumnDef<Animal>[]>(() => [
        {
            header: 'N IPRAM',
            accessorKey: 'numeroIdIpram'
        },
        {
            header: 'FAI',
            accessorKey: 'fai'
        },
        {
            header: 'Data de Coleta',
            accessorKey: 'dataColeta',
            Cell: ({ cell }) => {
                const resultado = cell.getValue() as Date;
                const dataFormatada = resultado ? new Date(resultado).toLocaleDateString() : 'Data inválida';
                return (
                    <span>
                        {dataFormatada}
                    </span>
                );
            }
        },
        {
            header: 'Observações',
            accessorKey: 'observacoes'
        },
        {
            header: 'Exames',
            accessorKey: 'exames'
        },
        {
            header: 'Tumor',
            accessorKey: 'tumor'
        },
        {
            header: 'Solicitante',
            accessorKey: 'solicitante'
        }
    ], []);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#81980f'
            },
            secondary: {
                main: '#00bcd4'
            }
        }
    });

    const [idForEdit, setIdForEdit] = useState<null | number>(null);
    const handleEditAnimal: MRT_TableOptions<Animal>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        if (idForEdit) {
            updateAnimal(idForEdit, values).then((result) => {
                if (result === 204) {
                    fetchAnimals();
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        table.setEditingRow(null);
    };

    const { handleOpenCreateModal } = useCreateModal<Animal>();
    const openCreateModal = () => {
        const columnTypes: Record<keyof Animal, string> = {
            id: 'string',
            dataColeta: 'date',
            numeroIdIpram: 'string',
            fai: 'string',
            observacoes: 'string',
            exames: 'comboBox',
            solicitante: 'comboBox',
            tumor: 'comboBox',
        };
        handleOpenCreateModal(columnTypes, (data) => {
            createAnimal({ ...data, id: 0 }).then((result) => {
                setAnimals((prevState) => [...prevState, result])
            })
        });
    };

    const { handleOpen } = useConfirm();
    const openDeleteConfirmModal = (row: MRT_Row<Animal>) => {
        handleOpen(() => {
            deleteAnimal(row.original.id).then((result) => {
                if (result === 204) {
                    fetchAnimals();
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                onEditingRowSave={handleEditAnimal}
                columns={columns}
                data={animals}
                localization={{
                    noRecordsToDisplay: error ? error : undefined
                }}
                renderTopToolbar={({ table }) => {
                    return (
                        <Box display="flex" alignItems="center">
                            <Box display="flex" alignItems="center" sx={{ marginRight: 'auto' }}>
                                <AddBoxIcon
                                    sx={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                        '&:hover': {
                                            background: "#fff",
                                            color: "#000",
                                            border: 'solid 1px #81980f',
                                            borderRadius: "10px"
                                        }
                                    }}
                                    fontSize='large'
                                    titleAccess='Adicionar Novo Animal'
                                    onClick={openCreateModal}
                                />
                            </Box>
                            <Box display="flex" alignItems="center">
                                <MRT_ShowHideColumnsButton table={table} size='large' />
                                <MRT_ToggleFullScreenButton table={table} size='large' />
                            </Box>
                        </Box>
                    );
                }}
                muiTablePaperProps={{
                    sx: {
                        m: 'auto',
                        maxWidth: '95%',
                        borderRadius: '10px',
                        marginTop: '20px'
                    }
                }}
                muiTableContainerProps={{
                    sx: {
                        maxHeight: '65vh'
                    }
                }}
                enableStickyHeader={true}
                enablePagination={false}
                initialState={{
                    showColumnFilters: true,
                    columnVisibility: {
                        id: false
                    }
                }}
                enableEditing={true}
                renderRowActions={({ table, row }) => {
                    return (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip title="Editar">
                                <IconButton onClick={() => {
                                    setIdForEdit(row.original.id);
                                    table.setEditingRow(row);
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    );
                }}
            />
        </ThemeProvider>
    );
};

export default AnimalsComponent;