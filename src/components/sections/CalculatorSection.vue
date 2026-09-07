<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseBadge from '../ui/BaseBadge.vue'
import {
  Calculator,
  Car,
  Truck,
  Bus,
  Tractor,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'submit-calculation', payload: { summary: string; priceText: string }): void
}>()

// Step 1: Vehicle Type
const vehicleType = ref<'passenger' | 'commercial' | 'truck' | 'special'>('commercial')

const vehicleOptions = [
  { id: 'commercial', label: 'Коммерческий (Газель, Transit, Sprinter)', icon: Bus, baseMultiplier: 1.0 },
  { id: 'passenger', label: 'Легковой дизель (VAG, BMW, Hyundai, Kia)', icon: Car, baseMultiplier: 0.95 },
  { id: 'truck', label: 'Тягачи и грузовые (КАМАЗ 5490, Scania, MAN)', icon: Truck, baseMultiplier: 1.25 },
  { id: 'special', label: 'Спецтехника / Тракторы (МТЗ, JCB, CAT)', icon: Tractor, baseMultiplier: 1.2 }
]

// Step 2: Fuel System
const fuelBrand = ref<string>('bosch')

const brandOptions = [
  { id: 'bosch', name: 'Bosch Common Rail', pricePerUnit: 3500, timeUnit: 'от 1.5 ч' },
  { id: 'delphi', name: 'Delphi (C2i / C3i)', pricePerUnit: 4200, timeUnit: 'от 2 ч' },
  { id: 'denso', name: 'Denso (Япония)', pricePerUnit: 4500, timeUnit: 'от 2 ч' },
  { id: 'piezo', name: 'Пьезо Bosch / Siemens VDO', pricePerUnit: 5500, timeUnit: 'от 3 ч' },
  { id: 'cummins', name: 'Cummins ISF 2.8 / 3.8', pricePerUnit: 3800, timeUnit: 'от 1.5 ч' },
  { id: 'pde', name: 'Насос-форсунки (UIS / PDE)', pricePerUnit: 5000, timeUnit: 'от 1 дня' }
]

// Step 3: Count
const injectorCount = ref<number>(4)
const countOptions = [1, 4, 6, 8]

// Step 4: Additional options
const needsExtraction = ref<boolean>(false) // Прикипели, нужен гидросъемник
const needsCoding = ref<boolean>(true) // Кодирование IMA включено
const broughtDisassembled = ref<boolean>(false) // Форсунки уже сняты

// Calculations
const selectedBrandMeta = computed(() => {
  return brandOptions.find((b) => b.id === fuelBrand.value) || brandOptions[0]
})

const selectedVehicleMeta = computed(() => {
  return vehicleOptions.find((v) => v.id === vehicleType.value) || vehicleOptions[0]
})

const estimatedCost = computed(() => {
  const baseRate = selectedBrandMeta.value.pricePerUnit * selectedVehicleMeta.value.baseMultiplier
  let total = baseRate * injectorCount.value

  if (needsExtraction.value) {
    // 2500 per stuck injector
    total += 2500 * injectorCount.value
  }

  // If already brought disassembled, slight bonus
  if (broughtDisassembled.value) {
    total = Math.max(0, total - 1000)
  }

  const min = Math.round(total)
  const max = Math.round(total * 1.25)
  return { min, max }
})

const estimatedSavings = computed(() => {
  // Buying new injectors typically costs ~25,000 - 45,000 each
  const newCost = injectorCount.value * 28000
  const saved = newCost - estimatedCost.value.max
  return saved > 0 ? saved : 40000
})

function submitCalculation() {
  const summary = `Расчет: ${selectedVehicleMeta.value.label}, ${selectedBrandMeta.value.name}, ${injectorCount.value} шт. ${needsExtraction.value ? '(Требуется гидродемонтаж)' : ''} ${broughtDisassembled.value ? '(Форсунки сняты)' : ''}`
  const priceText = `от ${estimatedCost.value.min.toLocaleString('ru-RU')} ₽`
  emit('submit-calculation', { summary, priceText })
}
</script>

<template>
  <section id="calculator" class="section calculator-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag section-tag--tech">
          <Calculator :size="14" />
          Онлайн-калькулятор стоимости
        </span>
        <h2 class="section-title">
          Рассчитайте стоимость <span class="text-gradient-tech">ремонта форсунок</span>
        </h2>
        <p class="section-subtitle">
          Укажите тип техники и симптомы. Получите прозрачный предварительный расчет с учетом запчастей, стендового тестирования и генерации кодов.
        </p>
      </div>

      <div class="calculator-box">
        <!-- Left configuration columns -->
        <div class="calc-config">
          <!-- Step 1: Vehicle -->
          <div class="calc-group">
            <label class="calc-group__label">
              <span class="step-num">1</span>
              Тип транспортного средства
            </label>
            <div class="vehicle-options-grid">
              <button
                v-for="opt in vehicleOptions"
                :key="opt.id"
                class="vehicle-pill"
                :class="{ 'vehicle-pill--active': vehicleType === opt.id }"
                @click="vehicleType = opt.id as any"
              >
                <component :is="opt.icon" :size="20" class="vehicle-pill__icon" />
                <span class="vehicle-pill__name">{{ opt.label }}</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Fuel Brand -->
          <div class="calc-group">
            <label class="calc-group__label">
              <span class="step-num">2</span>
              Производитель топливной системы
            </label>
            <div class="brands-options-grid">
              <button
                v-for="brand in brandOptions"
                :key="brand.id"
                class="brand-pill"
                :class="{ 'brand-pill--active': fuelBrand === brand.id }"
                @click="fuelBrand = brand.id"
              >
                <span class="brand-name">{{ brand.name }}</span>
                <span class="brand-rate">от {{ brand.pricePerUnit }} ₽/шт</span>
              </button>
            </div>
          </div>

          <!-- Step 3: Injector Count -->
          <div class="calc-group">
            <label class="calc-group__label">
              <span class="step-num">3</span>
              Количество форсунок
            </label>
            <div class="count-selector">
              <button
                v-for="c in countOptions"
                :key="c"
                class="count-btn"
                :class="{ 'count-btn--active': injectorCount === c }"
                @click="injectorCount = c"
              >
                {{ c }} {{ c === 1 ? 'форсунка' : c < 5 ? 'форсунки' : 'форсунок' }}
              </button>
            </div>
          </div>

          <!-- Step 4: Additional options switches -->
          <div class="calc-group">
            <label class="calc-group__label">
              <span class="step-num">4</span>
              Дополнительные особенности
            </label>
            <div class="toggles-list">
              <label class="toggle-card">
                <input
                  v-model="needsExtraction"
                  type="checkbox"
                  class="toggle-checkbox"
                />
                <div class="toggle-text">
                  <strong>Форсунки прикипели к ГБЦ</strong>
                  <span>Требуется гидравлический съемник 20т без снятия головки блока</span>
                </div>
              </label>

              <label class="toggle-card">
                <input
                  v-model="broughtDisassembled"
                  type="checkbox"
                  class="toggle-checkbox"
                />
                <div class="toggle-text">
                  <strong>Форсунки уже сняты с авто</strong>
                  <span>Привезете снятые детали в наш сервис или отправите СДЭК/ТК</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Summary Sticky Panel -->
        <div class="calc-summary">
          <div class="summary-card">
            <div class="summary-header">
              <BaseBadge variant="tech" :pulse="true">
                Предварительная смета
              </BaseBadge>
              <span class="summary-time">
                <Clock :size="13" />
                Срок: {{ selectedBrandMeta.timeUnit }}
              </span>
            </div>

            <div class="summary-price-box">
              <span class="price-caption">Ориентировочная стоимость:</span>
              <div class="price-value text-gradient-primary">
                от {{ estimatedCost.min.toLocaleString('ru-RU') }} ₽
              </div>
              <span class="price-range">
                до {{ estimatedCost.max.toLocaleString('ru-RU') }} ₽ за {{ injectorCount }} шт. (с запчастями)
              </span>
            </div>

            <div class="summary-savings">
              <div class="savings-icon">⚡</div>
              <div class="savings-info">
                <strong>Ваша экономия: ~{{ estimatedSavings.toLocaleString('ru-RU') }} ₽</strong>
                <span>по сравнению с покупкой новых оригинальных форсунок</span>
              </div>
            </div>

            <div class="summary-features-list">
              <div class="summary-feat">
                <CheckCircle2 :size="16" class="feat-check text-success" />
                <span>Распечатка протокола испытаний на стенде</span>
              </div>
              <div class="summary-feat">
                <CheckCircle2 :size="16" class="feat-check text-success" />
                <span>Генерация новых кодов коррекции (IMA/C2i)</span>
              </div>
              <div class="summary-feat">
                <CheckCircle2 :size="16" class="feat-check text-success" />
                <span>Гарантия до 12 месяцев в заказ-наряде</span>
              </div>
            </div>

            <BaseButton
              variant="primary"
              size="lg"
              class="summary-btn"
              @click="submitCalculation"
            >
              <template #icon-left>
                <Send :size="18" />
              </template>
              Зафиксировать расчет и скидку
            </BaseButton>

            <div class="summary-guarantee-note">
              <ShieldCheck :size="16" class="note-icon" />
              <span>Финальная стоимость не изменится после согласования тест-плана</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.calculator-section {
  background-color: var(--color-bg);
  position: relative;
}

.calculator-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
}

@media (min-width: 1024px) {
  .calculator-box {
    grid-template-columns: 1.35fr 0.85fr;
    padding: 40px;
    gap: 48px;
  }
}

.calc-config {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.calc-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.calc-group__label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #0b0d11;
  font-size: 12px;
  font-weight: 800;
}

/* Vehicle buttons */
.vehicle-options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

@media (min-width: 600px) {
  .vehicle-options-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.vehicle-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 13px;
  text-align: left;
  transition: all var(--transition-fast);
}

.vehicle-pill:hover {
  border-color: var(--color-text-dim);
  color: var(--color-text);
}

.vehicle-pill--active {
  border-color: var(--color-primary);
  background: rgba(255, 106, 26, 0.08);
  color: var(--color-text);
  box-shadow: 0 0 16px rgba(255, 106, 26, 0.15);
}

.vehicle-pill__icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Brands grid */
.brands-options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

@media (min-width: 600px) {
  .brands-options-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.brand-pill {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 13px;
  transition: all var(--transition-fast);
}

.brand-pill:hover {
  border-color: var(--color-text-dim);
}

.brand-pill--active {
  border-color: var(--color-tech);
  background: rgba(0, 210, 255, 0.08);
  box-shadow: 0 0 16px rgba(0, 210, 255, 0.15);
}

.brand-name {
  font-weight: 600;
}

.brand-rate {
  font-size: 12px;
  color: var(--color-text-dim);
}

/* Count selector */
.count-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.count-btn {
  padding: 10px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.count-btn:hover {
  border-color: var(--color-text-dim);
  color: var(--color-text);
}

.count-btn--active {
  background-color: var(--color-surface-elevated);
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 12px rgba(255, 106, 26, 0.2);
}

/* Toggles */
.toggles-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toggle-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.toggle-card:hover {
  border-color: var(--color-text-dim);
}

.toggle-checkbox {
  margin-top: 3px;
  accent-color: var(--color-primary);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.toggle-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-text strong {
  font-size: 13px;
  color: var(--color-text);
}

.toggle-text span {
  font-size: 12px;
  color: var(--color-text-dim);
}

/* Right Summary */
.summary-card {
  background: linear-gradient(180deg, #181e28 0%, #11151c 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 100px;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.summary-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--color-text-dim);
}

.summary-price-box {
  margin-bottom: 20px;
}

.price-caption {
  display: block;
  font-size: 12px;
  color: var(--color-text-dim);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.price-value {
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 6px;
}

.price-range {
  font-size: 12px;
  color: var(--color-text-muted);
}

.summary-savings {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(56, 211, 159, 0.08);
  border: 1px solid rgba(56, 211, 159, 0.25);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  margin-bottom: 24px;
}

.savings-icon {
  font-size: 20px;
}

.savings-info {
  display: flex;
  flex-direction: column;
}

.savings-info strong {
  font-size: 13px;
  color: var(--color-success);
}

.savings-info span {
  font-size: 11px;
  color: var(--color-text-dim);
}

.summary-features-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.summary-feat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.feat-check {
  flex-shrink: 0;
}

.summary-btn {
  width: 100%;
  margin-bottom: 16px;
}

.summary-guarantee-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-dim);
  text-align: center;
}

.note-icon {
  color: var(--color-success);
}
</style>
