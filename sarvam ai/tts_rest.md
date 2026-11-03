> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Text-to-Speech Rest API

> Real-time conversion of text into speech using customizable voices. Instant audio generation with multiple voice options and various audio formats for Indian languages.

Provides a synchronous REST endpoint where a POST request with text returns base64-encoded audio as response.

> **Note**
>
> The JSON response contains an `audios` array of **base64-encoded WAV strings**, not raw binary. Decode before saving or playing:
>
> ```python
> import base64
>
> combined = "".join(response.audios)
> wav_bytes = base64.b64decode(combined)
> with open("output.wav", "wb") as f:
>     f.write(wav_bytes)
> ```
>
> See [TTS best practices](/api/api-guides-tutorials/text-to-speech/best-practices) for JavaScript and streaming examples.

**Common use cases:**

* **Story narration**: Generate expressive audio for audiobooks and narratives
* **Podcast generation**: Create natural-sounding voiceovers for episodes at scale
* **Content creation**: Add voice to blogs, articles, and social media posts
* **E-learning**: Build multilingual course material with clear pronunciation

## What You Can Do

#### 30+ Voices

Pick from male and female speakers, each with distinct tone and style. \

Pass the `speaker` param to switch instantly.

#### 11 Languages (10 Indian + English)

Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and English (Indian accent).
\
Set via `language_code`.

#### Up to 2500 Characters

Send long-form text in a single request (v3). No need to chunk or paginate your input.

#### Pace Control

Speed up or slow down speech with the `pace` parameter, range `0.5` to `2.0` for v3.

#### Flexible Sample Rates

8kHz to 48kHz output. Higher rates (32k, 44.1k, 48k) are available on **REST only** (all Bulbul models; streaming caps at 24kHz). Default: 24kHz.

#### Multiple Audio Formats

Response is base64-encoded. Supports WAV, MP3, Linear16, Mulaw, Alaw, Opus, FLAC, and AAC.

## Models: Bulbul v4 Flash (latest) and Bulbul v3

**Bulbul v4 Flash** is the latest model and the recommended choice for new integrations — 200+ persona voices and the same REST contract as v3. If you omit `speaker` with `model="bulbul:v4-flash"`, the API uses the default persona **`shubh_enhi_ads`**. **Bulbul v3** is purpose-built for Indian languages and accents. It handles code-mixed text (e.g., Hinglish), number normalization, and natural prosody out of the box, with minimal preprocessing needed.

## Text to Speech Features

#### Basic Synthesis

### Basic Text to Speech Synthesis

Convert text to natural-sounding speech with high quality. Features include:

* Multiple voice options
* Support for Indian languages
* Natural prosody and intonation
* High-quality audio output

#### Python

```python
from sarvamai import SarvamAI
from sarvamai.play import save

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")
# Convert text to speech
audio = client.text_to_speech.convert(
    language_code="en-IN",
    text="Welcome to Sarvam AI!",
    model="bulbul:v4-flash",
    speaker="simran_en_customer"
)
save(audio, "output1.wav")
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.textToSpeech.convert({
  text: "Welcome to Sarvam AI!",
  model: "bulbul:v4-flash",
  speaker: "simran_en_customer",
  language_code: "en-IN"
});

const audio = Buffer.from(response.audios.join(""), "base64");
fs.writeFileSync("output.wav", audio);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Sarvam AI!",
    "language_code": "en-IN",
    "speaker": "simran_en_customer",
    "model": "bulbul:v4-flash"
  }'
```

#### Voice Selection

### Available Voices

Choose from 30+ natural-sounding voices for different use cases and languages.

#### Bulbul v3 Voices (30+)

**Male:** Shubh (default), Aditya, Rahul, Rohan, Amit, Dev, Ratan, Varun, Manan, Sumit, Kabir, Aayan, Ashutosh, Advait, Anand, Tarun, Sunny, Mani, Gokul, Vijay, Mohit, Rehan, Soham

**Female:** Ritu, Priya, Neha, Pooja, Simran, Kavya, Ishita, Shreya, Roopa, Tanya, Shruti, Suhani, Kavitha, Rupali

#### Bulbul v2 Voices

**Female:** Anushka (default), Manisha, Vidya, Arya

**Male:** Abhilash, Karun, Hitesh

#### Python

```python
import base64
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.text_to_speech.convert(
    text="Welcome to Sarvam AI!",
    model="bulbul:v4-flash",
    language_code="en-IN",
    speaker="simran_en_customer"
)

with open("output.wav", "wb") as f:
    f.write(base64.b64decode("".join(response.audios)))
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.textToSpeech.convert({
  text: "Hello, how are you?",
  language_code: "hi-IN",
  model: "bulbul:v4-flash",
  speaker: "simran_en_customer"
});

const audio = Buffer.from(response.audios.join(""), "base64");
fs.writeFileSync("output.wav", audio);
```

#### cURL

```bash
# Generate speech with Shubh's voice
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Sarvam AI!",
    "language_code": "en-IN",
    "speaker": "simran_en_customer",
    "model": "bulbul:v4-flash"
  }'

# Generate speech with Priya's voice
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Sarvam AI!",
    "language_code": "en-IN",
    "speaker": "priya",
    "model": "bulbul:v4-flash"
  }'

# Generate speech with Roopa's voice
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Sarvam AI!",
    "language_code": "en-IN",
    "speaker": "roopa",
    "model": "bulbul:v4-flash"
}'
```

#### Advanced Options

### Speech Customization

Fine-tune the speech output with various parameters:

* Adjust speech rate (pace)
* Configure audio quality (sample rate)

#### Python

```python
import base64
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY"
)

audio = client.text_to_speech.convert(
    text="Welcome to Sarvam AI!",
    model="bulbul:v4-flash",
    language_code="en-IN",
    speaker="simran_en_customer",
    pace=1.2,
    speech_sample_rate=24000
)

combined_audio = "".join(audio.audios)
b64_file = base64.b64decode(combined_audio)

with open("output1.wav", "wb") as f:
    f.write(b64_file)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

const response = await client.textToSpeech.convert({
  text: "Welcome to Sarvam AI!",
  model: "bulbul:v4-flash",
  language_code: "en-IN",
  speaker: "simran_en_customer",
  pace: 1.2,
  speech_sample_rate: 24000
});

const audio = Buffer.from(response.audios.join(""), "base64");
fs.writeFileSync("output.wav", audio);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/text-to-speech \
  -H "api-subscription-key: <YOUR_SARVAM_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Sarvam AI!",
    "model": "bulbul:v4-flash",
    "speaker": "simran_en_customer",
    "pace": 1.2,
    "language_code": "en-IN",
    "speech_sample_rate": 24000
  }'
```

## API Response Format

| Field        | Type   | Description                                                           |
| ------------ | ------ | --------------------------------------------------------------------- |
| `request_id` | string | Unique identifier for the request                                     |
| `audios`     | array  | Base64-encoded audio files. Each element corresponds to an input text |

**Supported audio formats:** WAV (default), MP3, Linear16, Mulaw, Alaw, Opus, FLAC, AAC

```json
{
  "request_id": "20241115_12345678-1234-5678-1234-567812345678",
  "audios": [
    "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQAAAAA..."
  ]
}
```

#### Decoding Audio Examples

**Python:**

```python
import base64

audio_base64 = response.audios[0]
audio_bytes = base64.b64decode(audio_base64)

with open("output.wav", "wb") as f:
    f.write(audio_bytes)
```

**JavaScript:**

```javascript
import fs from "fs";

const audioBase64 = response.audios[0];
const audioBuffer = Buffer.from(audioBase64, 'base64');
fs.writeFileSync('output.wav', audioBuffer);
```

## Error Responses

All errors return a JSON object with an `error` field (`message`, `code`, `request_id`). The full error-code table, retry guidance, and SDK exception reference live on the central [Errors & Troubleshooting](/api/getting-started/errors-troubleshooting) page.

Errors specific to this endpoint:

| HTTP Status | Error Code                   | When This Happens                                | What To Do                                         |
| ----------- | ---------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| `400`       | `invalid_request_error`      | Missing required parameters or malformed request | Check `text` and `language_code` fields            |
| `422`       | `unprocessable_entity_error` | Text too long or invalid speaker/model           | Keep text under 1500 chars (v2) or 2500 chars (v3) |

#### Error Handling Code Example

```python
from sarvamai import SarvamAI
from sarvamai.core.api_error import ApiError

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

try:
    response = client.text_to_speech.convert(
        text="Welcome to Sarvam AI!",
        language_code="en-IN",
        speaker="simran_en_customer",
        model="bulbul:v4-flash"
    )
    # Process audio...
except ApiError as e:
    if e.status_code == 400:
        print(f"Bad request: {e.body}")
    elif e.status_code == 403:
        print("Invalid API key. Check your credentials.")
    elif e.status_code == 422:
        print(f"Invalid parameters: {e.body}")
    elif e.status_code == 429:
        print("Rate limit exceeded. Wait and retry.")
    else:
        print(f"Error {e.status_code}: {e.body}")
```

> **Note**
>
> Check out our detailed [API Reference](/api-reference/text-to-speech/convert)
> to explore Text to Speech and all available options.

> **Note**
>
> Need help? Contact us on [discord](https://discord.com/invite/5rAsykttcs) for
> guidance.