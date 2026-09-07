<script setup lang="ts">
import { reviews } from '../../data/reviews'
import BaseBadge from '../ui/BaseBadge.vue'
import { Star, MessageSquare, Car, MapPin, CheckCircle } from 'lucide-vue-next'
</script>

<template>
  <section id="reviews" class="section reviews-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <MessageSquare :size="14" />
          Реальные отзывы
        </span>
        <h2 class="section-title">
          Что говорят <span class="text-gradient-primary">клиенты о нашей работе</span>
        </h2>
        <p class="section-subtitle">
          Частные автовладельцы, коммерческие перевозчики и дальнобойщики с трассы М-7 делятся впечатлениями после стендового ремонта.
        </p>

        <!-- Rating overview pill -->
        <div class="rating-badge-row">
          <div class="rating-stars">
            <Star v-for="s in 5" :key="s" :size="18" class="star-icon" />
          </div>
          <span class="rating-val">4.9 / 5.0</span>
          <span class="rating-sub">на основе 280+ отзывов на Яндекс.Картах и 2ГИС</span>
        </div>
      </div>

      <div class="reviews-grid">
        <div
          v-for="rev in reviews"
          :key="rev.id"
          class="review-card card-base"
        >
          <!-- Reviewer meta -->
          <div class="review-card__top">
            <div class="reviewer-avatar">
              {{ rev.author.charAt(0) }}
            </div>

            <div class="reviewer-info">
              <div class="author-row">
                <span class="author-name">{{ rev.author }}</span>
                <span class="review-date">{{ rev.date }}</span>
              </div>

              <div class="author-loc">
                <MapPin :size="12" class="loc-icon" />
                <span>{{ rev.city }}</span>
              </div>
            </div>
          </div>

          <!-- Vehicle and work tag -->
          <div class="review-vehicle-box">
            <div class="vehicle-line">
              <Car :size="14" class="v-icon" />
              <span>{{ rev.vehicle }}</span>
            </div>
            <div class="work-line">
              <CheckCircle :size="13" class="w-icon" />
              <span>{{ rev.repairType }}</span>
            </div>
          </div>

          <!-- Stars -->
          <div class="card-stars">
            <Star v-for="i in rev.rating" :key="i" :size="14" class="star-icon" />
          </div>

          <!-- Review text -->
          <p class="review-text">«{{ rev.text }}»</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  background-color: var(--color-bg);
}

.rating-badge-row {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px 18px;
  border-radius: var(--radius-pill);
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star-icon {
  color: #ffb800;
  fill: #ffb800;
}

.rating-val {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 800;
  color: var(--color-text);
}

.rating-sub {
  font-size: 12px;
  color: var(--color-text-dim);
}

.reviews-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.review-card {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
}

.review-card__top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.reviewer-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reviewer-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.author-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.author-name {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.review-date {
  font-size: 11px;
  color: var(--color-text-dim);
}

.author-loc {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-dim);
}

.loc-icon {
  color: var(--color-primary);
}

.review-vehicle-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vehicle-line,
.work-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.vehicle-line {
  font-weight: 600;
  color: var(--color-text);
}

.work-line {
  color: var(--color-text-muted);
}

.v-icon {
  color: var(--color-tech);
}

.w-icon {
  color: var(--color-success);
}

.card-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
}

.review-text {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
  font-style: italic;
}
</style>
