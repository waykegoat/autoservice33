<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import { CheckCircle, Phone, Send, ShieldCheck } from 'lucide-vue-next'
import { companyConfig } from '../../data/company'

interface Props {
  modelValue: boolean
  prefilledVehicle?: string
  prefilledService?: string
  initialNote?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  prefilledVehicle: '',
  prefilledService: '',
  initialNote: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const form = ref({
  name: '',
  phone: '',
  vehicle: '',
  comment: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const phoneError = ref('')

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      isSubmitted.value = false
      phoneError.value = ''
      if (props.prefilledVehicle) form.value.vehicle = props.prefilledVehicle
      if (props.initialNote) form.value.comment = props.initialNote
    }
  }
)

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10
}

function handlePhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  phoneError.value = ''
  form.value.phone = target.value
}

function handleSubmit() {
  if (!validatePhone(form.value.phone)) {
    phoneError.value = 'Пожалуйста, укажите корректный номер телефона (от 10 цифр)'
    return
  }

  isSubmitting.value = true

  // Client-side simulation of instant processing
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
  }, 600)
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="isSubmitted ? 'Заявка принята!' : 'Запись на стендовую диагностику'"
    max-width="500px"
  >
    <div v-if="!isSubmitted" class="booking-form">
      <p class="form-desc">
        Оставьте номер — мастер-топливщик перезвонит в течение
        <strong class="text-gradient-primary">10 минут</strong>, уточнит симптомы и согласует удобное время заезда.
      </p>

      <form @submit.prevent="handleSubmit" class="form-fields">
        <div class="field-group">
          <label for="name-input" class="field-label">Ваше имя</label>
          <input
            id="name-input"
            v-model="form.name"
            type="text"
            placeholder="Например, Александр"
            class="field-input"
          />
        </div>

        <div class="field-group">
          <label for="phone-input" class="field-label">
            Телефон для связи <span class="required">*</span>
          </label>
          <input
            id="phone-input"
            :value="form.phone"
            @input="handlePhoneInput"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            required
            class="field-input"
            :class="{ 'field-input--error': phoneError }"
          />
          <span v-if="phoneError" class="field-error">{{ phoneError }}</span>
        </div>

        <div class="field-group">
          <label for="vehicle-input" class="field-label">Марка / модель автомобиля или тип двигателя</label>
          <input
            id="vehicle-input"
            v-model="form.vehicle"
            type="text"
            placeholder="Например, Газель Next Cummins 2.8 или Transit"
            class="field-input"
          />
        </div>

        <div class="field-group">
          <label for="comment-input" class="field-label">Что беспокоит? (симптомы или кол-во форсунок)</label>
          <textarea
            id="comment-input"
            v-model="form.comment"
            rows="2"
            placeholder="Черный дым, троит на холодную, слив в обратку, нужен демонтаж..."
            class="field-textarea"
          ></textarea>
        </div>

        <div class="privacy-note">
          <ShieldCheck :size="16" class="privacy-icon" />
          <span>Конфиденциальность гарантирована. Без спама и навязчивой рекламы.</span>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          class="submit-btn"
          :disabled="isSubmitting"
        >
          <template #icon-left>
            <Send :size="18" />
          </template>
          {{ isSubmitting ? 'Отправка...' : 'Записаться на диагностику' }}
        </BaseButton>

        <div class="or-divider">
          <span>или напишите напрямую мастеру</span>
        </div>

        <div class="fast-messengers">
          <a
            :href="companyConfig.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="messenger-link messenger-link--wa"
          >
            WhatsApp
          </a>
          <a
            :href="companyConfig.telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="messenger-link messenger-link--tg"
          >
            Telegram
          </a>
        </div>
      </form>
    </div>

    <div v-else class="success-screen">
      <div class="success-icon-wrap">
        <CheckCircle :size="56" class="success-icon" />
      </div>

      <h4 class="success-title">Спасибо за обращение!</h4>
      <p class="success-text">
        Мастер сервиса <strong>{{ companyConfig.name }}</strong> уже получил вашу заявку. Мы свяжемся с вами по указанному номеру для согласования свободного стенда.
      </p>

      <div class="success-info-box">
        <div class="info-row">
          <span class="info-label">Адрес сервиса:</span>
          <span class="info-val">{{ companyConfig.city }}, {{ companyConfig.address }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Прямой телефон:</span>
          <a :href="`tel:${companyConfig.phoneRaw}`" class="info-phone">
            {{ companyConfig.phoneDisplay }}
          </a>
        </div>
      </div>

      <BaseButton variant="secondary" size="md" @click="close" class="close-btn">
        Понятно, закрыть
      </BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped>
.form-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 20px;
  line-height: 1.5;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.required {
  color: var(--color-primary);
}

.field-input,
.field-textarea {
  width: 100%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  color: var(--color-text);
  font-size: 14px;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.field-input:focus,
.field-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 106, 26, 0.15);
}

.field-input--error {
  border-color: var(--color-danger);
}

.field-error {
  font-size: 12px;
  color: var(--color-danger);
}

.field-textarea {
  resize: vertical;
  min-height: 60px;
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-dim);
}

.privacy-icon {
  color: var(--color-success);
  flex-shrink: 0;
}

.submit-btn {
  width: 100%;
  margin-top: 6px;
}

.or-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 12px 0 6px;
  color: var(--color-text-dim);
  font-size: 12px;
}

.or-divider::before,
.or-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-border);
}

.or-divider span {
  padding: 0 10px;
}

.fast-messengers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.messenger-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.messenger-link--wa {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
  border: 1px solid rgba(37, 211, 102, 0.25);
}

.messenger-link--wa:hover {
  background: rgba(37, 211, 102, 0.2);
  transform: translateY(-1px);
}

.messenger-link--tg {
  background: rgba(0, 136, 204, 0.1);
  color: #0088cc;
  border: 1px solid rgba(0, 136, 204, 0.25);
}

.messenger-link--tg:hover {
  background: rgba(0, 136, 204, 0.2);
  transform: translateY(-1px);
}

/* Success State */
.success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 0;
}

.success-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(56, 211, 159, 0.1);
  border: 1px solid rgba(56, 211, 159, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.success-icon {
  color: var(--color-success);
}

.success-title {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}

.success-text {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.success-info-box {
  width: 100%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 10px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 11px;
  color: var(--color-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-val {
  font-size: 13px;
  color: var(--color-text);
  font-weight: 500;
}

.info-phone {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 700;
  text-decoration: none;
}

.close-btn {
  width: 100%;
}
</style>
