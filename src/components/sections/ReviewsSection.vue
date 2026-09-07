<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import { reviews } from '../../data/reviews'
import { Star, MapPin } from 'lucide-vue-next'
</script>

<template>
  <section id="reviews" class="section section--muted">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow eyebrow--center">Отзывы клиентов</p>
        <h2 class="section-title">
          Что говорят водители <span class="accent">после ремонта</span>
        </h2>
        <p class="section-subtitle">
          Частные дизели, коммерческие Газели и автопарки тягачей с трассы М-7 делятся результатами.
        </p>
      </div>

      <div class="reviews-grid">
        <BaseCard
          v-for="rev in reviews"
          :key="rev.id"
          class="review-card"
        >
          <div class="review-body">
            <div class="review-top">
              <div class="rev-author-group">
                <span class="rev-name">{{ rev.author }}</span>
                <span class="rev-city"><MapPin :size="12" class="accent" /> {{ rev.city }}</span>
              </div>
              <div class="rev-stars">
                <Star v-for="s in rev.rating" :key="s" :size="14" class="star-ic" />
              </div>
            </div>

            <div class="rev-car-tag">
              <strong>{{ rev.vehicle }}</strong>
              <span>{{ rev.repairType }}</span>
            </div>

            <p class="rev-text">«{{ rev.text }}»</p>

            <span class="rev-date mono">{{ rev.date }}</span>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.review-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.review-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
}

.rev-author-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rev-name {
  font-family: var(--font-head);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--black);
  letter-spacing: .02em;
}

.rev-city {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--dim);
  font-size: .82rem;
}

.rev-stars {
  display: flex;
  gap: 2px;
}

.star-ic {
  color: var(--accent);
  fill: var(--accent);
}

.rev-car-tag {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rev-car-tag strong {
  font-size: .88rem;
  font-weight: 600;
  color: var(--black);
}

.rev-car-tag span {
  font-size: .8rem;
  color: var(--muted);
}

.rev-text {
  font-size: .94rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 16px;
  flex-grow: 1;
}

.rev-date {
  font-size: .78rem;
  color: var(--dim);
  margin-top: auto;
}

@media (max-width: 800px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>
