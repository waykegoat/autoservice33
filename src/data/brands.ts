import type { SupportedBrand } from '../types'

export const supportedBrands: SupportedBrand[] = [
  {
    name: 'Bosch',
    type: 'Германия',
    description: 'Электромагнитные CRI/CRIN и пьезофорсунки. Полная база официальных тест-планов и генерация IMA кодов.',
    logoText: 'BOSCH',
    systems: ['CRI 1.0 - 2.8', 'CRIN 1 - 4', 'Bosch Piezo']
  },
  {
    name: 'Delphi Technologies',
    type: 'США / Великобритания',
    description: 'Системы сверхточного впрыска. Замена клапанов, калибровка натяга пружины и генерация C2i/C3i кодов.',
    logoText: 'DELPHI',
    systems: ['DFI 1.2 - 1.5', 'DFI 2.5', 'Smart Injectors']
  },
  {
    name: 'Denso',
    type: 'Япония',
    description: 'Японские форсунки для внедорожников, коммерческих фургонов и спецтехники. Гидроплотная притирка распылителей.',
    logoText: 'DENSO',
    systems: ['G2 / G3 Series', 'X1 / X2 Common Rail', 'HP3 / HP4']
  },
  {
    name: 'Continental / VDO',
    type: 'Германия (бывш. Siemens)',
    description: 'Высокотехнологичные пьезофорсунки. Тестирование кристаллов пьезопакета, замена управляющих клапанов.',
    logoText: 'CONTINENTAL VDO',
    systems: ['Siemens Piezo', 'VDO Euro 5 / 6', 'PCR 2.1']
  },
  {
    name: 'Cummins',
    type: 'США / Россия',
    description: 'Топливная аппаратура для моторов ISF 2.8, ISF 3.8, ISBe, устанавливаемых на Газели, ПАЗ, КАМАЗ.',
    logoText: 'CUMMINS',
    systems: ['ISF 2.8 / 3.8', 'ISBe Euro 3-5', 'QSB Industrial']
  },
  {
    name: 'Caterpillar / Scania / Volvo',
    type: 'Грузовые & Спецтехника',
    description: 'Насос-форсунки UIS / PDE, насосные секции PLD, системы HPI для тяжелых тягачей и карьерных экскаваторов.',
    logoText: 'HEAVY DIESEL',
    systems: ['UIS / PDE Units', 'Scania HPI', 'PLD / Unit Pumps']
  }
]

export const popularVehicles = [
  'Газель NEXT / Бизнес (Cummins ISF 2.8)',
  'Ford Transit 2.0 / 2.2 / 2.4 TDCi',
  'КАМАЗ 5490 / 65115 (Cummins / Daimler)',
  'Toyota Land Cruiser 200 / Prado / Hilux',
  'Volkswagen Touareg / Crafter / Transporter',
  'Mercedes-Benz Sprinter / Vito / Actros',
  'BMW 3 / 5 / X5 (3.0d M57, N57)',
  'Renault Duster / Master / Trafic (1.5 / 2.0 dCi)',
  'Kia Sorento / Hyundai Santa Fe / Starex (CRDi)',
  'Тракторы МТЗ, экскаваторы JCB, Komatsu, CAT'
]
