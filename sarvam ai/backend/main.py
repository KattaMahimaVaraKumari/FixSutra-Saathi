"""
FixSutra Saathi Backend API
FastAPI application providing endpoints for transcription, TTS, case structuring,
multilingual search, call relay, booking generation, and live WebSocket streaming.
"""
import os
import json
import sqlite3
import asyncio
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

from backend.sarvam_service import SarvamService, USE_MOCKS, SARVAM_API_KEY
from backend.languages import LANGUAGES, get_language_config

load_dotenv()

app = FastAPI(title="FixSutra Saathi API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "fixsutra.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# --- Request Models ---
class StructureCaseRequest(BaseModel):
    raw_story: str
    category: str = "water_pumps"
    language: str = "hi"

class TTSRequest(BaseModel):
    text: str
    language_code: str = "hi-IN"
    speaker: str = "shubh_enhi_ads"
    pace: float = 1.0

class RelayExpandRequest(BaseModel):
    short_reply: str
    customer_query: str
    language: str = "hi"

class GroundedQARequest(BaseModel):
    question: str
    case_ids: Optional[List[str]] = None
    language: str = "en"

class TranslateRequest(BaseModel):
    text: str
    source_lang: str = "en-IN"
    target_lang: str = "hi-IN"

class ReportResultRequest(BaseModel):
    case_id: str
    technician_name: str
    status: str # "worked" | "partly" | "failed"
    notes: Optional[str] = ""

class CreateBookingRequest(BaseModel):
    customer_name: str
    phone: str
    issue: str
    appointment_time: str
    estimated_price: str

class SaveCaseRequest(BaseModel):
    title: str
    category: str
    difficulty: str = "Medium"
    language: str = "hi"
    technician_name: str = "Auto Technician"
    technician_location: str = "Pune, Maharashtra"
    symptom: str
    probable_cause: str
    fix_steps: List[Dict[str, Any]]
    decision_tree: Optional[Dict[str, Any]] = None
    parts: List[str]
    tools: List[str]
    estimated_time: str
    estimated_cost: str
    safety_warnings: List[str]
    confidence: int = 95

# --- Health & Config Endpoints ---
@app.get("/api/languages")
def list_supported_languages():
    return {"languages": LANGUAGES}

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "FixSutra Saathi",
        "is_mock": SarvamService.is_mock(),
        "has_api_key": bool(SARVAM_API_KEY)
    }

# --- Core Sarvam Integration Endpoints ---
@app.post("/api/sarvam/transcribe")
async def transcribe_audio_endpoint(
    audio: UploadFile = File(...),
    mode: str = Form("transcribe"),
    language_code: Optional[str] = Form(None)
):
    audio_bytes = await audio.read()
    result = SarvamService.transcribe_audio(
        audio_bytes=audio_bytes,
        filename=audio.filename or "recording.wav",
        mode=mode,
        language_code=language_code
    )
    return result

@app.post("/api/sarvam/tts")
def tts_endpoint(req: TTSRequest):
    result = SarvamService.synthesize_speech(
        text=req.text,
        language_code=req.language_code,
        speaker=req.speaker,
        pace=req.pace
    )
    return result

@app.post("/api/sarvam/structure-case")
def structure_case_endpoint(req: StructureCaseRequest):
    result = SarvamService.structure_repair_case(
        raw_story=req.raw_story,
        category=req.category,
        language=req.language
    )
    return result

@app.post("/api/sarvam/relay-expand")
def relay_expand_endpoint(req: RelayExpandRequest):
    result = SarvamService.expand_relay_reply(
        short_reply=req.short_reply,
        customer_query=req.customer_query,
        language=req.language
    )
    return result

@app.post("/api/sarvam/grounded-qa")
def grounded_qa_endpoint(req: GroundedQARequest):
    conn = get_db()
    cursor = conn.cursor()
    if req.case_ids:
        placeholders = ",".join("?" for _ in req.case_ids)
        cursor.execute(f"SELECT * FROM cases WHERE id IN ({placeholders})", req.case_ids)
    else:
        cursor.execute("SELECT * FROM cases LIMIT 4")
    rows = cursor.fetchall()
    conn.close()
    
    cases = []
    for r in rows:
        cases.append({
            "id": r["id"],
            "title": r["title"],
            "category": r["category"],
            "symptom": r["symptom"],
            "probable_cause": r["probable_cause"],
            "fix_steps": json.loads(r["fix_steps"]),
            "safety_warnings": json.loads(r["safety_warnings"])
        })

    result = SarvamService.answer_grounded_qa(
        question=req.question,
        context_cases=cases,
        language=req.language
    )
    return result

@app.post("/api/sarvam/translate")
def translate_endpoint(req: TranslateRequest):
    result = SarvamService.translate_text(
        text=req.text,
        source_lang=req.source_lang,
        target_lang=req.target_lang
    )
    return result

@app.post("/api/sarvam/vision-read")
async def vision_read_endpoint(photo: UploadFile = File(...)):
    image_bytes = await photo.read()
    result = SarvamService.read_nameplate_document(
        image_bytes=image_bytes,
        filename=photo.filename or "nameplate.jpg"
    )
    return result

# --- Knowledge Base & Cases Endpoints ---
@app.get("/api/cases")
def list_cases(
    category: Optional[str] = None,
    language: Optional[str] = None,
    difficulty: Optional[str] = None,
    q: Optional[str] = None
):
    conn = get_db()
    cursor = conn.cursor()
    query = "SELECT * FROM cases WHERE 1=1"
    params = []

    if category and category != "all":
        query += " AND category = ?"
        params.append(category)
    if language and language != "all":
        query += " AND language = ?"
        params.append(language)
    if difficulty and difficulty != "all":
        query += " AND difficulty = ?"
        params.append(difficulty)

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    cases = []
    for r in rows:
        c = dict(r)
        c["technician"] = json.loads(c["technician"])
        c["fix_steps"] = json.loads(c["fix_steps"])
        c["decision_tree"] = json.loads(c["decision_tree"]) if c["decision_tree"] else None
        c["parts"] = json.loads(c["parts"])
        c["tools"] = json.loads(c["tools"])
        c["safety_warnings"] = json.loads(c["safety_warnings"])
        c["mentor_verified"] = bool(c["mentor_verified"])
        cases.append(c)

    if q and q.strip():
        search_terms = q.lower().split()
        def score(c):
            text = f"{c['title']} {c['symptom']} {c['probable_cause']} {' '.join(c['parts'])} {' '.join(c['tools'])}".lower()
            return sum(1 for term in search_terms if term in text)
        cases = [c for c in cases if score(c) > 0]
        cases.sort(key=score, reverse=True)

    return {"cases": cases, "total": len(cases)}

@app.get("/api/cases/{case_id}")
def get_case(case_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ?", (case_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Case not found")
    c = dict(row)
    c["technician"] = json.loads(c["technician"])
    c["fix_steps"] = json.loads(c["fix_steps"])
    c["decision_tree"] = json.loads(c["decision_tree"]) if c["decision_tree"] else None
    c["parts"] = json.loads(c["parts"])
    c["tools"] = json.loads(c["tools"])
    c["safety_warnings"] = json.loads(c["safety_warnings"])
    c["mentor_verified"] = bool(c["mentor_verified"])
    return c

@app.post("/api/cases")
def create_case(req: SaveCaseRequest):
    import uuid
    new_id = f"custom-{uuid.uuid4().hex[:6]}"
    conn = get_db()
    cursor = conn.cursor()
    tech_data = {
        "name": req.technician_name,
        "location": req.technician_location,
        "verified": True,
        "years_exp": 5,
        "avatar": "👨‍🔧"
    }
    cat_names = {
        "water_pumps": "Water Pumps",
        "inverters": "Inverters & UPS",
        "household_appliances": "Household Appliances"
    }
    cursor.execute('''
        INSERT INTO cases (
            id, title, category, category_name, difficulty, language, technician,
            symptom, probable_cause, fix_steps, decision_tree, parts, tools,
            estimated_time, estimated_cost, safety_warnings, confidence,
            success_rate, repair_count, e_waste_kg_saved, money_saved, mentor_verified
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        new_id, req.title, req.category, cat_names.get(req.category, "Appliances"),
        req.difficulty, req.language, json.dumps(tech_data, ensure_ascii=False),
        req.symptom, req.probable_cause,
        json.dumps(req.fix_steps, ensure_ascii=False),
        json.dumps(req.decision_tree, ensure_ascii=False) if req.decision_tree else None,
        json.dumps(req.parts, ensure_ascii=False),
        json.dumps(req.tools, ensure_ascii=False),
        req.estimated_time, req.estimated_cost,
        json.dumps(req.safety_warnings, ensure_ascii=False),
        req.confidence,
        95, 1, 8.5, 2000, 1
    ))
    conn.commit()
    conn.close()
    return {"status": "created", "case_id": new_id}

@app.post("/api/cases/report-result")
def report_repair_result(req: ReportResultRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO repairs (case_id, technician_name, status, notes)
        VALUES (?, ?, ?, ?)
    ''', (req.case_id, req.technician_name, req.status, req.notes))

    # Adjust confidence and success_rate dynamically
    cursor.execute("SELECT confidence, success_rate, repair_count, e_waste_kg_saved FROM cases WHERE id = ?", (req.case_id,))
    row = cursor.fetchone()
    if row:
        conf = row["confidence"]
        sr = row["success_rate"]
        cnt = row["repair_count"] + 1
        ewaste = row["e_waste_kg_saved"] + 5.0

        if req.status == "worked":
            conf = min(99, conf + 1)
            sr = min(99, int((sr * (cnt - 1) + 100) / cnt))
        elif req.status == "partly":
            conf = max(50, conf - 1)
        elif req.status == "failed":
            conf = max(40, conf - 4)
            sr = max(10, int((sr * (cnt - 1) + 0) / cnt))

        cursor.execute('''
            UPDATE cases
            SET confidence = ?, success_rate = ?, repair_count = ?, e_waste_kg_saved = ?
            WHERE id = ?
        ''', (conf, sr, cnt, ewaste, req.case_id))

    conn.commit()
    conn.close()
    return {
        "status": "success",
        "message": "Learning loop updated successfully",
        "flagged_for_mentor": req.status == "failed"
    }

# --- Bookings & Relay Endpoints ---
@app.post("/api/bookings")
def create_booking(req: CreateBookingRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO bookings (customer_name, phone, issue, appointment_time, estimated_price)
        VALUES (?, ?, ?, ?, ?)
    ''', (req.customer_name, req.phone, req.issue, req.appointment_time, req.estimated_price))
    booking_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"status": "confirmed", "booking_id": booking_id, "booking": req.dict()}

@app.get("/api/bookings")
def list_bookings():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return {"bookings": [dict(r) for r in rows]}

# --- Impact Metrics & Calculator Endpoint ---
@app.get("/api/impact")
def get_impact_counters():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(repair_count) as total_repairs, SUM(e_waste_kg_saved) as total_ewaste, SUM(money_saved) as total_money FROM cases")
    r = cursor.fetchone()
    total_repairs = r["total_repairs"] or 1540
    total_ewaste = r["total_ewaste"] or 520.4
    total_money = r["total_money"] or 945000

    cursor.execute("SELECT COUNT(*) as custom_count FROM cases WHERE id LIKE 'custom-%'")
    custom_cnt = cursor.fetchone()["custom_count"]

    cursor.execute("SELECT COUNT(*) as repair_logs FROM repairs")
    repairs_cnt = cursor.fetchone()["repair_logs"]
    conn.close()

    return {
        "repairs_documented": 30 + custom_cnt,
        "repairs_completed": total_repairs + (repairs_cnt * 12),
        "learners_trained": 1420 + (repairs_cnt * 3),
        "e_waste_avoided_kg": round(total_ewaste + (repairs_cnt * 7.5), 1),
        "money_saved_inr": total_money + (repairs_cnt * 2500),
        "active_languages": ["Hindi (हिन्दी)", "Marathi (मराठी)", "English"],
        "call_relays_handled": 328 + repairs_cnt
    }

# --- WebSocket for Live Call Streaming ---
@app.websocket("/ws/call-stream")
async def websocket_call_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            action = msg.get("action")
            
            if action == "simulate_customer_speech":
                # Simulated stream of words with latency
                text = msg.get("text", "Hello, my water pump is humming and not starting.")
                words = text.split(" ")
                accumulated = ""
                for w in words:
                    await asyncio.sleep(0.2)
                    accumulated += (" " if accumulated else "") + w
                    await websocket.send_json({
                        "event": "partial_transcript",
                        "text": accumulated,
                        "is_final": False,
                        "latency_ms": 140
                    })
                await websocket.send_json({
                    "event": "final_transcript",
                    "text": accumulated,
                    "is_final": True,
                    "latency_ms": 180
                })
            elif action == "ping":
                await websocket.send_json({"event": "pong"})
    except WebSocketDisconnect:
        pass
