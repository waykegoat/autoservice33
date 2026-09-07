<script setup lang="ts">
import BaseBadge from '../ui/BaseBadge.vue'
import {
  Cpu,
  Gauge,
  Sparkles,
  Layers,
  Check,
  X,
  AlertTriangle
} from 'lucide-vue-next'

const equipmentCards = [
  {
    title: 'Высокоточный стенд CR-2500',
    icon: Gauge,
    tag: 'Стенд 2500 BAR',
    desc: 'Тестирует форсунки под реальным давлением топливной рампы современных дизелей Euro-5 и Euro-6. Электронный расходомер отслеживает подачу с точностью до 0.1 мм³.',
    specs: ['Давление до 2500 бар', 'База официальных тест-планов', 'Термостабилизация жидкости ISO 4113']
  },
  {
    title: 'Генератор IMA / C2i / C3i кодов',
    icon: Cpu,
    tag: 'Микропроцессорное кодирование',
    desc: 'Стендовый модуль зашифровывает фактические характеристики налива форсунки в уникальный код коррекции для записи в блок управления авто.',
    specs: ['IMA коды для Bosch CRI/CRIN', 'C2i/C3i для Delphi', 'QR-кодирование для Denso']
  },
  {
    title: 'Гидросъемник 20 тонн (No-Heads)',
    icon: Layers,
    tag: 'Специнструмент',
    desc: 'Вытягивает закисшие и прикипевшие форсунки строго по оси колодца с тяговым усилием до 20 000 кг. Сохраняет клапанную крышку и резьбу ГБЦ.',
    specs: ['Тяговое усилие 20 тонн', 'Без снятия ГБЦ', 'Экономия клиенту до 70 000 ₽']
  },
  {
    title: 'Ультразвуковая станция очистки',
    icon: Sparkles,
    tag: 'Многочастотная ванна',
    desc: 'Кавитационная очистка внутренних каналов форсунок, распылителей и клапанов от смол, лаков и серных отложений некачественного дизеля.',
    specs: ['Подогрев спецраствора до 65°C', 'Дегазация моющей жидкости', 'Импульсная прокачка клапана']
  }
]

const comparisonRows = [
  {
    feature: 'Стендовый тест-план с распечаткой графиков',
    ourService: true,
    garage: false,
    newPart: true
  },
  {
    feature: 'Присвоение нового IMA/C2i кода коррекции',
    ourService: true,
    garage: false,
    newPart: true
  },
  {
    feature: 'Оригинальные прецизионные запчасти',
    ourService: true,
    garage: 'Аналоги сомнительного качества',
    newPart: true
  },
  {
    feature: 'Стоимость за комплект из 4 шт.',
    ourService: '14 000 – 18 000 ₽',
    garage: '8 000 – 12 000 ₽ (без гарантии)',
    newPart: '100 000 – 160 000 ₽'
  },
  {
    feature: 'Официальная гарантия',
    ourService: 'До 12 месяцев',
    garage: '«До ворот сервиса»',
    newPart: '6–12 месяцев'
  },
  {
    feature: 'Срок готовности',
    ourService: '1–3 часа / обмен в день заезда',
    garage: 'От 2–4 дней',
    newPart: 'Доставка на заказ 3–14 дней'
  }
]
</script>

<template>
  <section id="equipment" class="section equipment-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag section-tag--tech">
          <Cpu :size="14" />
          Оснащение лаборатории
        </span>
        <h2 class="section-title">
          Технологии и <span class="text-gradient-tech">стендовый контроль</span>
        </h2>
        <p class="section-subtitle">
          Современный дизель не терпит регулировок «на глаз». Мы используем профессиональные стенды и специнструмент для достижения заводских параметров распыла.
        </p>
      </div>

      <!-- Equipment Cards Grid -->
      <div class="equipment-grid">
        <div
          v-for="(card, i) in equipmentCards"
          :key="i"
          class="equip-card card-base"
        >
          <div class="equip-card__header">
            <div class="equip-icon-wrap">
              <component :is="card.icon" :size="22" />
            </div>
            <BaseBadge variant="tech">{{ card.tag }}</BaseBadge>
          </div>

          <h3 class="equip-title">{{ card.title }}</h3>
          <p class="equip-desc">{{ card.desc }}</p>

          <div class="equip-specs">
            <div v-for="(spec, sIdx) in card.specs" :key="sIdx" class="spec-row">
              <Check :size="14" class="spec-check" />
              <span>{{ spec }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Section -->
      <div class="comparison-block">
        <div class="comparison-header">
          <h3 class="comparison-title">Сравнение вариантов решения проблемы</h3>
          <p class="comparison-sub">Почему ремонт на стенде — самый разумный выбор</p>
        </div>

        <div class="table-responsive">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="col-feature">Параметр</th>
                <th class="col-service highlight-col">
                  <span>Форсунка 33</span>
                  <small>(Наш сервис)</small>
                </th>
                <th class="col-garage">
                  <span>Гаражный мастер</span>
                  <small>(«На коленке»)</small>
                </th>
                <th class="col-new">
                  <span>Новые оригинальные</span>
                  <small>(В магазине)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rIdx) in comparisonRows" :key="rIdx">
                <td class="col-feature font-medium">{{ row.feature }}</td>

                <!-- Our service column -->
                <td class="col-service highlight-col">
                  <div v-if="typeof row.ourService === 'boolean'" class="status-icon status-icon--ok">
                    <Check :size="18" />
                  </div>
                  <span v-else class="text-emphasis-primary">{{ row.ourService }}</span>
                </td>

                <!-- Garage column -->
                <td class="col-garage">
                  <div v-if="typeof row.garage === 'boolean'" class="status-icon status-icon--no">
                    <X :size="18" />
                  </div>
                  <span v-else class="text-dim">{{ row.garage }}</span>
                </td>

                <!-- New part column -->
                <td class="col-new">
                  <div v-if="typeof row.newPart === 'boolean'" class="status-icon status-icon--ok">
                    <Check :size="18" />
                  </div>
                  <span v-else class="text-dim">{{ row.newPart }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.equipment-section {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.equipment-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 56px;
}

@media (min-width: 640px) {
  .equipment-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .equipment-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.equip-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.equip-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.equip-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(0, 210, 255, 0.1);
  border: 1px solid rgba(0, 210, 255, 0.25);
  color: var(--color-tech);
  display: flex;
  align-items: center;
  justify-content: center;
}

.equip-title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
  line-height: 1.3;
}

.equip-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 18px;
  flex-grow: 1;
}

.equip-specs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-subtle);
}

.spec-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text);
}

.spec-check {
  color: var(--color-tech);
  flex-shrink: 0;
}

/* Comparison table */
.comparison-block {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .comparison-block {
    padding: 40px;
  }
}

.comparison-header {
  text-align: center;
  margin-bottom: 32px;
}

.comparison-title {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.comparison-sub {
  font-size: 14px;
  color: var(--color-text-muted);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 680px;
}

.comparison-table th,
.comparison-table td {
  padding: 16px 18px;
  border-bottom: 1px solid var(--color-border-subtle);
  font-size: 13px;
}

.comparison-table th {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  background-color: var(--color-bg);
}

.comparison-table th small {
  display: block;
  font-size: 11px;
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--color-text-dim);
  margin-top: 2px;
}

.highlight-col {
  background-color: rgba(255, 106, 26, 0.04);
  border-left: 1px solid rgba(255, 106, 26, 0.15);
  border-right: 1px solid rgba(255, 106, 26, 0.15);
}

th.highlight-col {
  color: var(--color-primary);
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.status-icon--ok {
  background: rgba(56, 211, 159, 0.12);
  color: var(--color-success);
}

.status-icon--no {
  background: rgba(239, 68, 68, 0.12);
  color: var(--color-danger);
}

.text-emphasis-primary {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-primary);
}

.text-dim {
  color: var(--color-text-dim);
}

.font-medium {
  font-weight: 500;
  color: var(--color-text);
}
</style>
