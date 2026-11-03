import subprocess
import sys
import os
import time

def run():
    print("=" * 60)
    print("      FixSutra Saathi - Sarvam AI Hackathon Launcher")
    print("=" * 60)

    # 1. Seed database if not present
    db_path = os.path.join("backend", "data", "fixsutra.db")
    if not os.path.exists(db_path):
        print("[1/3] Initializing SQLite database with 30 realistic cases...")
        subprocess.run([sys.executable, "backend/seed.py"], check=True)
    else:
        print("[1/3] Database verified (30 cases ready).")

    # 2. Run backend
    print("[2/3] Launching FastAPI backend on http://localhost:8000...")
    backend_proc = subprocess.Popen([
        sys.executable, "-m", "uvicorn", "backend.main:app",
        "--host", "0.0.0.0", "--port", "8000"
    ])

    # 3. Run frontend
    print("[3/3] Launching React Vite frontend on http://localhost:5173...")
    frontend_proc = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd="frontend",
        shell=True
    )

    print("\n" + "=" * 60)
    print(" FixSutra Saathi is running!")
    print(" Frontend: http://localhost:5173")
    print(" Backend Docs: http://localhost:8000/docs")
    print(" Press Ctrl+C to stop both servers.")
    print("=" * 60 + "\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping FixSutra Saathi services...")
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    run()
