> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Chat Completion API

> Get started with Sarvam AI LLM models for conversational AI. Build intelligent chat applications with native Indian language support and deep contextual reasoning capabilities.

Use the Chat Completion API to build conversational AI experiences with native
support for Indian languages and deep contextual reasoning. Sarvam provides two
versions: V1 for Sarvam models and V2 for Sarvam and open-weight models.

> **Warning**
>
> Use the [Sarvam chat skill](https://github.com/sarvamai/skills/tree/main/chat) to generate correct chat completion code from your AI coding assistant:
>
> ```bash
> npx skills add sarvamai/skills --skill chat
> ```
>
> See [Agent Skills](/api/developer-tools/agent-skills) for the full list.

Our Chat Completion APIs support the following chat models:

#### [Sarvam-105B](/api/token-factory/models/sarvam-105b)

Model ID `sarvam-105b`. Flagship model for complex reasoning, coding, and agentic workflows. 128K token context length.

#### [Sarvam-105B Conversations](/api/token-factory/models/sarvam-105b#conversational-variant)

Model ID `sarvam-105b-conversations`. Conversational variant post-trained for real-time dialogue and voice-agent workloads.

Simply pass the model name as the `model` parameter (e.g., `model="sarvam-105b"` or `model="sarvam-105b-conversations"`).

> **Note**
>
> **Endpoints:** `POST /v1/chat/completions` serves `sarvam-105b` and
> `sarvam-105b-conversations`. `POST /v2/chat/completions` serves `sarvam-105b`,
> `glm5.3`, `glm5.3-flash`, `gemma4`, `deepseekv4.1-flash-1017`, and the beta models `deepseekv4-pro`, `kimi-k3`, `mimo-v2.6-flash`, and `mimo-v2.6-pro`. See [Open-Weight Models](/api/token-factory/models).

> **Tip**
>
> **Token budgeting:** the context length covers *everything*, your messages, any `reasoning_content` the model produces in think mode, and the generated reply (capped by `max_tokens`, default 2048). Reasoning tokens are billed as completion tokens, so high `reasoning_effort` increases both latency and cost. For long conversations, trim or summarize older turns instead of resending the full history.

> **Note**
>
> **Authentication:** like every Sarvam API, this endpoint uses the `api-subscription-key` header. It additionally accepts `Authorization: Bearer <key>` for OpenAI-compatible tooling. See [Authentication](/api-reference/authentication) for details.

> **Note**
>
> **Sarvam-M (24B)** has been deprecated and is no longer available through the Chat Completions API. Please migrate to **Sarvam-105B** for improved performance.

## V1 Chat Completion

`POST /v1/chat/completions` supports `sarvam-105b` and
`sarvam-105b-conversations`. Use V1 for Sarvam's flagship and conversational
models. See the [Chat Completion V1 API Reference](/api-reference/chat/chat-completions-v1)
for the complete request and response schema.

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.chat.completions(
    model="sarvam-105b",
    messages=[{"role": "user", "content": "What is the capital of India?"}],
)

print(response.choices[0].message.content)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

const response = await client.chat.completions({
  model: "sarvam-105b",
  messages: [{ role: "user", content: "What is the capital of India?" }],
});

console.log(response.choices[0].message.content);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sarvam-105b",
    "messages": [
      {"role": "user", "content": "What is the capital of India?"}
    ]
  }'
```

## V2 Chat Completion

`POST /v2/chat/completions` supports `sarvam-105b`, `glm5.3`, `glm5.3-flash`,
`gemma4`, `deepseekv4.1-flash-1017`, and the beta models `deepseekv4-pro`, `kimi-k3`, `mimo-v2.6-flash`, and `mimo-v2.6-pro`. Use V2 for the OpenAI-compatible API and open-weight
models. See the [Chat Completion V2 API Reference](/api-reference/chat/chat-completions-v2)
for the complete request and response schema.

> **Tip**
>
> Moving from [OpenRouter](/api/token-factory/migrations/from-openrouter/overview), [Fireworks AI](/api/token-factory/migrations/from-fireworks/overview), or [Together AI](/api/token-factory/migrations/from-together/overview)? The migration guides cover base URLs, model IDs, and the request fields to change.

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.chat.completions_v2(
    model="glm5.3",
    messages=[{"role": "user", "content": "Explain photosynthesis briefly."}],
)

print(response.choices[0].message.content)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

const response = await client.chat.completionsV2({
  model: "glm5.3",
  messages: [{ role: "user", content: "Explain photosynthesis briefly." }],
});

console.log(response.choices[0].message.content);
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v2/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm5.3",
    "messages": [
      {"role": "user", "content": "Explain photosynthesis briefly."}
    ]
  }'
```

> **Note**
>
> **Beta models:** `deepseekv4-pro`, `kimi-k3`, `mimo-v2.6-flash`, and
> `mimo-v2.6-pro` are in beta. See [Beta models](/api-reference/beta-apis).

### V2 models

| Model ID                  | Type               |                          Context |                   Reasoning                  | Guide                                                                          |
| ------------------------- | ------------------ | -------------------------------: | :------------------------------------------: | ------------------------------------------------------------------------------ |
| `sarvam-105b`             | Sarvam             |                             128K |                    Hybrid                    | [Sarvam-105B](/api/token-factory/models/sarvam-105b)                           |
| `glm5.3`                  | Open-weight        |                               1M |            `low` · `high` · `max`            | [GLM-5.3](/api/token-factory/models/glm-5-3)                                   |
| `glm5.3-flash`            | Open-weight        |                 1M, text + image |            `low` · `high` · `max`            | [GLM-5.3 Flash](/api/token-factory/models/glm-5-3-flash)                       |
| `gemma4`                  | Open-weight        |               256K, text + image |    Off by default; `low` · `high` · `max`    | [Gemma 4 31B](/api/token-factory/models/gemma-4-31b)                           |
| `deepseekv4.1-flash-1017` | Open-weight        |                 1M, text + image | `low` · `high` (default) · `max`; can be off | [DeepSeek V4.1 Flash 1017](/api/token-factory/models/deepseek-v4.1-flash-1017) |
| `deepseekv4-pro`          | Open-weight (beta) |                         1M, text | `low` · `high` (default) · `max`; can be off | [DeepSeek V4 Pro](/api/token-factory/models/deepseek-v4-pro)                   |
| `kimi-k3`                 | Open-weight (beta) |         1M, text + image + video |       `low` · `high` · `max`; always on      | [Kimi K3](/api/token-factory/models/kimi-k3)                                   |
| `mimo-v2.6-flash`         | Open-weight (beta) | 1M, text + image + audio + video |             On by default; on/off            | [MiMo V2.6 Flash](/api/token-factory/models/mimo-v2.6-flash)                   |
| `mimo-v2.6-pro`           | Open-weight (beta) | 1M, text + image + audio + video |             On by default; on/off            | [MiMo V2.6 Pro](/api/token-factory/models/mimo-v2.6-pro)                       |

Confirm what your key can use with [`GET /v2/models`](/api-reference/chat/models-v2).

### Session affinity for multi-turn conversations

Session affinity is currently supported on the **`gemma4`** model. Send the optional **`x-session-affinity`** header with the same value on every turn
of a conversation. Turns that share a session ID are routed together and can reuse
cached prompt context, which lowers latency on later turns of long conversations.

* Use one stable ID per conversation, and a new ID for each new conversation.
* Session IDs are scoped to your API subscription. Another customer who sends the
  same value does not share your session.
* Use an opaque value such as a UUID. Do not put personal data in it.
* The header is optional. Requests without it behave exactly as before, and
  responses are the same whether or not you send it.
* Other models (`sarvam-105b`, `glm5.3`, `deepseekv4.1-flash-1017`) accept the header
  but ignore it.
* When you contact support about a conversation, include its session ID.

#### Python

```python
import uuid
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")
session_id = str(uuid.uuid4())  # one per conversation

messages = [{"role": "user", "content": "Plan a 3-day trip to Jaipur."}]
response = client.chat.completions_v2(
    model="gemma4",
    messages=messages,
    request_options={"additional_headers": {"x-session-affinity": session_id}},
)
messages.append({"role": "assistant", "content": response.choices[0].message.content})
messages.append({"role": "user", "content": "Add a day trip to Ajmer."})

# Next turn: reuse the same session ID
response = client.chat.completions_v2(
    model="gemma4",
    messages=messages,
    request_options={"additional_headers": {"x-session-affinity": session_id}},
)
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v2/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "x-session-affinity: 3f9c2b1e-7a4d-4e8b-9c1a-2d5e6f7a8b9c" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma4",
    "messages": [
      {"role": "user", "content": "Plan a 3-day trip to Jaipur."}
    ]
  }'
```

### V2 feature support

| Feature                                 | `sarvam-105b` | `glm5.3` | `glm5.3-flash` | `gemma4` | `deepseekv4.1-flash-1017` | `deepseekv4-pro` | `kimi-k3` | `mimo-v2.6-flash` | `mimo-v2.6-pro` |
| --------------------------------------- | :-----------: | :------: | :------------: | :------: | :-----------------------: | :--------------: | :-------: | :---------------: | :-------------: |
| Streaming                               |               |          |                |          |                           |                  |           |                   |                 |
| Tool calling                            |               |          |                |          |                           |                  |           |                   |                 |
| Structured output (`response_format`)   |               |          |                |          |                           |                  |           |                   |                 |
| Log probabilities                       |               |   `400`  |                |          |                           |                  |           |                   |                 |
| Multiple choices (`n` > 1)              |               |   `400`  |                |          |                           |                  |           |                   |                 |
| `parallel_tool_calls: false` enforced   |               |          |                |          |                           |                  |           |                   |                 |
| Session affinity (`x-session-affinity`) |               |          |                |          |                           |                  |           |                   |                 |

#### V2 behaviour notes

* **Turning thinking off:** `deepseekv4.1-flash-1017`, `deepseekv4-pro`, `mimo-v2.6-flash`, and `mimo-v2.6-pro` accept `reasoning_effort: "none"`. `glm5.3`, `glm5.3-flash`, and `kimi-k3` can't turn thinking off. `gemma4` doesn't think unless you set `reasoning_effort`.
* **`n` > 1** needs `temperature` above `0` on every model; `temperature: 0` returns `400`.
* **Model IDs are case-sensitive.** An unknown ID returns `404 not_found_error`.
* **Auth failures return `403`**, not `401`, with `invalid_api_key_error`.
* **Streaming is optional.** Omit `stream` (or set `false`) for one JSON response, `true` for server-sent events.
* **Parallel tool calls:** `parallel_tool_calls: false` limits a turn to one tool call on every model. On the Responses API, `sarvam-105b` ignores it.
* **`n` on Responses:** not supported on the open-weight models; sending it, even `n: 1`, returns `400 Unsupported parameter(s)`.
* **Log probabilities on Responses:** `glm5.3` and `gemma4` reject `logprobs`/`top_logprobs` with `400`. On the other models, send `top_logprobs` together with `include: ["message.output_text.logprobs"]`; without `include`, `output[].content[].logprobs` comes back empty.
* **Reasoning on Responses:** `deepseekv4.1-flash-1017`, `deepseekv4-pro`, `kimi-k3`, `mimo-v2.6-flash`, and `mimo-v2.6-pro` accept `low`, `high`, `max`. `gemma4` accepts `low` or `high` and doesn't reason when `reasoning` is omitted. `glm5.3` and `glm5.3-flash` accept only `low` or `high` (the string `"max"` returns `400`); omitting `reasoning` gives `max` on `glm5.3` and `high` on `glm5.3-flash`.
* **Reasoning budget:** reasoning tokens count against `max_tokens`. On Chat, `max_tokens` defaults to `2048` on `glm5.3` only; other models have no small default, so set it explicitly. Responses' `max_output_tokens` has no default, so omitting it means unbounded generation.
* **`stop`:** on Chat, `sarvam-105b`, `glm5.3`, and `gemma4` take up to 4 sequences and return `400` for more; `glm5.3-flash` and `deepseekv4.1-flash-1017` accept more than 4. The open-weight models reject `stop` on the Responses API.
* **Errors:** invalid JSON or types return `400` with `error.message`; overload returns `503` (retry with backoff).
* Model-specific limits are listed under each [open-weight model guide](/api/token-factory/models).

> **Note**
>
> The **Limits** table at the bottom of this page applies to **V1**
> (`sarvam-105b` / `sarvam-105b-conversations`), not V2 open-weight models.

## Features

#### Hybrid Thinking Mode

* Supports both "think" and "non-think" modes
* Think mode for complex logical reasoning
* Non-think mode for efficient conversations
* Ideal for mathematical and coding tasks

#### Advanced Indic Skills

* Post-trained on Indian languages
* Native English proficiency
* Authentic Indian cultural values
* Rich understanding of local context

#### Superior Reasoning Capabilities

* Outperforms similar-sized models
* Strong performance on coding tasks
* Excellent mathematical reasoning
* Advanced problem-solving abilities

#### Seamless Chatting Experience

* Full Indic script support
* Romanized language support
* Multilingual conversation handling
* Natural language understanding

## V1 features and examples

#### Basic Chat Completion

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)
response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {"role": "user", "content": "Hey, what is the capital of India?"}
    ],
)
print(response)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

// Initialize the SarvamAI client with your API key
const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

async function main() {
  const response = await client.chat.completions({
    model: "sarvam-105b",
    messages: [
      {
        role: "user",
        content: "What is the capital of India?",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is the capital of India?"}
    ],
    "model": "sarvam-105b"
  }'
```

#### Multi-turn Conversation

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)

response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me about Indian classical music."},
        {"role": "assistant", "content": "Indian classical music is one of the oldest musical traditions in the world..."},
        {"role": "user", "content": "What are the two main styles?"}
    ],
    temperature=0.7,
    reasoning_effort="high"
)
print(response.choices[0].message.content)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

async function main() {
    const response = await client.chat.completions({
        model: "sarvam-105b",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Tell me about Indian classical music." },
            { role: "assistant", content: "Indian classical music is one of the oldest musical traditions in the world..." },
            { role: "user", content: "What are the two main styles?" }
        ],
        temperature: 0.7,
        reasoning_effort: "high"
    });
    console.log(response.choices[0].message.content);
}

main();
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Tell me about Indian classical music."},
      {"role": "assistant", "content": "Indian classical music is one of the oldest musical traditions in the world..."},
      {"role": "user", "content": "What are the two main styles?"}
    ],
    "model": "sarvam-105b",
    "temperature": 0.7,
    "reasoning_effort": "high"
  }'
```

#### Hindi (Indic Script)

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)

response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {"role": "system", "content": "आप एक सहायक हैं जो हिंदी में जवाब देता है।"},
        {"role": "user", "content": "भारत की राजधानी क्या है?"}
    ],
    temperature=0.3
)
print(response.choices[0].message.content)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_SARVAM_API_KEY"
});

async function main() {
    const response = await client.chat.completions({
        model: "sarvam-105b",
        messages: [
            { role: "system", content: "आप एक सहायक हैं जो हिंदी में जवाब देता है।" },
            { role: "user", content: "भारत की राजधानी क्या है?" }
        ],
        temperature: 0.3
    });
    console.log(response.choices[0].message.content);
}

main();
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "आप एक सहायक हैं जो हिंदी में जवाब देता है।"},
      {"role": "user", "content": "भारत की राजधानी क्या है?"}
    ],
    "model": "sarvam-105b",
    "temperature": 0.3
  }'
```

#### Key Considerations

* Reasoning effort options: low, medium, high
  * Thinking mode is **on by default** (`low`); pass `reasoning_effort=None` (Python) / `reasoning_effort: null` (JS, cURL) to disable it
  * Higher values increase reasoning depth
  * Reasoning tokens (returned as `reasoning_content`) count toward your completion tokens and bill. Use lower effort or disable reasoning for latency- and cost-sensitive paths
* Output length is capped by `max_tokens` (default 2048), raise it for long-form generation

> **Warning**
>
> Because thinking mode is on by default, a low `max_tokens` (e.g. under a few hundred) can be consumed entirely by reasoning, you'll get `finish_reason: "length"` with an empty `content` and only `reasoning_content` populated. Either keep `max_tokens` generous or disable reasoning with `reasoning_effort=None` for short replies.

## Streaming

Set `stream: true` to receive the response incrementally over [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) instead of waiting for the full completion. This is essential for responsive chat UIs and voice-agent pipelines, where you want to start rendering (or speaking) the reply as soon as the first tokens arrive.

Both SDKs return an iterator of `chat.completion.chunk` objects. Each chunk carries a `delta` with the new portion of the message, `delta.content` for the reply text and, when reasoning is enabled, `delta.reasoning_content` for thinking tokens.

#### Python

```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)

stream = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {"role": "user", "content": "Write a short poem about the monsoon."}
    ],
    stream=True,
)

for chunk in stream:
    # The final chunk reports usage and has no choices: guard before indexing
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

async function main() {
  const stream = await client.chat.completions({
    model: "sarvam-105b",
    messages: [
      { role: "user", content: "Write a short poem about the monsoon." },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta;
    if (delta?.content) {
      process.stdout.write(delta.content);
    }
  }
}

main();
```

#### cURL

```bash
curl -N -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a short poem about the monsoon."}
    ],
    "model": "sarvam-105b",
    "stream": true
  }'
```

Over raw HTTP, each event is a `data:` line containing a `chat.completion.chunk` JSON object. The final data chunk carries `usage` (with an empty `choices` array), and the stream ends with `data: [DONE]`:

```text
data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1699000000,"model":"sarvam-105b","choices":[{"index":0,"delta":{"role":"assistant","content":"The"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1699000000,"model":"sarvam-105b","choices":[{"index":0,"delta":{"content":" rains"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1699000000,"model":"sarvam-105b","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1699000000,"model":"sarvam-105b","choices":[],"usage":{"prompt_tokens":19,"completion_tokens":3,"total_tokens":22}}

data: [DONE]
```

> **Note**
>
> When `reasoning_effort` is set, thinking tokens stream first via `delta.reasoning_content`, followed by the reply via `delta.content`. Check both fields if you display reasoning to users.

## Tool Calling (Function Calling)

Describe functions your application exposes with the `tools` parameter, and the model will decide when to call them, returning the function name and JSON arguments instead of (or alongside) a text reply. You execute the function yourself, append the result as a `tool` message, and call the API again so the model can produce its final answer.

The flow is:

1. Send the conversation plus `tools` definitions.
2. If the model wants a tool, the response has `finish_reason: "tool_calls"` and `message.tool_calls` with the function name and stringified JSON `arguments`.
3. Run the function, append the assistant message and a `{"role": "tool", "tool_call_id": ..., "content": ...}` message with the result.
4. Call the API again, the model answers using the tool output.

#### Python

```python
import json
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for an Indian city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name, e.g. Mumbai"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["city"],
            },
        },
    }
]

messages = [{"role": "user", "content": "What's the weather in Mumbai right now?"}]

response = client.chat.completions(
    model="sarvam-105b",
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

message = response.choices[0].message

if message.tool_calls:
    tool_call = message.tool_calls[0]
    args = json.loads(tool_call.function.arguments)

    # Run your actual function here
    weather = {"city": args["city"], "temperature": 31, "condition": "Humid"}

    messages.append(
        {
            "role": "assistant",
            "tool_calls": [
                {
                    "id": tool_call.id,
                    "type": "function",
                    "function": {
                        "name": tool_call.function.name,
                        "arguments": tool_call.function.arguments,
                    },
                }
            ],
        }
    )
    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(weather),
        }
    )

    final = client.chat.completions(
        model="sarvam-105b",
        messages=messages,
        tools=tools,
    )
    print(final.choices[0].message.content)
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for an Indian city",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "City name, e.g. Mumbai" },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
        required: ["city"],
      },
    },
  },
];

async function main() {
  const messages = [
    { role: "user", content: "What's the weather in Mumbai right now?" },
  ];

  const response = await client.chat.completions({
    model: "sarvam-105b",
    messages,
    tools,
    tool_choice: "auto",
  });

  const message = response.choices[0].message;

  if (message.tool_calls?.length) {
    const toolCall = message.tool_calls[0];
    const args = JSON.parse(toolCall.function.arguments);

    // Run your actual function here
    const weather = { city: args.city, temperature: 31, condition: "Humid" };

    messages.push({ role: "assistant", tool_calls: [toolCall] });
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(weather),
    });

    const final = await client.chat.completions({
      model: "sarvam-105b",
      messages,
      tools,
    });
    console.log(final.choices[0].message.content);
  }
}

main();
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sarvam-105b",
    "messages": [
      {"role": "user", "content": "What'\''s the weather in Mumbai right now?"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get the current weather for an Indian city",
          "parameters": {
            "type": "object",
            "properties": {
              "city": {"type": "string", "description": "City name, e.g. Mumbai"},
              "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
          }
        }
      }
    ],
    "tool_choice": "auto"
  }'
```

A tool-call response looks like:

```json
{
  "choices": [
    {
      "index": 0,
      "finish_reason": "tool_calls",
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\": \"Mumbai\", \"unit\": \"celsius\"}"
            }
          }
        ]
      }
    }
  ]
}
```

### Controlling tool use with `tool_choice`

| Value                                                       | Behavior                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `"auto"` (default when tools are provided)                  | The model decides whether to call a tool or reply directly |
| `"none"`                                                    | The model never calls a tool, tools are ignored            |
| `"required"`                                                | The model must call at least one tool                      |
| `{"type": "function", "function": {"name": "get_weather"}}` | Forces the model to call the named function                |

> **Note**
>
> `function.arguments` is a **JSON string**, not an object, always parse it (and validate against your schema) before executing the function.

## Structured Outputs (JSON)

The Chat Completions API supports the OpenAI-compatible `response_format` parameter for getting reliably structured JSON:

| `response_format`                               | Behavior                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `{"type": "json_schema", "json_schema": {...}}` | **Structured Outputs**: output is constrained to match the JSON Schema you supply (recommended) |
| `{"type": "json_object"}`                       | **JSON mode**: output is guaranteed to be valid JSON, but not a specific schema                 |
| `{"type": "text"}` (default)                    | Plain text output                                                                               |

### Structured Outputs with `json_schema`

Pass a JSON Schema under `json_schema.schema`, and set `"strict": true` to enforce adherence. The structured reply arrives as a JSON **string** in `message.content`, parse it before use.

#### Python

```python
import json
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {
            "role": "user",
            "content": "Order: 2 masala dosas and 1 filter coffee to Koramangala, Bengaluru.",
        }
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "food_order",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string"},
                                "quantity": {"type": "integer"},
                            },
                            "required": ["name", "quantity"],
                            "additionalProperties": False,
                        },
                    },
                    "city": {"type": "string"},
                },
                "required": ["items", "city"],
                "additionalProperties": False,
            },
        },
    },
)

order = json.loads(response.choices[0].message.content)
print(order)
# {'items': [{'name': 'masala dosa', 'quantity': 2}, {'name': 'filter coffee', 'quantity': 1}], 'city': 'Bengaluru'}
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

async function main() {
  const response = await client.chat.completions({
    model: "sarvam-105b",
    messages: [
      {
        role: "user",
        content: "Order: 2 masala dosas and 1 filter coffee to Koramangala, Bengaluru.",
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "food_order",
        strict: true,
        schema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  quantity: { type: "integer" },
                },
                required: ["name", "quantity"],
                additionalProperties: false,
              },
            },
            city: { type: "string" },
          },
          required: ["items", "city"],
          additionalProperties: false,
        },
      },
    },
  });

  const order = JSON.parse(response.choices[0].message.content);
  console.log(order);
}

main();
```

#### cURL

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sarvam-105b",
    "messages": [
      {"role": "user", "content": "Order: 2 masala dosas and 1 filter coffee to Koramangala, Bengaluru."}
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "food_order",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {"type": "string"},
                  "quantity": {"type": "integer"}
                },
                "required": ["name", "quantity"],
                "additionalProperties": false
              }
            },
            "city": {"type": "string"}
          },
          "required": ["items", "city"],
          "additionalProperties": false
        }
      }
    }
  }'
```

> **Note**
>
> Both `/v1/chat/completions` and `/v2/chat/completions` expose `response_format`
> as a typed SDK parameter. On V2, call `client.chat.completions_v2`; see the
> [Chat Completion V2 API Reference](/api-reference/chat/chat-completions-v2).

The `json_schema` object accepts:

| Field         | Type              | Description                                                                         |
| ------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `name`        | string (required) | Name of the response format. Alphanumeric characters, underscores and dashes only   |
| `schema`      | object            | The output structure, described as a [JSON Schema](https://json-schema.org/) object |
| `strict`      | boolean           | Enable strict schema adherence when generating the output (default `false`)         |
| `description` | string            | What the format is for, helps the model decide how to respond                       |

### JSON mode with `json_object`

When you only need valid JSON without enforcing a specific structure, use `{"type": "json_object"}` and describe the desired shape in your prompt:

```bash
curl -X POST https://api.sarvam.ai/v1/chat/completions \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sarvam-105b",
    "messages": [
      {"role": "system", "content": "Reply with a JSON object: {\"sentiment\": \"positive\" | \"negative\" | \"neutral\", \"confidence\": number}"},
      {"role": "user", "content": "यह फिल्म शानदार थी!"}
    ],
    "response_format": {"type": "json_object"}
  }'
```

> **Tip**
>
> Even with Structured Outputs, validate the parsed JSON against your expected schema (e.g. with `pydantic` or `zod`) before acting on it, the schema constrains the model's output shape, but your application logic may have stricter requirements (value ranges, business rules, etc.).

### Alternative: Tool calling as a JSON schema

If your workflow is already built around [tool calling](#tool-calling-function-calling), you can also get structured output by defining a single tool whose `parameters` schema describes the structure you want, and forcing it with `tool_choice`. The model's `arguments` are then constrained to the schema.

#### Python

```python
import json
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {
            "role": "user",
            "content": "Order: 2 masala dosas and 1 filter coffee to Koramangala, Bengaluru.",
        }
    ],
    tools=[
        {
            "type": "function",
            "function": {
                "name": "extract_order",
                "description": "Extract a structured food order",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {"type": "string"},
                                    "quantity": {"type": "integer"},
                                },
                                "required": ["name", "quantity"],
                            },
                        },
                        "delivery_area": {"type": "string"},
                        "city": {"type": "string"},
                    },
                    "required": ["items", "city"],
                },
            },
        }
    ],
    tool_choice={"type": "function", "function": {"name": "extract_order"}},
)

arguments = response.choices[0].message.tool_calls[0].function.arguments
order = json.loads(arguments)
print(order)
# {'items': [{'name': 'masala dosa', 'quantity': 2}, {'name': 'filter coffee', 'quantity': 1}], 'delivery_area': 'Koramangala', 'city': 'Bengaluru'}
```

#### JavaScript

```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: "YOUR_SARVAM_API_KEY",
});

async function main() {
  const response = await client.chat.completions({
    model: "sarvam-105b",
    messages: [
      {
        role: "user",
        content: "Order: 2 masala dosas and 1 filter coffee to Koramangala, Bengaluru.",
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "extract_order",
          description: "Extract a structured food order",
          parameters: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    quantity: { type: "integer" },
                  },
                  required: ["name", "quantity"],
                },
              },
              delivery_area: { type: "string" },
              city: { type: "string" },
            },
            required: ["items", "city"],
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "extract_order" } },
  });

  const order = JSON.parse(
    response.choices[0].message.tool_calls[0].function.arguments
  );
  console.log(order);
}

main();
```

### Alternative: Prompt-based JSON

For simple cases, you can also instruct the model to reply with JSON only, set a low `temperature`, and validate the output before using it (consider [JSON mode](#json-mode-with-json_object) instead, which guarantees valid JSON):

```python
import json
from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

response = client.chat.completions(
    model="sarvam-105b",
    messages=[
        {
            "role": "system",
            "content": (
                "Reply with a single JSON object only, no prose, no markdown fences. "
                'Schema: {"sentiment": "positive" | "negative" | "neutral", "confidence": number}'
            ),
        },
        {"role": "user", "content": "यह फिल्म शानदार थी!"},
    ],
    temperature=0.1,
)

raw = response.choices[0].message.content
try:
    result = json.loads(raw)
except json.JSONDecodeError:
    # Retry, or strip markdown fences / extra text before parsing
    raise
print(result)
```

> **Tip**
>
> Always validate model-produced JSON against your expected schema (e.g. with `pydantic` or `zod`) and add a retry path, prompt-based JSON is good, but not guaranteed.

## API Response Format

### Success Response Structure

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1699000000,
  "model": "sarvam-105b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of India is New Delhi. It has been the capital since 1931."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 25,
    "total_tokens": 40
  }
}
```

### Response Fields

| Field                                 | Type    | Description                                                                                                                                                                                                                                |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                  | string  | Unique identifier for the completion request                                                                                                                                                                                               |
| `object`                              | string  | Always `"chat.completion"`                                                                                                                                                                                                                 |
| `created`                             | integer | Unix timestamp when the completion was created                                                                                                                                                                                             |
| `model`                               | string  | The model used for completion                                                                                                                                                                                                              |
| `choices[].index`                     | integer | Index of the choice in the list                                                                                                                                                                                                            |
| `choices[].message.role`              | string  | Always `"assistant"`                                                                                                                                                                                                                       |
| `choices[].message.content`           | string  | The generated text response (`null` when the model calls a tool)                                                                                                                                                                           |
| `choices[].message.reasoning_content` | string  | Thinking steps (only when `reasoning_effort` is set)                                                                                                                                                                                       |
| `choices[].message.tool_calls`        | array   | Tool invocations requested by the model (only when using [tool calling](#tool-calling-function-calling))                                                                                                                                   |
| `choices[].finish_reason`             | string  | Why generation stopped: `"stop"`, `"length"`, `"tool_calls"`, `"content_filter"`, or `"function_call"` (legacy; the deprecated `functions` parameter is ignored on `/v1` and returns `400` on `/v2`, so use `tools`/`tool_choice` instead) |
| `usage.prompt_tokens`                 | integer | Tokens in the input prompt                                                                                                                                                                                                                 |
| `usage.completion_tokens`             | integer | Tokens in the generated response                                                                                                                                                                                                           |
| `usage.total_tokens`                  | integer | Total tokens used (prompt + completion)                                                                                                                                                                                                    |

## Error Responses

All errors return a JSON object with an `error` field (`message`, `code`, `request_id`). The full error-code table, retry guidance, and SDK exception reference live on the central [Errors & Troubleshooting](/api/getting-started/errors-troubleshooting) page.

Errors specific to this endpoint:

| HTTP Status | Error Code              | When This Happens                                                                          | What To Do                                                                                |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `400`       | `invalid_request_error` | Missing `messages` array or missing `model` field, invalid parameters, or context overflow | Include both `model` and a valid `messages` array; check temperature (0–2) and model name |

#### Error Handling Code Example

```python
from sarvamai import SarvamAI
from sarvamai.core.api_error import ApiError

client = SarvamAI(api_subscription_key="YOUR_SARVAM_API_KEY")

try:
    response = client.chat.completions(
        model="sarvam-105b",
        messages=[
            {"role": "user", "content": "What is the capital of India?"}
        ],
    )
    print(response.choices[0].message.content)
except ApiError as e:
    if e.status_code == 400:
        print(f"Bad request: {e.body}")
    elif e.status_code == 403:
        print("Invalid API key. Check your credentials.")
    elif e.status_code == 429:
        print("Rate limit exceeded. Wait and retry.")
    else:
        print(f"Error {e.status_code}: {e.body}")
```

## Limits

| Limit                                    | Value                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Context window                           | 128K tokens (`sarvam-105b`) / 32K tokens (`sarvam-105b-conversations`)                       |
| `max_tokens`                             | Starter 4096 / Pro 16384 / Business 128000 (reasoning tokens count toward completion tokens) |
| `temperature`                            | 0–2 (default 0.5 when reasoning is enabled, the default, and 0.2 when reasoning is disabled) |
| `top_p`                                  | 0–1                                                                                          |
| `n` (completions per request)            | 1–128                                                                                        |
| `frequency_penalty` / `presence_penalty` | -2 to 2                                                                                      |
| `stop`                                   | Up to 4 sequences                                                                            |
| Rate limits                              | See [Rate Limits](/api/getting-started/pricing#rate-limits)                                  |

> **Note**
>
> Check out the [Chat Completion V1 API Reference](/api-reference/chat/chat-completions-v1)
> to explore Chat Completion and all available options.