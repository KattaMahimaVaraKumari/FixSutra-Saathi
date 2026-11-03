export interface LanguageConfig {
  code: string;
  bcp47: string;
  name: string;
  native_name: string;
  script: string;
  stt: boolean;
  tts: boolean;
  translate: boolean;
  fully_supported: boolean;
  dir: 'ltr' | 'rtl';
  voice_persona: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'hi',
    bcp47: 'hi-IN',
    name: 'Hindi',
    native_name: 'हिन्दी',
    script: 'Devanagari',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: true,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'mr',
    bcp47: 'mr-IN',
    name: 'Marathi',
    native_name: 'मराठी',
    script: 'Devanagari',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: true,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'en',
    bcp47: 'en-IN',
    name: 'English (India)',
    native_name: 'English',
    script: 'Latin',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: true,
    dir: 'ltr',
    voice_persona: 'simran_en_customer'
  },
  {
    code: 'bn',
    bcp47: 'bn-IN',
    name: 'Bengali',
    native_name: 'বাংলা',
    script: 'Bengali',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'ta',
    bcp47: 'ta-IN',
    name: 'Tamil',
    native_name: 'தமிழ்',
    script: 'Tamil',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'te',
    bcp47: 'te-IN',
    name: 'Telugu',
    native_name: 'తెలుగు',
    script: 'Telugu',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'gu',
    bcp47: 'gu-IN',
    name: 'Gujarati',
    native_name: 'ગુજરાતી',
    script: 'Gujarati',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'kn',
    bcp47: 'kn-IN',
    name: 'Kannada',
    native_name: 'ಕನ್ನಡ',
    script: 'Kannada',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'ml',
    bcp47: 'ml-IN',
    name: 'Malayalam',
    native_name: 'മലയാളം',
    script: 'Malayalam',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'pa',
    bcp47: 'pa-IN',
    name: 'Punjabi',
    native_name: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'od',
    bcp47: 'od-IN',
    name: 'Odia',
    native_name: 'ଓଡ଼ିଆ',
    script: 'Odia',
    stt: true,
    tts: true,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'as',
    bcp47: 'as-IN',
    name: 'Assamese',
    native_name: 'অসমীয়া',
    script: 'Bengali',
    stt: true,
    tts: false,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'ur',
    bcp47: 'ur-IN',
    name: 'Urdu',
    native_name: 'اردو',
    script: 'Nastaliq',
    stt: true,
    tts: false,
    translate: true,
    fully_supported: false,
    dir: 'rtl',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'ne',
    bcp47: 'ne-IN',
    name: 'Nepali',
    native_name: 'नेपाली',
    script: 'Devanagari',
    stt: true,
    tts: false,
    translate: true,
    fully_supported: false,
    dir: 'ltr',
    voice_persona: 'shubh_enhi_ads'
  },
  {
    code: 'ks',
    bcp47: 'ks-IN',
    name: 'Kashmiri',
    native_name: 'کٲشُر',
    script: 'Perso-Arabic',
    stt: true,
    tts: false,
    translate: true,
    fully_supported: false,
    dir: 'rtl',
    voice_persona: 'shubh_enhi_ads'
  }
];

export function getLanguage(code: string): LanguageConfig {
  return LANGUAGES.find(l => l.code === code || l.bcp47 === code) || LANGUAGES[0];
}
