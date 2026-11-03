## 1. PRODUCT
FixSutra Saathi is an accessible repair-skills network. It captures expert technicians' repair knowledge (by voice and photo), turns it into a searchable knowledge base, and delivers it in formats that deaf, blind, and speech-impaired learners and technicians can use. It also lets them run repair businesses through a call-relay assistant.

Problems it solves:
- Technicians' repair knowledge is undocumented and lost when they retire or move.
- Small-town technicians can't find someone who solved the same fault.
- Repair training and customer calls exclude people with hearing, vision, or speech impairments.
- Repairable appliances get replaced, which creates e-waste.

MVP scope: three categories only (Water Pumps, Inverters, Household Appliances). Support Hindi, Marathi, and English in the UI and voice, with a language switcher built so more languages can be added.

## 6. TECH STACK
- Frontend: React + Vite + TypeScript + Tailwind CSS (or Next.js if you prefer), Framer Motion for animation, a lightweight state manager (Zustand).
- Backend: Node/Express or Python FastAPI with endpoints for transcribe, speak, structure-case, translate, vision-read, search, relay-reply, report-result. Use WebSockets for live captions.
- Storage: SQLite (or a JSON file) with a seed script.
- Include: README with setup, .env.example, run scripts, an architecture diagram (Mermaid) in the README, and a "Demo Script" page in the repo describing the 3-minute demo flow.
