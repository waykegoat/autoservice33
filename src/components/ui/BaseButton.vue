<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tech'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="!href ? type : undefined"
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--disabled': disabled }
    ]"
    :disabled="!href && disabled"
  >
    <slot name="icon-left" />
    <span class="btn__content"><slot /></span>
    <slot name="icon-right" />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;
}

/* Sizes */
.btn--sm {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: var(--radius-sm);
}

.btn--md {
  padding: 12px 24px;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.btn--lg {
  padding: 16px 32px;
  font-size: 15px;
  letter-spacing: 0.03em;
  border-radius: var(--radius-lg);
}

/* Variants */
.btn--primary {
  background: var(--color-primary-gradient);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(255, 106, 26, 0.35);
}

.btn--primary:hover:not(.btn--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 106, 26, 0.5);
  filter: brightness(1.05);
}

.btn--primary:active:not(.btn--disabled) {
  transform: translateY(0);
}

.btn--tech {
  background: var(--color-tech-gradient);
  color: #0b0d11;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 210, 255, 0.35);
}

.btn--tech:hover:not(.btn--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 210, 255, 0.5);
  filter: brightness(1.08);
}

.btn--secondary {
  background-color: var(--color-surface-elevated);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--color-surface-hover);
  border-color: var(--color-text-muted);
  transform: translateY(-1px);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: rgba(255, 106, 26, 0.1);
  box-shadow: 0 0 16px rgba(255, 106, 26, 0.2);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-text-muted);
  border: 1px solid transparent;
}

.btn--ghost:hover:not(.btn--disabled) {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn__content {
  display: inline-flex;
  align-items: center;
}
</style>
