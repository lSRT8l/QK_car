import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, Grid, Card, CardContent,
  Paper, Avatar, Divider, useTheme, useMediaQuery,
} from '@mui/material'
import {
  CalendarMonth, ArrowForward, Shield, Speed, Verified,
  Support, BuildCircle, Star, CheckCircle, LocalOffer,
  DirectionsCarFilled, Engineering, Factory, Group,
} from '@mui/icons-material'
import { useData } from '../context/DataContext'
import ServiceIcon from '../components/ServiceIcon'

const HERO_IMAGE = 'https://images.pexels.com/photos/4489776/pexels-photo-4489776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
const ABOUT_PREVIEW_IMAGE = 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

const FEATURES = [
  { icon: Shield, title: 'ضمان على الخدمة', desc: 'نقدم ضمان على جميع خدمات الصيانة وقطع الغيار الأصلية' },
  { icon: Speed, title: 'خدمة سريعة', desc: 'فريق محترف يضمن إنجاز الصيانة في أسرع وقت ممكن' },
  { icon: Verified, title:'فنيون خبراء حتى امام منزلك', desc: 'اصلاح وصيانة سيارتك بكل امانة واحترافية' },
  { icon: Support, title: 'دعم متواصل', desc: 'فريق دعم متواجد للإجابة على استفساراتك في أي وقت' },
]

const STATS = [
  { value: '7+', label: 'سنوات خبرة', icon: Star },
  { value: '10K+', label: 'عميل سعيد', icon: Group },
  { value: '10K+', label: 'صيانة منجزة', icon: BuildCircle },
  { value: '8', label: 'فنيين متخصصين', icon: Engineering },
]

export default function Home() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { services } = useData()
  const featuredServices = services.filter((s) => s.active).slice(0, 6)

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '85vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}f0 0%, ${theme.palette.primary.main}d0 100%)`,
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          src={HERO_IMAGE}
          alt="ورشة صيانة سيارات"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 0 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Paper
                  elevation={0}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2, py: 0.8,
                    borderRadius: 50,
                    bgcolor: 'rgba(20,184,166,0.15)',
                    border: '1px solid rgba(20,184,166,0.3)',
                    width: 'fit-content',
                  }}
                >
                  <LocalOffer sx={{ color: 'secondary.light', fontSize: 18 }} />
                  <Typography sx={{ color: 'secondary.light', fontWeight: 600, fontSize: '0.85rem' }}>
                    مركز صيانة معتمد وموثوق
                  </Typography>
                </Paper>

                <Typography
                  variant="h1"
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem', lg: '3.5rem' },
                    lineHeight: 1.2,
                    fontWeight: 800,
                  }}
                >
                  نعتني بسيارتك
                  <br />
                  <Box component="span" sx={{ color: 'secondary.light' }}>كما تستحق</Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: { xs: '1rem', md: '1.15rem' },
                    maxWidth: '520px',
                    lineHeight: 1.8,
                  }}
                >
                   متخصص في صيانة وإصلاح جميع أنواع السيارات بأحدث الأجهزة
                  التقنية . نضمن لك خدمة عالية الجودة
                  وأسعاراً تنافسية.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<CalendarMonth />}
                    onClick={() => navigate('/booking')}
                  >
                    احجز موعدك الآن
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/services')}
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                    }}
                    endIcon={<ArrowForward />}
                  >
                    استكشف خدماتنا
                  </Button>
                </Stack>

                <Stack direction="row" gap={4} sx={{ mt: 3 }}>
                  {[
                    { value: '7+', label: 'سنوات خبرة' },
                    { value: '10K+', label: 'عميل سعيد' },
                    { value: '10K+', label: 'صيانة منجزة' },
                  ].map((stat) => (
                    <Box key={stat.label}>
                      <Typography sx={{ color: 'secondary.light', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {!isMobile && (
              <Grid item md={5}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="primary.main" mb={1}>
                    لماذا تختارنا؟
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    نقدم خدمات صيانة متميزة بأعلى معايير الجودة
                  </Typography>
                  <Stack gap={2}>
                    {[
                      'فنيون معتمدون ومدربون',
                      'قطع غيار أصلية مضمونة',
                      'أجهزة تشخيص حديثة',
                      'أسعار تنافسية وشفافة',
                      'ضمان على جميع الخدمات',
                    ].map((item) => (
                      <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                        <CheckCircle sx={{ color: 'secondary.main', fontSize: 22 }} />
                        <Typography variant="body2" fontWeight={500}>{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => navigate('/about')}
                  >
                    تعرف علينا أكثر
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
              مميزاتنا
            </Typography>
            <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
              لماذا يثق بنا عملاؤنا؟
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              نقدم تجربة صيانة متنقلة و متكاملة تجمع بين الخبرة والاحترافية والتقنية الحديثة
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Grid item xs={12} sm={6} md={3} key={feature.title}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 2,
                      '&:hover': {
                        borderColor: 'secondary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(15,44,77,0.08)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                      <Avatar
                        sx={{
                          width: 60, height: 60,
                          bgcolor: 'rgba(20,184,166,0.1)',
                          color: 'secondary.main',
                          mx: 'auto', mb: 2,
                        }}
                      >
                        <Icon fontSize="large" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Services Preview Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            mb={5}
            gap={2}
          >
            <Box>
              <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
                خدماتنا
              </Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main">
                خدمات الصيانة المتنقلة التي نقدمها
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/services')}
              endIcon={<ArrowForward />}
            >
              عرض الكل
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {featuredServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(15,44,77,0.08)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" gap={2} mb={2}>
                      <Avatar
                        sx={{
                          width: 52, height: 52,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                        }}
                      >
                        <ServiceIcon name={service.icon} sx={{ color: 'secondary.light' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          {service.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Star sx={{ color: 'secondary.main', fontSize: 16 }} />
                          <Typography variant="caption" color="text.secondary">
                            {service.duration}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
                      {service.description}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" fontWeight={800} color="secondary.main">
                        {service.price} د.ك
                      </Typography>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => navigate('/booking')}
                        endIcon={<ArrowForward />}
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

      {/* About Preview */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={ABOUT_PREVIEW_IMAGE}
                alt="ميكانيكي يفحص محرك سيارة"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 12px 40px rgba(15,44,77,0.15)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
                من نحن
              </Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
                خدمة صيانة و اصلاح المركبات موثوق منذ 2019
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
                بدأنا رحلتنا قبل أكثر من 7 اعوام بهدف تقديم خدمة اصلاح و صيانة متنقلة للسيارات
                تتميز بالجودة والشفافية. اليوم، نفتخر بثقة آلاف العملاء الذين 
                يأتمنوننا على سياراتهم. نستخدم أحدث الأجهزة والتقنيات   
                  لنضمن لك خدمة استثنائية في كل مرة.
              </Typography>
              <Stack gap={2} sx={{ mb: 3 }}>
                {[
                  'خدمة موثوقة ومتميزة  ',
                  ' خدمة 24 ساعة على مدار اليوم',
                  'ضمان  على جميع الإصلاحات',
                  'أسعار واضحة بدون رسوم خفية',
                ].map((item) => (
                  <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                    <CheckCircle sx={{ color: 'secondary.main', fontSize: 22 }} />
                    <Typography variant="body1">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/about')}
                endIcon={<ArrowForward />}
              >
                اقرأ المزيد عنا
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: 'primary.dark',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <Grid item xs={6} md={3} key={stat.label}>
                  <Stack alignItems="center" gap={1}>
                    <Avatar
                      sx={{
                        width: 56, height: 56,
                        bgcolor: 'rgba(20,184,166,0.15)',
                        color: 'secondary.light',
                      }}
                    >
                      <Icon />
                    </Avatar>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: { xs: '1.8rem', md: '2.5rem' },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                      {stat.label}
                    </Typography>
                  </Stack>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -40, left: -40,
                width: 200, height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(20,184,166,0.1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -60, right: -60,
                width: 240, height: 240,
                borderRadius: '50%',
                bgcolor: 'rgba(20,184,166,0.08)',
              }}
            />
            <Stack
              spacing={3}
              alignItems="center"
              textAlign="center"
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <DirectionsCarFilled sx={{ color: 'secondary.light', fontSize: 48 }} />
              <Typography variant="h3" fontWeight={800} color="#fff">
                جاهز لصيانة سيارتك؟
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>
                احجز موعدك الآن واحصل على فحص شامل لسيارتك. فريقنا في انتظارك
                لتقديم أفضل خدمة صيانة.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<CalendarMonth />}
                  onClick={() => navigate('/booking')}
                >
                  احجز موعدك الآن
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/services')}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  تصفح الخدمات
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
