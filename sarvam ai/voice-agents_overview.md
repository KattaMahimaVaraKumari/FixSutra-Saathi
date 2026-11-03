> This page is for Voice Agents.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Voice Agents overview: AI voice agents for Indian languages

> Learn what Sarvam Voice Agents does: build, deploy and monitor AI voice agents in 11 Indian languages across phone, web, API and SDK channels.

Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute.

For a product tour, see the [Sarvam Voice Agents product page](https://www.sarvam.ai/products/voice-agents). For plans and a cost estimate, see [Voice Agents pricing on sarvam.ai](https://www.sarvam.ai/products/voice-agents/pricing).

## Where to find Voice Agents

Voice Agents lives in the Sarvam platform. Log in with your Sarvam account and open **Voice Agents** from the left menu to start building:

#### [Open Voice Agents](https://indus.sarvam.ai/samvaad?ref=docs)

Log in at indus.sarvam.ai/samvaad to create, deploy, and manage your agents.

![The Sarvam platform home screen. The left navigation lists Model APIs, Voice Agents, Content Studio, and Doc Agents; the main area shows product cards and a credits balance.](/_fern-files/_img/3124f05358412ac8e5259ebb2904cf6ef18c1a6dffa1928330a5b8b3219e0ea4.webp)

## What it is

Voice Agents is a platform for building, deploying, and monitoring **conversational agents (voice and text)** that let you talk to your customers at scale. Author an agent once and run it across the channels your customers already use, in 11 languages.

#### [Build](/voice-agents/build/overview)

Design agent behavior, voice, language, tools, and conversation flow.

#### [Deploy](/voice-agents/deploy/overview)

Test in test agent, connect telephony, and go live on phone numbers.

#### [Monitor](/voice-agents/monitor/overview)

Track analytics and build custom boards for agent performance.

## What is a conversational agent?

A conversational agent is software that talks with your end customers in natural language to get something done: answer a question, collect information, complete a transaction, or hand off to a human. Instead of navigating a menu or filling a form, the customer simply speaks or types, and the agent responds.

Agents come in two primary modalities:

| Modality  | The customer…      | How it works                                                         |
| --------- | ------------------ | -------------------------------------------------------------------- |
| **Voice** | Speaks and listens | A real-time ASR → LLM → TTS loop (see [Architecture](#architecture)) |
| **Chat**  | Types and reads    | Text in, text out, with support for richer message types             |

The same underlying agent design (prompts, tools, knowledge, and variables) powers both. What changes is how the customer sends and receives turns, and which [channel](#channels) the agent runs on.

## Languages

Agents operate across **11 languages**: Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese, plus English. They can also handle code-mixed speech, alphanumerics, and proper nouns.

## Channels

The same agent can be deployed to multiple channels:

| Channel                  | Use it for                                                   |
| ------------------------ | ------------------------------------------------------------ |
| Telephony                | Inbound and outbound phone calls                             |
| WhatsApp                 | Chat over WhatsApp                                           |
| Web                      | A voice or chat widget embedded in your site                 |
| API                      | Driving the agent programmatically from your own application |
| SDK (agent as a service) | Embedding the agent into your application with our SDKs      |

### Availability by agent type

Voice agents are generally available on every channel except WhatsApp. Text agents, and voice agents on WhatsApp, are available to enterprise customers on request.

| Channel                  | Voice agent | Text agent |
| ------------------------ | :---------: | :--------: |
| Telephony                |             |            |
| Web                      |             |            |
| API                      |             |            |
| SDK (agent as a service) |             |            |
| WhatsApp                 |             |            |

Generally available   ·    Enterprise, on request

> **Note**
>
> This documentation currently covers **voice agents**. Text agents and the enterprise-only options above aren't covered here yet. To enable them, [contact us](mailto:support@sarvam.ai) about the enterprise plan.

## What you can build

Common agents teams run on Voice Agents:

* Appointment booking and reminders
* Payment follow-ups and collections
* Cart recovery
* Inbound customer support
* Marketing communication and lead generation
* Employee training and roleplay — onboarding sessions, compliance walkthroughs, and simulated customer conversations
* Long tutorials and guided walkthroughs — step-by-step product or process guidance
* Extended support and advisory conversations — troubleshooting, check-ins, and long discovery calls

The last three are enabled by the 60-minute max call length (raised from 25 in August 2026, see the [Changelog](/changelog)).

Worked use cases on sarvam.ai:

* [AI voice agent for appointment booking](https://www.sarvam.ai/voice-agents/appointment-booking)
* [AI voice agent for cart abandonment](https://www.sarvam.ai/voice-agents/cart-abandonment)
* [AI voice agent for lead qualification](https://www.sarvam.ai/voice-agents/lead-qualification)
* [AI voice agent for order status calls](https://www.sarvam.ai/voice-agents/order-status)
* [AI voice agent for pre-approved loan offers](https://www.sarvam.ai/voice-agents/pre-approved-loan-offers)
* [AI voice agents for collections](https://www.sarvam.ai/solutions/collections)

Many teams use Voice Agents as an alternative to traditional CRM-driven outreach: they engage users directly through conversation, drive strong outcomes, and capture rich feedback from the conversational data itself.

Agents can call your systems, CRM, core banking, payments, and others, through [tools](/voice-agents/build/tools), so they can act, not just answer.

## Self-hosted models

Every model in the Voice Agents stack, speech recognition, reasoning, and speech synthesis, is **self-hosted by Sarvam** rather than called out to a third-party provider. That gives you:

* **Data residency in India**: all data, including any PII, stays within India, which matters for compliance and data-protection requirements.
* **Lower latency**: no external network hops between stages, which matters most for real-time voice.
* **Higher reliability**: the stack doesn't depend on the uptime or rate limits of an outside API.
* **More control over quality**: the models are tuned and versioned together as one stack.

See [Models](/voice-agents/build/models) for the models behind the stack.

## Build your first agent in 5 minutes

Follow the [Quickstart](/voice-agents/quickstart) to create a voice agent, test it in test agent, and place your first call.