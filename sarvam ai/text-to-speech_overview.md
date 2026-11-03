> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Text-to-Speech Overview

> Complete overview of Sarvam AI Text-to-Speech APIs using Bulbul v4 Flash (latest) and Bulbul v3. Convert text to natural speech with real-time and streaming options for Indian languages.

Sarvam AI offers a powerful text-to-speech model: [Bulbul v4 Flash](/api/api-guides-tutorials/models/bulbul), advanced TTS with 30+ voices and high-quality natural speech synthesis for Indian languages.

> **Warning**
>
> Use the [Sarvam text-to-speech skill](https://github.com/sarvamai/skills/tree/main/text-to-speech) to generate correct TTS code from your AI coding assistant:
>
> ```bash
> npx skills add sarvamai/skills --skill text-to-speech
> ```
>
> See [Agent Skills](/api/developer-tools/agent-skills) for the full list.

#### [Bulbul v4 Flash](/api/api-guides-tutorials/models/bulbul)

Latest text-to-speech model with 200+ persona voices (Bulbul v4 Flash); Bulbul v3 offers 30+ classic speakers
and high-quality natural speech synthesis for Indian languages.

> **Tip**
>
> Want to hear the voices first? Browse audio previews for every speaker on the [Voices](/api/api-guides-tutorials/text-to-speech/voices) page.

## API Types

Available API types: [REST API](/api/api-guides-tutorials/text-to-speech/rest-api) for quick conversions up to 2500 characters, and [Streaming API](/api/api-guides-tutorials/text-to-speech/streaming-api) for real-time audio via HTTP stream or WebSocket.

#### [REST API](/api/api-guides-tutorials/text-to-speech/rest-api)

Generate speech for short text with immediate response. Best for quick
conversions up to 2500 characters.

#### [Streaming API](/api/api-guides-tutorials/text-to-speech/streaming-api)

Stream audio in real time, via a single HTTP POST for simple pipelines,
or a persistent WebSocket connection for interactive voice agents.

> **Tip**
>
> Not sure which one fits your latency and interactivity needs? See [Which Text-to-Speech API to Use](/api/api-guides-tutorials/text-to-speech/which-api-to-use) for a side-by-side comparison of REST, HTTP streaming, and WebSocket.

## Supported Audio Formats & MIME Types

The TTS API supports over 8 major audio formats and MIME type variants. Supported formats and MIME types are listed below:

| Format Group                 | Supported MIME Types |
| ---------------------------- | -------------------- |
| **MP3 Variants**             | `mp3`                |
| **WAV Variants**             | `wav`                |
| **AAC Variants**             | `aac`                |
| **OPUS Format**              | `opus`               |
| **FLAC Variants (Lossless)** | `flac`               |
| **PCM LINEAR16**             | `linear16`           |
| **MULAW (μ-law)**            | `mulaw`              |
| **ALAW (A-law)**             | `alaw`               |

> **Note**
>
> **Experience the voices**: See the [Voices](/api/api-guides-tutorials/text-to-speech/voices) page for embedded audio samples of every speaker, or head to [indus.sarvam.ai](https://indus.sarvam.ai/api-playground/text-to-speech?ref=docs) to test different languages and generate audio samples with custom input.

## Limits

| Limit                                      | Value                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| REST API: max characters per request       | 2,500                                                                                                                                             |
| HTTP streaming: max characters per request | 3,500                                                                                                                                             |
| WebSocket: max characters per message      | 2,500 (recommended under 500 for lowest latency)                                                                                                  |
| Sample rates                               | REST: 8000 / 16000 / 22050 / 24000 / 32000 / 44100 / 48000. Streaming (HTTP + WebSocket): 8000 / 16000 / 22050 / 24000. Omitted → 22050 Hz output |
| Rate limits                                | Per plan. See [Rate Limits](/api/getting-started/pricing#rate-limits)                                                                             |

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