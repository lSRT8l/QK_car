import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, TextField, Paper,
  Avatar, Divider, Alert, InputAdornment, IconButton, useTheme, useMediaQuery,
} from '@mui/material'
import {
  DirectionsCarFilled, Email, Lock, Visibility, VisibilityOff,
  Person, Phone, ArrowForward, CheckCircle,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('يرجى ملء جميع الحقول')
      return
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }
    const result = signup(name.trim(), email.trim(), phone.trim(), password)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Branding side */}
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
          <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.08)' }} />
          <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.06)' }} />
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
              انضم إلينا اليوم
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, maxWidth: 400 }}>
              أنشئ حسابك واحجز مواعيد صيانة سيارتك بسهولة وتابع حالتها في أي وقت
            </Typography>
            <Stack gap={2} mt={2}>
              {[
                'حجز فوري لخدمات الصيانة',
                'متابعة حالة الحجوزات أولاً بأول',
                'سجل كامل لكل صيانة سيارتك',
                'تنبيهات وتذكير بالمواعيد',
              ].map((item) => (
                <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(20,184,166,0.15)' }}>
                    <CheckCircle sx={{ color: 'secondary.light', fontSize: 16 }} />
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
                إنشاء حساب جديد
              </Typography>
              <Typography variant="body1" color="text.secondary">
                املأ البيانات التالية للتسجيل
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="الاسم الكامل"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.secondary' }} /></InputAdornment>,
                  }}
                />
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
                  label="رقم الهاتف"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'text.secondary' }} /></InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth
                  label="كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="6 أحرف على الأقل"
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
                <TextField
                  fullWidth
                  label="تأكيد كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary' }} /></InputAdornment>,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<CheckCircle />}
                >
                  إنشاء الحساب
                </Button>
              </Stack>
            </Box>

            <Divider>أو</Divider>

            <Stack direction="row" gap={2}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
              >
                لدي حساب بالفعل
              </Button>
            </Stack>

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
