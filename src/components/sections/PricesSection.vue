<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { ShieldCheck, FileText } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking', note?: string): void
}>()

const priceRows = [
  { service: 'Диагностика форсунки Common Rail на стенде (снятой)', vehicle: 'Все марки дизелей', time: '15 мин', price: 'от 500 ₽' },
  { service: 'Стендовый тест-план с распечаткой графика наливов', vehicle: 'Bosch, Delphi, Denso, VDO', time: '20 мин', price: '700 ₽' },
  { service: 'Ремонт электромагнитной форсунки Bosch CRI / CRIN', vehicle: 'Газель Next/Бизнес Cummins, VAG, КАМАЗ', time: 'от 1.5 ч', price: 'от 3 500 ₽' },
  { service: 'Ремонт и кодирование форсунки Delphi (C2i / C3i)', vehicle: 'Ford Transit, Kia, Hyundai, SsangYong', time: 'от 2 ч', price: 'от 4 200 ₽' },
  { service: 'Ремонт японской форсунки Denso Common Rail', vehicle: 'Toyota Land Cruiser, Hilux, Mitsubishi', time: 'от 2 ч', price: 'от 4 500 ₽' },
  { service: 'Ремонт пьезофорсунки Bosch / Continental VDO', vehicle: 'Audi, VW Touareg 3.0 TDI, BMW, Mercedes CDI', time: 'от 3 ч', price: 'от 5 500 ₽' },
  { service: 'Ремонт грузовых насос-форсунок (UIS / PDE / PLD)', vehicle: 'Scania HPI, Volvo FH, DAF, КАМАЗ', time: 'от 1 дня', price: 'от 5 000 ₽' },
  { service: 'Гидравлическое извлечение закисшей форсунки (20т)', vehicle: 'Без снятия ГБЦ, любой сложности', time: 'от 30 мин', price: 'от 2 500 ₽' },
  { service: 'Диагностика и чистка бензиновых форсунок GDI / TSI', vehicle: 'Прямой впрыск VAG, Kia, Ford, Mitsubishi', time: 'от 40 мин', price: 'от 1 200 ₽' },
  { service: 'Обменный фонд готовых форсунок с гарантией', vehicle: 'Газель Cummins 2.8, Ford Transit 2.2', time: '10 мин', price: 'от 4 000 ₽' }
]
</script>

<template>
  <section id="prices" class="section section--muted">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow eyebrow--center">Прозрачный прайс-лист</p>
        <h2 class="section-title">
          Стоимость работ <span class="accent">без скрытых накруток</span>
        </h2>
        <p class="section-subtitle">
          Точная смета формируется после входной проверки на стенде в вашем присутствии.
        </p>
      </div>

      <div class="price-table-wrap">
        <table class="price-table">
          <thead>
            <tr>
              <th class="th-main">Наименование услуги</th>
              <th class="th-vehicle">Автомобили / Системы</th>
              <th class="th-time">Срок</th>
              <th class="th-price">Стоимость</th>
              <th class="th-action"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in priceRows" :key="idx">
              <td class="td-service">
                <strong>{{ row.service }}</strong>
              </td>
              <td class="td-vehicle">{{ row.vehicle }}</td>
              <td class="td-time mono">{{ row.time }}</td>
              <td class="td-price mono accent">{{ row.price }}</td>
              <td class="td-action">
                <button
                  class="table-btn"
                  @click="$emit('open-booking', `Услуга: ${row.service} (${row.price})`)"
                >
                  Записаться
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="price-notes">
        <div class="note-item">
          <ShieldCheck :size="18" class="note-ic accent" />
          <span>Все цены фиксируются в заказ-наряде до начала сборки. Гарантия до 12 месяцев.</span>
        </div>
        <div class="note-item">
          <FileText :size="18" class="note-ic accent" />
          <span>Работаем с физическими лицами и юрлицами (безналичный расчет с НДС).</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price-table-wrap {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow-x: auto;
  margin-bottom: 28px;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 680px;
}

.price-table th {
  background: var(--black);
  color: #ffffff;
  padding: 16px 20px;
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .86rem;
  font-weight: 600;
  letter-spacing: .06em;
  border-bottom: 2px solid var(--accent);
}

.price-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--line);
  font-size: .92rem;
  color: var(--text);
}

.price-table tr:last-child td {
  border-bottom: none;
}

.price-table tr:hover td {
  background: var(--accent-subtle);
}

.td-service strong {
  font-weight: 600;
  color: var(--black);
}

.td-vehicle {
  color: var(--muted);
  font-size: .86rem;
}

.td-time {
  color: var(--dim);
  font-size: .88rem;
}

.td-price {
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  white-space: nowrap;
}

.table-btn {
  padding: 8px 16px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  color: var(--black);
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .8rem;
  font-weight: 600;
  letter-spacing: .04em;
  transition: all .16s ease;
  white-space: nowrap;
}

.table-btn:hover {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.price-notes {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
}

.note-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: .88rem;
  color: var(--muted);
}

.note-ic {
  flex-shrink: 0;
}
</style>
