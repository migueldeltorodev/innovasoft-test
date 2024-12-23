import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { clientService, IClient, IInterest } from '../services/client.service';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
  fileInput: {
    display: 'none',
  },
  imagePreview: {
    width: '100%',
    maxHeight: 200,
    objectFit: 'cover',
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));

interface ClientModalProps {
  open: boolean;
  onClose: (refreshList: boolean) => void;
  clientId: string | null;
  userId: string | undefined;
}

const DEFAULT_INTEREST_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const initialClient: IClient = {
  nombre: '',
  apellidos: '',
  identificacion: '',
  telefonoCelular: '',
  otroTelefono: '',
  direccion: '',
  fNacimiento: format(new Date(), 'yyyy-MM-dd'),
  fAfiliacion: format(new Date(), 'yyyy-MM-dd'),
  sexo: 'M',
  resenaPersonal: '',
  imagen: '',
  interesFK: DEFAULT_INTEREST_ID,
  usuarioId: '',
};

const ClientModal: React.FC<ClientModalProps> = ({
  open,
  onClose,
  clientId,
  userId,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [client, setClient] = useState<IClient>(initialClient);
  const [interests, setInterests] = useState<IInterest[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      loadInterests();
      if (clientId) {
        loadClient();
      } else {
        setClient({ ...initialClient, usuarioId: userId || '' });
      }
    }
  }, [open, clientId, userId]);

  const loadInterests = async () => {
    try {
      const data = await clientService.getInterests();
      setInterests(data);
    } catch (error) {
      enqueueSnackbar('Error al cargar los intereses', { variant: 'error' });
    }
  };

  const loadClient = async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      const data = await clientService.getClient(clientId);
      console.log('Client data loaded:', data);
      setClient(data);
    } catch (error) {
      enqueueSnackbar('Error al cargar el cliente', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!client.nombre || client.nombre.length > 50)
      newErrors.nombre = 'Nombre inválido (máximo 50 caracteres)';
    if (!client.apellidos || client.apellidos.length > 100)
      newErrors.apellidos = 'Apellidos inválidos (máximo 100 caracteres)';
    if (!client.identificacion || client.identificacion.length > 20)
      newErrors.identificacion = 'Identificación inválida (máximo 20 caracteres)';
    if (client.telefonoCelular.length > 20)
      newErrors.telefonoCelular = 'Teléfono celular inválido (máximo 20 caracteres)';
    if (client.otroTelefono.length > 20)
      newErrors.otroTelefono = 'Otro teléfono inválido (máximo 20 caracteres)';
    if (client.direccion.length > 200)
      newErrors.direccion = 'Dirección inválida (máximo 200 caracteres)';
    if (!client.sexo || !['F', 'M'].includes(client.sexo))
      newErrors.sexo = 'Sexo inválido (F/M)';
    if (client.resenaPersonal.length > 200)
      newErrors.resenaPersonal = 'Reseña personal inválida (máximo 200 caracteres)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (clientId) {
        await clientService.updateClient(client);
        enqueueSnackbar('Cliente actualizado exitosamente', { variant: 'success' });
      } else {
        await clientService.createClient(client);
        enqueueSnackbar('Cliente creado exitosamente', { variant: 'success' });
      }
      onClose(true);
    } catch (error) {
      enqueueSnackbar('Error al guardar el cliente', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setClient({ ...client, imagen: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        {clientId ? 'Editar Cliente' : 'Nuevo Cliente'}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              value={client.nombre}
              onChange={(e) => setClient({ ...client, nombre: e.target.value })}
              error={!!errors.nombre}
              helperText={errors.nombre}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellidos"
              value={client.apellidos}
              onChange={(e) => setClient({ ...client, apellidos: e.target.value })}
              error={!!errors.apellidos}
              helperText={errors.apellidos}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Identificación"
              value={client.identificacion}
              onChange={(e) => setClient({ ...client, identificacion: e.target.value })}
              error={!!errors.identificacion}
              helperText={errors.identificacion}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono Celular"
              value={client.telefonoCelular}
              onChange={(e) => setClient({ ...client, telefonoCelular: e.target.value })}
              error={!!errors.telefonoCelular}
              helperText={errors.telefonoCelular}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Otro Teléfono"
              value={client.otroTelefono}
              onChange={(e) => setClient({ ...client, otroTelefono: e.target.value })}
              error={!!errors.otroTelefono}
              helperText={errors.otroTelefono}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              value={client.direccion}
              onChange={(e) => setClient({ ...client, direccion: e.target.value })}
              error={!!errors.direccion}
              helperText={errors.direccion}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Nacimiento"
              value={client.fNacimiento}
              onChange={(e) => setClient({ ...client, fNacimiento: e.target.value })}
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Afiliación"
              value={client.fAfiliacion}
              onChange={(e) => setClient({ ...client, fAfiliacion: e.target.value })}
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Sexo"
              value={client.sexo}
              onChange={(e) => setClient({ ...client, sexo: e.target.value as 'F' | 'M' })}
              error={!!errors.sexo}
              helperText={errors.sexo}
              disabled={loading}
            >
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="M">Masculino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Interés"
              value={client.interesFK}
              onChange={(e) => setClient({ ...client, interesFK: e.target.value })}
              error={!!errors.interesFK}
              helperText={errors.interesFK}
              disabled={loading}
            >
              {interests.map((interest) => (
                <MenuItem key={interest.id} value={interest.id}>
                  {interest.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reseña Personal"
              value={client.resenaPersonal}
              onChange={(e) => setClient({ ...client, resenaPersonal: e.target.value })}
              error={!!errors.resenaPersonal}
              helperText={errors.resenaPersonal}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              className={classes.fileInput}
              id="image-file"
              type="file"
              onChange={handleImageChange}
              disabled={loading}
            />
            <label htmlFor="image-file">
              <Button
                variant="contained"
                component="span"
                disabled={loading}
              >
                Subir Imagen
              </Button>
            </label>
            {client.imagen && (
              <img
                src={client.imagen}
                alt="Preview"
                className={classes.imagePreview}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientModal;
