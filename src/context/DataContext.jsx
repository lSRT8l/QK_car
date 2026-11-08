import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DataContext = createContext(null)

const SEED_SERVICES = [
  {
    id: 'srv-001',
    name: 'صيانة دورية شاملة',
    description: 'فحص شامل لجميع أجزاء السيارة مع تغيير الزيت والفلاتر وفحص مستويات السوائل.',
    price: 30,
    duration: 'ساعة',
    icon: 'BuildCircle',
    image: 'maintenance',
    active: true,
  },
  {
    id: 'srv-002',
    name: 'فحص شامل للسيارة',
    description: 'فحص دقيق لجميع أنظمة السيارة باستخدام أجهزة تشخيص متطورة لكشف الأعطال.',
    price: 20,
    duration: '45 دقيقة',
    icon: 'FactCheck',
    image: 'inspection',
    active: true,
  },
  {
    id: 'srv-003',
    name: 'إصلاح المحرك',
    description: 'إصلاح وصيانة محركات السيارات بجميع أنواعها مع ضمان على قطع الغيار.',
    price: 100,
    duration: 'يوم كامل',
    icon: 'Settings',
    image: 'engine',
    active: true,
  },
  {
    id: 'srv-004',
    name: 'نظام الفرامل',
    description: 'فحص وصيانة نظام الفرامل بالكامل، تغيير الأقراص والفحمات وضبط الفرامل.',
    price: 30,
    duration: 'ساعتان',
    icon: 'DiskFull',
    image: 'brakes',
    active: true,
  },
  {
    id: 'srv-005',
    name: 'الكهرباء والبرمجة',
    description: 'فحص وإصلاح الأنظمة الكهربائية وبرمجة وحدات التحكم الإلكترونية.',
    price: 40,
    duration: '3 ساعات',
    icon: 'ElectricalServices',
    image: 'electrical',
    active: true,
  },
  
  {
    id: 'srv-007',
    name: 'البطارية',
    description: 'فحص وتغيير بطاريات السيارات مع ضمان، وفحص نظام الشحن بالكامل.',
    price: 50,
    duration: '30 دقيقة',
    icon: 'BatteryChargingFull',
    image: 'battery',
    active: true,
  },
  {
    id: 'srv-008',
    name: 'الإطارات والعجلات',
    description: 'تغيير وضبط الإطارات، إصلاح الثقوب، وضبط زوايا العجلات.',
    price: 10,
    duration: 'ساعة',
    icon: 'TireRepair',
    image: 'tires',
    active: true,
  },
  {
    id: 'srv-009',
    name: 'تغيير الزيت',
    description: 'تغيير زيت المحرك وزيت الفرامل مع استبدال جميع الفلاتر.',
    price: 20,
    duration: '30 دقيقة',
    icon: 'OilBarrel',
    image: 'oil',
    active: true,
  },
  {
    id: 'srv-010',
    name: 'نظام التعليق',
    description: 'صيانة وإصلاح نظام التعليق، المساعدات واليايات لراحة قيادة أفضل.',
    price: 30,
    duration: '3 ساعات',
    icon: 'DirectionsCar',
    image: 'suspension',
    active: true,
  },
]

const CAR_BRANDS = [
  'تويوتا', 'هوندا', 'نيسان', 'هيونداي', 'كيا', 'مرسيدس', 'بي إم دبليو',
  'أودي', 'فولكس فاجن', 'مازدا', 'لكزس', 'إنفينيتي', 'ميتسوبيشي', 'شيفروليه',
  'فورد', 'سكيودا', 'رينو', 'بيجو', 'سوبارو', 'أخرى',
]

const TIME_SLOTS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 01:00',
  '01:00 - 02:00',
  '02:00 - 03:00',
  '03:00 - 04:00',
  '04:00 - 05:00',
  '05:00 - 06:00',
  '06:00 - 07:00',
  '07:00 - 08:00',
  
]

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore
  }
  return fallback
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    // ignore
  }
}

export function DataProvider({ children }) {
  const [services, setServices] = useState(() => loadFromStorage('cc_services', SEED_SERVICES))
  const [bookings, setBookings] = useState(() => loadFromStorage('cc_bookings', []))
  const [carBrands] = useState(CAR_BRANDS)
  const [timeSlots] = useState(TIME_SLOTS)

  useEffect(() => { saveToStorage('cc_services', services) }, [services])
  useEffect(() => { saveToStorage('cc_bookings', bookings) }, [bookings])

  const addService = useCallback((service) => {
    const newService = { ...service, id: `srv-${Date.now()}`, active: service.active ?? true }
    setServices((prev) => [...prev, newService])
    return newService
  }, [])

  const updateService = useCallback((id, updates) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }, [])

  const deleteService = useCallback((id) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: `BK-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }, [])

  const getUserBookings = useCallback((userId) => {
    return bookings.filter((b) => b.userId === userId)
  }, [bookings])

  const updateBookingStatus = useCallback((id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }, [])

  const deleteBooking = useCallback((id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const resetData = useCallback(() => {
    setServices(SEED_SERVICES)
    setBookings([])
  }, [])

  return (
    <DataContext.Provider
      value={{
        services,
        bookings,
        carBrands,
        timeSlots,
        addService,
        updateService,
        deleteService,
        addBooking,
        getUserBookings,
        updateBookingStatus,
        deleteBooking,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
