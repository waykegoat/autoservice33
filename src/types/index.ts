export type VehicleCategory = 'passenger' | 'commercial' | 'truck' | 'special'

export type FuelSystemType =
  | 'common-rail'
  | 'piezo'
  | 'unit-injector' // Насос-форсунки UIS / PDE
  | 'pld-section'
  | 'gdi-petrol'

export interface ServiceItem {
  id: string
  title: string
  category: FuelSystemType | 'diagnostics' | 'extraction'
  summary: string
  priceFrom: number
  priceFormatted: string
  duration: string
  included: string[]
  popular?: boolean
  badge?: string
}

export interface SymptomItem {
  id: string
  title: string
  description: string
  consequence: string
  urgency: 'critical' | 'high' | 'medium'
  iconName: string
}

export interface StatItem {
  value: string
  label: string
  subtext: string
}

export interface ReviewItem {
  id: string
  author: string
  city: string
  vehicle: string
  repairType: string
  rating: number
  date: string
  text: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

export interface SupportedBrand {
  name: string
  type: string
  description: string
  logoText: string
  systems: string[]
}

export interface RegionCity {
  name: string
  distanceFromVladimir: string
  transitTime: string
  deliveryOptions: string
}

export interface BookingPayload {
  name: string
  phone: string
  vehicleModel?: string
  serviceId?: string
  problemDescription?: string
  preferredTime?: string
}
