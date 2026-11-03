export type Language = 'hi' | 'mr' | 'en';

export const UI_STRINGS: Record<Language, Record<string, string>> = {
  en: {
    app_title: "FixSutra Saathi",
    tagline: "Accessible Indian Repair-Skills & Calling Network",
    landing_badge: "Sarvam AI Hackathon Showcase",
    hero_headline: "Where Master Technicians' Knowledge Becomes Accessible to Everyone",
    hero_sub: "Capture repair wisdom by voice and photo. Empower blind, deaf, and speech-impaired technicians with sensory-guided repair workflows and an AI phone relay.",
    btn_guided_demo: "Launch 3-Minute Live Demo",
    btn_explore: "Explore Knowledge Network",
    
    // Nav
    nav_home: "Home",
    nav_capture: "Capture Repair",
    nav_search: "Knowledge Base",
    nav_learn: "Accessible Learn",
    nav_relay: "Hero Call Relay",
    nav_pathway: "Skill Pathway",
    nav_directory: "Technicians",
    nav_impact: "Impact & E-Waste",
    
    // Accessibility Panel
    a11y_panel_title: "Accessibility Controls",
    a11y_font_size: "Font Size",
    a11y_high_contrast: "High Contrast Theme",
    a11y_reduced_motion: "Reduce Motion",
    a11y_reduce_transparency: "Solid Surfaces (Opaque)",
    a11y_dyslexia_font: "Dyslexia Friendly Font",
    a11y_speech_rate: "Bulbul Speech Pace",
    a11y_voice_speaker: "Relay Speaker Persona",

    // Modes
    mode_blind: "Blind / Low Vision Mode (Voice & Touch)",
    mode_deaf: "Deaf / Hard of Hearing Mode (Visual & Captions)",
    mode_speech: "Speech-Impaired Mode (Tap & Relay)",
    mode_standard: "Standard Interactive Mode",
    
    // Categories
    cat_all: "All Categories",
    cat_pumps: "Water Pumps",
    cat_inverters: "Inverters & UPS",
    cat_appliances: "Household Appliances",

    // Status
    badge_live: "Sarvam Live API",
    badge_mock: "Offline Mock Mode",
    mentor_badge: "Mentor Verified",
    high_voltage: "High Voltage Warning"
  },
  hi: {
    app_title: "फिक्ससूत्र साथी",
    tagline: "सुलभ भारतीय रिपेयर ज्ञान एवं कॉलिंग नेटवर्क",
    landing_badge: "सर्वम एआई हैकाथॉन शोकेस",
    hero_headline: "वरिष्ठ मिस्त्रियों का हुनर अब हर जरूरतमंद के हाथ में",
    hero_sub: "आवाज़ और फोटो से रिपेयर अनुभव सुरक्षित करें। दृष्टिबाधित, मूक-बधिर और दिव्यांग कारीगरों को स्पर्श, ध्वनि और एआई कॉल रिले से आत्मनिर्भर बनाएं।",
    btn_guided_demo: "3-मिनट लाइव डेमो शुरू करें",
    btn_explore: "रिपेयर ज्ञानकोश देखें",

    nav_home: "होम",
    nav_capture: "रिपेयर दर्ज करें",
    nav_search: "ज्ञान नेटवर्क",
    nav_learn: "सुलभ शिक्षा",
    nav_relay: "हीरो कॉल रिले",
    nav_pathway: "कौशल मार्ग",
    nav_directory: "मिस्त्री डायरेक्टरी",
    nav_impact: "इम्पैक्ट व ई-कचरा",

    a11y_panel_title: "सुलभता नियंत्रण (Accessibility)",
    a11y_font_size: "अक्षर आकार (Font Size)",
    a11y_high_contrast: "हाई कंट्रास्ट थीम",
    a11y_reduced_motion: "धीमी गति (Reduce Motion)",
    a11y_reduce_transparency: "पारदर्शिता घटाएं (Solid)",
    a11y_dyslexia_font: "सुलभ डिस्लेक्सिया फॉन्ट",
    a11y_speech_rate: "बुलबुल बोलने की गति",
    a11y_voice_speaker: "रिले वक्ता आवाज़",

    mode_blind: "दृष्टिबाधित मोड (आवाज़ व स्पर्श निर्देश)",
    mode_deaf: "मूक-बधिर मोड (सचित्र व लाइव कैप्शन)",
    mode_speech: "वाक-दिव्यांग मोड (टैप करें व आवाज़ पाएं)",
    mode_standard: "सामान्य इंटरैक्टिव मोड",

    cat_all: "सभी श्रेणियां",
    cat_pumps: "पानी के पंप",
    cat_inverters: "इन्वर्टर व यूपीएस",
    cat_appliances: "घरेलू उपकरण",

    badge_live: "सर्वम लाइव एपीआई",
    badge_mock: "ऑफलाइन मॉक मोड",
    mentor_badge: "मेंटर प्रमाणित",
    high_voltage: "सावधानी: हाई वोल्टेज खतरा"
  },
  mr: {
    app_title: "फिक्ससूत्र साथी",
    tagline: "सुलभ भारतीय दुरुस्ती कौशल्य व कॉलिंग नेटवर्क",
    landing_badge: "सर्वम एआय हॅकाथॉन शोकेस",
    hero_headline: "ज्येष्ठ तंत्रज्ञांचे दुरुस्ती ज्ञान आता सर्वांसाठी उपलब्ध",
    hero_sub: "आवाज आणि फोटोद्वारे दुरुस्ती ज्ञान जतन करा. अंध, मूक आणि कर्णबधिर तंत्रज्ञांना स्पर्श, ध्वनी व एआय कॉल रिलेच्या साहाय्याने सक्षम बनवा.",
    btn_guided_demo: "३-मिनिट लाइव्ह डेमो सुरू करा",
    btn_explore: "दुरुस्ती ज्ञानकोश पहा",

    nav_home: "मुख्यपृष्ठ",
    nav_capture: "दुरुस्ती नोंदवा",
    nav_search: "ज्ञान नेटवर्क",
    nav_learn: "सुलभ शिक्षण",
    nav_relay: "हिरो कॉल रिले",
    nav_pathway: "कौशल्य प्रगती",
    nav_directory: "तंत्रज्ञ यादी",
    nav_impact: "सामाजिक प्रभाव व ई-कचरा",

    a11y_panel_title: "सुलभता नियंत्रणे (Accessibility)",
    a11y_font_size: "फॉन्ट आकार (Font Size)",
    a11y_high_contrast: "हाय कॉन्ट्रास्ट थीम",
    a11y_reduced_motion: "अ‍ॅनिमेशन कमी करा",
    a11y_reduce_transparency: "पारदर्शकता बंद करा",
    a11y_dyslexia_font: "डिस्लेक्सिया-स्नेही फॉन्ट",
    a11y_speech_rate: "बुलबुल बोलण्याचा वेग",
    a11y_voice_speaker: "रिले आवाज पर्याय",

    mode_blind: "अंध तंत्रज्ञ मोड (आवाज व स्पर्श)",
    mode_deaf: "कर्णबधिर मोड (चित्रे व थेट कॅप्शन)",
    mode_speech: "वाचा-अक्षम मोड (टॅप करा व आवाज मिळवा)",
    mode_standard: "प्रमाणित परस्परसंवादी मोड",

    cat_all: "सर्व प्रकार",
    cat_pumps: "पाण्याचे पंप",
    cat_inverters: "इन्व्हर्टर व बॅटरी",
    cat_appliances: "घरगुती उपकरणे",

    badge_live: "सर्वम लाइव्ह एपीआय",
    badge_mock: "ऑफलाइन मॉक मोड",
    mentor_badge: "मेंटर प्रमाणित",
    high_voltage: "धोकादायक: हाय व्होल्टेज"
  }
};
