<script setup lang="ts">
import { companyConfig } from '../../data/company'
import { Phone, MapPin, Clock, Send } from 'lucide-vue-next'
</script>

<template>
  <footer class="ftr">
    <div class="hazard ftr__stripe" />

    <div class="container ftr__grid">
      <div class="ftr__col ftr__brand">
        <span class="ftr__logo">ФОРСУНКА<b>33</b></span>
        <p class="ftr__desc">
          Специализированная лаборатория по ремонту и диагностике форсунок Common Rail, пьезофорсунок и насос-форсунок во Владимире и области.
        </p>
        <div class="ftr__socials">
          <a :href="`tel:${companyConfig.phoneRaw}`" aria-label="Телефон"><Phone :size="16" /></a>
          <a :href="companyConfig.whatsappUrl" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
          <a :href="companyConfig.telegramUrl" target="_blank" rel="noopener" aria-label="Telegram"><Send :size="15" /></a>
        </div>
      </div>

      <div class="ftr__col">
        <h4 class="ftr__title">Услуги</h4>
        <ul class="ftr__links">
          <li><a href="#services">Стендовая диагностика 15 мин</a></li>
          <li><a href="#services">Ремонт Bosch CRI / CRIN</a></li>
          <li><a href="#services">Ремонт Delphi (C2i / C3i)</a></li>
          <li><a href="#services">Ремонт пьезофорсунок</a></li>
          <li><a href="#services">Извлечение прикипевших</a></li>
          <li><a href="#services">Обменный фонд форсунок</a></li>
        </ul>
      </div>

      <div class="ftr__col">
        <h4 class="ftr__title">Разделы</h4>
        <ul class="ftr__links">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#prices">Прайс-лист</a></li>
          <li><a href="#symptoms">Симптомы поломки</a></li>
          <li><a href="#process">Как работаем</a></li>
          <li><a href="#region33">33 Регион & Трасса М-7</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
      </div>

      <div class="ftr__col">
        <h4 class="ftr__title">Контакты</h4>
        <ul class="ftr__contacts">
          <li><Phone :size="16" class="accent" /> {{ companyConfig.phoneDisplay }}</li>
          <li><MapPin :size="16" class="accent" /> г. Владимир, {{ companyConfig.address }}</li>
          <li><Clock :size="16" class="accent" /> {{ companyConfig.workingHours }}</li>
        </ul>
      </div>
    </div>

    <div class="ftr__bottom container">
      <span>© 2011–2026 Форсунка 33. Ремонт форсунок Common Rail во Владимире.</span>
      <span class="ftr__made">33 регион · Трасса М-7 «Волга»</span>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  background: var(--bg-2);
  border-top: 1px solid var(--line);
  margin-top: auto;
}

.ftr__stripe {
  height: 4px;
  opacity: .85;
}

.ftr__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
  gap: 40px;
  padding: 64px 24px 40px;
}

.ftr__logo {
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: 1.6rem;
  letter-spacing: .02em;
}

.ftr__logo b {
  color: var(--accent);
}

.ftr__desc {
  color: var(--muted);
  margin: 16px 0 20px;
  font-size: .92rem;
  max-width: 320px;
  line-height: 1.55;
}

.ftr__socials {
  display: flex;
  gap: 10px;
}

.ftr__socials a {
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-2);
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: var(--muted);
  font-size: .88rem;
  font-family: var(--font-head);
  font-weight: 700;
  transition: .18s;
  text-decoration: none;
}

.ftr__socials a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.ftr__title {
  font-size: 1.05rem;
  margin-bottom: 18px;
  letter-spacing: .03em;
}

.ftr__links li,
.ftr__contacts li {
  margin-bottom: 11px;
  color: var(--muted);
  font-size: .92rem;
}

.ftr__links a:hover {
  color: var(--accent);
}

.ftr__contacts li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  line-height: 1.4;
}

.ftr__contacts :deep(svg) {
  flex-shrink: 0;
  margin-top: 2px;
}

.ftr__bottom {
  display: flex;
  justify-content: space-between;
  padding: 22px 24px;
  border-top: 1px solid var(--line);
  color: var(--dim);
  font-size: .85rem;
}

@media (max-width: 880px) {
  .ftr__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 520px) {
  .ftr__grid {
    grid-template-columns: 1fr;
  }
  .ftr__bottom {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
