import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Button, Grid, Card, CardContent,
  Paper, Avatar, Divider, useTheme,
} from '@mui/material'
import {
  CalendarMonth, ArrowForward, CheckCircle, Shield, Speed, Verified,
  Engineering, Star, Group, BuildCircle, Factory, EmojiEvents,
  DirectionsCarFilled, Handyman, ElectricalServices,
} from '@mui/icons-material'

const HERO_IMAGE = 'https://images.pexels.com/photos/33814734/pexels-photo-33814734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
const WORKSHOP_IMAGE = 'https://images.pexels.com/photos/33814736/pexels-photo-33814736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

const WHY_US = [
  { icon: Shield, title: 'ضمان مكتوب', desc: 'نقدم ضماناً مكتوباً على جميع خدمات الصيانة وإصلاح الأعطال.' },
  { icon: Verified, title: 'فنيون معتمدون', desc: 'فريق من الفنيين المعتمدين دولياً بخبرة تتجاوز 15 عاماً.' },
  { icon: Speed, title: 'إنجاز سريع', desc: 'نلتزم بمواعيد التسليم دون تأخير مع الحفاظ على الجودة.' },
  { icon: EmojiEvents, title: 'قطع غيار أصلية', desc: 'نستخدم فقط قطع الغيار الأصلية المعتمدة من الشركات المصنعة.' },
]

const STATS = [
  { value: '15+', label: 'سنوات خبرة', icon: Star },
  { value: '12K+', label: 'عميل سعيد', icon: Group },
  { value: '50K+', label: 'صيانة منجزة', icon: BuildCircle },
  { value: '10', label: 'فنيين متخصصين', icon: Engineering },
]

const TEAM = [
  { name: ' قيس السلامات', role: ' ', icon: Engineering, exp: '7+ سنوات خبرة' },
  { name: ' ', role: 'فني محركات', icon: DirectionsCarFilled, exp: ' ' },
  { name: ' ', role: 'فني كهرباء', icon: ElectricalServices, exp: '' },
  { name: '', role: 'فني فرامل', icon: Handyman, exp: '' },
]

export default function About() {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box>
      {/* Small Hero */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
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
          alt="ورشة الصيانة"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: 0 }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography sx={{ color: 'secondary.light', fontWeight: 600, fontSize: '0.9rem' }}>
              من نحن
            </Typography>
            <Typography variant="h2" fontWeight={800} color="#fff">
              قصتنا في خدمة سيارتك
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 650 }}>
              تعرّف على رحلتنا وفريقنا الذي يعمل بشغف لتقديم أفضل خدمات الصيانة
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* About Content */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={WORKSHOP_IMAGE}
                alt="داخل ورشة الصيانة"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 12px 40px rgba(15,44,77,0.15)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
                نبذة عن ورشتنا المتنقلة
              </Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
                أكثر من 7+ اعوام من التميز
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
            
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
                على مدار السنوات الماضية، خدمنا آلاف العملاء واكتسبنا ثقتهم بفضل
                التزامنا بالجودة والشفافية. نستخدم أحدث الأجهزة والتقنيات مع فريق
                من الفنيين المهرة لنضمن لك تجربة صيانة استثنائية.
              </Typography>
              <Stack gap={2}>
                {[
                  'أحدث أجهزة التشخيص والفحص',
                  'فريق فنيين مدرّب ومعتمد',
                  'قطع غيار أصلية مضمونة',
                  'ضمان مكتوب على جميع الخدمات',
                ].map((item) => (
                  <Stack key={item} direction="row" alignItems="center" gap={1.5}>
                    <CheckCircle sx={{ color: 'secondary.main', fontSize: 22 }} />
                    <Typography variant="body1">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Us */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
              لماذا نحن
            </Typography>
            <Typography variant="h3" fontWeight={800} color="primary.main">
              ما الذي يميزنا عن غيرنا
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {WHY_US.map((item) => {
              const Icon = item.icon
              return (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
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
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 60, height: 60,
                          bgcolor: 'primary.main',
                          mx: 'auto', mb: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Icon sx={{ color: 'secondary.light' }} />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'primary.dark' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <Grid item xs={6} md={3} key={stat.label}>
                  <Stack alignItems="center" gap={1}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(20,184,166,0.15)', color: 'secondary.light' }}>
                      <Icon />
                    </Avatar>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
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

      {/* Team */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}>
              فريق العمل
            </Typography>
            <Typography variant="h3" fontWeight={800} color="primary.main">
              الفنيون خلف جودة الخدمة
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mt: 1 }}>
              فريق من المحترفين المعتمدين بخبرات طويلة في صيانة السيارات
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {TEAM.map((member) => {
              const Icon = member.icon
              return (
                <Grid item xs={12} sm={6} md={3} key={member.name}>
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
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80, height: 80,
                          bgcolor: 'primary.main',
                          mx: 'auto', mb: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Icon sx={{ color: 'secondary.light', fontSize: 36 }} />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="secondary.main" fontWeight={600} sx={{ mb: 1 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {member.exp}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.1)' }} />
            <Stack spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" fontWeight={800} color="#fff">
                جاهز لبدء صيانة سيارتك؟
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                احجز موعدك الآن واحصل على فحص مجاني
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<CalendarMonth />}
                onClick={() => navigate('/booking')}
                sx={{ mt: 1 }}
              >
                احجز موعدك الآن
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
