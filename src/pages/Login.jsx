import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, TextField, Paper,
  Avatar, Divider, Alert, InputAdornment, IconButton, useTheme, useMediaQuery,
} from '@mui/material'
import {
  DirectionsCarFilled, Email, Lock, Visibility, VisibilityOff,
  Person, ArrowForward, AdminPanelSettings,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { login } = useAuth()

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
    const result = login(email.trim(), password)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left/Right side - Branding */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            bgcolor: 'primary.dark',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 6,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.08)' }} />
          <Box sx={{ position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.06)' }} />
          <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Avatar sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'secondary.main' }}>
                <DirectionsCarFilled sx={{ color: '#fff' }} />
              </Avatar>
              <Box>
                <Typography fontWeight={800} fontSize="1.3rem" color="#fff">مركز العناية</Typography>
                <Typography fontSize="0.8rem" color="secondary.light">لصيانة السيارات</Typography>
              </Box>
            </Stack>
            <Typography variant="h3" fontWeight={800} color="#fff" sx={{ lineHeight: 1.3 }}>
              أهلاً بعودتك
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, maxWidth: 400 }}>
              سجل دخولك لإدارة حجوزاتك ومتابعة حالة صيانة سيارتك بسهولة
            </Typography>
            <Stack gap={2} mt={2}>
              {['حجز مواعيد الصيانة بسهولة', 'متابعة حالة الحجوزات', 'الوصول إلى سجل الصيانة الكامل'].map((item) => (
                <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(20,184,166,0.15)' }}>
                    <ArrowForward sx={{ color: 'secondary.light', fontSize: 16 }} />
                  </Avatar>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Form side */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: { xs: 3, sm: 6 }, py: 4 }}>
        <Container maxWidth="sm" sx={{ px: 0 }}>
          <Stack spacing={3} sx={{ maxWidth: 420, mx: 'auto' }}>
            {isMobile && (
              <Stack direction="row" alignItems="center" gap={1.5} justifyContent="center">
                <Avatar sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'secondary.main' }}>
                  <DirectionsCarFilled sx={{ color: '#fff' }} />
                </Avatar>
                <Box>
                  <Typography fontWeight={800} color="primary.main">مركز العناية</Typography>
                  <Typography fontSize="0.75rem" color="secondary.main">لصيانة السيارات</Typography>
                </Box>
              </Stack>
            )}

            <Box>
              <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
                تسجيل الدخول
              </Typography>
              <Typography variant="body1" color="text.secondary">
                أدخل بياناتك للوصول إلى حسابك
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
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
                  startIcon={<Person />}
                >
                  تسجيل الدخول
                </Button>
              </Stack>
            </Box>

            <Divider>أو</Divider>

            <Stack direction="row" gap={2}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => navigate('/signup')}
              >
                إنشاء حساب جديد
              </Button>
              <Button
                fullWidth
                variant="text"
                color="primary"
                startIcon={<AdminPanelSettings />}
                onClick={() => navigate('/admin-login')}
              >
                دخول الإدارة
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" textAlign="center">
              بالدخول أنت توافق على شروط الاستخدام وسياسة الخصوصية
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="text"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              العودة للرئيسية
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
