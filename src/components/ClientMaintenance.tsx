import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, InputLabel, Select } from '@material-ui/core';
import axios from 'axios';

const ClientMaintenance: React.FC = () => {
  const [clientData, setClientData] = useState({
    name: '',
    surnames: '',
    id: '',
    mobilePhone: '',
    otherPhone: '',
    address: '',
    birthDate: '',
    affiliationDate: '',
    gender: '',
    personalReview: '',
    image: '',
    interests: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setClientData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call API to save client data
    await axios.post('/api/clients', clientData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Client Maintenance
      </Typography>
      <TextField label="Name" name="name" value={clientData.name} onChange={handleChange} fullWidth required inputProps={{ maxLength: 50 }} />
      <TextField label="Surnames" name="surnames" value={clientData.surnames} onChange={handleChange} fullWidth required inputProps={{ maxLength: 100 }} />
      <TextField label="ID" name="id" value={clientData.id} onChange={handleChange} fullWidth required inputProps={{ maxLength: 20 }} />
      <TextField label="Mobile Phone" name="mobilePhone" value={clientData.mobilePhone} onChange={handleChange} fullWidth required inputProps={{ maxLength: 20 }} />
      <TextField label="Other Phone" name="otherPhone" value={clientData.otherPhone} onChange={handleChange} fullWidth inputProps={{ maxLength: 20 }} />
      <TextField label="Address" name="address" value={clientData.address} onChange={handleChange} fullWidth required inputProps={{ maxLength: 200 }} />
      <TextField label="Birth Date" name="birthDate" type="date" value={clientData.birthDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
      <TextField label="Affiliation Date" name="affiliationDate" type="date" value={clientData.affiliationDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
      <InputLabel id="gender-label">Gender</InputLabel>
      <Select labelId="gender-label" name="gender" value={clientData.gender} onChange={handleChange} fullWidth required>
        <MenuItem value="M">Male</MenuItem>
        <MenuItem value="F">Female</MenuItem>
      </Select>
      <TextField label="Personal Review" name="personalReview" value={clientData.personalReview} onChange={handleChange} fullWidth inputProps={{ maxLength: 200 }} />
      <Button variant="contained" component="label" fullWidth>
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>
      <InputLabel id="interests-label">Interests</InputLabel>
      <Select labelId="interests-label" name="interests" value={clientData.interests} onChange={handleChange} fullWidth>
        <MenuItem value="sports">Sports</MenuItem>
        <MenuItem value="music">Music</MenuItem>
        <MenuItem value="technology">Technology</MenuItem>
      </Select>
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
        Save
      </Button>
    </form>
  );
};

export default ClientMaintenance;