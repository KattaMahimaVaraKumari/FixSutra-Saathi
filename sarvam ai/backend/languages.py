"""
Central Sarvam AI supported languages configuration.
Exact BCP-47 codes directly from official Sarvam documentation.
"""
from typing import List, Dict, Any

LANGUAGES: List[Dict[str, Any]] = [
    {
        "code": "hi",
        "bcp47": "hi-IN",
        "name": "Hindi",
        "native_name": "हिन्दी",
        "script": "Devanagari",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": True,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "mr",
        "bcp47": "mr-IN",
        "name": "Marathi",
        "native_name": "मराठी",
        "script": "Devanagari",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": True,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "en",
        "bcp47": "en-IN",
        "name": "English (India)",
        "native_name": "English",
        "script": "Latin",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": True,
        "dir": "ltr",
        "voice_persona": "simran_en_customer"
    },
    {
        "code": "bn",
        "bcp47": "bn-IN",
        "name": "Bengali",
        "native_name": "বাংলা",
        "script": "Bengali",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "ta",
        "bcp47": "ta-IN",
        "name": "Tamil",
        "native_name": "தமிழ்",
        "script": "Tamil",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "te",
        "bcp47": "te-IN",
        "name": "Telugu",
        "native_name": "తెలుగు",
        "script": "Telugu",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "gu",
        "bcp47": "gu-IN",
        "name": "Gujarati",
        "native_name": "ગુજરાતી",
        "script": "Gujarati",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "kn",
        "bcp47": "kn-IN",
        "name": "Kannada",
        "native_name": "ಕನ್ನಡ",
        "script": "Kannada",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "ml",
        "bcp47": "ml-IN",
        "name": "Malayalam",
        "native_name": "മലയാളം",
        "script": "Malayalam",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "pa",
        "bcp47": "pa-IN",
        "name": "Punjabi",
        "native_name": "ਪੰਜਾਬੀ",
        "script": "Gurmukhi",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "od",
        "bcp47": "od-IN",
        "name": "Odia",
        "native_name": "ଓଡ଼ିଆ",
        "script": "Odia",
        "stt": True,
        "tts": True,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "as",
        "bcp47": "as-IN",
        "name": "Assamese",
        "native_name": "অসমীয়া",
        "script": "Bengali",
        "stt": True,
        "tts": False,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "ur",
        "bcp47": "ur-IN",
        "name": "Urdu",
        "native_name": "اردو",
        "script": "Nastaliq",
        "stt": True,
        "tts": False,
        "translate": True,
        "fully_supported": False,
        "dir": "rtl",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "ne",
        "bcp47": "ne-IN",
        "name": "Nepali",
        "native_name": "नेपाली",
        "script": "Devanagari",
        "stt": True,
        "tts": False,
        "translate": True,
        "fully_supported": False,
        "dir": "ltr",
        "voice_persona": "shubh_enhi_ads"
    },
    {
        "code": "ks",
        "bcp47": "ks-IN",
        "name": "Kashmiri",
        "native_name": "کٲشُر",
        "script": "Perso-Arabic",
        "stt": True,
        "tts": False,
        "translate": True,
        "fully_supported": False,
        "dir": "rtl",
        "voice_persona": "shubh_enhi_ads"
    }
]

def get_language_config(code: str) -> Dict[str, Any]:
    for l in LANGUAGES:
        if l["code"] == code or l["bcp47"] == code:
            return l
    return LANGUAGES[0] # Default Hindi
