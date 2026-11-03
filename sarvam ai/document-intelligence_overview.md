> This page is for Model APIs.

> Sarvam Voice Agents (Samvaad) is a voice AI agent platform for Indian languages: build, test and deploy AI calling agents on your own phone numbers, from ₹3 a minute. Start here: https://docs.sarvam.ai/voice-agents/why-voice-agents.
> For clean Markdown of any page, append `.md` to the page URL.
> For a complete documentation index, see https://docs.sarvam.ai/llms.txt. For a section index, append `/llms.txt` to any section URL (for example https://docs.sarvam.ai/voice-agents/llms.txt).
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.sarvam.ai/_mcp/server.

# Document Intelligence Overview

> Transform documents into structured, queryable data with Sarvam's Document AI API. Powered by Sarvam Vision 2.1 for digitisation, field extraction, splitting, and classification across 23 languages (22 Indian + English).

Sarvam's Document AI API turns scanned and digital documents into structured, machine-readable data. It is powered by [Sarvam Vision 2.1](/api/api-guides-tutorials/models/sarvam-vision) and supports 23 languages (22 Indian + English), so a Hindi invoice and an English contract go through the same API.

## Pick an operation

Four operations share one job model. Pick based on what you need out the other end.

#### [Parse](/api/api-guides-tutorials/document-intelligence/how-to/parse)

You need the **whole page** as text, with layout and tables preserved. Use it for archival, search, and RAG. Output: HTML, Markdown, or JSON.

#### [Extract](/api/api-guides-tutorials/document-intelligence/how-to/extract)

You need **specific values**, such as a total or an ID number. Use it for KYC, invoices, and forms. Output: JSON, CSV, or XLSX.

#### [Split](/api/api-guides-tutorials/document-intelligence/how-to/split)

**One file holds several documents**, such as a scanned stack. Output: child documents with their page ranges.

#### [Classify](/api/api-guides-tutorials/document-intelligence/how-to/classify)

You need to know **what kind of document** it is, to route or triage files. Output: a type, with evidence and a review flag.

|                       | Parse                       | Extract                                | Split                         | Classify                            |
| --------------------- | --------------------------- | -------------------------------------- | ----------------------------- | ----------------------------------- |
| **You provide**       | A document                  | A document + a schema (or `config_id`) | A document (+ a split method) | A document (+ categories, optional) |
| **Fetch output with** | `get_download_url()`        | `get_results()`                        | `get_results()`               | `get_results()`                     |
| **Endpoint**          | `POST /doc-ai/v1/job/parse` | `POST /doc-ai/v1/job/extract`          | `POST /doc-ai/v1/job/split`   | `POST /doc-ai/v1/job/classify`      |

## Before you start

#### Get an API key

Create one on the [Sarvam dashboard](https://indus.sarvam.ai/key-management?ref=docs) and export it as `SARVAM_API_KEY`.

```bash
export SARVAM_API_KEY="YOUR_SARVAM_API_KEY"
```

#### Install the SDK

#### Python

```bash
pip install -U sarvamai
```

#### JavaScript

```bash
npm install sarvamai
```

Prefer plain HTTP? Every how-to also has a cURL version. See the [Quickstart](/api/getting-started/quickstart) for the full setup.

## How a job works

Every operation follows the same three steps:

1. **Submit** with `parse()`, `extract()`, `split()`, or `classify()`. One call creates the job and returns a `job_id`.
2. **Poll** `get_status()` until the job finishes.
3. **Fetch** the output with `get_results()` or `get_download_url()`.

Job states, the status response, and error handling are covered in [Jobs & Errors](/api/api-guides-tutorials/document-intelligence/job-lifecycle).

## Combine operations

The operations are designed to chain.

| Goal                             | Chain                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process a scanned bundle         | **Split** the file, then **classify** each child document by its `document_ref`                                                                       |
| Route by document type           | **Classify**, then **extract** with the schema (or `config_id`) that matches the type                                                                 |
| Index a document archive         | **Parse** to Markdown, then chunk and embed the output                                                                                                |
| Capture the same fields at scale | Save a schema as a [`config_id`](/api/api-guides-tutorials/document-intelligence/how-to/extract#reuse-a-schema) and reuse it across **extract** calls |

> **Note**
>
> **Document AI supersedes the earlier Document Digitization API.** The namespace is `doc_ai`, and each operation is a single call.

## Next steps

* [Jobs & Errors](/api/api-guides-tutorials/document-intelligence/job-lifecycle): states, polling, status response, and error codes.
* [Languages, Formats & Limits](/api/api-guides-tutorials/document-intelligence/languages-formats-limits): supported languages, input formats, and page and file-size limits.
* [Sarvam Vision 2.1](/api/api-guides-tutorials/models/sarvam-vision): the model behind Document AI.
* [API Reference](/api-reference/doc-ai/job/parse): every parameter and option.
* [API Dashboard](https://indus.sarvam.ai/?ref=docs): upload and process documents without writing code.