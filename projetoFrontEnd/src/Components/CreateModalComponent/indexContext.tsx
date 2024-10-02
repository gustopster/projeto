import { createContext, useContext, useState, ReactNode } from 'react';
import CreateModalComponent from './index'; // Componente que será o modal dinâmico
import { BaseType } from '../../Types/BaseType';

interface CreateModalContextType<T extends BaseType> {
    handleOpenCreateModal: (
        columnTypes: Record<keyof T, string>,
        onSubmitCallback: (data: T) => void
    ) => void;
}

const CreateModalContext = createContext<CreateModalContextType<BaseType> | null>(null);

export const CreateModalProvider = <T extends BaseType>({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [columnTypes, setColumnTypes] = useState<Partial<Record<keyof BaseType, string>>>({});
    const [onSubmit, setOnSubmit] = useState<(data: T) => void>(() => () => { });

    const handleOpenCreateModal = (
        columnTypes: Record<keyof BaseType, string>,
        onSubmitCallback: (data: T) => void
    ) => {
        setColumnTypes(columnTypes);
        setOnSubmit(() => onSubmitCallback);
        setOpen(true);
    };

    const handleCloseCreateModal = () => {
        setOpen(false);
    };

    const handleSubmit = (data: T) => {
        onSubmit(data);
        handleCloseCreateModal();
    };

    return (
        <CreateModalContext.Provider value={{ handleOpenCreateModal }}>
            {children}
            <CreateModalComponent
                open={open}
                columnTypes={columnTypes as Record<keyof T, string>}
                onClose={handleCloseCreateModal}
                onSubmit={handleSubmit}
            />
        </CreateModalContext.Provider>
    );
};

export const useCreateModal = <T extends BaseType>() => {
    const context = useContext(CreateModalContext) as CreateModalContextType<T>;
    if (!context) {
        throw new Error('useCreateModal must be used within a CreateModalProvider');
    }
    return context;
};