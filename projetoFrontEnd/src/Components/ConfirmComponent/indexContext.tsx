import React, { createContext, useContext, useState, ReactNode } from 'react';
import ConfirmComponent from './index';

interface ConfirmContextType {
    handleOpen: (confirmCallback: () => void) => void;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState(() => () => { });

    const handleOpen = (confirmCallback: () => void) => {
        setOnConfirm(() => confirmCallback);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <ConfirmContext.Provider value={{ handleOpen }}>
            {children}
            <ConfirmComponent open={open} onClose={handleClose} onConfirm={handleConfirm} />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context;
};