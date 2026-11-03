> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Text Processing Overview

> Complete overview of Sarvam AI Text Processing APIs including translation, transliteration, and language identification for 22+ Indian languages using Mayura and Sarvam-Translate models.

Sarvam AI offers text translation and transliteration models for short text. For whole documents (PDF, Word, and more), use the [Document Translation API](/api/api-guides-tutorials/doc-translation/overview).

#### [Sarvam-Translate](/api/api-guides-tutorials/models/sarvam-translate)

Translation model that supports all 22 official Indian languages and
is optimized for structured, long-form text.

#### [Mayura](/api/api-guides-tutorials/models/mayura)

Advanced text processing model with translation, transliteration, and
script conversion capabilities for Indian languages.

> **Warning**
>
> Use the [Sarvam translate skill](https://github.com/sarvamai/skills/tree/main/translate) to generate correct translation code from your AI coding assistant:
>
> ```bash
> npx skills add sarvamai/skills --skill translate
> ```
>
> See [Agent Skills](/api/developer-tools/agent-skills) for the full list.

## Sarvam-Translate

Sarvam Translate enables high-quality translation between English and
22 scheduled Indian languages and is optimized for structured, long-form text.

## Text Processing Features

#### Basic Translation

### Basic Text Translation

Translate structured, long-form text between Indian languages. Features include:

* Support for all 22 scheduled Indian languages
* Formal Style Translation
* Numeral Format Control between international and native numeral systems

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.text.translate(
    input="भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    source_language_code="hi-IN",
    target_language_code="gu-IN",
    model="sarvam-translate:v1"
)
print(response)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.text.translate({
    input: "भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    source_language_code: "hi-IN",
    target_language_code: "gu-IN",
    model: "sarvam-translate:v1"
});

console.log(response);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/translate \
  -H "Content-Type: application/json" \
  -H "api-subscription-key: YOUR_SARVAM_API_KEY" \
  -d '{
    "input": "भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    "source_language_code": "hi-IN",
    "target_language_code": "gu-IN",
    "model": "sarvam-translate:v1"
  }'
```

#### Advanced Options

### Advanced Text Processing

Fine-tune text processing with various parameters:

* Formal Style Translation
* Choose between Male and Female voice characteristics for gender-specific translations
* Option to choose between international and native numeral systems

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.text.translate(
    input="भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    source_language_code="hi-IN",
    target_language_code="gu-IN",
    model="sarvam-translate:v1",
    speaker_gender="Male",
    mode="formal"
)
print(response)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.text.translate({
    input: "भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    source_language_code: "hi-IN",
    target_language_code: "gu-IN",
    model: "sarvam-translate:v1",
    speaker_gender: "Male",
    mode: "formal"
});

console.log(response);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/translate \
  -H "Content-Type: application/json" \
  -H "api-subscription-key: YOUR_SARVAM_API_KEY" \
  -d '{
    "input": "भारत एक महान देश है। इसकी संस्कृति बहुत पुरानी और समृद्ध है।",
    "source_language_code": "hi-IN",
    "target_language_code": "gu-IN",
    "model": "sarvam-translate:v1",
    "speaker_gender": "Male",
    "mode": "formal"
  }'
```

> **Note**
>
> Check out our detailed [API Reference](/api-reference/text/translate-text)
> to explore Translation and all available options.

## Mayura: Our Text Processing Model

Mayura is our state-of-the-art text processing model that excels in handling Indian languages with features like translation, transliteration, and script conversion.

## Text Processing Features

#### Basic Translation

### Basic Text Translation

Translate text between Indian languages with high accuracy. Features include:

* Support for multiple Indian languages
* Automatic language detection
* Natural and fluent translations
* Context-aware processing

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)

response = client.text.translate(
    input="Hello, how are you?",
    source_language_code="auto",
    target_language_code="hi-IN",
    speaker_gender="Male"
)

print(response)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.text.translate({
    input: "Hello, how are you?",
    source_language_code: "auto",
    target_language_code: "hi-IN",
    speaker_gender: "Male"
});

console.log(response);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/translate \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Hello, how are you?",
    "source_language_code": "auto",
    "target_language_code": "hi-IN",
    "speaker_gender": "Male"
  }'
```

#### Advanced Options

### Advanced Text Processing

Fine-tune text processing with various parameters:

* Translation modes (formal, modern-colloquial, classic-colloquial, code-mixed)
* Mixed language handling

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY"
)

response = client.text.translate(
    input="Welcome to Sarvam AI!",
    source_language_code="en-IN",
    target_language_code="hi-IN",
    model="mayura:v1",
    mode="modern-colloquial"
)

print(response.translated_text)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.text.translate({
    input: "Welcome to Sarvam AI!",
    source_language_code: "en-IN",
    target_language_code: "hi-IN",
    model: "mayura:v1",
    mode: "modern-colloquial"
});

console.log(response.translatedText);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/translate \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Welcome to Sarvam AI!",
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "model": "mayura:v1",
    "mode": "modern-colloquial"
  }'
```

#### Key Considerations

* Maximum text length: 1000 characters per request (`mayura:v1`) / 2000 characters per request (`sarvam-translate:v1`)
* Supports 10 Indic Languages and English
* Automatic language detection available
* Translation modes: formal (default), modern-colloquial, classic-colloquial, code-mixed

## Limits

| Limit                           | Value                                                                     |
| ------------------------------- | ------------------------------------------------------------------------- |
| Translate: max input length     | 1,000 characters (`mayura:v1`) / 2,000 characters (`sarvam-translate:v1`) |
| Transliterate: max input length | 1,000 characters per request                                              |
| Rate limits                     | See [Rate Limits](/api/getting-started/pricing#rate-limits)               |

> **Note**
>
> Check out our detailed [API Reference](/api-reference/text/translate-text)
> to explore Translation and all available options.