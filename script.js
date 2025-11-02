/**
 * @fileoverview script.js
 * @author [MUHAMMAD IRFAN]
 * GitHub: {@link https://github.com/MUHAMMADIRFAN2253}
 * @version 1.0.1
 * @description Skrip utama untuk mengelola tampilan Jam Real-Time, Kalender yang terlokalisasi, dan
 *              kontrol interaktif (Mode Gelap/Terang).
 *              (Main script for managing Localized Real-Time Clock, Calendar display, and
 *              interactive controls (Dark/Light Mode).)
 *
 * Menangani fungsionalitas inti:
 * 1. Internasionalisasi (i18n): Pemilihan zona waktu dan bahasa (locale).
 * 2. Tampilan Jam: Akurasi waktu real-time dengan penyesuaian format jam (untuk konsistensi HH:MM:SS).
 * 3. Kalender Dinamis: Navigasi bulan/tahun, sorotan 'Hari Ini', dan responsif.
 * 4. Persistensi Pengguna: Penyimpanan preferensi di Local Storage.
 * 5. Aksesibilitas: Implementasi Mode Gelap/Terang dinamis dengan terjemahan label yang sesuai.
 *
 * Core functionalities handled:
 * 1. Internationalization (i18n): Time zone and language (locale) selection.
 * 2. Clock Display: Real-time time accuracy with clock format adjustment (for HH:MM:SS consistency).
 * 3. Dynamic Calendar: Month/year navigation, 'Today' highlight, and responsiveness.
 * 4. User Persistence: Storing preferences in Local Storage.
 * 5. Accessibility: Implementation of dynamic Dark/Light Mode with corresponding label translations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==============================================================================================================
  // --- 0. DATA GLOBAL & KONFIGURASI (GLOBAL DATA & CONFIGURATION) ---
  // ==============================================================================================================

  // --- Data Zona Waktu IANA yang Didukung (Supported IANA Time Zone Data) ---
  const ALL_TIMEZONES = [
    'UTC',
    'GMT',

    // ============================================================================================================
    // ASIA (ASIA)
    // ============================================================================================================

    // INDONESIA
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',

    // ASIA TENGGARA (SOUTHEAST ASIA)
    'Asia/Kuala_Lumpur',
    'Asia/Singapore',
    'Asia/Bangkok',
    'Asia/Ho_Chi_Minh',
    'Asia/Manila',
    'Asia/Yangon',

    // ASIA TIMUR (EAST ASIA)
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Taipei',
    'Asia/Ulaanbaatar',

    // ASIA SELATAN (SOUTH ASIA)
    'Asia/Kolkata',
    'Asia/Dhaka',
    'Asia/Colombo',
    'Asia/Katmandu',
    'Asia/Karachi',
    'Asia/Kabul',

    // ASIA BARAT / TIMUR TENGAH (WESTERN ASIA / MIDDLE EAST)
    'Asia/Riyadh',
    'Asia/Dubai',
    'Asia/Tehran',
    'Asia/Kuwait',
    'Asia/Baghdad',
    'Asia/Beirut',
    'Asia/Jerusalem',
    'Asia/Gaza',
    'Asia/Amman',
    'Asia/Damascus',

    // ASIA TENGAH (CENTRAL ASIA)
    'Asia/Almaty',
    'Asia/Tashkent',
    'Asia/Baku',
    'Asia/Yekaterinburg',
    'Asia/Dushanbe',

    // ============================================================================================================
    // EROPA (EUROPE)
    // ============================================================================================================

    // EROPA BARAT (WESTERN EUROPE)
    'Europe/London',
    'Europe/Dublin',
    'Europe/Paris',
    'Europe/Madrid',
    'Europe/Lisbon',
    'Europe/Oslo',

    // EROPA TENGAH (CENTRAL EUROPE)
    'Europe/Berlin',
    'Europe/Rome',
    'Europe/Warsaw',
    'Europe/Amsterdam',
    'Europe/Stockholm',
    'Europe/Prague',
    'Europe/Zurich',
    'Europe/Vienna',

    // EROPA TIMUR (EASTERN EUROPE)
    'Europe/Moscow',
    'Europe/Istanbul',
    'Europe/Athens',
    'Europe/Minsk',
    'Europe/Helsinki',
    'Europe/Kiev',
    'Europe/Bucharest',

    // ============================================================================================================
    // AMERIKA (AMERICA)
    // ============================================================================================================

    // AMERIKA UTARA - AS/KANADA (NORTH AMERICA - US/CANADA)
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Halifax',
    'America/Vancouver',
    'America/Toronto',
    'America/Adak',
    'America/Phoenix',
    'America/Whitehorse',
    'America/Tijuana',

    // AMERIKA TENGAH & KARIBIA (CENTRAL AMERICA & CARIBBEAN)
    'America/Mexico_City',
    'America/Havana',
    'America/Puerto_Rico',
    'America/Panama',
    'America/Jamaica',
    'America/Costa_Rica',
    'America/Nassau',

    // AMERIKA SELATAN (SOUTH AMERICA)
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'America/Bogota',
    'America/Lima',
    'America/Santiago',
    'America/Caracas',
    'America/Montevideo',
    'America/La_Paz',
    'America/Manaus',
    'America/Asuncion',
    'America/Guyana',

    // ============================================================================================================
    // AFRIKA (AFRICA)
    // ============================================================================================================

    // AFRIKA UTARA (NORTH AFRICA)
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Algiers',
    'Africa/Tunis',

    // AFRIKA BARAT & TENGAH (WEST & CENTRAL AFRICA)
    'Africa/Lagos',
    'Africa/Dakar',
    'Africa/Accra',
    'Africa/Kinshasa',
    'Africa/Abidjan',

    // AFRIKA SELATAN & TIMUR (SOUTH & EAST AFRICA)
    'Africa/Johannesburg',
    'Africa/Nairobi',
    'Africa/Harare',
    'Africa/Dar_es_Salaam',

    // ============================================================================================================
    // AUSTRALIA & PASIFIK (AUSTRALIA & PACIFIC)
    // ============================================================================================================

    // AUSTRALIA
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Brisbane',
    'Australia/Adelaide',
    'Australia/Hobart',
    'Australia/Darwin',

    // PASIFIK
    'Pacific/Auckland',
    'Pacific/Honolulu',
    'Pacific/Fiji',
    'Pacific/Tahiti',
    'Pacific/Guam',
    'Pacific/Midway',
    'Pacific/Samoa',
    'Pacific/Port_Moresby',
    'Pacific/Easter',
    'Pacific/Chatham',

    // ATLANTIK (ATLANTIC)
    'Atlantic/Azores',
    'Atlantic/Cape_Verde',
  ];

  // --- Daftar Locale/Bahasa yang Didukung (Supported Locale/Language List) ---
  const SUPPORTED_LOCALES = {
    'id-ID': 'Bahasa Indonesia',

    // INGGRIS (ENGLISH)
    'en-US': 'English (American)',
    'en-GB': 'English (British)',
    'en-AU': 'English (Australian)',
    'en-CA': 'English (Canadian)',
    'en-IE': 'English (Irish)',
    'en-NZ': 'English (New Zealand)',

    // ASIA TIMUR (EAST ASIA)
    'ja-JP': '日本語 (Japanese)',
    'ko-KR': '한국어 (Korean)',
    'zh-CN': '中文 (Mandarin)',
    'zh-TW': '中文 (Traditional)',

    // PERANCIS (FRENCH)
    'fr-FR': 'Français (French)',
    'fr-CA': 'Français (Canadian)',
    'fr-BE': 'Français (Belgian)',

    // JERMANIK/EROPA (GERMANIC/EUROPEAN)
    'de-DE': 'Deutsch (German)',
    'nl-NL': 'Nederlands (Dutch)',
    'pl-PL': 'Polski (Polish)',
    'sv-SE': 'Svenska (Swedish)',
    'it-IT': 'Italiano (Italian)',

    // SPANYOL (SPANISH)
    'es-ES': 'Español (Spanish)',
    'es-MX': 'Español (Mexican)',
    'es-CL': 'Español (Chilean)',

    // PORTUGIS (PORTUGUESE)
    'pt-PT': 'Português (Portugal)',
    'pt-BR': 'Português (Brazil)',
    'pt-AO': 'Português (Angola)',

    // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
    'ru-RU': 'Русский (Russian)',
    'ru-KZ': 'Русский (Kazakhstan)',
    'uk-UA': 'Українська (Ukrainian)',

    // TURKIK (TURKIC)
    'tr-TR': 'Türkçe (Turkish)',

    // ARAB (ARABIC)
    'ar-SA': 'العربية (Saudi Arabia)',
    'ar-EG': 'العربية (Egyptian)',

    // ASIA TENGGARA (SOUTHEAST ASIA)
    'th-TH': 'ไทย (Thai)',
    'vi-VN': 'Tiếng Việt (Vietnamese)',

    // INDIA
    'hi-IN': 'हिन्दी (Hindi)',
  };

  // --- Pemetaan Zona Waktu ke Locale Default (Time Zone to Default Locale Mapping) ---
  const TIMEZONE_TO_LOCALE = {
    UTC: 'en-US',
    GMT: 'en-GB',

    // ============================================================================================================
    // ASIA (ASIA)
    // ============================================================================================================

    // INDONESIA
    'Asia/Jakarta': 'id-ID',
    'Asia/Pontianak': 'id-ID',
    'Asia/Makassar': 'id-ID',
    'Asia/Jayapura': 'id-ID',

    // ASIA TENGGARA (SOUTHEAST ASIA)
    'Asia/Kuala_Lumpur': 'en-GB',
    'Asia/Singapore': 'en-GB',
    'Asia/Bangkok': 'th-TH',
    'Asia/Ho_Chi_Minh': 'vi-VN',
    'Asia/Manila': 'en-US',
    'Asia/Yangon': 'en-GB',

    // ASIA TIMUR (EAST ASIA)
    'Asia/Tokyo': 'ja-JP',
    'Asia/Seoul': 'ko-KR',
    'Asia/Shanghai': 'zh-CN',
    'Asia/Hong_Kong': 'zh-TW',
    'Asia/Taipei': 'zh-TW',
    'Asia/Ulaanbaatar': 'ru-RU',

    // ASIA SELATAN (SOUTH ASIA)
    'Asia/Kolkata': 'hi-IN',
    'Asia/Dhaka': 'en-GB',
    'Asia/Colombo': 'en-GB',
    'Asia/Katmandu': 'hi-IN',
    'Asia/Karachi': 'en-GB',
    'Asia/Kabul': 'ar-EG',

    // ASIA BARAT / TIMUR TENGAH (WESTERN ASIA / MIDDLE EAST)
    'Asia/Riyadh': 'ar-SA',
    'Asia/Dubai': 'ar-EG',
    'Asia/Tehran': 'ar-EG',
    'Asia/Kuwait': 'ar-EG',
    'Asia/Baghdad': 'ar-EG',
    'Asia/Beirut': 'ar-EG',
    'Asia/Jerusalem': 'ar-EG',
    'Asia/Gaza': 'ar-EG',
    'Asia/Amman': 'ar-EG',
    'Asia/Damascus': 'ar-EG',

    // ASIA TENGAH (CENTRAL ASIA)
    'Asia/Almaty': 'ru-KZ',
    'Asia/Tashkent': 'ru-RU',
    'Asia/Baku': 'ru-RU',
    'Asia/Yekaterinburg': 'ru-RU',
    'Asia/Dushanbe': 'ru-RU',

    // ============================================================================================================
    // EROPA (EUROPE)
    // ============================================================================================================

    // EROPA BARAT (WESTERN EUROPE)
    'Europe/London': 'en-GB',
    'Europe/Dublin': 'en-IE',
    'Europe/Paris': 'fr-FR',
    'Europe/Madrid': 'es-ES',
    'Europe/Lisbon': 'pt-PT',
    'Europe/Oslo': 'sv-SE',

    // EROPA TENGAH (CENTRAL EUROPE)
    'Europe/Berlin': 'de-DE',
    'Europe/Rome': 'it-IT',
    'Europe/Warsaw': 'pl-PL',
    'Europe/Amsterdam': 'nl-NL',
    'Europe/Stockholm': 'sv-SE',
    'Europe/Prague': 'de-DE',
    'Europe/Zurich': 'de-DE',
    'Europe/Vienna': 'de-DE',

    // EROPA TIMUR (EASTERN EUROPE)
    'Europe/Moscow': 'ru-RU',
    'Europe/Istanbul': 'tr-TR',
    'Europe/Athens': 'it-IT',
    'Europe/Minsk': 'ru-RU',
    'Europe/Helsinki': 'sv-SE',
    'Europe/Kiev': 'uk-UA',
    'Europe/Bucharest': 'fr-FR',

    // ============================================================================================================
    // AMERIKA (AMERICA)
    // ============================================================================================================

    // AMERIKA UTARA - AS/KANADA (NORTH AMERICA - US/CANADA)
    'America/New_York': 'en-US',
    'America/Chicago': 'en-US',
    'America/Denver': 'en-US',
    'America/Los_Angeles': 'en-US',
    'America/Anchorage': 'en-US',
    'America/Halifax': 'en-CA',
    'America/Vancouver': 'en-CA',
    'America/Toronto': 'en-CA',
    'America/Adak': 'en-US',
    'America/Phoenix': 'en-US',
    'America/Whitehorse': 'en-CA',
    'America/Tijuana': 'es-MX',

    // AMERIKA TENGAH & KARIBIA (CENTRAL AMERICA & CARIBBEAN)
    'America/Mexico_City': 'es-MX',
    'America/Havana': 'es-ES',
    'America/Puerto_Rico': 'es-ES',
    'America/Panama': 'es-ES',
    'America/Jamaica': 'en-GB',
    'America/Costa_Rica': 'es-ES',
    'America/Nassau': 'en-GB',

    // AMERIKA SELATAN (SOUTH AMERICA)
    'America/Sao_Paulo': 'pt-BR',
    'America/Buenos_Aires': 'es-ES',
    'America/Bogota': 'es-ES',
    'America/Lima': 'es-ES',
    'America/Santiago': 'es-CL',
    'America/Caracas': 'es-ES',
    'America/Montevideo': 'es-ES',
    'America/La_Paz': 'es-ES',
    'America/Manaus': 'pt-BR',
    'America/Asuncion': 'es-ES',
    'America/Guyana': 'en-GB',

    // ============================================================================================================
    // AFRIKA (AFRICA)
    // ============================================================================================================

    // AFRIKA UTARA (NORTH AFRICA)
    'Africa/Cairo': 'ar-EG',
    'Africa/Casablanca': 'fr-FR',
    'Africa/Algiers': 'fr-FR',
    'Africa/Tunis': 'fr-FR',

    // AFRIKA BARAT & TENGAH (WEST & CENTRAL AFRICA)
    'Africa/Lagos': 'en-GB',
    'Africa/Dakar': 'fr-FR',
    'Africa/Accra': 'en-GB',
    'Africa/Kinshasa': 'fr-FR',
    'Africa/Abidjan': 'fr-FR',

    // AFRIKA SELATAN & TIMUR (SOUTH & EAST AFRICA)
    'Africa/Johannesburg': 'en-GB',
    'Africa/Nairobi': 'en-GB',
    'Africa/Harare': 'en-GB',
    'Africa/Dar_es_Salaam': 'en-GB',

    // ============================================================================================================
    // AUSTRALIA & PASIFIK (AUSTRALIA & PACIFIC)
    // ============================================================================================================

    // AUSTRALIA
    'Australia/Sydney': 'en-AU',
    'Australia/Melbourne': 'en-AU',
    'Australia/Perth': 'en-AU',
    'Australia/Brisbane': 'en-AU',
    'Australia/Adelaide': 'en-AU',
    'Australia/Hobart': 'en-AU',
    'Australia/Darwin': 'en-AU',

    // PASIFIK
    'Pacific/Auckland': 'en-NZ',
    'Pacific/Honolulu': 'en-US',
    'Pacific/Fiji': 'en-GB',
    'Pacific/Tahiti': 'fr-FR',
    'Pacific/Guam': 'en-US',
    'Pacific/Midway': 'en-US',
    'Pacific/Samoa': 'en-US',
    'Pacific/Port_Moresby': 'en-GB',
    'Pacific/Easter': 'es-CL',
    'Pacific/Chatham': 'en-NZ',

    // ATLANTIK (ATLANTIC)
    'Atlantic/Azores': 'pt-PT',
    'Atlantic/Cape_Verde': 'pt-AO',
  };

  // --- Pemetaan Locale Utama ke Zona Waktu Utama (Primary Locale to Primary Time Zone Mapping) ---
  const LOCALE_TO_TIMEZONE = {
    'id-ID': 'Asia/Jakarta',

    // INGGRIS (ENGLISH)
    'en-US': 'America/New_York',
    'en-GB': 'Europe/London',
    'en-AU': 'Australia/Sydney',
    'en-CA': 'America/Toronto',
    'en-IE': 'Europe/Dublin',
    'en-NZ': 'Pacific/Auckland',

    // ASIA TIMUR (EAST ASIA)
    'ja-JP': 'Asia/Tokyo',
    'ko-KR': 'Asia/Seoul',
    'zh-CN': 'Asia/Shanghai',
    'zh-TW': 'Asia/Taipei',

    // PERANCIS (FRENCH)
    'fr-FR': 'Europe/Paris',
    'fr-CA': 'America/Toronto',
    'fr-BE': 'Europe/Paris',

    // JERMANIK/EROPA (GERMANIC/EUROPEAN)
    'de-DE': 'Europe/Berlin',
    'nl-NL': 'Europe/Amsterdam',
    'pl-PL': 'Europe/Warsaw',
    'sv-SE': 'Europe/Stockholm',
    'it-IT': 'Europe/Rome',

    // SPANYOL (SPANISH)
    'es-ES': 'Europe/Madrid',
    'es-MX': 'America/Mexico_City',
    'es-CL': 'America/Santiago',

    // PORTUGIS (PORTUGUESE)
    'pt-PT': 'Europe/Lisbon',
    'pt-BR': 'America/Sao_Paulo',
    'pt-AO': 'Africa/Lagos',

    // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
    'ru-RU': 'Europe/Moscow',
    'ru-KZ': 'Asia/Almaty',
    'uk-UA': 'Europe/Kiev',

    // TURKIK (TURKIC)
    'tr-TR': 'Europe/Istanbul',

    // ARAB (ARABIC)
    'ar-SA': 'Asia/Riyadh',
    'ar-EG': 'Africa/Cairo',

    // ASIA TENGGARA (SOUTHEAST ASIA)
    'th-TH': 'Asia/Bangkok',
    'vi-VN': 'Asia/Ho_Chi_Minh',

    // INDIA
    'hi-IN': 'Asia/Kolkata',
  };

  // --- Kamus Terjemahan UI untuk Teks Antarmuka Statis (UI Translation Dictionary for Static Text) ---
  const UI_TRANSLATIONS = {
    timezone_label: {
      'id-ID': 'Zona Waktu:',

      // INGGRIS (ENGLISH)
      'en-US': 'Time Zone:',
      'en-GB': 'Time Zone:',
      'en-AU': 'Time Zone:',
      'en-CA': 'Time Zone:',
      'en-IE': 'Time Zone:',
      'en-NZ': 'Time Zone:',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': 'タイムゾーン:',
      'ko-KR': '시간대:',
      'zh-CN': '时区:',
      'zh-TW': '時區:',

      // PERANCIS (FRENCH)
      'fr-FR': 'Fuseau Horaire:',
      'fr-CA': 'Fuseau Horaire:',
      'fr-BE': 'Fuseau Horaire:',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'Zeitzone:',
      'nl-NL': 'Tijdzone:',
      'pl-PL': 'Strefa Czasowa:',
      'sv-SE': 'Tidszon:',
      'it-IT': 'Fuso Horario:',

      // SPANYOL (SPANISH)
      'es-ES': 'Zona Horaria:',
      'es-MX': 'Zona Horaria:',
      'es-CL': 'Zona Horaria:',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'Fuso Horário:',
      'pt-BR': 'Fuso Horário:',
      'pt-AO': 'Fuso Horário:',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'Часовой Пояс:',
      'ru-KZ': 'Часовой Пояс:',
      'uk-UA': 'Часовий пояс:',

      // TURKIK (TURKIC)
      'tr-TR': 'Saat Dilimi:',

      // ARAB (ARABIC)
      'ar-SA': 'المنطقة الزمنية:',
      'ar-EG': 'المنطقة الزمنية:',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'เขตเวลา:',
      'vi-VN': 'Múi giờ:',

      // INDIA
      'hi-IN': 'समय क्षेत्र:',
    },
    language_label: {
      'id-ID': 'Bahasa:',

      // INGGRIS (ENGLISH)
      'en-US': 'Language:',
      'en-GB': 'Language:',
      'en-AU': 'Language:',
      'en-CA': 'Language:',
      'en-IE': 'Language:',
      'en-NZ': 'Language:',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '言語:',
      'ko-KR': '언어:',
      'zh-CN': '语言:',
      'zh-TW': '語言:',

      // PERANCIS (FRENCH)
      'fr-FR': 'Langue:',
      'fr-CA': 'Langue:',
      'fr-BE': 'Langue:',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'Sprache:',
      'nl-NL': 'Taal:',
      'pl-PL': 'Język:',
      'sv-SE': 'Språk:',
      'it-IT': 'Lingua:',

      // SPANYOL (SPANISH)
      'es-ES': 'Idioma:',
      'es-MX': 'Idioma:',
      'es-CL': 'Idioma:',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'Idioma:',
      'pt-BR': 'Idioma:',
      'pt-AO': 'Idioma:',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'Язык:',
      'ru-KZ': 'Язык:',
      'uk-UA': 'Мова:',

      // TURKIK (TURKIC)
      'tr-TR': 'Dil:',

      // ARAB (ARABIC)
      'ar-SA': 'اللغة:',
      'ar-EG': 'اللغة:',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'ภาษา:',
      'vi-VN': 'Ngôn ngữ:',

      // INDIA
      'hi-IN': 'भाषा:',
    },
    global_timezone_group: {
      'id-ID': '🌏 Zona Waktu Global',

      // INGGRIS (ENGLISH)
      'en-US': '🌏 Global Time Zones',
      'en-GB': '🌏 Global Time Zones',
      'en-AU': '🌏 Global Time Zones',
      'en-CA': '🌏 Global Time Zones',
      'en-IE': '🌏 Global Time Zones',
      'en-NZ': '🌏 Global Time Zones',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '🌏 グローバルタイムゾーン',
      'ko-KR': '🌏 글로벌 시간대',
      'zh-CN': '🌏 全球时区',
      'zh-TW': '🌏 全球時區',

      // PERANCIS (FRENCH)
      'fr-FR': '🌏 Fuseaux Horaires Mondiaux',
      'fr-CA': '🌏 Fuseaux Horaires Mondiaux',
      'fr-BE': '🌏 Fuseaux Horaires Mondiaux',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': '🌏 Globale Zeitzonen',
      'nl-NL': '🌏 Wereldwijde Tijdzones',
      'pl-PL': '🌏 Globalne Strefy Czasowe',
      'sv-SE': '🌏 Globala Tidszoner',
      'it-IT': '🌏 Fusi Orari Globali',

      // SPANYOL (SPANISH)
      'es-ES': '🌏 Zonas Horarias Globales',
      'es-MX': '🌏 Zonas Horarias Globales',
      'es-CL': '🌏 Zonas Horarias Globales',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': '🌏 Fusos Horários Globais',
      'pt-BR': '🌏 Fusos Horários Globais',
      'pt-AO': '🌏 Fusos Horários Globais',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': '🌏 Глобальные часовые пояса',
      'ru-KZ': '🌏 Глобальные часовые пояса',
      'uk-UA': '🌏 Глобальні часові пояси',

      // TURKIK (TURKIC)
      'tr-TR': '🌏 Küresel Saat Dilimleri',

      // ARAB (ARABIC)
      'ar-SA': '🌏 مناطق التوقيت العالمية',
      'ar-EG': '🌏 مناطق التوقيت العالمية',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': '🌏 เขตเวลาสากล',
      'vi-VN': '🌏 Múi giờ Toàn cầu',

      // INDIA
      'hi-IN': '🌏 वैश्विक समय क्षेत्र',
    },
    today_button: {
      'id-ID': 'HARI INI',

      // INGGRIS (ENGLISH)
      'en-US': 'TODAY',
      'en-GB': 'TODAY',
      'en-AU': 'TODAY',
      'en-CA': 'TODAY',
      'en-IE': 'TODAY',
      'en-NZ': 'TODAY',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '今日',
      'ko-KR': '오늘',
      'zh-CN': '今天',
      'zh-TW': '今天',

      // PERANCIS (FRENCH)
      'fr-FR': "AUJOURD'HUI",
      'fr-CA': "AUJOURD'HUI",
      'fr-BE': "AUJOURD'HUI",

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'HEUTE',
      'nl-NL': 'VANDAAG',
      'pl-PL': 'DZIŚ',
      'sv-SE': 'IDAG',
      'it-IT': 'OGGI',

      // SPANYOL (SPANISH)
      'es-ES': 'HOY',
      'es-MX': 'HOY',
      'es-CL': 'HOY',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'HOJE',
      'pt-BR': 'HOJE',
      'pt-AO': 'HOJE',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'СЕГОДНЯ',
      'ru-KZ': 'СЕГОДНЯ',
      'uk-UA': 'СЬОГОДНІ',

      // TURKIK (TURKIC)
      'tr-TR': 'BUGÜN',

      // ARAB (ARABIC)
      'ar-SA': 'اليوم',
      'ar-EG': 'اليوم',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'วันนี้',
      'vi-VN': 'HÔM NAY',

      // INDIA
      'hi-IN': 'आज',
    },
    dark_mode_label: {
      'id-ID': 'Mode Gelap',

      // INGGRIS (ENGLISH)
      'en-US': 'Dark Mode',
      'en-GB': 'Dark Mode',
      'en-AU': 'Dark Mode',
      'en-CA': 'Dark Mode',
      'en-IE': 'Dark Mode',
      'en-NZ': 'Dark Mode',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': 'ダークモード',
      'ko-KR': '다크 모드',
      'zh-CN': '深色模式',
      'zh-TW': '深色模式',

      // PERANCIS (FRENCH)
      'fr-FR': 'Mode Sombre',
      'fr-CA': 'Mode Sombre',
      'fr-BE': 'Mode Sombre',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'Dunkelmodus',
      'nl-NL': 'Donkere Modus',
      'pl-PL': 'Tryb Ciemny',
      'sv-SE': 'Mörkt Läge',
      'it-IT': 'Modalità Scura',

      // SPANYOL (SPANISH)
      'es-ES': 'Modo Oscuro',
      'es-MX': 'Modo Oscuro',
      'es-CL': 'Modo Oscuro',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'Modo Escuro',
      'pt-BR': 'Modo Escuro',
      'pt-AO': 'Modo Escuro',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'Тёмный Режим',
      'ru-KZ': 'Тёмный Режим',
      'uk-UA': 'Темний режим',

      // TURKIK (TURKIC)
      'tr-TR': 'Koyu Mod',

      // ARAB (ARABIC)
      'ar-SA': 'الوضع المظلم',
      'ar-EG': 'الوضع المظلم',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'โหมดมืด',
      'vi-VN': 'Chế độ tối',

      // INDIA
      'hi-IN': 'डार्क मोड',
    },
    light_mode_label: {
      'id-ID': 'Mode Terang',

      // INGGRIS (ENGLISH)
      'en-US': 'Light Mode',
      'en-GB': 'Light Mode',
      'en-AU': 'Light Mode',
      'en-CA': 'Light Mode',
      'en-IE': 'Light Mode',
      'en-NZ': 'Light Mode',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': 'ライトモード',
      'ko-KR': '라이트 모드',
      'zh-CN': '浅色模式',
      'zh-TW': '淺色模式',

      // PERANCIS (FRENCH)
      'fr-FR': 'Mode Clair',
      'fr-CA': 'Mode Clair',
      'fr-BE': 'Mode Clair',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'Lichtmodus',
      'nl-NL': 'Lichte Modus',
      'pl-PL': 'Tryb Jasny',
      'sv-SE': 'Ljust Läge',
      'it-IT': 'Modalità Chiara',

      // SPANYOL (SPANISH)
      'es-ES': 'Modo Claro',
      'es-MX': 'Modo Claro',
      'es-CL': 'Modo Claro',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'Modo Claro',
      'pt-BR': 'Modo Claro',
      'pt-AO': 'Modo Claro',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'Светлый Режим',
      'ru-KZ': 'Светлый Режим',
      'uk-UA': 'Світлий режим',

      // TURKIK (TURKIC)
      'tr-TR': 'Açık Mod',

      // ARAB (ARABIC)
      'ar-SA': 'الوضع الفاتح',
      'ar-EG': 'الوضع الفاتح',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'โหมดสว่าง',
      'vi-VN': 'Chế độ sáng',

      // INDIA
      'hi-IN': 'लाइट मोड',
    },
    year_suffix_m: {
      'id-ID': ' M',

      // INGGRIS (ENGLISH)
      'en-US': ' AD',
      'en-GB': ' CE',
      'en-AU': ' CE',
      'en-CA': ' CE',
      'en-IE': ' CE',
      'en-NZ': ' CE',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '年',
      'ko-KR': '년',
      'zh-CN': '年',
      'zh-TW': '年',

      // PERANCIS (FRENCH)
      'fr-FR': ' ap. J.-C.',
      'fr-CA': ' ap. J.-C.',
      'fr-BE': ' ap. J.-C.',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': ' n. Chr.',
      'nl-NL': ' n.C.',
      'pl-PL': ' n.e.',
      'sv-SE': ' e.Kr.',
      'it-IT': ' d.C.',

      // SPANYOL (SPANISH)
      'es-ES': ' d. C.',
      'es-MX': ' d. C.',
      'es-CL': ' d. C.',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': ' d.C.',
      'pt-BR': ' d.C.',
      'pt-AO': ' d.C.',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': ' н. э.',
      'ru-KZ': ' н. э.',
      'uk-UA': ' н. е.',

      // TURKIK (TURKIC)
      'tr-TR': ' MS',

      // ARAB (ARABIC)
      'ar-SA': ' م',
      'ar-EG': ' م',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': ' ค.ศ.',
      'vi-VN': ' SCN',

      // INDIA
      'hi-IN': ' ईस्वी',
    },
    year_suffix_sm: {
      'id-ID': ' SM',

      // INGGRIS (ENGLISH)
      'en-US': ' BC',
      'en-GB': ' BCE',
      'en-AU': ' BCE',
      'en-CA': ' BCE',
      'en-IE': ' BCE',
      'en-NZ': ' BCE',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '年 前',
      'ko-KR': '년 전',
      'zh-CN': '年 前',
      'zh-TW': '年 前',

      // PERANCIS (FRENCH)
      'fr-FR': ' av. J.-C.',
      'fr-CA': ' av. J.-C.',
      'fr-BE': ' av. J.-C.',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': ' v. Chr.',
      'nl-NL': ' v.C.',
      'pl-PL': ' p.n.e.',
      'sv-SE': ' f.Kr.',
      'it-IT': ' a.C.',

      // SPANYOL (SPANISH)
      'es-ES': ' a. C.',
      'es-MX': ' a. C.',
      'es-CL': ' a. C.',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': ' a.C.',
      'pt-BR': ' a.C.',
      'pt-AO': ' a.C.',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': ' до н. э.',
      'ru-KZ': ' до н. э.',
      'uk-UA': ' до н. е.',

      // TURKIK (TURKIC)
      'tr-TR': ' ÖÖ',

      // ARAB (ARABIC)
      'ar-SA': ' ق. م',
      'ar-EG': ' ق. م',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': ' ก่อน ค.ศ.',
      'vi-VN': ' TCN',

      // INDIA
      'hi-IN': ' ईसा पूर्व',
    },
    year_max_range_label: {
      'id-ID': 'Rentang Maksimal',

      // INGGRIS (ENGLISH)
      'en-US': 'Full Range Select',
      'en-GB': 'Full Range Select',
      'en-AU': 'Full Range Select',
      'en-CA': 'Full Range Select',
      'en-IE': 'Full Range Select',
      'en-NZ': 'Full Range Select',

      // ASIA TIMUR (EAST ASIA)
      'ja-JP': '最大範囲選択',
      'ko-KR': '최대 범위 선택',
      'zh-CN': '最大范围选择',
      'zh-TW': '最大範圍選擇',

      // PERANCIS (FRENCH)
      'fr-FR': 'Sélection de Plage Maximale',
      'fr-CA': 'Sélection de Plage Maximale',
      'fr-BE': 'Sélection de Plage Maximale',

      // JERMANIK/EROPA (GERMANIC/EUROPEAN)
      'de-DE': 'Maximalbereich Auswahl',
      'nl-NL': 'Maximale Reikwijdte',
      'pl-PL': 'Wybór Maksymalnego Zakresu',
      'sv-SE': 'Maximalt Urval',
      'it-IT': 'Selezione Gamma Massima',

      // SPANYOL (SPANISH)
      'es-ES': 'Selección de Rango Máximo',
      'es-MX': 'Selección de Rango Máximo',
      'es-CL': 'Selección de Rango Máximo',

      // PORTUGIS (PORTUGUESE)
      'pt-PT': 'Seleção de Gama Máxima',
      'pt-BR': 'Seleção de Gama Máxima',
      'pt-AO': 'Seleção de Gama Máxima',

      // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
      'ru-RU': 'Выбор Максимального Диапазона',
      'ru-KZ': 'Выбор Максимального Диапазона',
      'uk-UA': 'Вибір Максимального Діапазону',

      // TURKIK (TURKIC)
      'tr-TR': 'Maksimum Aralık Seçimi',

      // ARAB (ARABIC)
      'ar-SA': 'اختيار النطاق الأقصى',
      'ar-EG': 'اختيار النطاق الأقصى',

      // ASIA TENGGARA (SOUTHEAST ASIA)
      'th-TH': 'เลือกช่วงสูงสุด',
      'vi-VN': 'Chọn Phạm Vi Tối Đa',

      // INDIA
      'hi-IN': 'अधिकतम सीमा चुनें',
    },
  };

  // --- Judul Halaman yang Dilokalisasi (Localized Page Titles) ---
  const PAGE_TITLE = {
    'id-ID': 'Kalender Real-Time & Lokal',

    // INGGRIS (ENGLISH)
    'en-US': 'Real-Time & Localized Calendar',
    'en-GB': 'Real-Time & Localised Calendar',
    'en-AU': 'Real-Time & Localised Calendar',
    'en-CA': 'Real-Time & Localised Calendar',
    'en-IE': 'Real-Time & Localised Calendar',
    'en-NZ': 'Real-Time & Localised Calendar',

    // ASIA TIMUR (EAST ASIA)
    'ja-JP': 'リアルタイム＆ローカライズカレンダー',
    'ko-KR': '실시간 현지화 캘린더',
    'zh-CN': '实时本地化日历',
    'zh-TW': '即時在地化日曆',

    // PERANCIS (FRENCH)
    'fr-FR': 'Calendrier Temps Réel & Local',
    'fr-CA': 'Calendrier Temps Réel & Local',
    'fr-BE': 'Calendrier Temps Réel & Local',

    // JERMANIK/EROPA (GERMANIC/EUROPEAN)
    'de-DE': 'Echtzeit- & Lokaler Kalender',
    'nl-NL': 'Realtime en lokale kalender',
    'pl-PL': 'Kalendarz w Czasie Rzeczywistym i Zlokalizowany',
    'sv-SE': 'Realtids- och lokaliserad kalender',
    'it-IT': 'Calendario in tempo reale e locale',

    // SPANYOL (SPANISH)
    'es-ES': 'Calendario en Tiempo Real y Local',
    'es-MX': 'Calendario en Tiempo Real y Local',
    'es-CL': 'Calendario en Tiempo Real y Local',

    // PORTUGIS (PORTUGUESE)
    'pt-PT': 'Calendário em Tempo Real e Local',
    'pt-BR': 'Calendário em Tempo Real e Local',
    'pt-AO': 'Calendário em Tempo Real e Local',

    // SLAVIK/EROPA TIMUR (SLAVIC/EASTERN EUROPE)
    'ru-RU': 'Локализованный Календарь в Реальном Времени',
    'ru-KZ': 'Локализованный Календарь в Реальном Времени',
    'uk-UA': 'Локалізований Календар у Режимі Реального Часу',

    // TURKIK (TURKIC)
    'tr-TR': 'Gerçek Zamanlı Yerel Takvim',

    // ARAB (ARABIC)
    'ar-SA': 'التقويم المحلي والوقت الحقيقي',
    'ar-EG': 'التقويم المحلي والوقت الحقيقي',

    // ASIA TENGGARA (SOUTHEAST ASIA)
    'th-TH': 'ปฏิทินแบบเรียลไทม์และท้องถิ่น',
    'vi-VN': 'Lịch Địa Phương dan Thời Gian Thực',

    // INDIA
    'hi-IN': 'वास्तवik समय स्थानीय कैलेंडर',
  };

  /**
   * @description Pemetaan Tampilan: Digunakan untuk menampilkan nama kota yang lebih spesifik di dropdown,
   *              tetapi nilai yang dikirim ke fungsi timeZone tetap menggunakan nama IANA yang valid
   *              (Asia/Jakarta, Asia/Makassar, dll.).
   *              (Display Mapping: Used to show more specific city names in the dropdown, but the value
   *              sent to the timeZone function still uses a valid IANA name (Asia/Jakarta, Asia/Makassar, etc.).)
   */
  const INDONESIA_DISPLAY_MAP = {
    // ------------------------------------------------------------------------------------------------------------
    // ZONA WIB (Menggunakan 'Asia/Jakarta' atau 'Asia/Pontianak')
    // (WIB TIME ZONE (Using 'Asia/Jakarta' or 'Asia/Pontianak'))
    // ------------------------------------------------------------------------------------------------------------
    'Jakarta (WIB)': 'Asia/Jakarta',
    'Bandung (WIB)': 'Asia/Jakarta',
    'Karawang (WIB)': 'Asia/Jakarta',
    'Bekasi (WIB)': 'Asia/Jakarta',
    'Serang (WIB)': 'Asia/Jakarta',
    'Cilegon (WIB)': 'Asia/Jakarta',
    'Semarang (WIB)': 'Asia/Jakarta',
    'Yogyakarta (WIB)': 'Asia/Jakarta',
    'Surabaya (WIB)': 'Asia/Jakarta',
    'Banda Aceh (WIB)': 'Asia/Jakarta',
    'Medan (WIB)': 'Asia/Jakarta',
    'Padang (WIB)': 'Asia/Jakarta',
    'Pekanbaru (WIB)': 'Asia/Jakarta',
    'Jambi (WIB)': 'Asia/Jakarta',
    'Palembang (WIB)': 'Asia/Jakarta',
    'Bengkulu (WIB)': 'Asia/Jakarta',
    'Bandar Lampung (WIB)': 'Asia/Jakarta',
    'Tanjung Pinang (WIB)': 'Asia/Jakarta',
    'Pangkalpinang (WIB)': 'Asia/Jakarta',

    // Khusus untuk Kalimantan (WIB)
    // (Specifically for Kalimantan (WIB))
    'Pontianak (WIB)': 'Asia/Pontianak',
    'Palangkaraya (WIB)': 'Asia/Pontianak',
    'Banjarmasin (WIB)': 'Asia/Pontianak', // Catatan: Banjarmasin secara geografis di WITA, tapi zona WIB
                                           // (Note: Geographically, Banjarmasin is
                                           // in the Central Indonesia Time (WITA) zone,
                                           // but follows the Western Indonesia Time (WIB) zone.)

    // ------------------------------------------------------------------------------------------------------------
    // ZONA WITA (Menggunakan 'Asia/Makassar')
    // (WITA TIME ZONE (Using 'Asia/Makassar'))
    // ------------------------------------------------------------------------------------------------------------
    'Makassar (WITA)': 'Asia/Makassar',
    'Denpasar, Bali (WITA)': 'Asia/Makassar',
    'Mataram, NTB (WITA)': 'Asia/Makassar',
    'Kupang, NTT (WITA)': 'Asia/Makassar',
    'Manado (WITA)': 'Asia/Makassar',
    'Palu (WITA)': 'Asia/Makassar',
    'Kendari (WITA)': 'Asia/Makassar',
    'Gorontalo (WITA)': 'Asia/Makassar',
    'Balikpapan (WITA)': 'Asia/Makassar',
    'Samarinda (WITA)': 'Asia/Makassar',

    // ------------------------------------------------------------------------------------------------------------
    // ZONA WIT (Menggunakan 'Asia/Jayapura')
    // (WIT TIME ZONE (Using 'Asia/Jayapura'))
    // ------------------------------------------------------------------------------------------------------------
    'Jayapura (WIT)': 'Asia/Jayapura',
    'Ambon (WIT)': 'Asia/Jayapura',
    'Ternate (WIT)': 'Asia/Jayapura',
    'Sorong (WIT)': 'Asia/Jayapura',
    'Merauke (WIT)': 'Asia/Jayapura',
  };

  // ===========================================================================================================
  // --- 1. REFERENSI ELEMEN DOM (DOM ELEMENT REFERENCES) ---
  // ===========================================================================================================

  const body = document.body;
  const clockDisplay = document.getElementById('real-time-clock');
  const clockZoneName = document.getElementById('clock-zone-name');
  const labelTimezone = document.getElementById('label-timezone');
  const timezoneSelect = document.getElementById('timezone-select');
  const labelLanguage = document.getElementById('label-language');
  const languageSelect = document.getElementById('language-select');
  const labelDarkMode = document.getElementById('label-dark-mode');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const yearSelect = document.getElementById('year-select');
  const monthPopup = document.getElementById('month-popup');
  const monthYearDisplay = document.getElementById('month-year-display');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const todayBtn = document.getElementById('today-btn');
  const calendarWeekdays = document.getElementById('calendar-weekdays');
  const calendarBody = document.getElementById('calendar-body');

  // ===========================================================================================================
  // --- 2. VARIABEL STATUS (STATE VARIABLES) ---
  // ===========================================================================================================

  /**
   * @description Mendapatkan nilai dari Local Storage.
   *              (Gets value from Local Storage.)
   *
   * Jika kunci tidak ada di Local Storage, ia mengembalikan nilai fallback yang disediakan.
   * (If the key does not exist in Local Storage, it returns the provided fallback value.)
   */
  const getStorage = (key, fallback) => localStorage.getItem(key) || fallback;

  /**
   * @description Menyimpan nilai ke Local Storage.
   *              (Saves value to Local Storage.)
   *
   * Digunakan untuk mempertahankan preferensi pengguna (seperti timezone dan dark mode).
   * (Used to persist user preferences (such as timezone and dark mode).)
   */
  const setStorage = (key, value) => localStorage.setItem(key, value);

  // Ambil terjemahan berdasarkan selectedLocale, fallback ke 'en-US'
  // (Get translation based on selectedLocale, fallback to 'en-US')
  const getTrans = (key, locale) =>
    UI_TRANSLATIONS[key][locale] || UI_TRANSLATIONS[key]['en-US'];

  // Objek Date untuk menyimpan bulan/tahun kalender saat ini
  // (Date object to store the current calendar month/year)
  let currentDate = new Date();

  // Mendapatkan zona waktu default dari browser pengguna
  // (Gets the default timezone from the user's browser)
  let defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Zona Waktu yang dipilih: Prioritas adalah Local Storage, lalu default browser
  // (Selected Time Zone: Priority is Local Storage, then browser default)
  let selectedTimezone = getStorage('selectedTimezone', defaultTimezone);

  // Locale yang dipilih: Prioritas pertama adalah Local Storage, kedua adalah Locale berdasarkan Zona Waktu,
  // ketiga adalah Bahasa Browser, keempat adalah 'en-US'
  // (Selected Locale: First priority is Local Storage, second is Locale based on Time Zone,
  // third is Browser Language, fourth is 'en-US')
  let selectedLocale = getStorage(
    'selectedLocale',
    TIMEZONE_TO_LOCALE[defaultTimezone] || navigator.language || 'en-US'
  );

  // Cek keamanan: Pastikan hasil pilihan didukung oleh daftar SUPPORTED_LOCALES.
  // (Safety check: Make sure the selected result is supported by the SUPPORTED_LOCALES list.)
  if (!(selectedLocale in SUPPORTED_LOCALES)) {
    // Jika tidak didukung (misalnya, 'fr-CA' tidak ada dalam daftar), coba fallback ke bahasa utama yang cocok.
    // (If not supported (e.g., 'fr-CA' is not in the list), try falling back to a suitable primary language.)
    const primaryLanguage = selectedLocale.split('-')[0];
    const bestMatch =
      Object.keys(SUPPORTED_LOCALES).find((code) =>
        code.startsWith(primaryLanguage)
      ) || 'en-US';
    selectedLocale = bestMatch;
  }

  // Variabel status Mode Gelap. Nilai 'true' diambil dari Local Storage.
  // (Dark Mode state variable. The 'true' value is retrieved from Local Storage.)
  let isDarkMode = getStorage('darkMode', 'false') === 'true';

  // Variabel status Popup. Nilai 'true' berarti popup sedang terbuka.
  // (Popup state variable. The 'true' value means the popup is currently open.)
  let popupVisible = false;

  // ===========================================================================================================
  // --- 3. FUNGSI PEMBANTU (HELPER FUNCTIONS) ---
  // ===========================================================================================================

  /**
   * @description Memperbarui judul dokumen HTML berdasarkan 'selectedLocale'.
   *              (Updates the HTML document title based on the 'selectedLocale'.)
   */
  function updatePageTitle() {
    // Mengatur judul dokumen (tab browser) menggunakan nilai dari map PAGE_TITLE
    // Fallback ke 'en-US' jika tidak ditemukan.
    // (Sets the document title (browser tab) using the value from the PAGE_TITLE map
    // Falls back to 'en-US' if not found.)
    document.title = PAGE_TITLE[selectedLocale] || PAGE_TITLE['en-US'];
  }

  /**
   * @description Menerjemahkan label UI statis (Zona Waktu, Bahasa) berdasarkan 'selectedLocale'.
   *              (Translates static UI labels (Time Zone, Language) based on 'selectedLocale'.)
   *
   * Menggunakan 'en-US' sebagai fallback. Juga memanggil updateDarkModeLabel() untuk
   * menangani label Dark Mode yang sifatnya dinamis (berubah tergantung status toggle).
   * (Uses 'en-US' as fallback. Also calls updateDarkModeLabel() to handle the dynamic
   * Dark Mode label which changes based on the toggle state.)
   */
  function translateUILabels() {
    labelTimezone.textContent = getTrans('timezone_label', selectedLocale);
    labelLanguage.textContent = getTrans('language_label', selectedLocale);
    if (todayBtn)
      todayBtn.textContent = getTrans('today_button', selectedLocale);

    // Memanggil pembaruan label Dark Mode karena teksnya dinamis
    // (Calls the Dark Mode label update because its text is dynamic)
    updateDarkModeLabel();
  }

  /**
   * @description Menghitung label tampilan tahun (Masehi/Sebelum Masehi).
   *              (Calculating the year display label (AD/BC).)
   * 
   * @param    {number}                y - Nilai tahun internal (misalnya -7580).
   *                                       (Internal year value (for example -7580).)
   * @param    {string}  suffix_positive - Akhiran untuk tahun Masehi (misalnya ' AD').
   *                                       (The suffix for the Common Era (for example, 'AD').)
   * @param    {string}  suffix_negative - Akhiran untuk tahun Sebelum Masehi (misalnya ' BC').
   *                                       (The suffix for years Before Christ (for example, 'BC').)
   * 
   * @returns  {string}  Label tampilan yang benar.
   *                     (The correct display label.)
   */
  function getDisplayLabel(y, suffix_positive, suffix_negative) {
    if (y > 0) {
      // Tahun 1 M ke atas
      // (From the year 1 AD onwards)
      return `${y}${suffix_positive}`;
    } else if (y === 0) {
      // Tahun 0 (setara dengan 1 SM secara historis)
      // (Year 0 (equivalent to 1 BC historically))
      const smYear = 1; // Tahun 1 Sebelum Masehi (1 Year Before Christ)
      return `${smYear}${suffix_negative}`;
    } else {
      // Tahun negatif (-1, -2, ...) – (Negative years (-1, -2, ...))
      // Contoh: y = -1 --> 0 - (-1) = 1. Kita ingin 2 SM – (Example: y = -1 --> 0 - (-1) = 1. We want 2 BC)
      // Rumusnya: (0 - y) + 1 TIDAK TEPAT – (The formula: (0 - y) + 1 IS NOT CORRECT)
      // Rumusnya: Math.abs(y) + 1 TEPAT – (The formula: Math.abs(y) + 1 EXACT)
      const smYear = Math.abs(y) + 1;
      return `${smYear}${suffix_negative}`;
    }
  }

  /**
   * @description Mengisi dropdown Tahun Cepat dengan rentang terbatas
   *              berpusat pada tahun kalender yang sedang aktif.
   *              (Populate the Quick Year Select dropdown with a limited range
   *              centered on the currently active calendar year.)
   */
  function populateYearSelect() {
    if (!yearSelect) return;
    // Tahun kalender yang sedang aktif
    // (The current calendar year)
    const activeCalendarYear = currentDate.getFullYear();

    // Tahun Masehi saat ini (untuk batas)
    // (Current Gregorian year (for reference))
    const currentAbsoluteYear = new Date().getFullYear();

    // Ambil akhiran tahun berdasarkan locale yang dipilih
    // (Get the year-end suffix based on the selected locale)
    const suffix_positive = getTrans('year_suffix_m', selectedLocale);
    const suffix_negative = getTrans('year_suffix_sm', selectedLocale);

    // Ambil terjemahan untuk rentang maksimal
    // (Take the translation for the maximum range)
    const jump_label = getTrans('year_max_range_label', selectedLocale);

    // Hanya me-render 200 tahun ke belakang dan 200 tahun ke depan
    // (Only render 200 years back and 200 years forward)
    const range = 200;

    // Batas Absolut render pemilihan tahun
    // (Absolute limit of election year rendering)
    const ABSOLUTE_MIN_YEAR = currentAbsoluteYear - 10000;
    const ABSOLUTE_MAX_YEAR = currentAbsoluteYear + 10000;

    let html = '';

    // ------------------------------------------------------------------------------------------------------------
    // 1. OPSI LOMPATAN JAUH (KE BELAKANG)
    // 1. LONG JUMP OPTION (BACKWARDS)
    // ------------------------------------------------------------------------------------------------------------

    // Hanya tampilkan Lompat Jauh jika tahun aktif belum mendekati batas absolut minimal
    // (Only display Long Jump if the active year has not yet approached the absolute minimum limit)
    if (activeCalendarYear > ABSOLUTE_MIN_YEAR + range) {
      // Tampilkan opsi Lompat ke Batas Bawah
      // (Show the option Jump to Lower Limit)
      // Catatan: Kita menggunakan ABSOLUTE_MIN_YEAR sebagai nilai
      // (Note: We use ABSOLUTE_MIN_YEAR as the value)
      const displayLabelMin = getDisplayLabel(
        ABSOLUTE_MIN_YEAR,
        suffix_positive,
        suffix_negative
      );
      html += `<option value="${ABSOLUTE_MIN_YEAR}"> ⮜ ${displayLabelMin} (${jump_label}) </option>`;

      // Opsi Lompat 200 tahun ke belakang
      // (Option to Jump 200 Years Back)
      const jumpBackYear = activeCalendarYear - 200;
      const displayJumpBack = getDisplayLabel(
        jumpBackYear,
        suffix_positive,
        suffix_negative
      );

      html += `<option value="${jumpBackYear}"> ⮜ ${displayJumpBack} </option>`;
      html += `<option disabled>----------------------</option>`;
    }

    // ------------------------------------------------------------------------------------------------------------
    // 2. RENTANG TAHUN TERBATAS (UTAMA)
    // 2. LIMITED YEARS RANGE (PRIMARY)
    // ------------------------------------------------------------------------------------------------------------

    // Pastikan rentang terbatas tidak melewati batas absolut
    // (Make sure the limited range does not exceed the absolute limit)
    const startYear = Math.max(activeCalendarYear - range, ABSOLUTE_MIN_YEAR);
    const endYear = Math.min(activeCalendarYear + range, ABSOLUTE_MAX_YEAR);

    // Menawarkan 10000 tahun ke belakang dan 10000 tahun ke depan
    // (Offers 10000 years back and 10000 years forward)
    for (let y = startYear; y <= endYear; y++) {
      const displayLabel = getDisplayLabel(y, suffix_positive, suffix_negative);

      const isSelected = y === activeCalendarYear ? 'selected' : '';
      html += `<option value="${y}" ${isSelected}>${displayLabel}</option>`;
    }
    // ------------------------------------------------------------------------------------------------------------
    // 3. OPSI LOMPATAN JAUH (KE DEPAN)
    // 3. LONG JUMP OPTION (FORWARD)
    // ------------------------------------------------------------------------------------------------------------

    // Hanya tampilkan Lompat Jauh jika tahun aktif belum mendekati batas absolut maksimal
    // (Only display Long Jump if the active year has not yet approached the absolute maximum limit)
    if (activeCalendarYear < ABSOLUTE_MAX_YEAR - range) {
      html += `<option disabled>----------------------</option>`;

      // Opsi Lompat 200 tahun ke depan
      // (Jump option 200 years ahead)
      const jumpForwardYear = activeCalendarYear + 200;
      const displayJumpForward = getDisplayLabel(
        jumpForwardYear,
        suffix_positive,
        suffix_negative
      );
      html += `<option value="${jumpForwardYear}"> ${displayJumpForward} ⮞ </option>`;

      // Tampilkan opsi Lompat ke Batas Atas
      // (Show the Jump to Top option)
      // Catatan: Kita menggunakan ABSOLUTE_MAX_YEAR sebagai nilai
      // (Note: We use ABSOLUTE_MAX_YEAR as the value)
      const displayLabelMax = getDisplayLabel(
        ABSOLUTE_MAX_YEAR,
        suffix_positive,
        suffix_negative
      );
      html += `<option value="${ABSOLUTE_MAX_YEAR}"> ${displayLabelMax} (${jump_label}) ⮞ </option>`;
    }

    yearSelect.innerHTML = html;

    // Sinkronisasi nilai dropdown dengan tahun kalender yang aktif
    // (Synchronize dropdown value with the active calendar year)
    yearSelect.value = activeCalendarYear;

    yearSelect.addEventListener('change', handleYearJump);
  }

  /**
   * @description Menangani perubahan (jump) tahun yang dipilih dari dropdown tahun.
   *              Ini memastikan bahwa nilai yang dipilih valid sebelum memperbarui kalender.
   *              (Handling the change (jump) of the year selected from the year dropdown.
   *              This ensures that the selected value is valid before updating the calendar.)
   */
  function handleYearJump() {
    // Ambil nilai dari opsi tahun yang dipilih dari elemen 'yearSelect'.
    // parseInt(value, 10) digunakan untuk mengubah string menjadi bilangan bulat (basis 10).
    // (Retrieve the value from the selected year option from the 'yearSelect' element.
    // parseInt(value, 10) is used to convert the string to an integer (base 10).)
    const selectedYearValue = parseInt(yearSelect.value, 10);

    // Periksa apakah nilai yang diambil BUKAN Angka (NaN).
    // Ini menangani kasus di mana opsi yang dipilih mungkin berupa teks atau pemisah yang tidak valid.
    // (Check if the retrieved value IS NOT a Number (NaN).
    // This handles cases where the selected option might be invalid text or a separator.)
    if (isNaN(selectedYearValue)) {
      // Abaikan eksekusi fungsi (keluar) jika nilai bukan angka yang valid.
      // (Ignore function execution (return) if the value is not a valid number.)
      return;
    }

    // Panggil fungsi inti kalender
    // (Call the core calendar function)
    setCalendarYear(selectedYearValue);
  }

  /**
   * @description Mengubah tahun kalender utama dan me-render ulang tampilan.
   *              (Changing the main calendar year and re-rendering the view.)
   * 
   * @param  {number}  newYear - Tahun baru yang akan diubah.
   *                             (The New Year that will be changed.)
   */
  function setCalendarYear(newYear) {
    // Ubah tahun kalender yang aktif
    // (Change the active calendar year)
    currentDate.setFullYear(newYear);

    // PENTING: Panggil ulang populateYearSelect()
    // Ini akan memastikan dropdown diisi dengan tahun-tahun di sekitar 'newYear'
    // (IMPORTANT: Call populateYearSelect() again
    // This will ensure the dropdown is populated with years around 'newYear')
    populateYearSelect();
  }

  /**
   * @description Menampilkan popup yang berisi daftar 12 bulan.
   *              (Displays a popup containing a list of 12 months.)
   *              Fungsi ini mengatur konten, posisi, dan logika interaksi (klik) pada bulan.
   *              (This function manages the content, position, and interaction logic (click) on the month.)
   *
   * @param  {number}                year - Tahun yang akan ditampilkan dalam daftar bulan.
   *                                        (The year that will be displayed in the list of months.)
   * @param  {HTMLElement}  targetElement - Elemen pemicu untuk penentuan posisi popup.
   *                                        (The trigger element for determining the popup position.)
   */
  function showMonthPopup(year, targetElement) {
    // Mendapatkan referensi ke elemen DOM popup bulan.
    // (Get reference to the month popup DOM element.)
    const popup = monthPopup;

    // Mengosongkan konten popup dari bulan-bulan sebelumnya.
    // (Clear the popup content from previous months.)
    popup.innerHTML = '';

    // Membuat objek pemformat tanggal untuk mendapatkan nama bulan (penuh)
    // berdasarkan lokalitas (bahasa) yang dipilih.
    // (Create a date formatting object to get the full month name
    // based on the selected locale (language).)
    const monthFormatter = new Intl.DateTimeFormat(selectedLocale, {
      month: 'long',
    });

    // Perulangan untuk membuat item untuk setiap 12 bulan (indeks m dari 0 hingga 11).
    // (Loop to create items for all 12 months (index m from 0 to 11).)
    for (let m = 0; m < 12; m++) {
      // Mendapatkan nama bulan yang diformat (misalnya "Oktober").
      // (Get the formatted month name (e.g., "October").)
      const label = monthFormatter.format(new Date(year, m, 1));

      // Membuat elemen div baru sebagai item bulan yang dapat diklik.
      // (Create a new div element to serve as the clickable month item.)
      const item = document.createElement('div');

      // Mengatur teks item menjadi nama bulan.
      // (Set the item's text to the month name.)
      item.textContent = label;

      // Menyimpan indeks bulan (0-11) dalam data atribut untuk referensi.
      // (Store the month index (0-11) in a data attribute for reference.)
      item.dataset.month = m;

      // Menambahkan event listener saat item bulan diklik.
      // (Add a click event listener to the month item.)
      item.addEventListener('click', () => {
        // Menyembunyikan popup setelah bulan dipilih.
        // (Hide the popup after a month is selected.)
        popup.classList.add('hidden');

        // Memperbarui tahun dan bulan pada objek tanggal global.
        // (Update the year and month on the global date object.)
        currentDate.setFullYear(year);
        currentDate.setMonth(m);

        // Menyimpan pilihan tahun dan bulan ke Local Storage untuk persistensi.
        // (Save the selected year and month to Local Storage for persistence.)
        setStorage('selectedYear', year);
        setStorage('selectedMonth', m);

        // Render ulang kalender dengan bulan/tahun yang baru.
        // (Re-render the calendar with the new month/year.)
        renderCalendar();
      });

      // Menambahkan item bulan ke dalam elemen popup.
      // (Append the month item into the popup element.)
      popup.appendChild(item);
    }

    // Mendapatkan posisi (koordinat dan dimensi) elemen pemicu.
    // (Get the position (coordinates and dimensions) of the target element.)
    const rect = targetElement.getBoundingClientRect();

    // Mengatur posisi vertikal (top) popup agar sejajar dengan elemen pemicu,
    // disesuaikan dengan scroll halaman.
    // (Set the vertical position (top) of the popup to align with the trigger element,
    // adjusted according to the page scroll.)

    // ---   LOGIKA PENYESUAIAN POSISI VERTIKAL (TOP)  ---
    // --- LOGIC OF VERTICAL POSITION ADJUSTMENT (TOP) ---

    // KONDISI PREDIKSI: Apakah dropdown tahun kemungkinan besar membuka ke BAWAH?
    // (PREDICTION CONDITION: Is the year dropdown most likely to open DOWNWARD?)
    // Dropdown tahun akan membuka ke BAWAH jika ada banyak ruang di bawah elemen pemicunya.
    // (The year dropdown will open DOWN if there is enough space below its trigger element.)
    if (rect.bottom < window.innerHeight / 2) {
      // Jika elemen pemicu berada di PARUH ATAS layar, year-select kemungkinan besar membuka ke BAWAH.
      // (If the trigger element is at the UPPER HALF of the screen, the year-select is likely to open DOWNWARD.)

      // Posisikan popup bulan di ATAS elemen pemicu untuk menghindari tabrakan.
      // (Position the month popup ABOVE the trigger element to avoid overlap.)
      popup.style.top = `${
        rect.bottom + window.scrollY - popup.offsetHeight
      }px`;
    } else {
      // Jika elemen pemicu berada di PARUH BAWAH layar, year-select kemungkinan besar membuka ke ATAS.
      // Dalam kasus ini, kita biarkan popup bulan sejajar atau sedikit di bawah.
      // (If the trigger element is at the LOWER HALF of the screen, the year-select will likely open UPWARD.
      // In this case, we let the month popup align or be slightly below.)

      // Posisikan popup bulan sejajar dengan elemen pemicu.
      // Ini mengasumsikan year-select membuka ke ATAS, sehingga tidak menutupi.
      // (Position the month popup aligned with the trigger element.
      // This assumes the year-select opens UP, so it does not cover anything.)
      popup.style.top = `${rect.top + window.scrollY}px`;
    }

    // Mengatur posisi horizontal (right) popup agar berada di samping elemen pemicu,
    // disesuaikan dengan scroll halaman.
    // (Set the horizontal position (right) of the popup to be next to the trigger element,
    // adjusted according to the page scroll.)
    popup.style.right = `${rect.right + window.scrollX}px`;

    // Logika untuk menampilkan popup, termasuk penanganan animasi (transisi).
    // (Logic to display the popup, including animation (transition) handling.)
    if (popup.classList.contains('hidden')) {
      // Menghapus kelas 'hidden' untuk membuat popup terlihat.
      // (Remove 'hidden' class to make the popup visible.)
      popup.classList.remove('hidden');

      // Menambahkan kelas 'animating' untuk memicu animasi CSS.
      // (Add 'animating' class to trigger CSS animation.)
      popup.classList.add('animating');

      // Menonaktifkan interaksi klik saat animasi berlangsung.
      // (Disable click interactions while the animation is running.)
      popup.style.pointerEvents = 'none';

      // Fungsi yang dipanggil saat transisi CSS selesai.
      // (Function called when the CSS transition ends.)
      const handleTransitionEnd = (e) => {
        // Memastikan event berasal dari elemen popup itu sendiri.
        // (Ensure the event originated from the popup element itself.)
        if (e.target === popup) {
          // Menghapus kelas 'animating' setelah transisi selesai.
          // (Remove 'animating' class after transition completes.)
          popup.classList.remove('animating');

          // Mengaktifkan kembali interaksi klik.
          // (Re-enable click interactions.)
          popup.style.pointerEvents = '';

          // Menghapus listener untuk mencegah penumpukan event.
          // (Remove the listener to prevent event stacking.)
          popup.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      // Mendaftarkan fungsi untuk mendengarkan akhir dari transisi CSS.
      // (Register the function to listen for the end of the CSS transition.)
      popup.addEventListener('transitionend', handleTransitionEnd);
    }
  }

  /**
   * @description Memperbarui label grup zona waktu (optgroup) yang bukan '🇮🇩 Indonesia'.
   *              Label akan diubah menggunakan terjemahan lokal yang sesuai.
   *              (Updating the timezone group label (optgroup) that is not '🇮🇩 Indonesia'.
   *              The label will be changed using the appropriate local translation.)
   */
  function updateTimezoneGroupLabel() {
    // Mendapatkan NodeList dari semua elemen <optgroup> di dalam elemen '#timezone-select'.
    // (Get a NodeList of all <optgroup> elements within the '#timezone-select' element.)
    const allGroups = document.querySelectorAll('#timezone-select optgroup');

    // Mengubah NodeList menjadi Array agar dapat menggunakan metode find().
    // (Converting a NodeList into an Array so that the find() method can be used.)
    const globalGroup = Array.from(allGroups).find(
      // Mencari grup yang labelnya TIDAK SAMA dengan '🇮🇩 Indonesia'.
      // Grup ini dianggap sebagai grup global/lainnya.
      // (Looking for groups whose label is NOT the same as '🇮🇩 Indonesia'.
      // These groups are considered global/other groups.)
      (group) => group.label !== '🇮🇩 Indonesia'
    );

    // Memeriksa apakah grup global berhasil ditemukan.
    // (Check if the global group was successfully found.)
    if (globalGroup) {
      globalGroup.label = getTrans('global_timezone_group', selectedLocale);
    }
  }

  /**
   * @description Mengisi elemen <select> Zona Waktu menggunakan INDONESIA_DISPLAY_MAP
   *              dan daftar global IANA.
   *              (Populates the Time Zone <select> element using the INDONESIA_DISPLAY_MAP
   *              and the global IANA list.)
   */
  function populateTimezoneSelect() {
    // Asumsi: Elemen select dan map sudah dideklarasikan di scope global/atas
    // (Assumption: The select element and map are already declared in the global/upper scope)
    if (!timezoneSelect) return;

    timezoneSelect.innerHTML = '';

    // A. Tambahkan Zona Waktu Indonesia (Menggunakan Peta Tampilan Detail)
    // (A. Add the Indonesian Time Zone (Using the Detailed View Map))
    const indonesianGroup = document.createElement('optgroup');
    indonesianGroup.label = '🇮🇩 Indonesia';

    for (const [displayLabel, validValue] of Object.entries(
      INDONESIA_DISPLAY_MAP
    )) {
      const option = document.createElement('option');
      // Nilai IANA yang VALID (Asia/Jakarta, dll.)
      // (VALID IANA value (Asia/Jakarta, etc.))
      option.value = validValue;

      // Teks yang dilihat pengguna (Jakarta, Medan, dll.)
      // (Text seen by users (Jakarta, Medan, etc.))
      option.textContent = displayLabel;

      // Tambahkan atribut data untuk mempermudah pencarian (opsional)
      // (Add data attributes to facilitate searching (optional))
      option.dataset.zone = validValue;

      // Tandai opsi jika sesuai dengan zona waktu yang saat ini dipilih
      // (Check the option if it matches the currently selected time zone)
      if (validValue === selectedTimezone) {
        option.selected = true;
      }

      indonesianGroup.appendChild(option);
    }
    timezoneSelect.appendChild(indonesianGroup);

    // B. Tambahkan Zona Waktu Global Lain (Hanya IANA Resmi)
    // (B. Add Another Global Time Zone (Official IANA Only))
    const globalGroup = document.createElement('optgroup');
    globalGroup.label = getTrans('global_timezone_group', selectedLocale);

    // Sortir daftar ALL_TIMEZONES global secara alfabetis
    // (Sort the global ALL_TIMEZONES list alphabetically)
    const sortedGlobalZones = [...ALL_TIMEZONES].sort((a, b) =>
      a.localeCompare(b)
    );

    sortedGlobalZones.forEach((zone) => {
      // PERHATIAN: Tidak perlu lagi menyaring zona IANA Indonesia di sini,
      // karena ALL_TIMEZONES sudah kita bersihkan di langkah 1.
      // (WARNING: There is no need to filter the Indonesian IANA zones here anymore,
      // because ALL_TIMEZONES has already been cleaned in step 1.)

      const option = document.createElement('option');
      option.value = zone;

      // Gunakan fungsi formatTimezoneLabel untuk tampilan yang komprehensif
      // (Use the formatTimezoneLabel function for a comprehensive display)
      const formattedLabel = formatTimezoneLabel(zone);
      option.textContent = formattedLabel;

      if (zone === selectedTimezone) {
        option.selected = true;
      }

      globalGroup.appendChild(option);
    });
    timezoneSelect.appendChild(globalGroup);

    // Pastikan nilai dropdown disinkronkan
    // (Make sure the dropdown value is synchronized)
    timezoneSelect.value = selectedTimezone;
  }

  /**
   * @description Memformat label opsi zona waktu dengan nama kota, ID IANA lengkap, dan offset UTC.
   *              (Formats the time zone option label with the city name, full IANA ID, and UTC offset.)
   *
   * @param    {string}  tz - IANA Time Zone ID.
   * @returns  {string}       Label yang diformat (misalnya, 'Jakarta (Asia/Jakarta) [UTC+07:00]').
   *                          (Formatted label (e.g., 'Jakarta (Asia/Jakarta) [UTC+07:00]').)
   */
  function formatTimezoneLabel(tz) {
    // Membagi ID zona waktu IANA (misalnya 'Asia/Jakarta') menjadi bagian-bagian.
    // (Splits the IANA time zone ID (e.g., 'Asia/Jakarta') into parts.)
    const parts = tz.split('/');

    // Mengambil bagian terakhir (nama kota) dan mengganti garis bawah ('_') dengan spasi.
    // (Takes the last part (city name) and replaces underscores ('_') with spaces.)
    const city = parts[parts.length - 1].replace(/_/g, ' ');

    let offsetText = '';

    try {
      // Mendapatkan objek Date saat ini untuk digunakan sebagai referensi waktu.
      // (Gets the current Date object to use as a time reference.)
      const date = new Date();

      // Membuat formatter tanggal/waktu Intl untuk mendapatkan offset zona waktu.
      // Locale 'en-US' digunakan di sini hanya untuk format offset (misalnya, 'GMT+7').
      // (Creates an Intl date/time formatter to get the time zone offset.
      // The 'en-US' locale is used here only for the offset format (e.g., 'GMT+7').)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'longOffset',
      });

      // Memecah output formatter menjadi bagian-bagian (literal, timeZoneName, dll.).
      // (Breaks the formatter output into parts (literal, timeZoneName, etc.).)
      const partsFormatted = formatter.formatToParts(date);

      // Mencari bagian yang berisi nama zona waktu (yang akan menjadi string offset).
      // (Looks for the part containing the time zone name (which will be the offset string).)
      const offsetPart = partsFormatted.find((p) => p.type === 'timeZoneName');

      if (offsetPart) {
        // Ganti GMT dengan UTC untuk representasi standar
        // (Replace GMT with UTC for standard representation)
        offsetText = offsetPart.value.replace('GMT', 'UTC');
      }
    } catch (e) {
      // Fallback jika API Intl.DateTimeFormat gagal
      // (Fallback if the Intl.DateTimeFormat API fails)
      offsetText = '';
    }

    // Menggabungkan nama kota, ID IANA lengkap, dan offset UTC yang diformat.
    // Tanda kurung siku hanya ditambahkan jika offsetText ada.
    // (Combines the city name, the full IANA ID, and the formatted UTC offset.
    // Square brackets are only added if offsetText is present.)
    return `${city} (${tz.replace(/_/g, ' ')}) ${
      offsetText ? `[${offsetText}]` : ''
    }`;
  }

  /**
   * @description Menyinkronkan locale yang dipilih ke locale yang direkomendasikan untuk zona waktu tertentu.
   *              (Syncs the selected locale to a recommended locale for the given timezone.)
   *
   * @param  {string}  timezone - Zona Waktu yang baru dipilih.
   *                              (The newly selected Time Zone.)
   */
  function syncTimezoneToLocale(timezone) {
    // Mencari locale yang direkomendasikan berdasarkan map TIMEZONE_TO_LOCALE.
    // (Looks up the recommended locale based on the TIMEZONE_TO_LOCALE map.)
    const recommendedLocale = TIMEZONE_TO_LOCALE[timezone];

    if (recommendedLocale && SUPPORTED_LOCALES[recommendedLocale]) {
      selectedLocale = recommendedLocale;

      // Memperbarui nilai pada elemen <select> Bahasa di UI.
      // (Updates the value of the Language <select> element in the UI.)
      languageSelect.value = recommendedLocale;

      setStorage('selectedLocale', recommendedLocale);
      updatePageTitle();
      translateUILabels();
    }
  }

  /**
   * @description Menyinkronkan zona waktu yang dipilih ke zona waktu yang direkomendasikan untuk locale tertentu.
   *              (Syncs the selected timezone to a recommended timezone for the given locale.)
   *
   * @param  {string}  locale - Locale yang baru dipilih.
   *                            (The newly selected Locale.)
   */
  function syncLocaleToTimezone(locale) {
    // Mencari zona waktu yang direkomendasikan berdasarkan map LOCALE_TO_TIMEZONE.
    // (Looks up the recommended timezone based on the LOCALE_TO_TIMEZONE map.)
    const recommendedTimezone = LOCALE_TO_TIMEZONE[locale];

    if (recommendedTimezone && ALL_TIMEZONES.includes(recommendedTimezone)) {
      selectedTimezone = recommendedTimezone;

      // Memperbarui nilai pada elemen <select> Zona Waktu di UI.
      // (Updates the value of the Time Zone <select> element in the UI.)
      timezoneSelect.value = recommendedTimezone;

      setStorage('selectedTimezone', recommendedTimezone);
    }
  }

  /**
   * @description Memperbarui teks label Dark Mode menjadi 'Mode Gelap' atau 'Mode Terang'
   *              dan menerjemahkannya sesuai dengan selectedLocale.
   *              (Updates the Dark Mode label text to 'Dark Mode' or 'Light Mode'
   *              and translates it according to selectedLocale.)
   */
  function updateDarkModeLabel() {
    if (!labelDarkMode || !darkModeToggle) return;

    // Menentukan key terjemahan yang tepat: Jika mode gelap aktif, tawarkan Light Mode (dan sebaliknya)
    // (Determine the correct translation key: If dark mode is checked, offer Light Mode (and vice versa))
    const labelKey = darkModeToggle.checked
      ? 'light_mode_label'
      : 'dark_mode_label';

    labelDarkMode.textContent = getTrans(labelKey, selectedLocale);
  }

  /**
   * @description Mengelola status Mode Gelap (Dark Mode).
   *              (Manages the Dark Mode state.)
   */
  function applyDarkMode() {
    if (isDarkMode) {
      body.classList.add('dark-mode');
      setStorage('darkMode', 'true');
    } else {
      body.classList.remove('dark-mode');
      setStorage('darkMode', 'false');
    }
    // Sinkronisasi checkbox dengan status isDarkMode
    // (Synchronize checkbox with the isDarkMode state)
    if (darkModeToggle) darkModeToggle.checked = isDarkMode;

    // Perbarui label setelah mode diterapkan
    // (Update label after the mode is applied)
    updateDarkModeLabel();
  }

  // ===========================================================================================================
  // --- 4. INISIALISASI KONTROL & EVENT LISTENER (CONTROL INITIALIZATION & EVENT LISTENERS) ---
  // ===========================================================================================================

  /**
   * @description Mengisi dropdown Zona Waktu dan Bahasa.
   *              (Populates the Time Zone and Language dropdowns.)
   */
  function populateControls() {
    // ---     Mengisi Opsi Bahasa     ---
    // --- (Populate Language Options) ---

    // Mengubah objek SUPPORTED_LOCALES menjadi array entri ([kode, nama])
    // (Converts the SUPPORTED_LOCALES object into an array of entries ([code, name]))
    const langOptionsHTML = Object.entries(SUPPORTED_LOCALES)
      // Membuat string HTML <option> untuk setiap locale
      // (Creates an HTML <option> string for each locale)
      .map(([code, name]) => {
        const isSelected = code === selectedLocale ? 'selected' : '';

        // Menandai opsi yang sesuai dengan 'selectedLocale' saat ini
        // (Marks the option corresponding to the current 'selectedLocale')
        return `<option value="${code}" ${isSelected}>${name}</option>`;
      })
      .join('');

    // Menyisipkan semua opsi ke elemen <select> Bahasa
    // (Inserts all options into the Language <select> element)
    languageSelect.innerHTML = langOptionsHTML;

    // ---    Mengisi Opsi Zona Waktu   ---
    // --- (Populate Time Zone Options) ---

    // Memastikan zona waktu saat ini (default) ada dalam daftar jika belum dikonfigurasi
    // (Ensure the current (default) timezone is in the list if it wasn't pre-configured)
    if (!ALL_TIMEZONES.includes(selectedTimezone)) {
      // Menambahkan zona waktu default ke awal array (jika belum ada)
      // (Adds the default timezone to the beginning of the array (if not already present))
      ALL_TIMEZONES.unshift(defaultTimezone);
    }

    const tzOptionsHTML = ALL_TIMEZONES
      // Urutkan opsi zona waktu secara alfabetis sebelum dibuat menjadi HTML
      // (Sort timezone options alphabetically before being turned into HTML)
      .sort((a, b) => a.localeCompare(b))
      .map((tz) => {
        const isSelected = tz === selectedTimezone ? 'selected' : '';

        // Menggunakan fungsi pembantu untuk memformat label yang komprehensif (nama kota, ID, offset)
        // (Uses the helper function to format a comprehensive label (city name, ID, offset))
        const formattedLabel = formatTimezoneLabel(tz);
        return `<option value="${tz}" ${isSelected}>${formattedLabel}</option>`;
      })
      .join('');

    // Menyisipkan semua opsi ke elemen <select> Zona Waktu
    // (Inserts all options into the Time Zone <select> element)
    timezoneSelect.innerHTML = tzOptionsHTML;

    languageSelect.value = selectedLocale;
    timezoneSelect.value = selectedTimezone;

    populateYearSelect();
    populateTimezoneSelect();
  }

  // Listener Perubahan Bahasa: Memperbarui semua terjemahan dan tampilan
  // (Language Change Listener: Updates all translations and display)
  languageSelect.addEventListener('change', (e) => {
    // Mengambil nilai locale yang baru dipilih
    // (Gets the newly selected locale value)
    selectedLocale = e.target.value;

    setStorage('selectedLocale', selectedLocale);

    // Sinkronkan zona waktu saat locale berubah
    // (Sync timezone when locale changes)
    syncLocaleToTimezone(selectedLocale);

    updatePageTitle();
    translateUILabels();
    populateYearSelect();
    populateTimezoneSelect();
    startClock();
    renderCalendar();
  });

  // Listener Perubahan Zona Waktu: Memperbarui tampilan jam dan kalender
  // (Time Zone Change Listener: Updates clock and calendar display)
  timezoneSelect.addEventListener('change', (e) => {
    // Mengambil nilai zona waktu yang baru dipilih
    // (Gets the newly selected time zone value)
    selectedTimezone = e.target.value;

    setStorage('selectedTimezone', selectedTimezone);

    // Sinkronkan locale saat zona waktu berubah
    // (Sync locale when timezone changes)
    syncTimezoneToLocale(selectedTimezone);

    populateYearSelect();
    updateTimezoneGroupLabel();
    startClock();
    renderCalendar();
  });

  // Memastikan elemen 'yearSelect' ada sebelum menambahkan listener.
  // (Ensure the 'yearSelect' element exists before adding the listener.)
  if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
      // Mengambil nilai tahun yang baru dan mengubahnya menjadi bilangan bulat.
      // (Get the new year value and convert it to an integer.)
      const newYear = parseInt(e.target.value);

      // Mengatur tahun penuh pada objek tanggal global.
      // (Set the full year on the global date object.)
      currentDate.setFullYear(newYear);

      renderCalendar();
    });
  }

  yearSelect.addEventListener('click', () => {
    // Mendapatkan tahun saat ini dari nilai dropdown dan mengubahnya menjadi bilangan bulat.
    // (Get the current year from the dropdown value and convert it to an integer.)
    const year = parseInt(yearSelect.value);
    const popup = monthPopup;

    // Logika jika popup bulan saat ini TIDAK terlihat (pertama kali diklik/dibuka).
    // (Logic if the month popup is currently NOT visible (first time clicked/opened).)
    if (!popupVisible) {
      // Memanggil fungsi untuk menampilkan dan memposisikan popup bulan.
      // (Call the function to display and position the month popup.)
      showMonthPopup(year, yearSelect);

      // Mendapatkan gaya komputasi dari popup untuk menghitung properti transisi.
      // (Get the computed styles of the popup to calculate transition properties.)
      const computed = getComputedStyle(popup);

      // Menghitung berapa banyak properti CSS yang sedang ditransisikan.
      // (Count how many CSS properties are being transitioned.)
      const transitionProps = computed.transitionProperty.split(',').length;

      // Variabel untuk melacak berapa banyak transisi yang sudah selesai.
      // (Variable to track how many transitions have ended.)
      let endedCount = 0;

      // Fungsi yang dijalankan setiap kali transisi CSS selesai.
      // (Function executed every time a CSS transition ends.)
      const handleTransitionEnd = () => {
        endedCount++;
        // Memeriksa apakah SEMUA transisi telah selesai.
        // (Check if ALL transitions have completed.)
        if (endedCount >= transitionProps) {
          popupVisible = true;
        }
      };
      // Menambahkan listener untuk mendeteksi akhir transisi.
      // (Add a listener to detect the end of the transition.)
      popup.addEventListener('transitionend', handleTransitionEnd);
    } else {
      showMonthPopup(year, yearSelect);
    }
  });

  document.addEventListener('click', (e) => {
    const popup = monthPopup;
    // Memeriksa dua kondisi untuk menutup popup:
    // 1. Klik terjadi di LUAR area popup (bukan elemen turunan popup).
    // 2. Target klik BUKAN elemen pemilihan tahun ('yearSelect').
    // (Check two conditions to close the popup:
    // 1. A click occurs OUTSIDE the popup area (not on a child element of the popup).
    // 2. The target click is NOT the year selection element ('yearSelect').)
    if (!popup.contains(e.target) && e.target !== yearSelect) {
      popup.classList.add('hidden');
      popupVisible = false;
    }
  });

  window.addEventListener('scroll', () => {
    monthPopup.classList.add('hidden');
    popupVisible = false;
  });

  // Listener Navigasi Bulan: Tombol 'Previous Month'
  // (Month Navigation Listener: 'Previous Month' button)
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // Mundur 1 bulan (Go back 1 month)
    renderCalendar();
  });

  // Listener Navigasi Bulan: Tombol 'Next Month'
  // (Month Navigation Listener: 'Next Month' button)
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // Maju 1 bulan (Go forward 1 month)
    renderCalendar();
  });

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      // Mengatur objek tanggal global (currentDate) ke tanggal dan waktu saat ini.
      // Ini akan mengarahkan kalender kembali ke hari ini.
      // (Set the global date object (currentDate) to the current date and time.
      // This will direct the calendar back to today.)
      currentDate = new Date();

      populateYearSelect();
      renderCalendar();
    });
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      // Memperbarui variabel status Mode Gelap global ('isDarkMode')
      // berdasarkan status centang (checked) dari tombol toggle.
      // (Update the global Dark Mode status variable ('isDarkMode')
      // based on the checked status of the toggle switch.)
      isDarkMode = darkModeToggle.checked;

      applyDarkMode();
    });
  }

  // ===========================================================================================================
  // --- 5. FUNGSI UTAMA KALENDER & JAM (MAIN CALENDAR & CLOCK FUNCTIONS) ---
  // ===========================================================================================================

  let clockUpdateId = null;

  /**
   * @description Memperbarui tampilan jam real-time.
   *              (Updates the real-time clock display.)
   */
  function updateClock() {
    // Membuat objek Date saat ini (mengambil waktu dari sistem lokal browser).
    // (Creates the current Date object (takes time from the browser's local system).)
    const now = new Date();

    // Menggunakan selectedLocale untuk format tanggal/waktu dan selectedTimezone untuk waktu
    // (Uses selectedLocale for date/time formatting and selectedTimezone for time)
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: selectedTimezone,
      hour12: true,
    };
    // Memformat objek 'now' menjadi string waktu terlokalisasi.
    // (Formats the 'now' object into a localized time string.)
    const timeString = now.toLocaleTimeString(selectedLocale, options);

    // Menetapkan string waktu ke elemen tampilan jam.
    // (Sets the time string to the clock display element.)
    clockDisplay.textContent = timeString;

    // ---  Fitur Nama Zona Waktu Penuh  ---
    // --- (Full Time Zone Name Feature) ---
    const nameOptions = { timeZone: selectedTimezone, timeZoneName: 'long' };
    const zoneName = now.toLocaleDateString(selectedLocale, nameOptions);
    if (clockZoneName) {
      const parts = zoneName.split(', ');
      clockZoneName.textContent = parts[parts.length - 1];
    }

    // ---  Optimalisasi Pembaruan Jam (requestAnimationFrame) ---
    // --- (Clock Update Optimization (requestAnimationFrame)) ---
    clockUpdateId = requestAnimationFrame(updateClock);
  }

  /**
   * @description Memulai/Menghentikan loop updateClock.
   *              (Starts/Stops the updateClock loop.)
   */
  function startClock() {
    if (clockUpdateId) {
      cancelAnimationFrame(clockUpdateId);
    }
    updateClock();
  }

  /**
   * @description Merender header hari dalam seminggu (Senin, Selasa, dst.) berdasarkan locale dan lebar layar.
   *              (Renders the weekday headers (Mon, Tue, etc.) based on locale and screen width.)
   */
  function renderWeekdays() {
    // Mengosongkan header yang ada
    // (Clears existing headers)
    calendarWeekdays.innerHTML = '';

    // Array untuk menampung elemen header hari
    // (Array to hold day header elements)
    const days = [];

    // Mengambil tanggal saat ini sebagai titik awal.
    // Penggunaan Date.UTC mencegah pergeseran zona waktu browser lokal saat inisialisasi.
    // (Takes the current date as the starting point.
    // Using Date.UTC prevents local browser timezone shifting during initialization.)
    const baseDate = new Date(Date.UTC(2025, 10, 2));

    // Tentukan format nama hari: 'short' (Sen) untuk layar kecil, 'long' (Senin) untuk layar besar
    // (Determine day name format: 'short' (Mon) for small screens, 'long' (Monday) for large screens)
    const weekdayFormat = window.innerWidth <= 784 ? 'short' : 'long';

    // Loop untuk 7 hari, dimulai dari hari Minggu (i=0)
    // (Loop for 7 days, starting from Sunday (i=0))
    for (let i = 0; i < 7; i++) {
      // Buat objek Date baru untuk iterasi saat ini
      // (Create a new Date object for the current iteration)
      const date = new Date(baseDate);

      // Majukan hari sebanyak 'i'
      // (Advance the date by 'i')
      date.setDate(baseDate.getDate() + i);

      // Format nama hari sesuai 'selectedLocale'.
      // Penggunaan timeZone: 'UTC' memastikan nama hari tidak bergeser karena 'selectedTimezone'
      // tetapi tetap terlokalisasi formatnya.
      // (Formats the day name according to 'selectedLocale'.
      // Using timeZone: 'UTC' ensures the day name doesn't shift due to 'selectedTimezone'
      // but remains localized in format.)
      const dayName = date.toLocaleDateString(selectedLocale, {
        weekday: weekdayFormat,
        timeZone: 'UTC',
      });

      // Tambahkan header hari ke array dalam format huruf kapital
      // (Add the day header to the array in uppercase format)
      days.push(`<th>${dayName.toUpperCase()}</th>`);
    }
    // Perbarui header tabel hari kerja
    // (Update the weekday table header)
    calendarWeekdays.innerHTML = days.join('');
  }

  /**
   * @description Merender kisi kalender untuk bulan dan tahun yang saat ini dipilih.
   *              (Renders the calendar grid for the currently selected month and year.)
   */
  function renderCalendar() {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Tanggal 'hari ini': dibuat dengan mengonversi waktu lokal browser ke 'selectedTimezone'.
    // Ini penting agar sorotan 'today' akurat di zona waktu yang dipilih.
    // (Today's date: created by converting the browser's local time to the 'selectedTimezone'.
    // This is crucial for the 'today' highlight to be accurate in the selected timezone.)
    const today = new Date(
      new Date().toLocaleString('en-US', { timeZone: selectedTimezone })
    );

    // Penanda Bulan Saat Ini
    // (Highlight Current Month)
    // Cek apakah kalender menampilkan bulan dan tahun yang sama dengan saat ini.
    // (Check if the calendar displays the same month and year as the current one.)
    const isCurrentMonth =
      today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    // Memperbarui Header Kalender (Tampilan Bulan Tahun)
    // (Update Calendar Header (Month Year Display))
    const headerOptions = {
      month: 'long',
      timeZone: selectedTimezone,
    };

    // Format nama bulan dan tahun sesuai locale dan zona waktu yang dipilih.
    // (Format the month and year name according to the selected locale and timezone.)
    const monthName = currentDate
      .toLocaleDateString(selectedLocale, headerOptions)
      .toUpperCase();

    const suffix_positive = getTrans('year_suffix_m', selectedLocale);
    const suffix_negative = getTrans('year_suffix_sm', selectedLocale);

    let yearDisplay;

    if (currentYear > 0) {
      // Tahun Masehi (1, 2, 3, dst.)
      // (Anno Domini (1, 2, 3, etc.))
      yearDisplay = `${currentYear}${suffix_positive}`;
    } else if (currentYear === 0) {
      // Tahun 0 (setara 1 SM/BCE)
      // (Year 0 (equivalent to 1 BC/BCE))
      yearDisplay = `1${suffix_negative}`;
    } else {
      // Tahun Negatif (-1, -2, dst. setara 2 SM/BCE, 3 SM/BCE, dst.)
      // (Negative Years (-1, -2, etc., equivalent to 2 BC/BCE, 3 BC/BCE, etc.))
      const smYear = Math.abs(currentYear) + 1;
      yearDisplay = `${smYear}${suffix_negative}`;
    }

    const headerText = `${monthName} ${yearDisplay}`;

    monthYearDisplay.textContent = headerText;
    monthYearDisplay.className = isCurrentMonth
      ? 'current-month'
      : 'other-month';

    if (yearSelect) yearSelect.value = currentYear;

    if (todayBtn) {
      todayBtn.style.display = isCurrentMonth ? 'none' : 'block';
    }

    // Hitung hari dalam sebulan (tanggal 1 hingga tanggal terakhir)
    // (Calculate days in month (1st to the last date))

    // Hari pertama dalam seminggu untuk tanggal 1 bulan saat ini (0=Minggu, 1=Senin, dst.)
    // (First day of the week for the 1st of the current month (0=Sunday, 1=Monday, etc.)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Tanggal terakhir bulan saat ini
    // (The last date of the current month)
    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    let date = 1; // Penghitung tanggal untuk kalender (Date counter for the calendar)
    let html = ''; // String untuk menampung HTML tabel kalender (String to hold the HTML calendar table)

    for (let i = 0; i < 6; i++) {
      // Maksimal 6 baris (minggu) (Maximum 6 lines (weeks))
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        // 7 kolom (hari) (7 columns (days))
        let cellContent = '';
        let cellClass = '';

        // Sel kosong: mengisi ruang di baris pertama sebelum tanggal 1
        // (Blank cells: fills the space in the first row before the 1st day)
        if (i === 0 && j < firstDayOfMonth) {
          cellContent = '';
        }
        // Render tanggal: jika penghitung tanggal belum melebihi tanggal terakhir bulan
        // (Render dates: if the date counter has not exceeded the last date of the month)
        else if (date <= lastDateOfMonth) {
          cellContent = date;

          // Cek apakah tanggal sel adalah "hari ini"
          // (Check if the cell date is "today")
          const isToday =
            today.getDate() === date &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

          if (isToday) {
            // Menambahkan kelas CSS untuk menyorot hari ini
            // (Adds a CSS class to highlight today)
            cellClass = 'today';
          }
          date++;
        }

        // Tambahkan sel (kosong/tanggal) ke HTML baris
        // (Adds the cell (blank/date) to the row HTML)
        html += `<td class="${cellClass}" align="right">${cellContent}</td>`;
      }

      html += '</tr>';
      // Hentikan loop (baris) jika semua tanggal sudah dirender
      // (Stops the loop (row) if all dates have been rendered)
      if (date > lastDateOfMonth) {
        break;
      }
    }

    // Menyisipkan HTML yang dihasilkan ke dalam body kalender
    // (Inserts the generated HTML into the calendar body)
    calendarBody.innerHTML = html;

    // Render ulang hari dalam seminggu agar sesuai dengan locale/ukuran layar saat ini
    // (Re-render weekdays to match the current locale/screen size)
    renderWeekdays();
  }

  // --- Penanganan Responsif (Responsive Handling) ---
  window.addEventListener('resize', () => {
    // Debounce: Tunggu sebentar (100ms) setelah resize berhenti sebelum merender ulang
    // (Debounce: Wait a little (100ms) after resize stops before re-rendering)
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      renderWeekdays();
      renderCalendar();
    }, 100);
  });

  // ===========================================================================================================
  // --- 6. PANGGILAN INISIALISASI (INITIALIZATION CALLS) ---
  // ===========================================================================================================

  // Inisialisasi dropdown kontrol (bahasa dan zona waktu)
  // (Initialize control dropdowns (language and timezone))
  populateControls();

  // Render tampilan awal kalender dan jam
  // (Render initial calendar and clock display)
  renderCalendar();
  startClock();

  // Perbarui kalender setiap menit (untuk menangkap perubahan 'today' di tengah malam)
  // (Update calendar every minute (to catch 'today' change at midnight))
  setInterval(renderCalendar, 60000);

  // Set judul halaman
  // (Set page title)
  updatePageTitle();

  // Set label antarmuka (UI)
  // (Set interface labels (UI))
  translateUILabels();

  // Set mode gelap atau mode terang
  // (Set dark mode or light mode)
  applyDarkMode();
});
