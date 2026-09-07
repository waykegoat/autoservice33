<script setup lang="ts">
import { ref } from 'vue'
import { faqList } from '../../data/faq'
import { ChevronDown } from 'lucide-vue-next'

const openId = ref<string | null>('faq-code')

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section id="faq" class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow eyebrow--center">Вопросы и ответы</p>
        <h2 class="section-title">
          Частые вопросы <span class="accent">по ремонту и кодированию</span>
        </h2>
        <p class="section-subtitle">
          Технические нюансы, присвоение IMA-кодов, ресурс восстановленных форсунок и демонтаж.
        </p>
      </div>

      <div class="faq-list">
        <div
          v-for="item in faqList"
          :key="item.id"
          class="faq-box"
          :class="{ 'faq-box--active': openId === item.id }"
        >
          <button
            class="faq-q"
            @click="toggle(item.id)"
            :aria-expanded="openId === item.id"
          >
            <span>{{ item.question }}</span>
            <ChevronDown :size="18" class="faq-arrow" />
          </button>

          <div v-show="openId === item.id" class="faq-a">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-list {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-box {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: border-color .18s, box-shadow .18s;
}

.faq-box--active {
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  text-align: left;
  background: none;
  border: none;
  color: var(--black);
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: .02em;
}

.faq-arrow {
  color: var(--dim);
  flex-shrink: 0;
  transition: transform .2s ease, color .2s ease;
}

.faq-box--active .faq-arrow {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-a {
  padding: 0 24px 22px;
  color: var(--text-muted);
  font-size: .94rem;
  line-height: 1.65;
  border-top: 1px solid var(--line);
  padding-top: 16px;
}
</style>
