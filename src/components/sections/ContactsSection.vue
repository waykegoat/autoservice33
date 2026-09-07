<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseCard from '../ui/BaseCard.vue'
import { companyConfig } from '../../data/company'
import { MapPin, Phone, Clock, Copy, Check, Send } from 'lucide-vue-next'

const copied = ref(false)
const submitting = ref(false)
const sent = ref(false)

const form = ref({
  name: '',
  phone: '',
  car: '',
  message: ''
})

function copyAddr() {
  navigator.clipboard.writeText(`${companyConfig.city}, ${companyConfig.address}`)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function submit() {
  if (!form.value.phone) return
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    sent.value = true
  }, 500)
}
</script>

<template>
  <section id="contacts" class="section section--muted">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Контакты и запись</p>
        <h2 class="section-title">
          Ждем вас <span class="accent">во Владимире</span>
        </h2>
        <p class="section-subtitle">
          Удобный заезд с федеральной трассы М-7 «Волга» без городских пробок.
        </p>
      </div>

      <div class="contacts-grid">
        <!-- Info Column -->
        <div class="info-col">
          <BaseCard accent class="info-card">
            <div class="info-body">
              <span class="info-label">Адрес мастерской</span>
              <h3 class="info-title">{{ companyConfig.city }}, {{ companyConfig.address }}</h3>
              <p class="info-sub">{{ companyConfig.addressNote }}</p>

              <button class="copy-act" @click="copyAddr">
                <component :is="copied ? Check : Copy" :size="14" />
                <span>{{ copied ? 'Адрес скопирован' : 'Скопировать для навигатора' }}</span>
              </button>
            </div>
          </BaseCard>

          <BaseCard class="info-card">
            <div class="info-body">
              <span class="info-label">Телефон мастера</span>
              <a :href="`tel:${companyConfig.phoneRaw}`" class="phone-link mono">
                {{ companyConfig.phoneDisplay }}
              </a>
              <span class="hours-line">
                <Clock :size="14" class="accent" /> {{ companyConfig.workingHours }}
              </span>
            </div>
          </BaseCard>

          <div class="messengers-row">
            <a
              :href="companyConfig.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="msg-btn msg-btn--wa"
            >
              WhatsApp
            </a>
            <a
              :href="companyConfig.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="msg-btn msg-btn--tg"
            >
              Telegram
            </a>
          </div>
        </div>

        <!-- Form Column -->
        <div class="form-col">
          <div class="form-wrap">
            <div v-if="!sent">
              <h3 class="form-head">Записаться на стендовый осмотр</h3>
              <p class="form-subhead">Оставьте номер — перезвоним в течение 10 минут и согласуем заезд.</p>

              <form @submit.prevent="submit" class="contact-form">
                <div class="input-row">
                  <label class="input-lbl">Ваше имя</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Александр"
                    class="txt-input"
                  />
                </div>

                <div class="input-row">
                  <label class="input-lbl">Телефон <span class="accent">*</span></label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                    class="txt-input"
                  />
                </div>

                <div class="input-row">
                  <label class="input-lbl">Автомобиль или тип форсунки</label>
                  <input
                    v-model="form.car"
                    type="text"
                    placeholder="Газель Next Cummins 2.8, Transit или снятые форсунки"
                    class="txt-input"
                  />
                </div>

                <div class="input-row">
                  <label class="input-lbl">Симптомы (кратко)</label>
                  <textarea
                    v-model="form.message"
                    rows="2"
                    placeholder="Черный дым, троит на холодную, стук форсунки..."
                    class="txt-input txt-area"
                  ></textarea>
                </div>

                <BaseButton
                  type="submit"
                  size="lg"
                  block
                  :disabled="submitting"
                >
                  {{ submitting ? 'Отправка...' : 'Отправить заявку мастеру' }}
                </BaseButton>
              </form>
            </div>

            <div v-else class="form-done">
              <span class="done-ic">✓</span>
              <h3 class="done-title">Заявка принята</h3>
              <p class="done-desc">
                Мастер свяжется с вами по указанному телефону для подтверждения бронирования стенда.
              </p>
              <a :href="`tel:${companyConfig.phoneRaw}`" class="done-call">
                Или позвоните прямо сейчас: <strong>{{ companyConfig.phoneDisplay }}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: flex-start;
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  width: 100%;
}

.info-body {
  padding: 24px;
}

.info-label {
  font-family: var(--font-head);
  font-size: .78rem;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--dim);
  display: block;
  margin-bottom: 6px;
}

.info-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 6px;
}

.info-sub {
  color: var(--muted);
  font-size: .88rem;
  margin-bottom: 14px;
}

.copy-act {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  color: var(--black);
  font-weight: 500;
  font-size: .82rem;
  transition: all .16s ease;
}

.copy-act:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.phone-link {
  font-family: var(--font-head);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent);
  display: block;
  margin-bottom: 8px;
}

.hours-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .88rem;
  color: var(--muted);
}

.messengers-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.msg-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: var(--radius-sm);
  font-family: var(--font-head);
  font-size: .92rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 600;
  transition: transform .16s ease;
}

.msg-btn:hover {
  transform: translateY(-2px);
}

.msg-btn--wa {
  background: rgba(37, 211, 102, .12);
  color: #1f9d4d;
  border: 1px solid rgba(37, 211, 102, .3);
}

.msg-btn--tg {
  background: rgba(0, 136, 204, .12);
  color: #0077b3;
  border: 1px solid rgba(0, 136, 204, .3);
}

/* Form Wrap */
.form-wrap {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 36px;
  box-shadow: var(--shadow);
}

.form-head {
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 6px;
}

.form-subhead {
  color: var(--muted);
  font-size: .9rem;
  margin-bottom: 24px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-lbl {
  font-family: var(--font-head);
  font-size: .82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--black);
}

.txt-input {
  background: #ffffff;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  color: var(--text);
  font-size: .94rem;
  transition: all .16s ease;
}

.txt-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.txt-area {
  resize: vertical;
}

.form-done {
  text-align: center;
  padding: 30px 10px;
}

.done-ic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.done-title {
  font-size: 1.6rem;
  margin-bottom: 8px;
}

.done-desc {
  color: var(--muted);
  font-size: .95rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.done-call {
  font-size: .94rem;
  color: var(--text);
}

.done-call strong {
  color: var(--accent);
}

@media (max-width: 900px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
  .form-wrap {
    padding: 24px;
  }
}
</style>
