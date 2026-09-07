import type { StatItem, RegionCity } from '../types'

export const companyConfig = {
  name: 'Форсунка 33',
  brandSuffix: 'Дизель Сервис',
  regionCode: '33 RUS',
  tagline: 'Высокоточная диагностика и ремонт дизельных форсунок во Владимире и области',
  phoneDisplay: '+7 (920) 933-00-33',
  phoneRaw: '+79209330033',
  phoneLandline: '+7 (4922) 77-33-00',
  whatsappUrl: 'https://wa.me/79209330033?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D1%80%D0%BE%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BF%D0%BE%20%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%D1%83%20%D1%84%D0%BE%D1%80%D1%81%D1%83%D0%BD%D0%BE%D0%BA',
  telegramUrl: 'https://t.me/forsunka33_bot',
  email: 'service@forsunka33.ru',
  city: 'г. Владимир',
  address: 'ул. Куйбышева, 26Ж (съезд с трассы М-7 «Волга»)',
  addressNote: 'Удобный заезд для фур, тягачей и коммерческого транспорта без заезда в центр города',
  workingHours: 'Пн-Сб: 08:30 — 19:00 | Вс: Дежурный мастер',
  expressTime: 'от 15 минут',
  warrantyText: 'Гарантия до 12 месяцев без ограничения пробега'
}

export const stats: StatItem[] = [
  {
    value: '14 лет',
    label: 'Специализации',
    subtext: 'Работаем исключительно с топливной аппаратурой дизелей с 2011 года'
  },
  {
    value: '48 000+',
    label: 'Форсунок восстановлено',
    subtext: 'Легковые, коммерческие Газели, тягачи КАМАЗ, Scania, спецтехника'
  },
  {
    value: '15 минут',
    label: 'Стендовый тест-план',
    subtext: 'Проверка параметров подачи, обратки и распыла в вашем присутствии'
  },
  {
    value: '0.1 мм³',
    label: 'Точность калибровки',
    subtext: 'Генерация новых IMA/EMA/C2I кодов по стандартам Bosch и Delphi'
  }
]

export const regionCities: RegionCity[] = [
  {
    name: 'г. Владимир',
    distanceFromVladimir: '0 км',
    transitTime: 'На месте',
    deliveryOptions: 'Снятие/установка на нашем посту или экспресс-диагностика снятых'
  },
  {
    name: 'г. Ковров',
    distanceFromVladimir: '64 км',
    transitTime: '55 мин',
    deliveryOptions: 'Ежедневная доставка маршруткой / СДЭК за 1 день'
  },
  {
    name: 'г. Муром',
    distanceFromVladimir: '135 км',
    transitTime: '1.5 часа по М-12',
    deliveryOptions: 'Прямой заезд по скоростной трассе М-12 / СДЭК'
  },
  {
    name: 'г. Александров',
    distanceFromVladimir: '125 км',
    transitTime: '1 ч 40 мин',
    deliveryOptions: 'Доставка через СДЭК / Деловые Линии / ПЭК'
  },
  {
    name: 'г. Гусь-Хрустальный',
    distanceFromVladimir: '68 км',
    transitTime: '50 мин',
    deliveryOptions: 'Рейсовый автобус / ТК / личный привоз'
  },
  {
    name: 'г. Вязники & Гороховец',
    distanceFromVladimir: '115 км',
    transitTime: '1 ч 15 мин по М-7',
    deliveryOptions: 'Прямо по трассе М-7 «Волга» без пробок до сервиса'
  }
]
