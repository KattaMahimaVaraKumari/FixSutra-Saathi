> This page is for API Reference.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Welcome to Sarvam AI API Reference Documentation

> Explore Sarvam AI's comprehensive API documentation for chat completion, speech-to-text, text-to-speech, translation, and more across 22+ Indian languages.

Sarvam provides Models & APIs across the stack to help developers build powerful applications. Whether you're looking for chat completion, text translation, speech-to-text conversion, or a combination of speech recognition and translation, Sarvam has you covered.

## Key Features

Available APIs: [Chat Completion](/api-reference/chat/chat-completions-v1), [Text Translation](/api-reference/text/translate-text), [Document Translation](/api-reference/translate-document/create-doc-translation), [Speech to Text](/api-reference/speech-to-text/transcribe), [Speech to Text Translate](/api-reference/legacy/speech-to-text-translate/translate), [Text to Speech](/api-reference/text-to-speech/convert), [Instant Voice Cloning](/api-reference/voice-cloning), [Transliteration](/api-reference/text/transliterate-text), and [Language Identification](/api-reference/text/identify-language).

#### [Chat Completion](/api-reference/chat/chat-completions-v1)

Use the /chat/completions endpoint or the SDK to generate
conversational responses. Supports 10 Indic languages along with English,
delivering best-in-class multilingual performance.

#### [Translate Text](/api-reference/text/translate-text)

Use the `/translate` endpoint or the SDK to translate text from one language to
another. Supports 22 Indic languages along with English, achieving
best-in-class performance.

#### [Document Translation](/api-reference/translate-document/create-doc-translation)

Use the `/translate/document/jobs` endpoints or the SDK to translate whole PDF,
Word, Excel, PowerPoint, and HTML files. Exports preserve layout and stay in the
source format (document-to-document).

#### [Speech to Text](/api-reference/speech-to-text/transcribe)

Use the `/speech-to-text` endpoint or the SDK to convert spoken language into written
text. Output is returned in the same input language.

#### [Speech to Text Translate](/api-reference/legacy/speech-to-text-translate/translate)

Use the `/speech-to-text-translate` endpoint or the SDK to combine speech recognition
and translation, allowing you to convert spoken language directly into
translated text.

#### [Text to Speech](/api-reference/text-to-speech/convert)

Use the `/text-to-speech` endpoint or the SDK to convert written text into spoken
words. Supports natural-sounding voices across 10 languages.

#### [Instant Voice Cloning](/api-reference/voice-cloning)

Create a saved voice with `/voices/create`, then generate speech with
`/voices/clone` and its `voice_id`.

#### [Transliterate](/api-reference/text/transliterate-text)

Use the `/transliterate` endpoint or the SDK to convert text between different scripts
while maintaining the same language. Perfect for handling multiple writing
systems.

#### [Language Identification](/api-reference/text/identify-language)

Use the `/text-lid` endpoint or the SDK to automatically identify the language
of input text. Supports all major Indian languages with high accuracy.

#### [Split](/api/api-guides-tutorials/document-intelligence/how-to/split)

Separate a scanned bundle into individual documents, by fixed page groups,
explicit page ranges, matching markers, or model-detected boundaries.

#### [Classify](/api/api-guides-tutorials/document-intelligence/how-to/classify)

Label a document, or each page, against the categories you define, or let the
API suggest a type. Returns a decision with evidence and a review flag.

## Getting Started

To get started with Sarvam APIs, follow these steps:

1. **Authenticate**: Learn how to authenticate your API requests in the [Authentication Guide](/api-reference/authentication).
2. **Meta Prompt**: You can now use our [Meta Prompt](/api-reference/metaprompt) directly to guide any AI chat model with the context needed to use Sarvam's APIs effectively.
   An example on AI Studio with Gemini's latest model: [Explore here](https://aistudio.google.com/app/prompts/14NyNJ8V4icyNPoRBm2UiFbhXxS9ooy0m)
3. **Try Examples**: Use the [Usage Guides](/api/cookbook) to see examples and best practices.
4. **Manage your data**: control how long request/response data from these APIs is kept. Set a workspace default and an optional per-product override in [Data retention](/api/platform/data-retention).

## Need Help?

If you have any questions or need assistance, visit our [Help](/api/getting-started/help) section. Building with Sarvam? [Join our Discord](https://discord.com/invite/5rAsykttcs) for early access to new releases, biweekly challenges, office hours with the team, and India's AI builder community.