import os
import sys
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ.get("SARVAM_API_KEY")
if not api_key:
    print("Error: SARVAM_API_KEY not found in environment.", file=sys.stderr)
    sys.exit(1)

from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key=api_key)

response = client.chat.completions(
    model="sarvam-105b-conversations",
    messages=[
        {"role": "user", "content": "Hello! Please give a one-sentence greeting."}
    ],
)

print(response.choices[0].message.content)
