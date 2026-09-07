<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { companyConfig } from '../../data/company'
import BaseButton from '../ui/BaseButton.vue'
import BaseBadge from '../ui/BaseBadge.vue'
import { Phone, MapPin, Clock, Menu, X, ArrowUpRight } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'open-booking'): void
}>()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { href: '#services', label: 'Услуги и цены' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#symptoms', label: 'Признаки поломки' },
  { href: '#equipment', label: 'Стенды' },
  { href: '#region33', label: 'Владимир & Область' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' }
]

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function scrollToSection(href: string) {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <!-- Top Bar (Visible on desktop) -->
    <div class="top-bar">
      <div class="container top-bar__inner">
        <div class="top-bar__left">
          <div class="top-bar__item">
            <MapPin :size="14" class="top-bar__icon text-gradient-primary" />
            <span>{{ companyConfig.city }}, {{ companyConfig.address }}</span>
          </div>
          <div class="top-bar__item">
            <Clock :size="14" class="top-bar__icon" />
            <span>{{ companyConfig.workingHours }}</span>
          </div>
        </div>

        <div class="top-bar__right">
          <BaseBadge variant="tech" :pulse="true">
            Приемка открыта • Стенд свободен
          </BaseBadge>
          <a
            :href="companyConfig.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="top-bar__messenger"
          >
            WhatsApp
          </a>
          <a
            :href="companyConfig.telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="top-bar__messenger"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="main-nav">
      <div class="container main-nav__inner">
        <!-- Logo -->
        <a href="#" class="logo" @click.prevent="scrollToSection('#app')">
          <div class="logo__emblem">
            <svg viewBox="0 0 32 32" class="logo__svg" fill="none">
              <path d="M16 3l10 5v8c0 7-5 11-10 13-5-2-10-6-10-13V8l10-5z" fill="#1e232c" stroke="#ff6a1a" stroke-width="1.5"/>
              <path d="M14 9h4v6h-4z" fill="#ff6a1a"/>
              <path d="M15 15h2v6h-2z" fill="#00d2ff"/>
              <circle cx="16" cy="24" r="1.5" fill="#00d2ff"/>
            </svg>
          </div>
          <div class="logo__text-group">
            <div class="logo__name-row">
              <span class="logo__brand">{{ companyConfig.name }}</span>
              <span class="logo__region">{{ companyConfig.regionCode }}</span>
            </div>
            <span class="logo__sub">Центр ремонта форсунок Common Rail</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-links">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="nav-link"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Right Action Group -->
        <div class="header-actions">
          <a :href="`tel:${companyConfig.phoneRaw}`" class="phone-link">
            <div class="phone-icon-wrap">
              <Phone :size="16" />
            </div>
            <div class="phone-text">
              <span class="phone-number">{{ companyConfig.phoneDisplay }}</span>
              <span class="phone-caption">Звонок мастеру</span>
            </div>
          </a>

          <BaseButton
            variant="primary"
            size="sm"
            class="header-cta"
            @click="$emit('open-booking')"
          >
            Запись на стенд
          </BaseButton>

          <!-- Mobile Menu Trigger -->
          <button
            class="mobile-toggle"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Открыть меню"
          >
            <component :is="isMobileMenuOpen ? X : Menu" :size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <Transition name="drawer">
      <div v-if="isMobileMenuOpen" class="mobile-drawer">
        <div class="container mobile-drawer__inner">
          <div class="mobile-status">
            <BaseBadge variant="tech" :pulse="true">
              Приемка открыта • Стенд свободен
            </BaseBadge>
          </div>

          <nav class="mobile-links">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="mobile-link"
              @click.prevent="scrollToSection(link.href)"
            >
              <span>{{ link.label }}</span>
              <ArrowUpRight :size="16" class="mobile-link__arrow" />
            </a>
          </nav>

          <div class="mobile-footer">
            <div class="mobile-address">
              <MapPin :size="16" class="text-gradient-primary" />
              <span>{{ companyConfig.city }}, {{ companyConfig.address }}</span>
            </div>

            <a :href="`tel:${companyConfig.phoneRaw}`" class="mobile-phone-btn">
              <Phone :size="18" />
              <span>{{ companyConfig.phoneDisplay }}</span>
            </a>

            <BaseButton
              variant="primary"
              size="lg"
              class="mobile-cta-btn"
              @click="isMobileMenuOpen = false; $emit('open-booking')"
            >
              Записаться на стенд
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color var(--transition-base), border-color var(--transition-base), backdrop-filter var(--transition-base);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header--scrolled {
  background-color: rgba(11, 13, 17, 0.94);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

/* Top bar */
.top-bar {
  display: none;
  background-color: rgba(16, 20, 26, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 12px;
  color: var(--color-text-muted);
}

@media (min-width: 1024px) {
  .top-bar {
    display: block;
  }
}

.top-bar__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
}

.top-bar__left,
.top-bar__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.top-bar__item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.top-bar__icon {
  color: var(--color-primary);
}

.top-bar__messenger {
  color: var(--color-text-dim);
  transition: color var(--transition-fast);
}

.top-bar__messenger:hover {
  color: var(--color-text);
}

/* Main Nav */
.main-nav {
  height: 72px;
  display: flex;
  align-items: center;
}

.main-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo__emblem {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 16px rgba(255, 106, 26, 0.2);
}

.logo__svg {
  width: 28px;
  height: 28px;
}

.logo__text-group {
  display: flex;
  flex-direction: column;
}

.logo__name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo__brand {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.logo__region {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--color-primary);
  color: #0b0d11;
}

.logo__sub {
  font-size: 11px;
  color: var(--color-text-dim);
  white-space: nowrap;
}

/* Nav Links */
.nav-links {
  display: none;
  align-items: center;
  gap: 24px;
}

@media (min-width: 1100px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  position: relative;
  padding: 4px 0;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
}

/* Right Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.phone-link {
  display: none;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

@media (min-width: 768px) {
  .phone-link {
    display: flex;
  }
}

.phone-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: rgba(255, 106, 26, 0.12);
  border: 1px solid rgba(255, 106, 26, 0.25);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-text {
  display: flex;
  flex-direction: column;
}

.phone-number {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
}

.phone-caption {
  font-size: 11px;
  color: var(--color-success);
}

.header-cta {
  display: none;
}

@media (min-width: 640px) {
  .header-cta {
    display: inline-flex;
  }
}

.mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

@media (min-width: 1100px) {
  .mobile-toggle {
    display: none;
  }
}

/* Mobile Drawer */
.mobile-drawer {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 24px 0 32px;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
}

.mobile-status {
  margin-bottom: 20px;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.mobile-link:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-primary);
}

.mobile-link__arrow {
  color: var(--color-text-dim);
}

.mobile-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-subtle);
}

.mobile-address {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.mobile-phone-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 15px;
}

.mobile-cta-btn {
  width: 100%;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
