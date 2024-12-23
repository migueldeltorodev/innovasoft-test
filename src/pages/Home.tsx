import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Paper,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SecurityIcon from '@material-ui/icons/Security';
import SpeedIcon from '@material-ui/icons/Speed';
import GroupIcon from '@material-ui/icons/Group';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: `
      linear-gradient(135deg, 
        rgba(37, 99, 235, 0.9) 0%,
        rgba(59, 130, 246, 0.8) 50%,
        rgba(96, 165, 250, 0.7) 100%
      )
    `,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
      backdropFilter: 'blur(8px)',
      zIndex: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120%',
      height: '120%',
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      filter: 'blur(60px)',
      zIndex: 0,
    },
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  statCard: {
    padding: theme.spacing(3),
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(16px)',
    borderRadius: theme.shape.borderRadius * 2,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 'auto',
    background: theme.palette.primary.main,
  },
  ctaSection: {
    background: theme.palette.background.default,
    padding: theme.spacing(8, 0),
    textAlign: 'center',
  },
  '@keyframes morphing': {
    '0%': {
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    },
    '50%': {
      borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
    },
    '100%': {
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    },
  },
}));

const MotionBox = motion(Box);

const Home: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const features = [
    {
      title: 'Análisis Predictivo',
      description: 'Utiliza IA avanzada para predecir tendencias y comportamientos',
      icon: <TrendingUpIcon fontSize="large" />,
    },
    {
      title: 'Seguridad Reforzada',
      description: 'Protección de datos de última generación con encriptación end-to-end',
      icon: <SecurityIcon fontSize="large" />,
    },
    {
      title: 'Rendimiento Optimizado',
      description: 'Sistema altamente escalable con respuesta instantánea',
      icon: <SpeedIcon fontSize="large" />,
    },
    {
      title: 'Colaboración en Tiempo Real',
      description: 'Trabajo en equipo sin fricción con actualizaciones instantáneas',
      icon: <GroupIcon fontSize="large" />,
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Tiempo de Actividad' },
    { value: '+10K', label: 'Usuarios Activos' },
    { value: '24/7', label: 'Soporte Técnico' },
    { value: '+50', label: 'Integraciones' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container maxWidth="lg" className={classes.heroContent}>
          <Grid container spacing={6} alignItems="center" style={{ minHeight: '80vh' }}>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Typography 
                  variant="h1" 
                  gutterBottom 
                  style={{ 
                    fontWeight: 800,
                    fontSize: '3.5rem',
                    lineHeight: 1.2,
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(to right, #ffffff, #e0e7ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Innovación en Cada Línea de Código
                </Typography>
                <Typography 
                  variant="h5" 
                  paragraph 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '2rem',
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                  }}
                >
                  Transformando ideas en soluciones tecnológicas de vanguardia que impulsan el futuro digital de tu negocio
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: theme.palette.primary.main,
                    padding: '12px 32px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '50px',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Comenzar Ahora
                </Button>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  height="500px"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      width: '80%',
                      height: '80%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      animation: 'morphing 15s ease-in-out infinite',
                    }}
                  />
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" style={{ marginTop: -40 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className={classes.card}>
                <CardContent>
                  <Avatar className={classes.avatar}>{feature.icon}</Avatar>
                  <Typography variant="h6" align="center" gutterBottom style={{ marginTop: 16 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" style={{ marginTop: theme.spacing(8) }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper className={classes.statCard} elevation={0}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box className={classes.ctaSection}>
        <Container maxWidth="sm">
          <Typography variant="h3" gutterBottom>
            ¿Listo para Innovar?
          </Typography>
          <Typography variant="subtitle1" paragraph color="textSecondary">
            Únete a miles de empresas que ya están transformando su futuro digital
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            style={{ marginTop: theme.spacing(2) }}
          >
            Comienza tu Prueba Gratuita
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
