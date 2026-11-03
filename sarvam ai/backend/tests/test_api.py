import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "FixSutra Saathi"

def test_cases_listing():
    response = client.get("/api/cases")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 30
    assert len(data["cases"]) >= 30

def test_structure_case_endpoint():
    payload = {
        "raw_story": "Pump motor humming loud but not rotating, 36mfd capacitor was blown.",
        "category": "water_pumps",
        "language": "hi"
    }
    response = client.post("/api/sarvam/structure-case", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "case" in data
    assert "title" in data["case"]
    assert "fix_steps" in data["case"]
    assert len(data["case"]["fix_steps"]) > 0

def test_relay_expand_endpoint():
    payload = {
        "short_reply": "Yes today at 3pm",
        "customer_query": "Can you come fix my pump today?",
        "language": "hi"
    }
    response = client.post("/api/sarvam/relay-expand", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "expanded_text" in data
    assert len(data["expanded_text"]) > 10

def test_report_result_and_learning_loop():
    payload = {
        "case_id": "wp-01",
        "technician_name": "Test Tech",
        "status": "worked",
        "notes": "Replaced with 36mfd capacitor, ran smooth."
    }
    response = client.post("/api/cases/report-result", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
