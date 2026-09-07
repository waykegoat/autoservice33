<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import QuickStats from './components/sections/QuickStats.vue'
import SymptomsSection from './components/sections/SymptomsSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import CalculatorSection from './components/sections/CalculatorSection.vue'
import EquipmentSection from './components/sections/EquipmentSection.vue'
import BrandsSection from './components/sections/BrandsSection.vue'
import RegionSection from './components/sections/RegionSection.vue'
import ReviewsSection from './components/sections/ReviewsSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import ContactsSection from './components/sections/ContactsSection.vue'
import ContactModal from './components/ui/ContactModal.vue'
import type { ServiceItem } from './types'

// Booking modal state
const isBookingModalOpen = ref(false)
const modalVehicle = ref('')
const modalService = ref('')
const modalNote = ref('')

function openBookingModal(payload?: { vehicle?: string; note?: string; service?: string }) {
  if (payload) {
    modalVehicle.value = payload.vehicle || ''
    modalNote.value = payload.note || ''
    modalService.value = payload.service || ''
  } else {
    modalVehicle.value = ''
    modalNote.value = ''
    modalService.value = ''
  }
  isBookingModalOpen.value = true
}

function handleSymptomSelect(symptomTitle: string) {
  openBookingModal({
    note: `Беспокоит симптом: ${symptomTitle}. Нужна диагностика на стенде.`
  })
}

function handleServiceSelect(service: ServiceItem) {
  openBookingModal({
    service: service.title,
    note: `Выбранная услуга: ${service.title} (${service.priceFormatted})`
  })
}

function handleCalculationSubmit(payload: { summary: string; priceText: string }) {
  openBookingModal({
    note: `${payload.summary}. Расчетная цена: ${payload.priceText}`
  })
}

function handleBrandSelect(vehicleName: string) {
  openBookingModal({
    vehicle: vehicleName,
    note: `Автомобиль: ${vehicleName}`
  })
}
</script>

<template>
  <div class="site-wrapper">
    <!-- Header -->
    <AppHeader @open-booking="openBookingModal()" />

    <!-- Main Content Flow -->
    <main>
      <HeroSection @open-booking="openBookingModal($event)" />
      <QuickStats />
      <SymptomsSection @select-symptom="handleSymptomSelect" />
      <ServicesSection @select-service="handleServiceSelect" />
      <CalculatorSection @submit-calculation="handleCalculationSubmit" />
      <EquipmentSection />
      <BrandsSection @select-brand="handleBrandSelect" />
      <RegionSection @open-booking="openBookingModal()" />
      <ReviewsSection />
      <FaqSection @open-booking="openBookingModal()" />
      <ContactsSection />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Universal Booking Modal -->
    <ContactModal
      v-model="isBookingModalOpen"
      :prefilled-vehicle="modalVehicle"
      :prefilled-service="modalService"
      :initial-note="modalNote"
    />
  </div>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  flex: 1;
}
</style>
