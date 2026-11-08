import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Stack, Typography, Grid, IconButton, Divider, Button,
} from '@mui/material'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: '#fff', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DirectionsCarFilledIcon sx={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography fontWeight={800} fontSize="1.2rem"> QK CAR SERIVCE </Typography>
                <Typography fontSize="0.75rem" color="rgba(255,255,255,0.6)">خدمة متنقلة لصيانة السيارات </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 2 }}>
               متخصص في صيانة وإصلاح جميع أنواع السيارات بأحدث الأجهزة  . نلتزم بالجودة والسرعة في خدمتك.
            </Typography>
            <Stack direction="row" gap={1}>
              {[FacebookIcon, InstagramIcon, TwitterIcon, WhatsAppIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    '&:hover': { bgcolor: 'secondary.main', color: '#fff' },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2} color="secondary.light">روابط سريعة</Typography>
            <Stack gap={1}>
              {[
                { label: 'الرئيسية', path: '/' },
                { label: 'من نحن', path: '/about' },
                { label: 'خدماتنا', path: '/services' },
                { label: 'حجز موعد', path: '/booking' },
                { label: 'لوحة التحكم', path: '/admin' },
              ].map((link) => (
                <Typography
                  key={link.path}
                  component="span"
                  onClick={() => navigate(link.path)}
                  sx={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'secondary.light' },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2} color="secondary.light">خدماتنا</Typography>
            <Stack gap={1}>
              {['صيانة دورية', 'إصلاح المحرك', 'نظام الفرامل', 'فحص شامل'].map((s) => (
                <Typography
                  key={s}
                  component="span"
                  onClick={() => navigate('/services')}
                  sx={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'secondary.light' },
                  }}
                >
                  {s}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={2} color="secondary.light">تواصل معنا</Typography>
            <Stack gap={1.5}>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <PhoneIcon sx={{ color: 'secondary.light', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }} dir="ltr">+96565807080</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <EmailIcon sx={{ color: 'secondary.light', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>MOHAMADSAMER@carcare.sa</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <LocationOnIcon sx={{ color: 'secondary.light', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}> الكويت - KUWAIT</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <AccessTimeIcon sx={{ color: 'secondary.light', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}> خدمة 24 ساعة على مدار اليوم</Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, borderColor: 'rgba(20,184,166,0.4)' }}
              onClick={() => navigate('/booking')}
            >
              احجز موعدك
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', display: 'block' }}>
          © 2026 QK CAR SERVICE - جميع الحقوق محفوظة
        </Typography>
      </Container>
    </Box>
  )
}
