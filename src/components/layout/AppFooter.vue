<script setup lang="ts">
import { companyConfig } from '../../data/company'
import { MapPin, Phone, Clock, ArrowUp, Send } from 'lucide-vue-next'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__grid">
        <!-- Col 1: About -->
        <div class="footer__col footer__col--about">
          <div class="footer-logo">
            <span class="footer-logo__brand">{{ companyConfig.name }}</span>
            <span class="footer-logo__region">{{ companyConfig.regionCode }}</span>
          </div>
          <p class="footer-desc">
            Специализированный дизельный технический центр по диагностике, ремонту и стендовому кодированию форсунок Common Rail и насос-форсунок во Владимирской области.
          </p>
          <div class="footer-m7-badge">
            <span class="m7-dot"></span>
            <span>Удобный заезд с трасс <strong>М-7 «Волга»</strong> и <strong>М-12 «Восток»</strong></span>
          </div>
        </div>

        <!-- Col 2: Services Quick links -->
        <div class="footer__col">
          <h4 class="footer-title">Направления работ</h4>
          <ul class="footer-links">
            <li><a href="#services">Диагностика на стенде за 15 мин</a></li>
            <li><a href="#services">Ремонт Bosch CRI / CRIN</a></li>
            <li><a href="#services">Ремонт форсунок Delphi (C2i/C3i)</a></li>
            <li><a href="#services">Ремонт пьезофорсунок VDO / Bosch</a></li>
            <li><a href="#services">Демонтаж прикипевших гидросъемником</a></li>
            <li><a href="#services">Обменный фонд готовых форсунок</a></li>
          </ul>
        </div>

        <!-- Col 3: Fuel Systems -->
        <div class="footer__col">
          <h4 class="footer-title">Топливные системы</h4>
          <ul class="footer-links">
            <li><span>Bosch Common Rail (CRI, CRIN)</span></li>
            <li><span>Delphi DFI 1.2 - 2.5</span></li>
            <li><span>Denso Common Rail (G2, G3)</span></li>
            <li><span>Continental / Siemens VDO Piezo</span></li>
            <li><span>Cummins ISF 2.8 / 3.8 / ISBe</span></li>
            <li><span>Насос-форсунки Scania / Volvo / UIS</span></li>
          </ul>
        </div>

        <!-- Col 4: Contacts -->
        <div class="footer__col">
          <h4 class="footer-title">Пункт приема и стенд</h4>
          <div class="footer-contacts">
            <div class="footer-contact-item">
              <MapPin :size="16" class="contact-icon text-gradient-primary" />
              <span>{{ companyConfig.city }}, {{ companyConfig.address }}</span>
            </div>
            <div class="footer-contact-item">
              <Clock :size="16" class="contact-icon" />
              <span>{{ companyConfig.workingHours }}</span>
            </div>
            <div class="footer-contact-item">
              <Phone :size="16" class="contact-icon" />
              <a :href="`tel:${companyConfig.phoneRaw}`" class="contact-phone">
                {{ companyConfig.phoneDisplay }}
              </a>
            </div>
          </div>

          <div class="footer-messengers">
            <a
              :href="companyConfig.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-msg-btn footer-msg-btn--wa"
            >
              WhatsApp
            </a>
            <a
              :href="companyConfig.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-msg-btn footer-msg-btn--tg"
            >
              <Send :size="14" />
              Telegram
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <div class="footer-copy">
          © 2011–2026 {{ companyConfig.name }} ({{ companyConfig.regionCode }}). Все права защищены.
          <span class="footer-copy-note">Не является публичной офертой. Точный расчет формируется после стендового тест-плана.</span>
        </div>

        <button class="scroll-top-btn" @click="scrollToTop" aria-label="Наверх">
          <span>Наверх</span>
          <ArrowUp :size="16" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #07090c;
  border-top: 1px solid var(--color-border);
  padding: 64px 0 32px;
  position: relative;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
    gap: 32px;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.footer-logo__brand {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 800;
  color: var(--color-text);
}

.footer-logo__region {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--color-primary);
  color: #0b0d11;
}

.footer-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-m7-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 106, 26, 0.08);
  border: 1px solid rgba(255, 106, 26, 0.2);
  font-size: 12px;
  color: var(--color-text);
}

.m7-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 6px var(--color-primary);
}

.footer-title {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
  letter-spacing: 0.02em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a,
.footer-links span {
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.contact-icon {
  margin-top: 3px;
  flex-shrink: 0;
  color: var(--color-text-dim);
}

.contact-phone {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 14px;
}

.footer-messengers {
  display: flex;
  gap: 10px;
}

.footer-msg-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.footer-msg-btn:hover {
  transform: translateY(-1px);
}

.footer-msg-btn--wa {
  background: rgba(37, 211, 102, 0.12);
  color: #25d366;
  border: 1px solid rgba(37, 211, 102, 0.25);
}

.footer-msg-btn--tg {
  background: rgba(0, 136, 204, 0.12);
  color: #0088cc;
  border: 1px solid rgba(0, 136, 204, 0.25);
}

/* Footer Bottom */
.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border-subtle);
  font-size: 12px;
  color: var(--color-text-dim);
  text-align: center;
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-copy-note {
  display: block;
  font-size: 11px;
  margin-top: 4px;
}

.scroll-top-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 12px;
  transition: all var(--transition-fast);
}

.scroll-top-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}
</style>
