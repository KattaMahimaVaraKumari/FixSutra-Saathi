import { create } from 'zustand';
import { LANGUAGES, LanguageConfig, getLanguage } from './languages';

interface LanguageState {
  currentLang: string; // e.g. 'hi'
  languageConfig: LanguageConfig;
  hasSelectedLanguage: boolean;
  showLanguageModal: boolean;
  
  // Exact Sarvam AI codes
  sttLanguageCode: string;
  ttsLanguageCode: string;
  translateLanguageCode: string;
  voicePersona: string;

  setLanguage: (code: string) => void;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
}

const SAVED_LANG = localStorage.getItem('fixsutra_language') || 'hi';
const HAS_SELECTED = localStorage.getItem('fixsutra_has_selected_lang') === 'true';

const initialConfig = getLanguage(SAVED_LANG);

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLang: initialConfig.code,
  languageConfig: initialConfig,
  hasSelectedLanguage: HAS_SELECTED,
  showLanguageModal: !HAS_SELECTED,
  
  sttLanguageCode: initialConfig.bcp47,
  ttsLanguageCode: initialConfig.bcp47,
  translateLanguageCode: initialConfig.bcp47,
  voicePersona: initialConfig.voice_persona,

  setLanguage: (code: string) => {
    const config = getLanguage(code);
    localStorage.setItem('fixsutra_language', config.code);
    localStorage.setItem('fixsutra_has_selected_lang', 'true');
    
    // Set document HTML lang and dir attribute
    document.documentElement.lang = config.code;
    document.documentElement.dir = config.dir;

    set({
      currentLang: config.code,
      languageConfig: config,
      hasSelectedLanguage: true,
      showLanguageModal: false,
      sttLanguageCode: config.bcp47,
      ttsLanguageCode: config.bcp47,
      translateLanguageCode: config.bcp47,
      voicePersona: config.voice_persona
    });
  },

  openLanguageModal: () => set({ showLanguageModal: true }),
  closeLanguageModal: () => set({ showLanguageModal: false })
}));
