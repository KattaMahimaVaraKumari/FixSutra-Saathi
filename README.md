## 1. PRODUCT
FixSutra Saathi is an accessible repair-skills network. It captures expert technicians' repair knowledge (by voice and photo), turns it into a searchable knowledge base, and delivers it in formats that deaf, blind, and speech-impaired learners and technicians can use. It also lets them run repair businesses through a call-relay assistant.

Problems it solves:
- Technicians' repair knowledge is undocumented and lost when they retire or move.
- Small-town technicians can't find someone who solved the same fault.
- Repair training and customer calls exclude people with hearing, vision, or speech impairments.
- Repairable appliances get replaced, which creates e-waste.

MVP scope: three categories only (Water Pumps, Inverters, Household Appliances). Support Hindi, Marathi, and English in the UI and voice, with a language switcher built so more languages can be added.

## 2. SARVAM AI INTEGRATION (IMPORTANT)
Before writing any API code, read https://docs.sarvam.ai/llms.txt and the relevant pages from https://docs.sarvam.ai to get the exact, current endpoints, parameters, model names, and SDK usage. Do not guess API details. Use the official Python or JavaScript SDK where available.
Use these components:
- Saaras v3 (speech-to-text): transcribe technician voice stories (code-mixed, dialect-heavy) and live call captions via streaming/WebSocket. Use codemix and transcribe modes.
- Bulbul (latest available, prefer the v4 Flash model for low latency): spoken step-by-step guidance and the call-relay voice. Allow pitch, pace, and speaker selection.
- Sarvam-105B (chat): (a) structure a raw repair story into a case with fields: symptom, probable cause, fix steps, parts, tools, estimated time, estimated cost, safety warnings, confidence; (b) expand short typed or tapped replies into polite, complete sentences for the call relay; (c) answer learner questions with answers grounded in retrieved repair cases (simple RAG); (d) rewrite steps in accessible styles (see section 4).
- Sarvam Vision / Document Intelligence: read photos of appliance nameplates, part labels, manuals, and handwritten job cards, and return structured fields.
- Mayura / Document Translation: translate cases and manuals between supported languages.
- Instant Voice Cloning (optional, behind a feature flag): let a speech-impaired user pick or create a voice that feels like theirs, with consent screen.
- Voice Agents (optional, behind a feature flag): a customer-booking agent for routine calls.
All API keys must come from environment variables (.env, never hardcoded or exposed to the browser). Create a small backend proxy (Node/Express or Python FastAPI) so the frontend never sees keys. Provide a .env.example.
Build a MOCK MODE toggle (env var USE_MOCKS=true) that returns realistic canned responses so the full demo works offline or if an API call fails. Show a small "Live / Mock" badge in the UI.

## 3. CORE FEATURES (build all)
A. Capture (technician flow)
- Record voice (browser MediaRecorder) and/or upload photos of the fault, part, or nameplate.
- Show a live transcript, then a structured "Repair Case" card produced by Sarvam-105B (symptom, cause, steps, parts, tools, time, cost, safety warnings, confidence score).
- Technician can edit and approve before saving. Save to a local database (SQLite or JSON store).
B. Search (knowledge network)
- Search by voice, text, or photo. Return the closest past cases with similarity score, success rate, and technician credit. Implement simple embedding or keyword + LLM re-ranking; keep it lightweight.
- Filters: category, language, difficulty.
- Seed the database with 30 realistic repair cases (10 per category) in Hindi, Marathi, and English.
C. Accessible Learn mode (learner flow). The same repair case renders in different modes the user can switch between:
- Blind mode: fully voice-driven, hands-free. Bulbul reads one step at a time, with commands like "next", "repeat", "slower", "what tool?", "why?". Include sensory cues (sound, touch, smell, safe-distance warnings). Full keyboard and screen-reader support. Reads nameplates and manuals aloud from photos.
- Deaf mode: text-first. Illustrated step cards, a visual troubleshooting decision tree, live captions for any audio or mentor talk, visual alerts instead of sounds, text Q&A with the assistant.
- Speech-impaired mode: type or tap quick-reply chips to ask questions; Bulbul speaks them aloud in the chosen voice.
- Standard mode for everyone.
D. Call Relay (the hero demo feature)
- Simulated phone-call screen: incoming customer speech (microphone or pre-recorded sample audio) is transcribed live by Saaras and shown as large captions.
- The user types or taps quick replies ("Yes, I can come today", "Quote: Rs. X", "Please send a photo"). Sarvam-105B expands them into natural, polite sentences in the customer's language, and Bulbul speaks them with minimal latency. Show a visible latency meter (ms).
- Auto-create a booking card (customer, issue, time, estimated price) after the call.
- Include a post-call summary.
E. Learning loop
- After a repair, the technician reports the result (worked / partly / failed, notes by voice or tap). The case's success rate, confidence, and the knowledge base update visibly. Failed fixes are flagged for mentor review.
F. Skill pathway
- Learner profile with guided modules per category, a progress tracker, a verified-skill record built from completed repairs, and a "Sutra Technicians" directory where customers can find and book technicians by voice or WhatsApp-style chat.
G. Impact dashboard
- Live counters: repairs documented, learners trained, estimated e-waste avoided (kg), estimated money saved, languages used.
- Include an "If shipped" calculator with adjustable assumptions (target population, adoption rate) that outputs estimated people benefited, with the assumptions and a note that figures are estimates. Do not hard-code unsourced statistics as facts.
H. Safety and trust
- Every electrical or high-risk case shows a prominent safety banner and requires a "mentor-verified" badge for high-voltage steps.
- Show confidence scores and "verify with a mentor" prompts. Do not claim sign-language translation; label Indian Sign Language as "Coming soon".
- Privacy: no call audio stored by default, clear consent screens for recording and voice cloning.

## 4. ACCESSIBILITY (non-negotiable)
- WCAG 2.2 AA minimum: contrast, focus states, keyboard navigation for every feature, skip links, ARIA labels and live regions for captions, semantic HTML.
- Accessibility panel always one tap away: font size, high-contrast theme, reduced motion, dyslexia-friendly font, caption size, speech rate.
- Glassmorphism must never harm legibility: use sufficiently opaque glass panels behind text, and provide a "reduce transparency" toggle that switches to solid surfaces.
- Support voice commands and large touch targets (min 48px) for all primary actions. Design mobile-first.

## 5. DESIGN SYSTEM (glassmorphism, polished, modern)
- Style: premium glassmorphism. Frosted translucent cards (backdrop-filter blur 16-24px), subtle 1px light borders, soft layered shadows, rounded corners (20-28px), gradient mesh background with slow-moving soft orbs (disabled when reduced motion is on).
- Palette: deep indigo/navy base with warm saffron-orange and teal accents (an Indian, trustworthy, energetic feel). Provide both dark and light themes with CSS variables.
- Typography: a clean modern sans for UI (Inter or Plus Jakarta Sans) and make sure Devanagari renders beautifully (Noto Sans Devanagari). Large, readable sizes.
- Components: glass navbar, hero with animated waveform, mode switcher (segmented control), step cards, chat/caption bubbles, case cards, progress rings, toast notifications, skeleton loaders, animated mic button with live waveform, latency meter.
- Micro-interactions: smooth transitions, hover lifts, haptic-style press states. Keep animations tasteful and respect prefers-reduced-motion.
- Pages: Landing, Capture, Search, Learn, Call Relay, Skill Pathway, Technician Directory, Impact Dashboard, About/Safety. Keep navigation simple, with a persistent accessibility button and language switcher.
- The landing page should tell the story in 30 seconds: problem, solution, a 4-card "four ways to use it" section (technician, blind learner, deaf learner, speech-impaired user), live demo button, and impact numbers.

## 6. TECH STACK
- Frontend: React + Vite + TypeScript + Tailwind CSS (or Next.js if you prefer), Framer Motion for animation, a lightweight state manager (Zustand).
- Backend: Node/Express or Python FastAPI with endpoints for transcribe, speak, structure-case, translate, vision-read, search, relay-reply, report-result. Use WebSockets for live captions.
- Storage: SQLite (or a JSON file) with a seed script.
- Include: README with setup, .env.example, run scripts, an architecture diagram (Mermaid) in the README, and a "Demo Script" page in the repo describing the 3-minute demo flow.
