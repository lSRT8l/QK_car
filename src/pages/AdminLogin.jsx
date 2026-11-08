import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, TextField, Paper,
  Avatar, Alert, InputAdornment, IconButton, useTheme, useMediaQuery,
} from '@mui/material'
import {
  AdminPanelSettings, Email, Lock, Visibility, VisibilityOff,
  DirectionsCarFilled, Login as LoginIcon, ArrowBack,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { adminLogin } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('يرجى ملء جميع الحقول')
      return
    }
    const result = adminLogin(email.trim(), password)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/admin')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.dark',
        position: 'relative',
        overflow: 'hidden',
        px: 3,
      }}
    >
      <Box sx={{ position: 'absolute', top: -100, left: -100, width: 350, height: 350, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.08)' }} />
      <Box sx={{ position: 'absolute', bottom: -120, right: -120, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.06)' }} />

      <Paper
        elevation={8}
        sx={{
          maxWidth: 460,
          width: '100%',
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', borderRadius: 3 }}>
            <AdminPanelSettings sx={{ color: 'secondary.light', fontSize: 32 }} />
          </Avatar>

          <Box textAlign="center">
            <Typography variant="h5" fontWeight={800} color="primary.main">
              دخول لوحة الإدارة
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              هذه الصفحة مخصصة للمسؤولين فقط
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ borderRadius: 2, width: '100%' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary' }} /></InputAdornment>,
                }}
              />
              <TextField
                fullWidth
                label="كلمة المرور"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary' }} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<LoginIcon />}
              >
                دخول الإدارة
              </Button>
            </Stack>
          </Box>

          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50', width: '100%' }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              بيانات تجريبية
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">البريد:</Typography>
              <Typography variant="body2" fontWeight={600} dir="ltr">admin@carcare.sa</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mt={0.5}>
              <Typography variant="body2" color="text.secondary">كلمة المرور:</Typography>
              <Typography variant="body2" fontWeight={600} dir="ltr">admin123</Typography>
            </Stack>
          </Paper>

          <Button
            component={Link}
            to="/"
            variant="text"
            size="small"
            startIcon={<ArrowBack />}
            sx={{ color: 'text.secondary' }}
          >
            العودة للرئيسية
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
