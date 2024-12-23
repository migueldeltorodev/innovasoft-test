import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { clientService, IClientListItem } from '../services/client.service';
import ClientModal from '../components/ClientModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useSnackbar } from 'notistack';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  searchField: {
    width: 300,
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
  },
  noData: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  actionButton: {
    marginLeft: theme.spacing(1),
  },
}));

const ClientManagement: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [clients, setClients] = useState<IClientListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.searchClients(searchTerm);
      setClients(data);
    } catch (error) {
      enqueueSnackbar('Error al cargar los clientes', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSearch = () => {
    loadClients();
  };

  const handleAddClient = () => {
    setSelectedClient(null);
    setModalOpen(true);
  };

  const handleEditClient = (id: string) => {
    setSelectedClient(id);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setClientToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clientToDelete) return;

    try {
      await clientService.deleteClient(clientToDelete);
      enqueueSnackbar('Cliente eliminado exitosamente', { variant: 'success' });
      loadClients();
    } catch (error) {
      enqueueSnackbar('Error al eliminar el cliente', { variant: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  const handleModalClose = (refreshList: boolean) => {
    setModalOpen(false);
    setSelectedClient(null);
    if (refreshList) {
      loadClients();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">Gestión de Clientes</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          Nuevo Cliente
        </Button>
      </div>

      <Box className={classes.searchContainer}>
        <TextField
          className={classes.searchField}
          variant="outlined"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginLeft: 16 }}
        >
          Buscar
        </Button>
      </Box>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Identificación</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.identificacion}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.apellidos}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClient(client.id)}
                    className={classes.actionButton}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(client.id)}
                    className={classes.actionButton}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4} className={classes.noData}>
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ClientModal
        open={modalOpen}
        onClose={handleModalClose}
        clientId={selectedClient}
        userId={user?.userId}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Eliminar Cliente"
        content="¿Está seguro que desea eliminar este cliente?"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default ClientManagement;
