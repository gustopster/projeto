// src/Components/SolicitantesComponent.tsx

import { useEffect, useMemo, useState } from 'react';
import { createSolicitante, deleteSolicitante, getSolicitantes, updateSolicitante } from '../../Services/Solicitantes';
import { MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_ShowHideColumnsButton, MRT_TableOptions, MRT_ToggleFullScreenButton } from 'material-react-table';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from '../ConfirmComponent/indexContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useCreateModal } from '../CreateModalComponent/indexContext';
import { Solicitante } from '../../Types/Solicitante';

const SolicitantesComponent: React.FC = () => {
    const [solicitantes, setSolicitantes] = useState<Solicitante[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchSolicitantes = async () => {
        try {
            const data = await getSolicitantes();
            setSolicitantes(data);
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
        fetchSolicitantes();
    }, []);

    const columns = useMemo<MRT_ColumnDef<Solicitante>[]>(() => [
        {
            header: 'Nome',
            accessorKey: 'nome',
        },
        {
            header: 'Permissão',
            accessorKey: 'permissao',
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
    const handleEditSolicitante: MRT_TableOptions<Solicitante>['onEditingRowSave'] = async ({ values, table }) => {
        if (idForEdit) {
            updateSolicitante(idForEdit, values).then((result) => {
                if (result === 204) {
                    fetchSolicitantes();
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        table.setEditingRow(null);
    };

    const { handleOpenCreateModal } = useCreateModal<Solicitante>();
    const openCreateModal = () => {
        const columnTypes: Record<keyof Solicitante, string> = {
            id: 'string',
            nome: 'string',
            permissao: "comboBox"
        };
        handleOpenCreateModal(columnTypes, (data) => {
            createSolicitante({ ...data, id: 0 }).then((result) => {
                setSolicitantes((prevState) => [...prevState, result]);
            });
        });
    };

    const { handleOpen } = useConfirm();
    const openDeleteConfirmModal = (row: MRT_Row<Solicitante>) => {
        handleOpen(() => {
            deleteSolicitante(row.original.id).then((result) => {
                if (result === 204) {
                    fetchSolicitantes();
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                onEditingRowSave={handleEditSolicitante}
                columns={columns}
                data={solicitantes}
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
                                    titleAccess='Adicionar Novo Solicitante'
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
                            <Tooltip title="Excluir">
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

export default SolicitantesComponent;