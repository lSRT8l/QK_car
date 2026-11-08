import { createTheme } from '@mui/material/styles'

const navy = {
  main: '#0F2C4D',
  light: '#1A3D63',
  dark: '#081A30',
  contrastText: '#FFFFFF',
}

const teal = {
  main: '#14B8A6',
  light: '#2DD4BF',
  dark: '#0D9488',
  contrastText: '#FFFFFF',
}

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: navy,
    secondary: teal,
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2B42',
      secondary: '#5A6B82',
    },
    success: { main: '#16A34A', light: '#22C55E' },
    warning: { main: '#F59E0B', light: '#FBBF24' },
    error: { main: '#DC2626', light: '#EF4444' },
    info: { main: '#2563EB', light: '#3B82F6' },
    divider: '#E2E8F0',
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: '"Cairo", "Segoe UI", sans-serif',
    h1: { fontWeight: 800, fontSize: '3rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.25 },
    h3: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3 },
    h4: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.35 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.65 },
    button: { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem' },
    caption: { fontSize: '0.8rem' },
    overline: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Cairo", sans-serif',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#F1F5F9',
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#CBD5E1',
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: '#94A3B8',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1A3D63',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(15,44,77,0.25)',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#0D9488',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(20,184,166,0.3)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1.05rem',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          transition: 'all 0.25s ease-in-out',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E2E8F0',
        },
        head: {
          fontWeight: 700,
          backgroundColor: '#F8FAFC',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderLeft: 'none',
          borderRight: '1px solid #E2E8F0',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
})
