<script setup lang="ts">
import { ref } from 'vue'
import { companyConfig } from '../../data/company'
import BaseButton from '../ui/BaseButton.vue'
import BaseBadge from '../ui/BaseBadge.vue'
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Check,
  Copy,
  Navigation,
  CheckCircle2,
  ShieldCheck
} from 'lucide-vue-next'

const isCopied = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const form = ref({
  name: '',
  phone: '',
  car: '',
  message: ''
})

function copyAddress() {
  const fullAddress = `${companyConfig.city}, ${companyConfig.address}`
  navigator.clipboard.writeText(fullAddress)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

function handleFormSubmit() {
  if (!form.value.phone) return
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
  }, 600)
}
</script>

<template>
  <section id="contacts" class="section contacts-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <MapPin :size="14" />
          Контакты и проезд
        </span>
        <h2 class="section-title">
          Как нас найти в <span class="text-gradient-primary">33 регионе</span>
        </h2>
        <p class="section-subtitle">
          Удобный подъезд с трассы М-7 «Волга» без пробок и ограничений на грузовой транспорт. Ждем вас на диагностику и ремонт.
        </p>
      </div>

      <div class="contacts-layout">
        <!-- Left: Contact info cards -->
        <div class="contacts-info-col">
          <!-- Address Card -->
          <div class="contact-card card-base">
            <div class="card-icon-wrap">
              <MapPin :size="20" />
            </div>
            <div class="card-body-content">
              <span class="card-label">Адрес техцентра:</span>
              <h4 class="card-val">{{ companyConfig.city }}, {{ companyConfig.address }}</h4>
              <p class="card-desc">{{ companyConfig.addressNote }}</p>

              <button class="copy-btn" @click="copyAddress">
                <component :is="isCopied ? Check : Copy" :size="14" />
                <span>{{ isCopied ? 'Адрес скопирован в буфер!' : 'Скопировать для навигатора' }}</span>
              </button>
            </div>
          </div>

          <!-- Phone & Working hours -->
          <div class="contact-card card-base">
            <div class="card-icon-wrap">
              <Phone :size="20" />
            </div>
            <div class="card-body-content">
              <span class="card-label">Прямой номер мастера:</span>
              <a :href="`tel:${companyConfig.phoneRaw}`" class="card-phone">
                {{ companyConfig.phoneDisplay }}
              </a>
              <span class="card-sub-phone">Городской: {{ companyConfig.phoneLandline }}</span>
              <div class="hours-badge">
                <Clock :size="13" />
                <span>{{ companyConfig.workingHours }}</span>
              </div>
            </div>
          </div>

          <!-- Messengers row -->
          <div class="messengers-card card-base">
            <span class="card-label">Быстрая консультация в чате:</span>
            <div class="msg-buttons">
              <a
                :href="companyConfig.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="msg-link msg-link--wa"
              >
                <span>Написать в WhatsApp</span>
              </a>
              <a
                :href="companyConfig.telegramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="msg-link msg-link--tg"
              >
                <span>Написать в Telegram</span>
              </a>
            </div>
          </div>

          <!-- Navigation Coordinates Helper -->
          <div class="nav-helper-card">
            <Navigation :size="18" class="text-gradient-tech" />
            <span>Для Яндекс.Навигатора: введите <strong>«Форсунка 33 Владимир»</strong> или адрес <strong>ул. Куйбышева, 26Ж</strong></span>
          </div>
        </div>

        <!-- Right: Fast Booking Form -->
        <div class="contacts-form-col">
          <div class="form-card">
            <div v-if="!isSubmitted">
              <div class="form-card__header">
                <h3 class="form-title">Записаться на стендовый осмотр</h3>
                <p class="form-sub">
                  Оставьте телефон — мастер зарезервирует стенд на удобное вам время.
                </p>
              </div>

              <form @submit.prevent="handleFormSubmit" class="contacts-form">
                <div class="form-group">
                  <label class="form-label">Ваше имя</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Как к вам обращаться"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Номер телефона <span class="text-primary">*</span>
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Автомобиль / Двигатель</label>
                  <input
                    v-model="form.car"
                    type="text"
                    placeholder="Например, Газель Next, Transit, Touareg"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Что происходит с машиной?</label>
                  <textarea
                    v-model="form.message"
                    rows="3"
                    placeholder="Дым, стук форсунки, не заводится на горячую..."
                    class="form-textarea"
                  ></textarea>
                </div>

                <BaseButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  class="submit-action-btn"
                  :disabled="isSubmitting"
                >
                  <template #icon-left>
                    <Send :size="18" />
                  </template>
                  {{ isSubmitting ? 'Отправляем...' : 'Отправить заявку мастеру' }}
                </BaseButton>

                <div class="form-privacy">
                  <ShieldCheck :size="15" class="privacy-shield" />
                  <span>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</span>
                </div>
              </form>
            </div>

            <div v-else class="form-success">
              <div class="success-icon-wrap">
                <CheckCircle2 :size="56" class="text-success" />
              </div>
              <h4 class="success-head">Заявка успешно отправлена!</h4>
              <p class="success-message">
                Мастер технического центра свяжется с вами в течение 10-15 минут для уточнения симптомов и бронирования времени стенда.
              </p>
              <div class="success-phone-bar">
                <span>Или позвоните сразу: </span>
                <a :href="`tel:${companyConfig.phoneRaw}`" class="success-phone-link">
                  {{ companyConfig.phoneDisplay }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  background-color: var(--color-bg);
}

.contacts-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 1024px) {
  .contacts-layout {
    grid-template-columns: 1.15fr 1fr;
    gap: 40px;
  }
}

.contacts-info-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-card {
  padding: 24px;
  display: flex;
  gap: 18px;
}

.card-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(255, 106, 26, 0.1);
  border: 1px solid rgba(255, 106, 26, 0.3);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-body-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-label {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-dim);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.card-val {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.4;
  margin-bottom: 12px;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-tech);
  background: rgba(0, 210, 255, 0.08);
  border: 1px solid rgba(0, 210, 255, 0.2);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  align-self: flex-start;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: rgba(0, 210, 255, 0.16);
}

.card-phone {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary);
  text-decoration: none;
  margin-bottom: 2px;
}

.card-sub-phone {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}

.hours-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  background: var(--color-surface-elevated);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  align-self: flex-start;
}

/* Messengers card */
.messengers-card {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.msg-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.msg-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.msg-link--wa {
  background: rgba(37, 211, 102, 0.12);
  color: #25d366;
  border: 1px solid rgba(37, 211, 102, 0.3);
}

.msg-link--wa:hover {
  background: rgba(37, 211, 102, 0.22);
  transform: translateY(-1px);
}

.msg-link--tg {
  background: rgba(0, 136, 204, 0.12);
  color: #0088cc;
  border: 1px solid rgba(0, 136, 204, 0.3);
}

.msg-link--tg:hover {
  background: rgba(0, 136, 204, 0.22);
  transform: translateY(-1px);
}

.nav-helper-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  font-size: 13px;
  color: var(--color-text-muted);
}

.nav-helper-card strong {
  color: var(--color-text);
}

/* Form card */
.form-card {
  background: linear-gradient(180deg, #181d27 0%, #11141b 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 28px;
  box-shadow: var(--shadow-md);
}

.form-card__header {
  margin-bottom: 24px;
}

.form-title {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.form-sub {
  font-size: 13px;
  color: var(--color-text-muted);
}

.contacts-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.text-primary {
  color: var(--color-primary);
}

.form-input,
.form-textarea {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  color: var(--color-text);
  font-size: 14px;
  transition: border-color var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-textarea {
  resize: vertical;
}

.submit-action-btn {
  width: 100%;
  margin-top: 6px;
}

.form-privacy {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-dim);
}

.privacy-shield {
  color: var(--color-success);
  flex-shrink: 0;
}

/* Success state */
.form-success {
  text-align: center;
  padding: 32px 12px;
}

.success-icon-wrap {
  margin-bottom: 16px;
}

.text-success {
  color: var(--color-success);
}

.success-head {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}

.success-message {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.success-phone-bar {
  font-size: 14px;
  color: var(--color-text);
}

.success-phone-link {
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}
</style>
