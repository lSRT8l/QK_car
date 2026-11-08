import {
  BuildCircle, FactCheck, Settings, DiscFull, ElectricalServices,
  AcUnit, BatteryChargingFull, TireRepair, OilBarrel, DirectionsCar,
  CarRepair, Handyman, Engineering,
} from '@mui/icons-material'

const ICON_MAP = {
  BuildCircle,
  FactCheck,
  Settings,
  DiskFull: DiscFull,
  ElectricalServices,
  AcUnit,
  BatteryChargingFull,
  TireRepair,
  OilBarrel,
  DirectionsCar,
  CarRepair,
  Handyman,
  Engineering,
}

export default function ServiceIcon({ name, ...props }) {
  const Icon = ICON_MAP[name] || BuildCircle
  return <Icon {...props} />
}
