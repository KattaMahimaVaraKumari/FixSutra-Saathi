> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Speech-to-Text APIs

> Complete overview of Sarvam AI Speech-to-Text APIs including real-time, batch, and streaming options. Process audio with the Saaras model for high-accuracy transcription.

Sarvam AI offers a powerful speech recognition model: [Saaras](/api/api-guides-tutorials/models/saaras), state-of-the-art ASR with flexible output modes: transcribe, translate, verbatim, transliterate, and codemix.

#### [Saaras v4 (Default, Recommended, Latest)](/api/api-guides-tutorials/models/saaras)

State-of-the-art ASR model with flexible output modes: transcribe, translate, verbatim, transliterate, and codemix. Adds Global English support and keyterm prompting. Best choice for new integrations. Saaras v3 remains available.

> **Warning**
>
> Use the [Sarvam speech-to-text skill](https://github.com/sarvamai/skills/tree/main/speech-to-text) to generate correct STT code from your AI coding assistant:
>
> ```bash
> npx skills add sarvamai/skills --skill speech-to-text
> ```
>
> See [Agent Skills](/api/developer-tools/agent-skills) for the full list.

### Choosing the model, endpoint & mode

| Goal                              | Endpoint                    | Model         | `mode`       |
| --------------------------------- | --------------------------- | ------------- | ------------ |
| Transcribe in the spoken language | `/speech-to-text`           | `saaras:v4`   | `transcribe` |
| Translate speech to English       | `/speech-to-text`           | `saaras:v4`   | `translate`  |
| Word-for-word (with fillers)      | `/speech-to-text`           | `saaras:v4`   | `verbatim`   |
| Romanized (Latin-script) output   | `/speech-to-text`           | `saaras:v4`   | `translit`   |
| Code-mixed output                 | `/speech-to-text`           | `saaras:v4`   | `codemix`    |
| Legacy translate endpoint         | `/speech-to-text-translate` | `saaras:v2.5` | —            |

> **Note**
>
> The `mode` parameter is supported by both `saaras:v3` and `saaras:v4` on the `/speech-to-text` endpoint. `saaras:v4` is the default, recommended model. The `/speech-to-text-translate` endpoint is legacy (`saaras:v2.5`); for new integrations, use `/speech-to-text` with `mode="translate"`.

## API Types

Available API types: [REST API](/api/api-guides-tutorials/speech-to-text/rest-api) for synchronous processing (files under 30 seconds), [Batch API](/api/api-guides-tutorials/speech-to-text/batch-api) for asynchronous processing (files up to 2 hours), and [Realtime Streaming](/api/api-guides-tutorials/speech-to-text/realtime-streaming) for live audio with true partial transcripts and mid-call reconfiguration.

#### [REST API](/api/api-guides-tutorials/speech-to-text/rest-api)

Synchronous processing for files under 30 seconds.

#### [Batch API](/api/api-guides-tutorials/speech-to-text/batch-api)

Asynchronous processing for files up to 2 hours.

#### [Realtime Streaming](/api/api-guides-tutorials/speech-to-text/realtime-streaming)

Live audio streaming (`saaras:v3-realtime`) with true partial transcripts, live reconfiguration, and simplified VAD tuning.

> **Tip**
>
> Already integrated against the WebSocket `saaras:v3` endpoint? It's still generally available, documented under [Streaming API (Legacy)](/api/api-guides-tutorials/speech-to-text/streaming-api).

> **Tip**
>
> Not sure which one fits your audio length and latency needs? See [Which Speech-to-Text API to Use](/api/api-guides-tutorials/speech-to-text/which-api-to-use) for a side-by-side comparison of REST, WebSocket, and Batch.

## Supported Audio Formats & MIME Types

The STT and STTT REST and Batch APIs support over 10 major audio formats and MIME type variants.
Supported formats and MIME types are listed below:

| Format Group                  | Supported MIME Types                        |
| ----------------------------- | ------------------------------------------- |
| **MP3 Variants**              | `mpeg`, `mp3`, `mpeg3`, `x-mpeg-3`, `x-mp3` |
| **WAV Variants**              | `wav`, `x-wav`, `wave`                      |
| **AAC Variants**              | `aac`, `x-aac`                              |
| **AIFF Variants**             | `aiff`, `x-aiff`                            |
| **OGG / Opus Formats**        | `ogg`, `opus`                               |
| **FLAC Variants (Lossless)**  | `flac`, `x-flac`                            |
| **MP4 / M4A Audio**           | `mp4`, `x-m4a`                              |
| **AMR (Narrowband)**          | `amr`                                       |
| **WMA (Windows Media Audio)** | `x-ms-wma`                                  |
| **WEBM (Audio & Video)**      | `webm`, `webm`                              |
| **PCM Formats**               | `pcm_s16le`, `pcm_l16`, `pcm_raw`           |

> **Note**
>
> For most audio formats, our API automatically detects the codec. However, when
> using PCM formats (`pcm_s16le`, `pcm_l16`, `pcm_raw`), you must explicitly
> specify the `input_audio_codec` parameter. PCM files are only supported at
> 16kHz sample rate.

> **Warning**
>
> **WebSocket/Streaming APIs:** The STT and STTT WebSocket streaming APIs only support **WAV** and **raw PCM** formats (`wav`, `pcm_s16le`, `pcm_l16`, `pcm_raw`). Other audio formats are not supported for real-time streaming.

---

## Technical Capabilities

#### Language Support

* 22 Indic languages + Global and Indian English (Saaras v4)
* Automatic language detection
* Code-mixing support
* Multi-speaker handling

#### Advanced Processing

* Speaker diarization (Batch API)
* Timestamp generation
* Entity preservation
* Telephony optimization

## Limits

| Limit                              | Value                                                                 |
| ---------------------------------- | --------------------------------------------------------------------- |
| Real-time REST: max audio duration | 30 seconds per request                                                |
| Batch API: max file duration       | 2 hours per file                                                      |
| Batch API: max files per job       | 20                                                                    |
| Batch API: diarization             | Up to 20 speakers (`num_speakers`)                                    |
| Streaming WebSocket: formats       | WAV and raw PCM only (`wav`, `pcm_s16le`, `pcm_l16`, `pcm_raw`)       |
| Streaming WebSocket: sample rate   | 16000 Hz (default) or 8000 Hz                                         |
| Concurrency / rate limits          | Per plan. See [Rate Limits](/api/getting-started/pricing#rate-limits) |

> **Tip**
>
> Before uploading audio, run through the [Preparing Your Audio](/api/api-guides-tutorials/speech-to-text/rest-api#preparing-your-audio) checklist, sample rate, channels, format, and duration limits, to avoid the most common 400 errors.

## Next Steps

#### Choose Your API

Select the appropriate API type based on your use case.

#### Get API Key

Sign up and get your API key from the
[dashboard](https://indus.sarvam.ai/key-management?ref=docs).

#### Go Live

Deploy your integration and monitor usage in the dashboard.

> **Note**
>
> Need help choosing the right API? Contact us on
> [discord](https://discord.com/invite/5rAsykttcs) for guidance.