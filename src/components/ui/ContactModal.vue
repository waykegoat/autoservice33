<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import BaseButton from './BaseButton.vue'
import { companyConfig } from '../../data/company'
import { X, Phone } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: boolean
  prefilledNote?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const name = ref('')
const phone = ref('')
const car = ref('')
const note = ref('')
const submitting = ref(false)
const sent = ref(false)

watch(() => props.modelValue, (val) => {
  if (val) {
    sent.value = false
    if (props.prefilledNote) note.value = props.prefilledNote
  }
})

function close() {
  emit('update:modelValue', false)
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

function submit() {
  if (!phone.value) return
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    sent.value = true
  }, 400)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-root" @click.self="close">
      <div class="modal-box">
        <div class="hazard modal-stripe" />
        <button class="modal-close" @click="close" aria-label="Закрыть">
          <X :size="20" />
        </button>

        <div v-if="!sent" class="modal-content">
          <h3 class="modal-title">Запись на стендовую диагностику</h3>
          <p class="modal-sub">
            Мастер перезвонит в течение 10 минут, ответит на вопросы и согласует время заезда.
          </p>

          <form @submit.prevent="submit" class="modal-form">
            <div class="field">
              <label class="field-lbl">Ваше имя</label>
              <input v-model="name" type="text" placeholder="Александр" class="field-in" />
            </div>

            <div class="field">
              <label class="field-lbl">Номер телефона <span class="accent">*</span></label>
              <input v-model="phone" type="tel" placeholder="+7 (___) ___-__-__" required class="field-in" />
            </div>

            <div class="field">
              <label class="field-lbl">Автомобиль / Модель форсунки</label>
              <input v-model="car" type="text" placeholder="Например: Газель Next Cummins 2.8" class="field-in" />
            </div>

            <div class="field">
              <label class="field-lbl">Что беспокоит</label>
              <textarea v-model="note" rows="2" placeholder="Черный дым, троит на холодную, слив в обратку..." class="field-in field-area"></textarea>
            </div>

            <BaseButton type="submit" size="lg" block :disabled="submitting">
              {{ submitting ? 'Отправка...' : 'Записаться на стенд' }}
            </BaseButton>

            <div class="modal-direct">
              <span>Или позвоните напрямую:</span>
              <a :href="`tel:${companyConfig.phoneRaw}`" class="direct-phone mono">
                {{ companyConfig.phoneDisplay }}
              </a>
            </div>
          </form>
        </div>

        <div v-else class="modal-done">
          <div class="done-check">✓</div>
          <h3 class="modal-title">Заявка принята</h3>
          <p class="modal-sub">
            Мастер свяжется с вами по номеру <strong>{{ phone }}</strong> для согласования свободного стенда.
          </p>
          <BaseButton variant="outline" size="md" block @click="close">
            Закрыть
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-root {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(13, 15, 19, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
}

.modal-stripe {
  height: 4px;
  background: var(--hazard);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  color: var(--black);
  display: grid;
  place-items: center;
  transition: all .16s ease;
}

.modal-close:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.modal-content {
  padding: 32px 28px 28px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 6px;
}

.modal-sub {
  color: var(--muted);
  font-size: .88rem;
  line-height: 1.45;
  margin-bottom: 22px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-lbl {
  font-family: var(--font-head);
  font-size: .82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--black);
}

.field-in {
  background: #ffffff;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  color: var(--black);
  font-size: .94rem;
  transition: all .16s ease;
}

.field-in:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.field-area {
  resize: vertical;
}

.modal-direct {
  text-align: center;
  margin-top: 8px;
  font-size: .84rem;
  color: var(--dim);
}

.direct-phone {
  display: block;
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: 2px;
}

.modal-done {
  padding: 44px 28px;
  text-align: center;
}

.done-check {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  display: inline-grid;
  place-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
