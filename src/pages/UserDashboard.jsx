import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, Grid, Card, CardContent,
  Paper, Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Divider, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, useMediaQuery, useTheme, TextField,
} from '@mui/material'
import {
  CalendarMonth, Person, DirectionsCar, BuildCircle, CheckCircle,
  Pending, Cancel, Logout, Edit, Close, Phone, Email, DateRange,
  Schedule, ConfirmationNumber, TrendingUp,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

const STATUS_CONFIG = {
  pending: { label: 'قيد الانتظار', color: 'warning', icon: Pending },
  confirmed: { label: 'مؤكد', color: 'info', icon: CheckCircle },
  completed: { label: 'مكتمل', color: 'success', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'error', icon: Cancel },
}

export default function UserDashboard() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { currentUser, logout, updateProfile } = useAuth()
  const { bookings } = useData()

  const [userBookings, setUserBookings] = useState([])
  const [editDialog, setEditDialog] = useState(false)
  const [editName, setEditName] = useState(currentUser?.name || '')
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '')

  useEffect(() => {
    if (currentUser) {
      setUserBookings(bookings.filter((b) => b.userId === currentUser.id).reverse())
    }
  }, [bookings, currentUser])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSaveProfile = () => {
    updateProfile({ name: editName.trim(), phone: editPhone.trim() })
    setEditDialog(false)
  }

  const stats = {
    total: userBookings.length,
    pending: userBookings.filter((b) => b.status === 'pending').length,
    completed: userBookings.filter((b) => b.status === 'completed').length,
    cancelled: userBookings.filter((b) => b.status === 'cancelled').length,
  }

  if (!currentUser) return null

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', py: 4, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -60, left: -60, width: 250, height: 250, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.08)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" gap={2}>
            <Stack direction="row" alignItems="center" gap={2}>
              
              
            </Stack>
            
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats */}
        <Grid container spacing={3} mb={4}>
          {[
            { label: 'إجمالي الحجوزات', value: stats.total, icon: CalendarMonth, color: 'primary.main' },
            { label: 'قيد الانتظار', value: stats.pending, icon: Pending, color: 'warning.main' },
            { label: 'مكتملة', value: stats.completed, icon: CheckCircle, color: 'success.main' },
            { label: 'ملغاة', value: stats.cancelled, icon: Cancel, color: 'error.main' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Grid item xs={6} md={3} key={stat.label}>
                <Card sx={{ p: 2, '&:hover': { borderColor: stat.color } }}>
                  <CardContent sx={{ p: 1 }}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2 }}>
                        <Icon />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight={800} color="primary.main">{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 'fit-content' }}>
              <Box sx={{ bgcolor: 'primary.main', p: 2.5, textAlign: 'center' }}>
                <Avatar sx={{ width: 72, height: 72, bgcolor: 'secondary.main', mx: 'auto', mb: 1, fontSize: '2rem', fontWeight: 700 }}>
                  {currentUser.name?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="#fff">{currentUser.name}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>عميل</Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Stack gap={2}>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Email sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">البريد الإلكتروني</Typography>
                      <Typography variant="body2" fontWeight={600}>{currentUser.email}</Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Phone sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">رقم الهاتف</Typography>
                      <Typography variant="body2" fontWeight={600} dir="ltr">{currentUser.phone || 'غير محدد'}</Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => setEditDialog(true)}
                  >
                    تعديل البيانات
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<CalendarMonth />}
                    onClick={() => navigate('/booking')}
                  >
                    حجز موعد جديد
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Bookings Table */}
          <Grid item xs={12} md={8}>
            <Card>
              <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  حجوزاتي
                </Typography>
              </Box>
              {isMobile ? (
                <Box sx={{ p: 2 }}>
                  {userBookings.length === 0 ? (
                    <Stack alignItems="center" gap={2} sx={{ py: 6 }}>
                      <CalendarMonth sx={{ fontSize: 48, color: 'grey.400' }} />
                      <Typography color="text.secondary">لا توجد حجوزات بعد</Typography>
                      <Button variant="contained" color="secondary" onClick={() => navigate('/booking')}>
                        احجز موعدك الآن
                      </Button>
                    </Stack>
                  ) : (
                    <Stack gap={2}>
                      {userBookings.map((b) => {
                        const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending
                        return (
                          <Paper key={b.id} sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                              <Typography fontWeight={700} color="secondary.main">{b.id}</Typography>
                              <Chip label={cfg.label} color={cfg.color} size="small" />
                            </Stack>
                            <Typography variant="body2" fontWeight={600} mb={0.5}>{b.serviceName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {b.carBrand} {b.carModel} - {b.date} - {b.time}
                            </Typography>
                            <Typography variant="body2" fontWeight={700} color="secondary.main" mt={1}>
                              {b.servicePrice} د.ك
                            </Typography>
                          </Paper>
                        )
                      })}
                    </Stack>
                  )}
                </Box>
              ) : (
                <TableContainer component={Box} sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>رقم الحجز</TableCell>
                        <TableCell>الخدمة</TableCell>
                        <TableCell>السيارة</TableCell>
                        <TableCell>التاريخ</TableCell>
                        <TableCell>الوقت</TableCell>
                        <TableCell>السعر</TableCell>
                        <TableCell>الحالة</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                            <Stack alignItems="center" gap={2}>
                              <CalendarMonth sx={{ fontSize: 40, color: 'grey.400' }} />
                              <Typography color="text.secondary">لا توجد حجوزات بعد</Typography>
                              <Button variant="contained" color="secondary" size="small" onClick={() => navigate('/booking')}>
                                احجز موعدك الآن
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        userBookings.map((b) => {
                          const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending
                          return (
                            <TableRow key={b.id} hover>
                              <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>{b.id}</TableCell>
                              <TableCell>{b.serviceName}</TableCell>
                              <TableCell>{b.carBrand} {b.carModel}</TableCell>
                              <TableCell>{b.date}</TableCell>
                              <TableCell>{b.time}</TableCell>
                              <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>{b.servicePrice} د.ك</TableCell>
                              <TableCell><Chip label={cfg.label} color={cfg.color} size="small" /></TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight={700}>تعديل البيانات الشخصية</Typography>
            <IconButton onClick={() => setEditDialog(false)} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt: 1 }}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="الاسم الكامل"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              fullWidth
              label="رقم الهاتف"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              لا يمكن تغيير البريد الإلكتروني بعد التسجيل
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialog(false)}>إلغاء</Button>
          <Button variant="contained" color="secondary" onClick={handleSaveProfile}>
            حفظ التغييرات
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
