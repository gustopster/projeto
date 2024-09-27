import { useEffect, useMemo, useState } from 'react';
import { Animal } from '../Types/AnimalsType';
import { getAnimals } from '../Services/Animals';
import { MaterialReactTable, MRT_ColumnDef, MRT_ShowHideColumnsButton, MRT_ToggleFullScreenButton } from 'material-react-table';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const AnimalsComponent: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
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
                enableStickyHeader
                enablePagination={false}
                initialState={{
                    showColumnFilters: true
                }}
            />
        </ThemeProvider>
    );
};

export default AnimalsComponent;