<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
  href?: string
  block?: boolean
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button'
})

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  { 'btn--block': props.block }
])

const tag = computed(() => (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :href="href"
    :type="tag === 'button' ? type : undefined"
  >
    <span class="btn__label"><slot /></span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-head);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .04em;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: transform .16s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}

.btn--md {
  padding: 12px 22px;
  font-size: .92rem;
}

.btn--lg {
  padding: 16px 30px;
  font-size: 1.02rem;
}

.btn--block {
  width: 100%;
}

.btn--primary {
  background: var(--accent);
  color: #10120f;
  box-shadow: var(--shadow-accent);
}

.btn--primary:hover {
  background: var(--accent-2);
  transform: translateY(-2px);
}

.btn--primary:active {
  transform: translateY(0);
}

.btn--outline {
  border-color: var(--line-2);
  color: var(--text);
  background: transparent;
}

.btn--outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.btn--ghost {
  color: var(--muted);
  background: transparent;
}

.btn--ghost:hover {
  color: var(--accent);
}

.btn :deep(svg) {
  width: 1.1em;
  height: 1.1em;
}
</style>
