import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, Grid, Card, CardContent,
  Paper, TextField, Select, MenuItem, InputLabel, FormControl,
  Stepper, Step, StepLabel, StepContent, Alert, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, Avatar, useTheme, useMediaQuery, Chip, CircularProgress
} from '@mui/material'
import {
  CalendarMonth, CheckCircle, ArrowForward, ArrowBack, EventAvailable,
  LocalOffer, AccessTime, DirectionsCar, BuildCircle, Person, Phone,
  DateRange, Schedule, Notes, ConfirmationNumber, Print, Login, MyLocation, LocationOn
} from '@mui/icons-material'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import ServiceIcon from '../components/ServiceIcon'

const STEPS = ['الخدمة', 'السيارة والتاريخ', 'بيانات التواصل', 'التأكيد']

export default function Booking() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { services, carBrands, timeSlots, addBooking } = useData()
  const { currentUser } = useAuth()

  const [activeStep, setActiveStep] = useState(0)
  const [selectedService, setSelectedService] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carYear, setCarYear] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  
  //  تحديد الموقع
  const [location, setLocation] = useState({ lat: null, lng: null })
  const [address, setAddress] = useState('')
  const [locating, setLocating] = useState(false)

  const [confirmation, setConfirmation] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const today = new Date().toISOString().split('T')[0]
  const activeServices = services.filter((s) => s.active)
  const selectedServiceObj = activeServices.find((s) => s.id === selectedService)

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || '')
      setCustomerPhone(currentUser.phone || '')
    }
  }, [currentUser])

  //  تحديد الموقع تلقائياً
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setSnackbar({ open: true, message: 'متصفحك لا يدعم الوصول للموقع', severity: 'error' })
      return
    }

    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setLocation({ lat, lng })
        setLocating(false)
        setSnackbar({ open: true, message: 'تم تحديد موقعك بنجاح!', severity: 'success' })
      },
      (error) => {
        setLocating(false)
        let msg = 'حدث خطأ أثناء تحديد الموقع'
        if (error.code === error.PERMISSION_DENIED) msg = 'تم رفض إذن الوصول للموقع من المتصفح'
        setSnackbar({ open: true, message: msg, severity: 'error' })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const handleNext = () => {
    if (activeStep === 0 && !selectedService) {
      setSnackbar({ open: true, message: 'يرجى اختيار الخدمة', severity: 'error' })
      return
    }
    if (activeStep === 1) {
      if (!carBrand || !carModel || !date || !time) {
        setSnackbar({ open: true, message: 'يرجى ملء جميع الحقول المطلوبة', severity: 'error' })
        return
      }
    }
    if (activeStep === 2) {
      if (!customerName.trim() || !customerPhone.trim()) {
        setSnackbar({ open: true, message: 'يرجى إدخال الاسم ورقم الهاتف', severity: 'error' })
        return
      }
    }
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleSubmit = () => {
    const booking = addBooking({
      serviceId: selectedService,
      serviceName: selectedServiceObj?.name || '',
      servicePrice: selectedServiceObj?.price || 0,
      carBrand, carModel, carYear,
      date, time, notes,
      customerName, customerPhone,
      location, // إرسال الإحداثيات
      address,  // إرسال العنوان إن وجد
      userId: currentUser?.id || null,
    })
    setConfirmation(booking)
  }

  const handleReset = () => {
    setActiveStep(0)
    setSelectedService('')
    setCarBrand(''); setCarModel(''); setCarYear('')
    setDate(''); setTime(''); setNotes('')
    setCustomerName(''); setCustomerPhone('')
    setLocation({ lat: null, lng: null })
    setAddress('')
    setConfirmation(null)
  }

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ position: 'relative', py: { xs: 6, md: 8 }, bgcolor: 'primary.dark', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -60, left: -60, width: 250, height: 250, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.08)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={1.5} alignItems="center" textAlign="center">
            <CalendarMonth sx={{ color: 'secondary.light', fontSize: 36 }} />
            <Typography variant="h3" fontWeight={800} color="#fff">
              احجز موعدك الآن
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 550 }}>
              املأ الخطوات التالية لحجز موعد صيانة سيارتك بسهولة وسرعة
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Booking Form */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <CardContent>
              <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ mb: 4 }}>
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1: Service Selection */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} color="primary.main" mb={2}>
                    اختر الخدمة المطلوبة
                  </Typography>
                  <Grid container spacing={2}>
                    {activeServices.map((service) => (
                      <Grid item xs={12} sm={6} key={service.id}>
                        <Paper
                          onClick={() => setSelectedService(service.id)}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            borderRadius: 3,
                            border: selectedService === service.id ? 2 : 1,
                            borderColor: selectedService === service.id ? 'secondary.main' : 'divider',
                            bgcolor: selectedService === service.id ? 'rgba(20,184,166,0.05)' : 'background.paper',
                            transition: 'all 0.2s',
                            '&:hover': { borderColor: 'secondary.light' },
                          }}
                        >
                          <Stack direction="row" alignItems="center" gap={1.5}>
                            <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main', borderRadius: 2 }}>
                              <ServiceIcon name={service.icon} sx={{ color: 'secondary.light', fontSize: 22 }} />
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" fontWeight={600}>{service.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{service.duration}</Typography>
                            </Box>
                            <Typography fontWeight={800} color="secondary.main">
                              {service.price} د.ك
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Step 2: Car & Date */}
              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} color="primary.main" mb={3}>
                    بيانات السيارة والموعد
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>ماركة السيارة</InputLabel>
                        <Select
                          value={carBrand}
                          label="ماركة السيارة"
                          onChange={(e) => setCarBrand(e.target.value)}
                        >
                          {carBrands.map((brand) => (
                            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="موديل السيارة"
                        placeholder="مثال: كامري"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="سنة الصنع"
                        placeholder="مثال: 2022"
                        value={carYear}
                        onChange={(e) => setCarYear(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="التاريخ المفضل"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: today }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>الوقت المفضل</InputLabel>
                        <Select
                          value={time}
                          label="الوقت المفضل"
                          onChange={(e) => setTime(e.target.value)}
                        >
                          {timeSlots.map((slot) => (
                            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="ملاحظات إضافية"
                        placeholder="اكتب أي ملاحظات أو مشاكل تواجهها مع السيارة..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 3: Contact Info & Location */}
              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} color="primary.main" mb={3}>
                    بيانات التواصل والموقع
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="الاسم الكامل"
                        placeholder="أدخل اسمك الكامل"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        InputProps={{ startAdornment: <Person sx={{ color: 'text.secondary', ml: 1, mr: 0.5 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="رقم الهاتف"
                        placeholder="05xxxxxxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        InputProps={{ startAdornment: <Phone sx={{ color: 'text.secondary', ml: 1, mr: 0.5 }} /> }}
                      />
                    </Grid>

                    {/* خيار تحديد الموقع التلقائي */}
                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                        <Stack spacing={2}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={700}>موقع الخدمة (الورشة المتنقلة)</Typography>
                              <Typography variant="caption" color="text.secondary">يمكنك تحديد موقعك التلقائي لتسهيل وصول الفني إليك</Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleGetLocation}
                              disabled={locating}
                              startIcon={locating ? <CircularProgress size={18} /> : <MyLocation />}
                            >
                              {locating ? 'جاري التحديد...' : 'حدد موقعي الآن'}
                            </Button>
                          </Stack>

                          {location.lat && location.lng && (
                            <Alert severity="success" icon={<LocationOn />} sx={{ borderRadius: 2 }}>
                              تم التقاط موقعك الحالي بنجاح!
                              <br />
                              <Typography variant="caption">
                                الإحداثيات: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                              </Typography>
                            </Alert>
                          )}

                          <TextField
                            fullWidth
                            size="small"
                            label="وصف العنوان أو الحي (اختياري)"
                            placeholder="مثال: اسم الشارع، رقم المنزل، بجانب معلم معروف..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Stack>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 4: Confirmation */}
              {activeStep === 3 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} color="primary.main" mb={3}>
                    مراجعة وتأكيد الحجز
                  </Typography>
                  <Stack gap={2}>
                    <Paper sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50' }}>
                      <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
                        <BuildCircle sx={{ color: 'secondary.main' }} />
                        <Typography fontWeight={700} color="primary.main">تفاصيل الخدمة</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">الخدمة</Typography>
                        <Typography variant="body2" fontWeight={600}>{selectedServiceObj?.name}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="text.secondary">المدة</Typography>
                        <Typography variant="body2" fontWeight={600}>{selectedServiceObj?.duration}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="text.secondary">السعر</Typography>
                        <Typography variant="body2" fontWeight={700} color="secondary.main">{selectedServiceObj?.price} د.ك</Typography>
                      </Stack>
                    </Paper>

                    <Paper sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50' }}>
                      <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
                        <DirectionsCar sx={{ color: 'secondary.main' }} />
                        <Typography fontWeight={700} color="primary.main">بيانات السيارة</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">الماركة والموديل</Typography>
                        <Typography variant="body2" fontWeight={600}>{carBrand} {carModel}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="text.secondary">سنة الصنع</Typography>
                        <Typography variant="body2" fontWeight={600}>{carYear || '-'}</Typography>
                      </Stack>
                    </Paper>

                    <Paper sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50' }}>
                      <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
                        <DateRange sx={{ color: 'secondary.main' }} />
                        <Typography fontWeight={700} color="primary.main">الموعد</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">التاريخ</Typography>
                        <Typography variant="body2" fontWeight={600}>{date}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="text.secondary">الوقت</Typography>
                        <Typography variant="body2" fontWeight={600}>{time}</Typography>
                      </Stack>
                    </Paper>

                    <Paper sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50' }}>
                      <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
                        <Person sx={{ color: 'secondary.main' }} />
                        <Typography fontWeight={700} color="primary.main">بيانات التواصل والموقع</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">الاسم</Typography>
                        <Typography variant="body2" fontWeight={600}>{customerName}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="text.secondary">الهاتف</Typography>
                        <Typography variant="body2" fontWeight={600} dir="ltr">{customerPhone}</Typography>
                      </Stack>
                      {location.lat && (
                        <Stack direction="row" justifyContent="space-between" mt={1}>
                          <Typography variant="body2" color="text.secondary">الموقع الجغرافي</Typography>
                          <Typography variant="body2" fontWeight={600} color="secondary.main">مُحدد تلقائياً 📌</Typography>
                        </Stack>
                      )}
                      {address && (
                        <Stack direction="row" justifyContent="space-between" mt={1}>
                          <Typography variant="body2" color="text.secondary">وصف العنوان</Typography>
                          <Typography variant="body2" fontWeight={600}>{address}</Typography>
                        </Stack>
                      )}
                      {notes && (
                        <>
                          <Divider sx={{ my: 1.5 }} />
                          <Typography variant="body2" color="text.secondary" mb={0.5}>ملاحظات</Typography>
                          <Typography variant="body2">{notes}</Typography>
                        </>
                      )}
                    </Paper>
                  </Stack>
                </Box>
              )}

              {/* Navigation Buttons */}
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  السابق
                </Button>
                {activeStep < 3 ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                  >
                    التالي
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    startIcon={<CheckCircle />}
                  >
                    تأكيد الحجز
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={!!confirmation}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
      >
        {confirmation && (
          <>
            <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'rgba(20,184,166,0.1)', color: 'secondary.main', mx: 'auto', mb: 1 }}>
                <CheckCircle sx={{ fontSize: 36 }} />
              </Avatar>
              <Typography variant="h5" fontWeight={800} color="primary.main">
                تم تأكيد حجزك بنجاح
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'grey.50', textAlign: 'center' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1} mb={2}>
                  <ConfirmationNumber sx={{ color: 'secondary.main' }} />
                  <Typography variant="overline" color="text.secondary">رقم الحجز</Typography>
                </Stack>
                <Typography variant="h4" fontWeight={800} color="secondary.main" sx={{ mb: 3 }}>
                  {confirmation.id}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack gap={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <BuildCircle sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">الخدمة</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>{confirmation.serviceName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <DateRange sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">التاريخ</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>{confirmation.date}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Schedule sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">الوقت</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>{confirmation.time}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <DirectionsCar sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">السيارة</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>{confirmation.carBrand} {confirmation.carModel}</Typography>
                  </Stack>
                  {confirmation.location?.lat && (
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">الموقع</Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={600} color="secondary.main">
                        <a 
                          href={`https://www.google.com/maps?q=${confirmation.location.lat},${confirmation.location.lng}`} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                          عرض خرائط جوجل ↗
                        </a>
                      </Typography>
                    </Stack>
                  )}
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" fontWeight={600}>الإجمالي</Typography>
                    <Typography variant="h6" fontWeight={800} color="secondary.main">{confirmation.servicePrice} د.ك</Typography>
                  </Stack>
                </Stack>
              </Paper>
              <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                احتفظ برقم الحجز للرجوع إليه. سنتواصل معك قريباً لتأكيد الموعد.
              </Alert>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              {currentUser && (
                <Button onClick={() => navigate('/dashboard')} variant="outlined" color="primary">
                  عرض حجوزاتي
                </Button>
              )}
              <Button onClick={handleReset} variant="contained" color="secondary">
                حجز جديد
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}