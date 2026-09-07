<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import { Phone, Clock, MapPin, Menu, X } from 'lucide-vue-next'
import { companyConfig } from '../../data/company'
import logoSvg from '../../assets/logo.svg'

defineEmits<{
  (e: 'open-booking'): void
}>()

const open = ref(false)

const nav = [
  { href: '#services', label: 'Услуги' },
  { href: '#prices', label: 'Цены' },
  { href: '#symptoms', label: 'Симптомы' },
  { href: '#process', label: 'Как работаем' },
  { href: '#region33', label: '33 Регион' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' }
]

function scroll(href: string) {
  open.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="hdr">
    <div class="hdr__top">
      <div class="container hdr__top-row">
        <a class="hdr__util" :href="`tel:${companyConfig.phoneRaw}`">
          <Phone :size="14" class="hdr__ic" /> {{ companyConfig.phoneDisplay }}
        </a>
        <span class="hdr__util">
          <Clock :size="14" class="hdr__ic" /> {{ companyConfig.workingHours }}
        </span>
        <span class="hdr__util hdr__util--addr">
          <MapPin :size="14" class="hdr__ic" /> Владимир, ул. Куйбышева 26Ж (съезд с М-7)
        </span>
      </div>
    </div>

    <div class="hdr__main">
      <div class="container hdr__row">
        <a href="#" class="brand" @click.prevent="scroll('#app')">
          <img :src="logoSvg" alt="Forsun Motors" class="brand__logo-img" />
          <span class="brand__region">33 RUS</span>
        </a>

        <nav class="nav" :class="{ 'nav--open': open }">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="nav__link"
            @click.prevent="scroll(item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="hdr__cta">
          <BaseButton size="md" @click="$emit('open-booking')">Записаться</BaseButton>
        </div>

        <button class="burger" :aria-expanded="open" aria-label="Меню" @click="open = !open">
          <component :is="open ? X : Menu" :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 100;
}

.hdr__top {
  background: var(--black);
  border-bottom: 1px solid var(--line-dark);
  font-size: .82rem;
}

.hdr__top-row {
  display: flex;
  gap: 26px;
  align-items: center;
  height: 36px;
  color: var(--text-inverse-muted);
}

.hdr__util {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #c2c9d6;
  transition: color .16s ease;
}

.hdr__util:hover {
  color: #ffffff;
}

.hdr__ic {
  color: var(--accent);
}

.hdr__util--addr {
  margin-left: auto;
}

.hdr__main {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.hdr__row {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 76px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand__logo-img {
  height: 48px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
}

.brand__region {
  font-family: var(--font-head);
  font-size: .74rem;
  font-weight: 700;
  letter-spacing: .08em;
  background: var(--accent);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.nav__link {
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .94rem;
  font-weight: 600;
  letter-spacing: .03em;
  color: var(--text);
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition: color .18s, background .18s;
}

.nav__link:hover {
  color: var(--accent);
  background: var(--accent-subtle);
}

.hdr__cta {
  margin-left: 8px;
}

.burger {
  display: none;
  background: none;
  border: 1px solid var(--line-2);
  color: var(--text);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 980px) {
  .hdr__util--addr {
    display: none;
  }
  .hdr__cta {
    display: none;
  }
  .burger {
    display: inline-flex;
    margin-left: auto;
  }
  .nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    flex-direction: column;
    gap: 2px;
    padding: 14px;
    background: #ffffff;
    border-bottom: 2px solid var(--accent);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: .22s ease;
  }
  .nav--open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
  .nav__link {
    padding: 12px 14px;
  }
}

@media (max-width: 560px) {
  .hdr__top-row {
    gap: 16px;
    font-size: .76rem;
  }
  .brand__logo-img {
    height: 36px;
    max-width: 170px;
  }
}
</style>
