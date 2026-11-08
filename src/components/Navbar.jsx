import { useState, useEffect } from 'react'

import { Paper} from "@mui/material";import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Container, Box, Button, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, ListItemIcon,
  useScrollTrigger, Slide, Stack, Typography, Avatar, Menu, MenuItem,
  Divider, Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import BuildIcon from '@mui/icons-material/Build'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LoginIcon from '@mui/icons-material/Login'

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const currentUser = JSON.parse(localStorage.getItem('cc_currentUser') || 'null')
  const isAdmin = JSON.parse(localStorage.getItem('cc_isAdmin') || 'false')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('cc_currentUser')
    localStorage.removeItem('cc_isAdmin')
    setAnchorEl(null)
    navigate('/')
    window.location.reload()
  }

  const navItems = [
    { label: 'الرئيسية', path: '/', icon: HomeIcon },
    { label: 'من نحن', path: '/about', icon: InfoIcon },
    { label: 'خدماتنا', path: '/services', icon: BuildIcon },
    { label: 'حجز موعد', path: '/booking', icon: CalendarMonthIcon },
  ]

  if (currentUser) {
    navItems.push({ label: 'حسابي', path: '/dashboard', icon: DashboardIcon })
  }

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: scrolled ? 'rgba(15, 44, 77, 0.98)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{ cursor: 'pointer', flexGrow: { xs: 1, md: 0 } }}
                onClick={() => navigate('/')}
              >
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: 2,
                    bgcolor: 'secondary.main',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <DirectionsCarFilledIcon sx={{ color: '#fff', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', lineHeight: 1.1 }}>
                    QK CAR SERIVCE 
                  </Typography>
                  
                  <Typography sx={{ fontSize: '0.7rem', color: 'secondary.light', lineHeight: 1.1 }}>
                   خدمة متنقلة لصيانة السيارات
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 0.5 }}>
                {navItems.map((item) => {
                  const active = isActive(item.path)
                  return (
                    <Button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                        fontWeight: active ? 700 : 500,
                        borderRadius: 3,
                        px: 2,
                        py: 1,
                        position: 'relative',
                        '&::after': active ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 20, height: 3,
                          borderRadius: 2,
                          bgcolor: 'secondary.main',
                        } : {},
                        '&:hover': {
                          color: '#fff',
                          bgcolor: 'rgba(255,255,255,0.08)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
                {currentUser || isAdmin ? (
                  <>
                    {currentUser && (
                      <Button
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{ color: '#fff', gap: 1, textTransform: 'none' }}
                      >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.85rem' }}>
                          {currentUser.name?.charAt(0) || 'U'}
                        </Avatar>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                          {currentUser.name?.split(' ')[0]}
                        </Typography>
                      </Button>
                    )}
                    {isAdmin && (
                      <Chip
                        icon={<AdminPanelSettingsIcon sx={{ color: '#fff', fontSize: 16 }} />}
                        label="الإدارة"
                        size="small"
                        onClick={() => navigate('/admin')}
                        sx={{ bgcolor: 'rgba(20,184,166,0.2)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                      />
                    )}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
                    >
                      <MenuItem onClick={() => { setAnchorEl(null); navigate('/dashboard') }}>
                        <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                        لوحة التحكم
                      </MenuItem>
                      <MenuItem onClick={() => { setAnchorEl(null); navigate('/booking') }}>
                        <ListItemIcon><CalendarMonthIcon fontSize="small" /></ListItemIcon>
                        حجز موعد
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                        تسجيل الخروج
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      variant="text"
                      onClick={() => navigate('/admin-login')}
                      startIcon={<AdminPanelSettingsIcon />}
                      sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}
                    >
                      دخول الإدارة
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate('/login')}
                      startIcon={<LoginIcon />}
                    >
                      تسجيل الدخول
                    </Button>
                  </>
                )}
              </Box>

              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, pt: 2 } }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} mb={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DirectionsCarFilledIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
            </Box>
            <Typography fontWeight={800} color="primary.main"> QK CAR SERIVCE</Typography>
          </Stack>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {currentUser && (
          <Box px={2} mb={2}>
            <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'primary.main' }}>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}>
                  {currentUser.name?.charAt(0) || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={700} color="#fff">{currentUser.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{currentUser.email}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        )}

        <List>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1, borderRadius: 2, mb: 0.5,
                    bgcolor: active ? 'primary.main' : 'transparent',
                    '&:hover': { bgcolor: active ? 'primary.main' : 'grey.100' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: active ? '#fff' : 'text.secondary' }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      color: active ? '#fff' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}

          {!currentUser && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate('/login')}
                  sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}><LoginIcon /></ListItemIcon>
                  <ListItemText primary="تسجيل الدخول" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate('/admin-login')}
                  sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}><AdminPanelSettingsIcon /></ListItemIcon>
                  <ListItemText primary="دخول الإدارة" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {(currentUser || isAdmin) && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{ mx: 1, borderRadius: 2, mb: 0.5, color: 'error.main' }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon color="error" /></ListItemIcon>
                  <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ color: 'error' }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>

        <Box px={2} mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate('/booking')}
            startIcon={<CalendarMonthIcon />}
          >
            احجز موعدك الآن
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
