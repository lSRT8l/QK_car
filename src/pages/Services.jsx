import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, Grid, Card, CardContent,
  Paper, Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery,
} from '@mui/material'
import {
  CalendarMonth, ArrowForward, Star, AccessTime, LocalOffer,
  BuildCircle, CheckCircle, Close,
} from '@mui/icons-material'
import { useData } from '../context/DataContext'
import ServiceIcon from '../components/ServiceIcon'

export default function Services() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { services } = useData()
  const [selected, setSelected] = useState(null)

  const activeServices = services.filter((s) => s.active)

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 7, md: 10 },
          overflow: 'hidden',
          bgcolor: 'primary.dark',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100, left: -100,
            width: 300, height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(20,184,166,0.08)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -80, right: -80,
            width: 250, height: 250,
            borderRadius: '50%',
            bgcolor: 'rgba(20,184,166,0.06)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip
              label="خدماتنا"
              sx={{
                bgcolor: 'rgba(20,184,166,0.15)',
                color: 'secondary.light',
                fontWeight: 600,
                border: '1px solid rgba(20,184,166,0.3)',
              }}
            />
            <Typography variant="h2" fontWeight={800} color="#fff">
              جميع خدمات الصيانة
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>
              نقدم باقة متكاملة من خدمات الصيانة لتلبية جميع احتياجات سيارتك
              على يد فريق من الفنيين المهرة
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {activeServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(15,44,77,0.08)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Avatar sx={{ width: 52, height: 52, bgcolor: 'rgba(20,184,166,0.2)', borderRadius: 2 }}>
                      <ServiceIcon name={service.icon} sx={{ color: 'secondary.light' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#fff">
                        {service.name}
                      </Typography>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTime sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          {service.duration}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1, lineHeight: 1.8 }}>
                      {service.description}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h5" fontWeight={800} color="secondary.main">
                        {service.price} د.ك
                      </Typography>
                      <Chip
                        icon={<Star sx={{ fontSize: 16 }} />}
                        label="خدمة مميزة"
                        size="small"
                        sx={{ bgcolor: 'rgba(20,184,166,0.1)', color: 'secondary.dark' }}
                      />
                    </Stack>
                    <Stack direction="row" gap={1}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelected(service)}
                      >
                        التفاصيل
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/booking')}
                      >
                        احجز
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Service Details Dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        {selected && (
          <>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff', py: 2.5 }}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: 'rgba(20,184,166,0.2)', borderRadius: 2 }}>
                  <ServiceIcon name={selected.icon} sx={{ color: 'secondary.light' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#fff">{selected.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{selected.duration}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton onClick={() => setSelected(null)} sx={{ color: '#fff' }}>
                  <Close />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.9, mb: 3 }}>
                {selected.description}
              </Typography>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                تشمل الخدمة
              </Typography>
              <Stack gap={1.5}>
                {[
                  'فحص شامل للأجزاء المتعلقة بالخدمة',
                  'استخدام قطع غيار أصلية',
                  'فحص بأحدث الأجهزة التقنية',
                  'ضمان على الخدمة المقدمة',
                ].map((item) => (
                  <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                    <CheckCircle sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <LocalOffer sx={{ color: 'secondary.main' }} />
                    <Typography variant="body2" color="text.secondary">السعر</Typography>
                  </Stack>
                  <Typography variant="h5" fontWeight={800} color="secondary.main">
                    {selected.price} د.ك
                  </Typography>
                </Stack>
              </Paper>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setSelected(null)}>إغلاق</Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CalendarMonth />}
                onClick={() => { setSelected(null); navigate('/booking') }}
              >
                احجز هذه الخدمة
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
