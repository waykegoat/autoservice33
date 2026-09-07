<script setup lang="ts">
const steps = [
  {
    n: '01',
    title: 'Тест на стенде за 15 мин',
    text: 'Проверяем форсунки под давлением до 2500 бар. В вашем присутствии замеряем предвпрыск, налив и слив в обратку.'
  },
  {
    n: '02',
    title: 'Согласование сметы',
    text: 'Распечатываем протокол и показываем дефекты. Фиксируем точную стоимость работ и запчастей до начала сборки.'
  },
  {
    n: '03',
    title: 'Ремонт и калибровка',
    text: 'Заменяем изношенные клапаны и распылители на оригинальные прецизионные пары. Настраиваем микронные зазоры.'
  },
  {
    n: '04',
    title: 'Кодирование IMA и выдача',
    text: 'Генерируем индивидуальный код коррекции для записи в блок управления авто. Выдаем заказ-наряд с гарантией.'
  }
]
</script>

<template>
  <section id="process" class="section section--muted">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow eyebrow--center">Как мы работаем</p>
        <h2 class="section-title">
          Четыре шага до <span class="accent">исправной топливной системы</span>
        </h2>
        <p class="section-subtitle">
          Открытый процесс: присутствуйте в лаборатории или получайте подробный видеоотчет проверки форсунок на стенде.
        </p>
      </div>

      <div class="proc">
        <div v-for="s in steps" :key="s.n" class="proc__step">
          <span class="proc__num mono">{{ s.n }}</span>
          <h3 class="proc__title">{{ s.title }}</h3>
          <p class="proc__text">{{ s.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proc {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.proc__step {
  position: relative;
  padding: 28px 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  border-top: 3px solid var(--accent);
  box-shadow: var(--shadow-sm);
}

.proc__num {
  font-family: var(--font-head);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--black);
  line-height: 1;
  display: block;
  margin-bottom: 12px;
}

.proc__title {
  font-size: 1.18rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 8px;
  line-height: 1.2;
}

.proc__text {
  color: var(--muted);
  font-size: .92rem;
  line-height: 1.5;
}

@media (max-width: 920px) {
  .proc {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .proc {
    grid-template-columns: 1fr;
  }
}
</style>
