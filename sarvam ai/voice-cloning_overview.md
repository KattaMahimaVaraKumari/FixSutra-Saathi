> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Instant Voice Cloning API

> Create a cloned voice from a reference clip, or generate speech with a saved voice ID or an inline reference clip.

> **Note**
>
> Instant Voice Cloning is in **beta**, including HTTP streaming (`POST /voices/clone/stream`) and WebSocket streaming (`GET /voices/clone/ws`).

Use the official [`sarvamai`](https://pypi.org/project/sarvamai/) Python and TypeScript SDKs — the same client shape as Bulbul Text-to-Speech (`voice_cloning.convert` / `convert_stream`, plus `voice_cloning_streaming` for WebSocket). See [Libraries & SDKs](/api/getting-started/sdks). Requires `sarvamai` ≥ `0.1.37` (Python) or ≥ `1.1.12` (TypeScript) for the Instant Voice Cloning surface.

Instant Voice Cloning can follow either path:

1. **Saved voice (recommended for reuse):** create once with `POST /voices/create` (or `client.voice_cloning.create_voice`), then pass `voice_id` on every generate call.
2. **Inline reference clip:** send `ref_audio` (optional `ref_text`) on each generate call — no saved voice required.

Generate speech with one of:

* `POST /voices/clone` / `voice_cloning.convert` — one-shot JSON response with base64 audio
* `POST /voices/clone/stream` / `voice_cloning.convert_stream` — binary audio stream as sentences become ready
* `GET /voices/clone/ws` / `voice_cloning_streaming` — WebSocket for incremental text and multi-turn sessions

Send **exactly one** of `ref_audio` or `voice_id` on each generate request. Sending both returns `400`.

> **Note**
>
> **Base URL and authentication.** See the [API Reference](/api-reference/voice-cloning) for the current base URL and auth header. Generate a key from [Key Management](https://indus.sarvam.ai/key-management?ref=docs) in the dashboard. The SDKs take the same key as `api_subscription_key` / `apiSubscriptionKey`.

## What you get

#### [Cross-lingual cloning](/api/api-guides-tutorials/voice-cloning/how-to/clone-across-languages)

Clone an English voice and have it speak Hindi, Tamil, or any supported language - the reference clip's language does not have to match the output.

#### [Built-in quality control](/api/api-guides-tutorials/voice-cloning/how-to/use-quality-control)

On the one-shot endpoint, every generation can be transcribed back and scored before it is returned; failing generations are retried with bounded attempts. QC applies to single-chunk (short) generations on `POST /voices/clone`.

#### [HTTP streaming](/api/api-guides-tutorials/voice-cloning/how-to/http-streaming)

`POST /voices/clone/stream` returns a binary audio stream so playback can start after the first sentence.

#### [WebSocket streaming](/api/api-guides-tutorials/voice-cloning/how-to/websocket-streaming)

Persistent connection for incremental text and multi-turn synthesis with a cloned voice.

#### [SDK support](/api/getting-started/sdks)

Python (`SarvamAI` / `AsyncSarvamAI`) and TypeScript (`SarvamAIClient`) with the same convert / convertStream / WebSocket verbs as Bulbul TTS.

## How it works

#### Create a voice

Send a clean reference clip to `POST /voices/create` or `client.voice_cloning.create_voice`. The response returns a `voice_id`.

#### Generate speech

Call `voice_cloning.convert` / `POST /voices/clone` with `text` and either `voice_id` or `ref_audio`. `language_code` is optional — omit it to detect the language from the text, or pass it when pronunciation has to be exact. Use [HTTP streaming](/api/api-guides-tutorials/voice-cloning/how-to/http-streaming) / [WebSocket](/api/api-guides-tutorials/voice-cloning/how-to/websocket-streaming) for progressive audio.

#### Decode or play the audio

For the one-shot endpoint, decode the base64-encoded `audio` / `audio_b64` in the JSON response. For HTTP stream, iterate the binary chunks from `convert_stream`; for WebSocket, decode each base64 frame from `voice_cloning_streaming`.

Prefer the [Python and TypeScript SDKs](/api/getting-started/sdks). Endpoint-level schemas and extra language snippets are on the [API Reference](/api-reference/voice-cloning).

## Quickstart

Install the SDK (`pip install "sarvamai>=0.1.37"` or `npm install sarvamai@1.1.12`), then create a voice and synthesize:

#### Python

```python
import base64
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

with open("reference.wav", "rb") as f:
    created = client.voice_cloning.create_voice(
        file=f,
        name="my-voice",
        language="en-IN",
    )
voice_id = created.data.voice_id

response = client.voice_cloning.convert(
    voice_id=voice_id,
    text="नमस्ते, मैं आपकी कैसे मदद कर सकता हूँ?",
)
with open("output.wav", "wb") as out:
    out.write(base64.b64decode(response.audio_b64 or response.audio))
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY,
});

const created = await client.voiceCloning.createVoice({
  file: fs.createReadStream("reference.wav"),
  name: "my-voice",
  language: "en-IN",
});
const voiceId = created.data.voiceId;

const response = await client.voiceCloning.convert({
  voiceId,
  text: "नमस्ते, मैं आपकी कैसे मदद कर सकता हूँ?",
});
fs.writeFileSync(
  "output.wav",
  Buffer.from(response.audioB64 ?? response.audio, "base64"),
);
```

#### cURL

```bash
# Step 1: create a voice
curl -s -X POST "https://api.sarvam.ai/voices/create" \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -F "name=my-voice" \
  -F "language=en-IN" \
  -F "file=@reference.wav"

# Step 2: generate speech with data.voice_id from step 1
curl -s -X POST "https://api.sarvam.ai/voices/clone" \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -F "voice_id=svc-your-voice-id" \
  -F "text=नमस्ते, मैं आपकी कैसे मदद कर सकता हूँ?" \
  -o response.json

python3 -c "import base64, json; d=json.load(open('response.json')); open('output.wav', 'wb').write(base64.b64decode(d.get('audio_b64') or d['audio']))"
```

`language_code` is optional. These examples omit it so the service detects Hindi from the text. Pass `language_code` when pronunciation has to be exact — see [Supported languages](/api/api-guides-tutorials/voice-cloning/supported-languages#omitting-language_code).

The one-shot response contains `audio` / `audio_b64` and `request_id`. See the [API Reference](/api-reference/voice-cloning) for the complete request and response schemas.

## Manage saved voices

Voices are shared with Content Studio for the same workspace.

| Endpoint                           | What it does                                                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST /voices/create`              | Create a cloned voice from a reference clip in one shot. The response returns the new `voice_id` and the auto-generated transcript (`reference_text`) together - the voice is ready to use with `POST /voices/clone` immediately, and appears under Studio **My voices**.            |
| `GET /voices`                      | List the cloned voices in your workspace (filter by name, gender, accent; paginated). Each item’s `id` is the same value you pass as `voice_id` on `POST /voices/clone`. It lists voices created by anyone in the workspace; the creator, when known, appears as `created_by_email`. |
| `GET /voices/{voice_id}`           | Full details for one voice, including its transcript and time-limited signed URLs for the reference and preview audio. The path param is the same `svc-{uuid}` as list `id` / create `voice_id`.                                                                                     |
| `DELETE /voices/delete/{voice_id}` | Delete a voice. Its audio assets are removed and the voice stops being listed or usable in the API and in Studio.                                                                                                                                                                    |

The Starter plan (pay as you go) keeps up to 50 cloned voices across your organization, in Content Studio and the API. Pro and Enterprise plans have higher limits. On any plan, deleting a voice frees a slot. In Content Studio, only the person who created a voice, an organization owner or admin, or a workspace admin can delete it.

## Limits and pricing

| Request                                             | Limit                 |
| --------------------------------------------------- | --------------------- |
| Create voice file size                              | 50 MB                 |
| Inline `ref_audio` on generate (REST / stream / WS) | 10 MB, max 15 seconds |
| Recommended reference duration                      | 10-15 seconds         |
| Generate speech `text` (REST / HTTP stream)         | 1000 characters       |
| WebSocket `text` per message                        | 2500 characters       |

Generation is billed per character of `text`. See [Pricing](/api/getting-started/pricing).

> **Warning**
>
> **Voice cloning requires consent.** Only clone a voice you have the right to use. See [Commercial Licensing](/api/getting-started/commercial-licensing) for the consent requirements that apply to cloned-voice audio.

## Explore

#### [Prepare Reference Audio](/api/api-guides-tutorials/voice-cloning/how-to/prepare-reference-audio)

What makes a good reference clip, and what to avoid.

#### [Clone Across Languages](/api/api-guides-tutorials/voice-cloning/how-to/clone-across-languages)

How cross-lingual cloning works and when it shines.

#### [Choose Audio Formats](/api/api-guides-tutorials/voice-cloning/how-to/choose-audio-formats)

Input and output codecs, sample rates, and file-size guidance.

#### [Use Quality Control](/api/api-guides-tutorials/voice-cloning/how-to/use-quality-control)

What QC checks on the one-shot endpoint, when to disable it, and what you'll see.

#### [HTTP Streaming](/api/api-guides-tutorials/voice-cloning/how-to/http-streaming)

Stream binary audio from a single POST.

#### [WebSocket Streaming](/api/api-guides-tutorials/voice-cloning/how-to/websocket-streaming)

Persistent connection for incremental text and multi-turn synthesis.

#### [Supported Languages](/api/api-guides-tutorials/voice-cloning/supported-languages)

All language codes and native-script guidance.

#### [FAQs](/api/api-guides-tutorials/voice-cloning/faq)

Quick answers on limits, voices, streaming, and errors.

#### [API Reference](/api-reference/voice-cloning)

Endpoint-level schemas for every request and response field.

#### [Libraries & SDKs](/api/getting-started/sdks)

Install `sarvamai` and call Instant Voice Cloning with the same convert / stream shape as Bulbul TTS.

#### [Cookbook](/api/cookbook/guides/support-voice-notes)

Support voice notes: clone an agent, then speak WhatsApp replies in that voice.

> **Note**
>
> Need help scoping a voice-cloning integration? Reach out on [Discord](https://discord.com/invite/5rAsykttcs).