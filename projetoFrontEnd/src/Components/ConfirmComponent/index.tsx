import { Modal, Box, Typography, Button } from '@mui/material';

type ConfirmComponentProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// Usando a interface para tipar as props
const ConfirmComponent: React.FC<ConfirmComponentProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Confirmação
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Você tem certeza de que deseja continuar?
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={onConfirm}>
                        Sim
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Não
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmComponent;