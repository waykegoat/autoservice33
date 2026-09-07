<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import QuickStats from './components/sections/QuickStats.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import PricesSection from './components/sections/PricesSection.vue'
import SymptomsSection from './components/sections/SymptomsSection.vue'
import ProcessSection from './components/sections/ProcessSection.vue'
import RegionSection from './components/sections/RegionSection.vue'
import ReviewsSection from './components/sections/ReviewsSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import ContactsSection from './components/sections/ContactsSection.vue'
import ContactModal from './components/ui/ContactModal.vue'
import type { ServiceItem } from './types'

const modalOpen = ref(false)
const modalNote = ref('')

function openBooking(note?: string) {
  modalNote.value = note || ''
  modalOpen.value = true
}

function handleServiceSelect(s: ServiceItem) {
  openBooking(`Услуга: ${s.title} (${s.priceFormatted})`)
}

function handleSymptomSelect(title: string) {
  openBooking(`Симптом: ${title}`)
}
</script>

<template>
  <div class="app">
    <AppHeader @open-booking="openBooking()" />

    <main>
      <HeroSection @open-booking="openBooking()" />
      <QuickStats />
      <ServicesSection @select-service="handleServiceSelect" />
      <PricesSection @open-booking="openBooking($event)" />
      <SymptomsSection @select-symptom="handleSymptomSelect" />
      <ProcessSection />
      <RegionSection @open-booking="openBooking()" />
      <ReviewsSection />
      <FaqSection />
      <ContactsSection />
    </main>

    <AppFooter />

    <ContactModal
      v-model="modalOpen"
      :prefilled-note="modalNote"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
