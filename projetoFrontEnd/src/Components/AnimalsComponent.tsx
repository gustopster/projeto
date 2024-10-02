import { useEffect, useMemo, useState } from 'react';
import { Animal } from '../Types/AnimalsType';
import { deleteAnimal, getAnimals, updateAnimal } from '../Services/Animals';
import { MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_ShowHideColumnsButton, MRT_TableOptions, MRT_ToggleFullScreenButton } from 'material-react-table';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from './ConfirmComponent/indexContext';

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
            header: 'Nome',
            accessorKey: 'name'
        },
        {
            header: 'Tipo',
            accessorKey: 'type'
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
            header: 'N IPRAM',
            accessorKey: 'numeroIdIpram'
        },
        {
            header: 'FAI',
            accessorKey: 'fai'
        },
        {
            header: 'Observações',
            accessorKey: 'observacoes'
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

    const deleteUser = (id: number) => {
        deleteAnimal(id).then((result) => {
            if (result === 200) {
                fetchAnimals();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const { handleOpen } = useConfirm();
    const openDeleteConfirmModal = (row: MRT_Row<Animal>) => {
        handleOpen(() => {
            deleteUser(row.original.id);
        });
    };

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

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                onEditingRowSave={handleEditAnimal}
                columns={columns}
                data={animals}
                localization={{
                    noRecordsToDisplay: error ? error : undefined
                }}
                renderToolbarInternalActions={({
                    table
                }) => {
                    return <>
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleFullScreenButton table={table} />
                    </>;
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