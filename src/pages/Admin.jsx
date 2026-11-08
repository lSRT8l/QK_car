import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, AppBar, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
  Grid, Card, CardContent, Avatar, Chip, Stack, Button, TextField,
  Select, MenuItem, InputLabel, FormControl, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Tabs, Tab, useTheme,
  useMediaQuery, Switch, FormControlLabel, Tooltip,
} from '@mui/material'
import {
  Dashboard as DashboardIcon, BuildCircle, CalendarMonth, Menu as MenuIcon,
  Add, Edit, Delete, CheckCircle, Pending, Cancel, Person, DirectionsCar,
  DateRange, LocalOffer, Close, TrendingUp, Group, Star, Refresh, Logout,
} from '@mui/icons-material'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import ServiceIcon from '../components/ServiceIcon'

const SIDEBAR_ITEMS = [
  { label: 'نظرة عامة', icon: DashboardIcon, tab: 0 },
  { label: 'الخدمات', icon: BuildCircle, tab: 1 },
  { label: 'الحجوزات', icon: CalendarMonth, tab: 2 },
]

const STATUS_CONFIG = {
  pending: { label: 'قيد الانتظار', color: 'warning', icon: Pending },
  confirmed: { label: 'مؤكد', color: 'info', icon: CheckCircle },
  completed: { label: 'مكتمل', color: 'success', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'error', icon: Cancel },
}

const SERVICE_ICONS = [
  'BuildCircle', 'FactCheck', 'Settings', 'DiskFull', 'ElectricalServices',
  'AcUnit', 'BatteryChargingFull', 'TireRepair', 'OilBarrel', 'DirectionsCar',
  'CarRepair', 'Handyman', 'Engineering',
]

const DRAWER_WIDTH = 260

export default function Admin() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const {
    services, bookings, addService, updateService, deleteService,
    updateBookingStatus, deleteBooking, resetData,
  } = useData()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serviceDialog, setServiceDialog] = useState({ open: false, mode: 'add', data: null })
  const [bookingDialog, setBookingDialog] = useState({ open: false, data: null })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: '' })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  // Stats
  const totalServices = services.length
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length
  const completedBookings = bookings.filter((b) => b.status === 'completed').length
  const totalRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + (b.servicePrice || 0), 0)

  // Service form handlers
  const openAddService = () => setServiceDialog({ open: true, mode: 'add', data: { name: '', description: '', price: '', duration: '', icon: 'BuildCircle', active: true } })
  const openEditService = (service) => setServiceDialog({ open: true, mode: 'edit', data: { ...service } })
  const closeServiceDialog = () => setServiceDialog({ open: false, mode: 'add', data: null })

  const handleSaveService = () => {
    const d = serviceDialog.data
    if (!d.name.trim() || !d.price) {
      showSnackbar('يرجى ملء الاسم والسعر', 'error')
      return
    }
    const payload = {
      name: d.name.trim(),
      description: d.description.trim(),
      price: Number(d.price),
      duration: d.duration.trim(),
      icon: d.icon || 'BuildCircle',
      active: d.active ?? true,
    }
    if (serviceDialog.mode === 'add') {
      addService(payload)
      showSnackbar('تمت إضافة الخدمة بنجاح')
    } else {
      updateService(d.id, payload)
      showSnackbar('تم تحديث الخدمة بنجاح')
    }
    closeServiceDialog()
  }

  // Booking handlers
  const openBookingDialog = (booking) => setBookingDialog({ open: true, data: { ...booking } })
  const closeBookingDialog = () => setBookingDialog({ open: false, data: null })
  const handleBookingStatusChange = (id, status) => {
    updateBookingStatus(id, status)
    showSnackbar('تم تحديث حالة الحجز')
    closeBookingDialog()
  }

  // Delete handler
  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }

  const handleDelete = () => {
    if (deleteDialog.type === 'service') deleteService(deleteDialog.id)
    else deleteBooking(deleteDialog.id)
    showSnackbar('تم الحذف بنجاح')
    setDeleteDialog({ open: false, type: '', id: '' })
  }

  const sidebar = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2, gap: 1.5 }}>
        <Avatar sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'secondary.main' }}>
          <DashboardIcon sx={{ color: '#fff' }} />
        </Avatar>
        <Box>
          <Typography fontWeight={800} color="primary.main" fontSize="1rem">لوحة التحكم</Typography>
          <Typography fontSize="0.7rem" color="text.secondary">مركز العناية</Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon
          const active = tab === item.tab
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => { setTab(item.tab); setMobileOpen(false) }}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  bgcolor: active ? 'primary.main' : 'transparent',
                  '&:hover': { bgcolor: active ? 'primary.main' : 'grey.100' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: active ? '#fff' : 'text.secondary' }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: active ? 700 : 500, color: active ? '#fff' : 'text.primary' }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          size="small"
          startIcon={<Refresh />}
          onClick={() => { resetData(); showSnackbar('تم إعادة تعيين البيانات') }}
        >
          إعادة تعيين البيانات
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          تسجيل الخروج
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box component="nav" sx={{ width: DRAWER_WIDTH, flexShrink: 0, borderLeft: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          {sidebar}
        </Box>
      )}

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: DRAWER_WIDTH } }}
      >
        {sidebar}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {isMobile && (
          <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar>
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography fontWeight={700} color="primary.main" sx={{ mr: 1 }}>لوحة التحكم</Typography>
            </Toolbar>
          </AppBar>
        )}

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Tab 0: Overview */}
          {tab === 0 && (
            <Box>
              <Typography variant="h5" fontWeight={800} color="primary.main" mb={3}>
                نظرة عامة
              </Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'إجمالي الخدمات', value: totalServices, icon: BuildCircle, color: 'primary.main' },
                  { label: 'إجمالي الحجوزات', value: totalBookings, icon: CalendarMonth, color: 'secondary.main' },
                  { label: 'حجوزات قيد الانتظار', value: pendingBookings, icon: Pending, color: 'warning.main' },
                  { label: 'حجوزات مكتملة', value: completedBookings, icon: CheckCircle, color: 'success.main' },
                  { label: 'الإيرادات (د.ك)', value: totalRevenue, icon: TrendingUp, color: 'secondary.dark' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={stat.label}>
                      <Card sx={{ p: 2, '&:hover': { borderColor: stat.color } }}>
                        <CardContent sx={{ p: 1 }}>
                          <Stack direction="row" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 52, height: 52, bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2 }}>
                              <Icon />
                            </Avatar>
                            <Box>
                              <Typography variant="h4" fontWeight={800} color="primary.main">
                                {stat.value}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {stat.label}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>

              {/* Recent Bookings */}
              <Box mt={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    أحدث الحجوزات
                  </Typography>
                  <Button size="small" color="secondary" onClick={() => setTab(2)}>
                    عرض الكل
                  </Button>
                </Stack>
                <Card>
                  <TableContainer component={Box} sx={{ overflowX: 'auto' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>رقم الحجز</TableCell>
                          <TableCell>العميل</TableCell>
                          <TableCell>الخدمة</TableCell>
                          <TableCell>التاريخ</TableCell>
                          <TableCell>الحالة</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookings.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                              <Typography color="text.secondary">لا توجد حجوزات بعد</Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          bookings.slice(-5).reverse().map((b) => {
                            const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending
                            return (
                              <TableRow key={b.id} hover>
                                <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>{b.id}</TableCell>
                                <TableCell>{b.customerName}</TableCell>
                                <TableCell>{b.serviceName}</TableCell>
                                <TableCell>{b.date}</TableCell>
                                <TableCell>
                                  <Chip label={cfg.label} color={cfg.color} size="small" />
                                </TableCell>
                              </TableRow>
                            )
                          })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Box>
          )}

          {/* Tab 1: Services Management */}
          {tab === 1 && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  إدارة الخدمات
                </Typography>
                <Button variant="contained" color="secondary" startIcon={<Add />} onClick={openAddService}>
                  إضافة خدمة
                </Button>
              </Stack>
              <Grid container spacing={3}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <Card sx={{ height: '100%', '&:hover': { borderColor: 'secondary.main' } }}>
                      <Box sx={{ bgcolor: 'primary.main', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 44, height: 44, bgcolor: 'rgba(20,184,166,0.2)', borderRadius: 2 }}>
                          <ServiceIcon name={service.icon} sx={{ color: 'secondary.light' }} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" fontWeight={700} color="#fff">{service.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{service.duration}</Typography>
                        </Box>
                        <Chip
                          label={service.active ? 'متاح' : 'متوقف'}
                          size="small"
                          sx={{ bgcolor: service.active ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.1)', color: service.active ? 'secondary.light' : 'rgba(255,255,255,0.6)' }}
                        />
                      </Box>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 44, lineHeight: 1.7 }}>
                          {service.description}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="h6" fontWeight={800} color="secondary.main">
                            {service.price} د.ك
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => openEditService(service)}
                          >
                            تعديل
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => setDeleteDialog({ open: true, type: 'service', id: service.id })}
                          >
                            <Delete />
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Tab 2: Bookings Management */}
          {tab === 2 && (
            <Box>
              <Typography variant="h5" fontWeight={800} color="primary.main" mb={3}>
                إدارة الحجوزات
              </Typography>
              <Card>
                <TableContainer component={Box} sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>رقم الحجز</TableCell>
                        <TableCell>العميل</TableCell>
                        <TableCell>الهاتف</TableCell>
                        <TableCell>الخدمة</TableCell>
                        <TableCell>السيارة</TableCell>
                        <TableCell>التاريخ</TableCell>
                        <TableCell>الوقت</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>إجراءات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                            <Stack alignItems="center" gap={1}>
                              <CalendarMonth sx={{ fontSize: 40, color: 'grey.400' }} />
                              <Typography color="text.secondary">لا توجد حجوزات بعد</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        [...bookings].reverse().map((b) => {
                          const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending
                          return (
                            <TableRow key={b.id} hover>
                              <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>{b.id}</TableCell>
                              <TableCell>{b.customerName}</TableCell>
                              <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{b.customerPhone}</TableCell>
                              <TableCell>{b.serviceName}</TableCell>
                              <TableCell>{b.carBrand} {b.carModel}</TableCell>
                              <TableCell>{b.date}</TableCell>
                              <TableCell>{b.time}</TableCell>
                              <TableCell>
                                <Chip label={cfg.label} color={cfg.color} size="small" />
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" gap={0.5}>
                                  <Tooltip title="عرض / تعديل">
                                    <IconButton size="small" color="primary" onClick={() => openBookingDialog(b)}>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="حذف">
                                    <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, type: 'booking', id: b.id })}>
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Box>
          )}
        </Container>
      </Box>

      {/* Service Add/Edit Dialog */}
      <Dialog open={serviceDialog.open} onClose={closeServiceDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight={700}>
              {serviceDialog.mode === 'add' ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}
            </Typography>
            <IconButton onClick={closeServiceDialog} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="اسم الخدمة"
                value={serviceDialog.data?.name || ''}
                onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, name: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="وصف الخدمة"
                value={serviceDialog.data?.description || ''}
                onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, description: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="السعر (ر.س)"
                value={serviceDialog.data?.price || ''}
                onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, price: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="المدة المتوقعة"
                placeholder="مثال: ساعة"
                value={serviceDialog.data?.duration || ''}
                onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, duration: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>الأيقونة</InputLabel>
                <Select
                  value={serviceDialog.data?.icon || 'BuildCircle'}
                  label="الأيقونة"
                  onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, icon: e.target.value } })}
                >
                  {SERVICE_ICONS.map((ic) => (
                    <MenuItem key={ic} value={ic}>
                      <Stack direction="row" alignItems="center" gap={1.5}>
                        <ServiceIcon name={ic} sx={{ fontSize: 20, color: 'secondary.main' }} />
                        <Typography>{ic}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={serviceDialog.data?.active ?? true}
                    onChange={(e) => setServiceDialog({ ...serviceDialog, data: { ...serviceDialog.data, active: e.target.checked } })}
                    color="secondary"
                  />
                }
                label="الخدمة متاحة للعملاء"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeServiceDialog}>إلغاء</Button>
          <Button variant="contained" color="secondary" onClick={handleSaveService}>
            {serviceDialog.mode === 'add' ? 'إضافة' : 'حفظ التعديلات'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={bookingDialog.open} onClose={closeBookingDialog} maxWidth="sm" fullWidth>
        {bookingDialog.data && (
          <>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight={700}>تفاصيل الحجز {bookingDialog.data.id}</Typography>
                <IconButton onClick={closeBookingDialog} sx={{ color: '#fff' }}>
                  <Close />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, mt: 1 }}>
              <Stack gap={2}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50' }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <Person sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography fontWeight={700} color="primary.main">بيانات العميل</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">الاسم</Typography>
                    <Typography variant="body2" fontWeight={600}>{bookingDialog.data.customerName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">الهاتف</Typography>
                    <Typography variant="body2" fontWeight={600} dir="ltr">{bookingDialog.data.customerPhone}</Typography>
                  </Stack>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50' }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <BuildCircle sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography fontWeight={700} color="primary.main">تفاصيل الخدمة</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">الخدمة</Typography>
                    <Typography variant="body2" fontWeight={600}>{bookingDialog.data.serviceName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">السيارة</Typography>
                    <Typography variant="body2" fontWeight={600}>{bookingDialog.data.carBrand} {bookingDialog.data.carModel} {bookingDialog.data.carYear}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">التاريخ والوقت</Typography>
                    <Typography variant="body2" fontWeight={600}>{bookingDialog.data.date} - {bookingDialog.data.time}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">السعر</Typography>
                    <Typography variant="body2" fontWeight={700} color="secondary.main">{bookingDialog.data.servicePrice} د.ك</Typography>
                  </Stack>
                  {bookingDialog.data.notes && (
                    <>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body2" color="text.secondary" mb={0.5}>ملاحظات</Typography>
                      <Typography variant="body2">{bookingDialog.data.notes}</Typography>
                    </>
                  )}
                </Paper>

                <FormControl fullWidth>
                  <InputLabel>حالة الحجز</InputLabel>
                  <Select
                    value={bookingDialog.data.status}
                    label="حالة الحجز"
                    onChange={(e) => handleBookingStatusChange(bookingDialog.data.id, e.target.value)}
                  >
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                      <MenuItem key={key} value={key}>{cfg.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={closeBookingDialog}>إغلاق</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, type: '', id: '' })} maxWidth="xs">
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>هل أنت متأكد من حذف {deleteDialog.type === 'service' ? 'هذه الخدمة' : 'هذا الحجز'}؟ لا يمكن التراجع عن هذا الإجراء.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteDialog({ open: false, type: '', id: '' })}>إلغاء</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>حذف</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
