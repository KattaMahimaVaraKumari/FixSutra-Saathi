> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Voices

> Listen to every Sarvam AI text-to-speech voice before you choose. Bulbul v4 Flash is the latest model; this page lists the v4 catalog plus Bulbul v3 audio previews.

Listen to every voice before you pick one for your product. Each sample below reads the same expressive line, **"वाह, यह तो कमाल है! Sarvam AI के साथ अपनी भाषा में बात करना अब बहुत आसान हो गया है।"** ("Wow, this is amazing! Talking in your own language with Sarvam AI has become so easy now."), so you can compare voices directly and hear how each one handles natural emotion and prosody. Use the `speaker` parameter to select any of these in your API calls; see [How to change the speaker voice](/api/api-guides-tutorials/text-to-speech/how-to/change-the-speaker-voice) for code samples.

> **Note**
>
> Want to test your own text? Head to [indus.sarvam.ai](https://indus.sarvam.ai/api-playground/text-to-speech?ref=docs) to generate live previews with custom input.

> **Tip**
>
> Not sure which voice to pick? [Bulbul v4 Flash best practices](/api/api-guides-tutorials/text-to-speech/best-practices#recommended-voices-by-use-case) lists expert-ranked personas for English and Hindi by use case.

> **Tip**
>
> Need a voice that isn't in this list? The [Instant Voice Cloning API](/api/api-guides-tutorials/voice-cloning/overview) (beta) generates speech in a cloned voice from a short reference clip, or in a saved voice via `voice_id` — usable from the same SDK alongside these speakers.

---

## Bulbul v4 Flash Voices

`bulbul:v4-flash` uses the same request and response contract as `bulbul:v3`: pass `model="bulbul:v4-flash"` with one of the `speaker` values below (or omit `speaker` to use the default persona **`shubh_enhi_ads`**). The catalog is organized by persona rather than a flat name list. Most voice IDs follow `<name>_<language>_<style>` (for example `ishita_hi_devotional`, `simran_en_customer`). The middle token is a short language tag (`hi`, `en`, `bn`, …) or **`enhi`** for English–Hindi code-mixed personas.

> **Note**
>
> **Languages in this catalog (222 voices):** Hindi, English, English–Hindi (`enhi`), Bengali, Gujarati, Kannada, Marathi, Punjabi, Tamil, and Telugu — mapped at request time with the usual BCP-47 `language_code` values (`hi-IN`, `en-IN`, and so on). **Bulbul v3** still covers the full [11-language set](#hear-voices-across-languages) (including Malayalam and Odia); v4 Flash personas are not offered for every v3 language yet.

> **Note**
>
> Speaker names are case-sensitive and must be lowercase, exactly as shown in the tables below.

### Featured voices

Start here if you are unsure which persona to pick. These 11 voices are hand-picked for the most common production use cases. Filter by use case, copy the exact `speaker` value, or grab a ready-to-run snippet.

> **Tip**
>
> Audio previews for `bulbul:v4-flash` voices are not available on this page yet. Generate a live preview from [indus.sarvam.ai](https://indus.sarvam.ai/api-playground/text-to-speech?ref=docs) or with a quick API call using the `speaker` value from the cards above or the tables below.

### All v4 Flash voices

#### Hindi (hi-IN) (116 voices)

| Voice ID                       | Speaker  | Style               |
| ------------------------------ | -------- | ------------------- |
| `aayan_hi_conversational`      | Aayan    | conversational      |
| `amit_hi_conversational`       | Amit     | conversational      |
| `ashutosh_hi_conversational`   | Ashutosh | conversational      |
| `kabir_hi_conversational`      | Kabir    | conversational      |
| `kavya_hi_conversational`      | Kavya    | conversational      |
| `manan_hi_conversational`      | Manan    | conversational      |
| `rahul_hi_conversational`      | Rahul    | conversational      |
| `sumit_hi_conversational`      | Sumit    | conversational      |
| `aditya_hi_conversational`     | Aditya   | conversational      |
| `aditya_hi_sales`              | Aditya   | sales               |
| `anand_hi_documentary`         | Anand    | documentary         |
| `anand_hi_news`                | Anand    | news                |
| `aparna_hi_customer`           | Aparna   | customer            |
| `aparna_hi_kyc`                | Aparna   | kyc                 |
| `ashok_hi_character`           | Ashok    | character           |
| `ashok_hi_news`                | Ashok    | news                |
| `chhavi_hi_kids`               | Chhavi   | kids                |
| `ishita_hi_ads`                | Ishita   | ads                 |
| `ishita_hi_edtech`             | Ishita   | edtech              |
| `ishita_hi_banking`            | Ishita   | banking             |
| `ishita_hi_ads_informal`       | Ishita   | ads informal        |
| `ishita_hi_devotional`         | Ishita   | devotional          |
| `ishita_hi_numbers`            | Ishita   | numbers             |
| `ishita_hi_social`             | Ishita   | social              |
| `kunal_hi_kids`                | Kunal    | kids                |
| `mahesh_hi_documentary`        | Mahesh   | documentary         |
| `mani_hi_devotional`           | Mani     | devotional          |
| `mani_hi_conversational`       | Mani     | conversational      |
| `mohit_hi_conversational`      | Mohit    | conversational      |
| `nachiket_hi_devotional`       | Nachiket | devotional          |
| `priya_hi_recovery`            | Priya    | recovery            |
| `ratan_hi_latenight`           | Ratan    | latenight           |
| `ratan_hi_customer_expressive` | Ratan    | customer expressive |
| `ratan_hi_documentary`         | Ratan    | documentary         |
| `ratan_hi_devotional`          | Ratan    | devotional          |
| `ratan_hi_recovery`            | Ratan    | recovery            |
| `ratan_hi_social`              | Ratan    | social              |
| `ratan_hi_sports`              | Ratan    | sports              |
| `ratan_hi_latenight_warm`      | Ratan    | latenight warm      |
| `rehan_hi_social`              | Rehan    | social              |
| `ritu_hi_customer_utility`     | Ritu     | customer utility    |
| `ritu_hi_kids`                 | Ritu     | kids                |
| `ritu_hi_conversation`         | Ritu     | conversation        |
| `ritu_hi_customer`             | Ritu     | customer            |
| `ritu_hi_edtech`               | Ritu     | edtech              |
| `ritu_hi_ads_formal`           | Ritu     | ads formal          |
| `ritu_hi_banking`              | Ritu     | banking             |
| `ritu_hi_ads_informal`         | Ritu     | ads informal        |
| `ritu_hi_insurance`            | Ritu     | insurance           |
| `ritu_hi_edtech_bot`           | Ritu     | edtech bot          |
| `ritu_hi_medical`              | Ritu     | medical             |
| `ritu_hi_sales`                | Ritu     | sales               |
| `ritu_hi_reels`                | Ritu     | reels               |
| `ritu_hi_social`               | Ritu     | social              |
| `ritu_hi_customer_warm`        | Ritu     | customer warm       |
| `ritu_hi_social_lively`        | Ritu     | social lively       |
| `roopa_hi_companion`           | Roopa    | companion           |
| `roopa_hi_narration`           | Roopa    | narration           |
| `roopa_hi_recovery`            | Roopa    | recovery            |
| `roopa_hi_market`              | Roopa    | market              |
| `roopa_hi_conversational`      | Roopa    | conversational      |
| `sanchita_hi_assistant`        | Sanchita | assistant           |
| `sanchita_hi_edtech`           | Sanchita | edtech              |
| `sanchita_hi_banking`          | Sanchita | banking             |
| `sanchita_hi_feedback`         | Sanchita | feedback            |
| `sanchita_hi_ads_formal`       | Sanchita | ads formal          |
| `sanchita_hi_ads_informal`     | Sanchita | ads informal        |
| `sanchita_hi_interview`        | Sanchita | interview           |
| `sanchita_hi_romantic`         | Sanchita | romantic            |
| `sanchita_hi_market`           | Sanchita | market              |
| `sanchita_hi_social`           | Sanchita | social              |
| `sanchita_hi_kyc`              | Sanchita | kyc                 |
| `sarika_hi_conversation`       | Sarika   | conversation        |
| `shalini_hi_companion`         | Shalini  | companion           |
| `shalini_hi_social`            | Shalini  | social              |
| `shreya_hi_conversational`     | Shreya   | conversational      |
| `shreya_hi_news`               | Shreya   | news                |
| `shruti_hi_edtech`             | Shruti   | edtech              |
| `shubh_hi_customer`            | Shubh    | customer            |
| `shubh_hi_ecomm`               | Shubh    | ecomm               |
| `shubh_hi_stories_mixed`       | Shubh    | stories mixed       |
| `shubh_hi_devotional`          | Shubh    | devotional          |
| `shubh_hi_ads`                 | Shubh    | ads                 |
| `shubh_hi_recovery`            | Shubh    | recovery            |
| `shubh_hi_stories_dramatic`    | Shubh    | stories dramatic    |
| `simran_hi_assistant`          | Simran   | assistant           |
| `simran_hi_narration`          | Simran   | narration           |
| `simran_hi_automobile`         | Simran   | automobile          |
| `simran_hi_conversation`       | Simran   | conversation        |
| `simran_hi_news_breaking`      | Simran   | news breaking       |
| `simran_hi_social_energetic`   | Simran   | social energetic    |
| `simran_hi_social_excited`     | Simran   | social excited      |
| `simran_hi_latenight`          | Simran   | latenight           |
| `simran_hi_news`               | Simran   | news                |
| `simran_hi_recovery`           | Simran   | recovery            |
| `simran_hi_sales`              | Simran   | sales               |
| `suchitra_hi_ecomm`            | Suchitra | ecomm               |
| `suhani_hi_social`             | Suhani   | social              |
| `sunny_hi_ads`                 | Sunny    | ads                 |
| `sunny_hi_reels`               | Sunny    | reels               |
| `tarun_hi_conversational`      | Tarun    | conversational      |
| `tarun_hi_sales`               | Tarun    | sales               |
| `chaitra_hi_customer`          | Chaitra  | customer            |
| `shilpa_hi_narration`          | Shilpa   | narration           |
| `tanya_hi_narration`           | Tanya    | narration           |
| `aarti_hi_customer`            | Aarti    | customer            |
| `advait_hi_character`          | Advait   | character           |
| `aryaman_hi_ads`               | Aryaman  | ads                 |
| `chirag_hi_social`             | Chirag   | social              |
| `girish_hi_devotional`         | Girish   | devotional          |
| `mukul_hi_ads`                 | Mukul    | ads                 |
| `mukul_hi_suspense`            | Mukul    | suspense            |
| `suman_hi_companion`           | Suman    | companion           |
| `vaibhav_hi_social`            | Vaibhav  | social              |
| `vandana_hi_ecomm`             | Vandana  | ecomm               |
| `vipul_hi_social`              | Vipul    | social              |

#### English (en-IN) (62 voices)

| Voice ID                     | Speaker   | Style            |
| ---------------------------- | --------- | ---------------- |
| `aditi_en_stories`           | Aditi     | stories          |
| `aparna_en_companion`        | Aparna    | companion        |
| `aparna_en_edtech`           | Aparna    | edtech           |
| `ashwin_en_sports`           | Ashwin    | sports           |
| `ashwin_en_sports_energetic` | Ashwin    | sports energetic |
| `chandrika_en_stories`       | Chandrika | stories          |
| `dev_en_recovery`            | Dev       | recovery         |
| `dev_en_conversational`      | Dev       | conversational   |
| `deven_en_conversation`      | Deven     | conversation     |
| `ishita_en_customer`         | Ishita    | customer         |
| `ishita_en_medical`          | Ishita    | medical          |
| `ishita_en_numbers`          | Ishita    | numbers          |
| `ishita_en_social`           | Ishita    | social           |
| `ishita_en_stories`          | Ishita    | stories          |
| `kalpit_en_edtech`           | Kalpit    | edtech           |
| `nachiket_en_ads`            | Nachiket  | ads              |
| `neha_en_customer`           | Neha      | customer         |
| `neha_en_latenight`          | Neha      | latenight        |
| `nupur_en_kids`              | Nupur     | kids             |
| `ojas_en_social`             | Ojas      | social           |
| `ritu_en_edtech`             | Ritu      | edtech           |
| `ritu_en_latenight`          | Ritu      | latenight        |
| `ritu_en_medical`            | Ritu      | medical          |
| `ritu_en_reels`              | Ritu      | reels            |
| `rohan_en_recovery`          | Rohan     | recovery         |
| `roopa_en_conversational`    | Roopa     | conversational   |
| `rustom_en_suspense`         | Rustom    | suspense         |
| `sanchita_en_companion`      | Sanchita  | companion        |
| `sanchita_en_insurance`      | Sanchita  | insurance        |
| `sanchita_en_recovery`       | Sanchita  | recovery         |
| `sanchita_en_market`         | Sanchita  | market           |
| `sanchita_en_social`         | Sanchita  | social           |
| `shabana_en_edtech`          | Shabana   | edtech           |
| `shalini_en_companion`       | Shalini   | companion        |
| `shalini_en_customer`        | Shalini   | customer         |
| `shubh_en_narration`         | Shubh     | narration        |
| `shubh_en_numbers`           | Shubh     | numbers          |
| `shubh_en_ads`               | Shubh     | ads              |
| `shubh_en_recovery`          | Shubh     | recovery         |
| `shubh_en_audiobook`         | Shubh     | audiobook        |
| `shubh_en_narration_gentle`  | Shubh     | narration gentle |
| `shubh_en_sports`            | Shubh     | sports           |
| `simran_en_narration`        | Simran    | narration        |
| `simran_en_automobile`       | Simran    | automobile       |
| `simran_en_conversation`     | Simran    | conversation     |
| `simran_en_customer`         | Simran    | customer         |
| `simran_en_edtech`           | Simran    | edtech           |
| `simran_en_edtech_bot`       | Simran    | edtech bot       |
| `simran_en_sales`            | Simran    | sales            |
| `simran_en_recovery`         | Simran    | recovery         |
| `simran_en_ads`              | Simran    | ads              |
| `simran_en_therapist`        | Simran    | therapist        |
| `sunny_en_social`            | Sunny     | social           |
| `varun_en_ads`               | Varun     | ads              |
| `varun_en_suspense`          | Varun     | suspense         |
| `zarina_en_conversation`     | Zarina    | conversation     |
| `amelia_en_conversational`   | Amelia    | conversational   |
| `sophia_en_conversational`   | Sophia    | conversational   |
| `girish_en_documentary`      | Girish    | documentary      |
| `girish_en_devotional`       | Girish    | devotional       |
| `payal_en_edtech`            | Payal     | edtech           |
| `sarang_en_narration`        | Sarang    | narration        |

#### Hindi-English Code-Mixed (13 voices)

| Voice ID                          | Speaker  | Style               |
| --------------------------------- | -------- | ------------------- |
| `ishita_enhi_companion`           | Ishita   | companion           |
| `ishita_enhi_customer`            | Ishita   | customer            |
| `ishita_enhi_customer_expressive` | Ishita   | customer expressive |
| `sanchita_enhi_companion`         | Sanchita | companion           |
| `shalini_enhi_companion`          | Shalini  | companion           |
| `shalini_enhi_customer`           | Shalini  | customer            |
| `shubh_enhi_companion`            | Shubh    | companion           |
| `shubh_enhi_ads`                  | Shubh    | ads                 |
| `shubh_enhi_banking`              | Shubh    | banking             |
| `simran_enhi_companion`           | Simran   | companion           |
| `simran_enhi_customer`            | Simran   | customer            |
| `simran_enhi_banking_expressive`  | Simran   | banking expressive  |
| `sunny_enhi_customer`             | Sunny    | customer            |

#### Marathi (mr-IN) (9 voices)

| Voice ID                   | Speaker | Style          |
| -------------------------- | ------- | -------------- |
| `ishita_mr_conversational` | Ishita  | conversational |
| `mrunal_mr_narration`      | Mrunal  | narration      |
| `neha_mr_narration`        | Neha    | narration      |
| `nilesh_mr_conversation`   | Nilesh  | conversation   |
| `ritu_mr_insurance`        | Ritu    | insurance      |
| `ritu_mr_narration`        | Ritu    | narration      |
| `rupali_mr_stories`        | Rupali  | stories        |
| `soham_mr_narration`       | Soham   | narration      |
| `mukul_mr_stories`         | Mukul   | stories        |

#### Kannada (kn-IN) (4 voices)

| Voice ID                  | Speaker  | Style        |
| ------------------------- | -------- | ------------ |
| `chaitra_kn_conversation` | Chaitra  | conversation |
| `chaitra_kn_narration`    | Chaitra  | narration    |
| `chetan_kn_conversation`  | Chetan   | conversation |
| `suchitra_kn_narration`   | Suchitra | narration    |

#### Punjabi (pa-IN) (4 voices)

| Voice ID                | Speaker  | Style        |
| ----------------------- | -------- | ------------ |
| `anand_pa_conversation` | Anand    | conversation |
| `anand_pa_customer`     | Anand    | customer     |
| `harpreet_pa_narration` | Harpreet | narration    |
| `jaspal_pa_banking`     | Jaspal   | banking      |

#### Tamil (ta-IN) (4 voices)

| Voice ID              | Speaker | Style     |
| --------------------- | ------- | --------- |
| `aravind_ta_ads`      | Aravind | ads       |
| `aravind_ta_suspense` | Aravind | suspense  |
| `gokul_ta_narration`  | Gokul   | narration |
| `vijay_ta_narration`  | Vijay   | narration |

#### Telugu (te-IN) (4 voices)

| Voice ID                  | Speaker | Style        |
| ------------------------- | ------- | ------------ |
| `kavitha_te_conversation` | Kavitha | conversation |
| `kavitha_te_narration`    | Kavitha | narration    |
| `pooja_te_conversation`   | Pooja   | conversation |
| `tarun_te_narration`      | Tarun   | narration    |

#### Gujarati (gu-IN) (3 voices)

| Voice ID                  | Speaker | Style          |
| ------------------------- | ------- | -------------- |
| `bhavik_gu_conversation`  | Bhavik  | conversation   |
| `pooja_gu_conversational` | Pooja   | conversational |
| `pooja_gu_customer`       | Pooja   | customer       |

#### Bengali (bn-IN) (3 voices)

| Voice ID                  | Speaker | Style          |
| ------------------------- | ------- | -------------- |
| `arnab_bn_conversation`   | Arnab   | conversation   |
| `roopa_bn_conversational` | Roopa   | conversational |
| `bimal_bn_suspense`       | Bimal   | suspense       |

---

## Bulbul v3 Male Voices

> **Note**
>
> Speaker names are case-sensitive and must be lowercase (e.g., `shubh`, not `Shubh`).

> **Warning**
>
> **varun** produces a deep, dramatic tone suited to suspense or villain characters. It is not recommended as a neutral default and should be reserved for thriller, drama, or suspense use cases.

## Bulbul v3 Female Voices

All voices are optimized for natural conversations and high-quality audio output.

[Learn more about Bulbul v3 →](/api/api-guides-tutorials/models/bulbul)

---

## Hear Voices Across Languages

Bulbul v3 supports 11 languages, and voice quality varies by language. Below, two of our top-rated speakers, **shubh** (male) and **ishita** (female), read the same localized line in each supported language, translated with [Sarvam Translate](/api/api-guides-tutorials/text-processing/translation).

English · en-IN

shubh (male)

ishita (female)

Hindi · hi-IN

shubh (male)

ishita (female)

Bengali · bn-IN

shubh (male)

ishita (female)

Tamil · ta-IN

shubh (male)

ishita (female)

Telugu · te-IN

shubh (male)

ishita (female)

Kannada · kn-IN

shubh (male)

ishita (female)

Malayalam · ml-IN

shubh (male)

ishita (female)

Marathi · mr-IN

shubh (male)

ishita (female)

Gujarati · gu-IN

shubh (male)

ishita (female)

Punjabi · pa-IN

shubh (male)

ishita (female)

Odia · od-IN

shubh (male)

ishita (female)

> **Tip**
>
> For **v4 Flash**, start from the [use-case voice rankings](/api/api-guides-tutorials/text-to-speech/best-practices#recommended-voices-by-use-case). For **v3** short names, see [Bulbul v3 best practices](/api/api-guides-tutorials/text-to-speech/bulbul-v3-best-practices#speaker-selection-by-language).

---

## Generate Your Own Sample

#### Python

```python
from sarvamai import SarvamAI
from sarvamai.play import save

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

audio = client.text_to_speech.convert(
    text="वाह, यह तो कमाल है! Sarvam AI के साथ अपनी भाषा में बात करना अब बहुत आसान हो गया है।",
    model="bulbul:v4-flash",
    language_code="hi-IN",
    speaker="ishita_hi_ads"
)
save(audio, "preview.wav")
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "वाह, यह तो कमाल है! Sarvam AI के साथ अपनी भाषा में बात करना अब बहुत आसान हो गया है।",
    "language_code": "hi-IN",
    "speaker": "ishita_hi_ads",
    "model": "bulbul:v4-flash"
  }'
```

## Next Steps

#### [Change the Speaker Voice](/api/api-guides-tutorials/text-to-speech/how-to/change-the-speaker-voice)

Learn how to set the `speaker` parameter in your API calls.

#### [Best Practice Guide for Bulbul v4 Flash](/api/api-guides-tutorials/text-to-speech/best-practices)

Endpoints, parameters, and voice picks by use case.