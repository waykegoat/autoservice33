<script setup lang="ts">
import { ref } from 'vue'
import { faqList } from '../../data/faq'
import { companyConfig } from '../../data/company'
import BaseButton from '../ui/BaseButton.vue'
import { HelpCircle, ChevronDown, PhoneCall } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking'): void
}>()

const openItems = ref<Record<string, boolean>>({
  'faq-code': true, // First item open by default
  'faq-stuck': true
})

function toggleItem(id: string) {
  openItems.value[id] = !openItems.value[id]
}
</script>

<template>
  <section id="faq" class="section faq-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag section-tag--tech">
          <HelpCircle :size="14" />
          База знаний
        </span>
        <h2 class="section-title">
          Часто задаваемые <span class="text-gradient-tech">вопросы и ответы</span>
        </h2>
        <p class="section-subtitle">
          Технические нюансы, прописка кодов, гарантийные обязательства и работа со сложными случаями.
        </p>
      </div>

      <div class="faq-accordion">
        <div
          v-for="item in faqList"
          :key="item.id"
          class="faq-item"
          :class="{ 'faq-item--open': openItems[item.id] }"
        >
          <button
            class="faq-trigger"
            @click="toggleItem(item.id)"
            :aria-expanded="!!openItems[item.id]"
          >
            <div class="faq-question-group">
              <span class="faq-cat-badge">{{ item.category }}</span>
              <span class="faq-question">{{ item.question }}</span>
            </div>
            <div class="faq-icon-wrap">
              <ChevronDown :size="18" class="faq-chevron" />
            </div>
          </button>

          <div v-show="openItems[item.id]" class="faq-answer-panel">
            <p class="faq-answer-text">{{ item.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Still have questions CTA card -->
      <div class="faq-help-card">
        <div class="faq-help-info">
          <h4 class="help-title">Остались вопросы по вашей топливной системе?</h4>
          <p class="help-desc">
            Опишите симптомы вашему мастеру во Владимире — подскажем, в чем именно причина, и назовем точную стоимость до снятия форсунок.
          </p>
        </div>

        <div class="faq-help-actions">
          <BaseButton
            variant="primary"
            size="md"
            @click="$emit('open-booking')"
          >
            <template #icon-left>
              <PhoneCall :size="16" />
            </template>
            Консультация инженера
          </BaseButton>

          <a :href="`tel:${companyConfig.phoneRaw}`" class="direct-phone">
            {{ companyConfig.phoneDisplay }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.faq-accordion {
  max-width: 860px;
  margin: 0 auto 48px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.faq-item--open {
  border-color: var(--color-border-focus);
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  text-align: left;
  gap: 16px;
  background: none;
  cursor: pointer;
}

.faq-question-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.faq-cat-badge {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-tech);
}

.faq-question {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
}

.faq-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: transform var(--transition-base), background-color var(--transition-fast);
}

.faq-item--open .faq-icon-wrap {
  transform: rotate(180deg);
  background: rgba(255, 106, 26, 0.15);
  color: var(--color-primary);
}

.faq-answer-panel {
  padding: 0 24px 22px;
}

.faq-answer-text {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.65;
  border-top: 1px solid var(--color-border-subtle);
  padding-top: 16px;
}

/* Bottom help card */
.faq-help-card {
  max-width: 860px;
  margin: 0 auto;
  background: linear-gradient(135deg, #181e28 0%, #12151d 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .faq-help-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 32px 36px;
  }
}

.faq-help-info {
  max-width: 500px;
}

.help-title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.help-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.faq-help-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .faq-help-actions {
    align-items: flex-end;
  }
}

.direct-phone {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}
</style>
