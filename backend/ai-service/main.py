from fastapi import FastAPI
from pydantic import BaseModel
import PyPDF2
import os
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv
import requests
import tempfile

# -----------------------------
# CONFIGURATION
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("⚠️ WARNING: GROQ_API_KEY not found. Please add it to .env")
    client = None
else:
    # Initialize Groq Client
    client = Groq(api_key=GROQ_API_KEY)
    print("✅ Connected to Groq AI")

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
UPLOADS_FILES_DIR = os.path.join(UPLOADS_DIR, "files")
UPLOADS_MEETINGS_DIR = os.path.join(UPLOADS_DIR, "meetings")

import json

# -----------------------------
# AI GENERATOR (Using Llama 3 on Groq)
# -----------------------------
def generate_ai_summary(text: str):
    if not client:
        return {"error": "Server API Key missing."}

    try:
        # Llama 3.3 is the latest, powerful model. 
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": (
                        "You are an expert Study Assistant. Your task is to analyze the provided text and return a JSON object with exactly three fields:\n"
                        "1. 'title': A catchy 3-word title representing the main topic.\n"
                        "2. 'summary': A concise clear summary in Markdown format.\n"
                        "3. 'tags': A list of exactly 3 relevant tags (e.g., '#Physics', '#Important').\n"
                        "Return ONLY the JSON object, no other text."
                    )
                },
                {
                    "role": "user", 
                    "content": f"Analyze and summarize this text:\n\n{text}"
                }
            ],
            temperature=0.5,
            max_tokens=2048,
            response_format={"type": "json_object"}
        )
        
        # Parse the JSON response
        result = json.loads(completion.choices[0].message.content)
        return result
        
    except Exception as e:
        print(f"❌ Groq Error: {e}")
        if "context_length_exceeded" in str(e):
             return {"error": "File is too large for the Free AI tier. Please upload a shorter document."}
        return {"error": f"AI Error: {str(e)}"}

# -----------------------------
# ROUTES
# -----------------------------
class TextInput(BaseModel):
    text: str

@app.post("/summarize")
async def summarize_text(data: TextInput):
    if not data.text.strip():
        return {"error": "No text provided"}
    
    result = generate_ai_summary(data.text)
    return result

# -----------------------------
# FILE HANDLING
# -----------------------------
def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    try:
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted: text += extracted
    except Exception: pass
    return text

class FileInput(BaseModel):
    file_url: str

@app.post("/summarize-file")
async def summarize_file(data: FileInput):
    try:
        file_url = data.file_url

        response = requests.get(file_url)

        if response.status_code != 200:
            return {
                "error": "Unable to download file"
            }

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:
            temp_file.write(response.content)
            temp_path = temp_file.name

        text = extract_text_from_pdf(temp_path)

        try:
            os.remove(temp_path)
        except:
            pass

        if len(text) < 50:
            return {
                "error": "PDF seems empty or scanned"
            }

        if len(text) > 100000:
            text = text[:100000]

        result = generate_ai_summary(text)

        return result

    except Exception as e:
        print("SUMMARIZE ERROR:", str(e))

        return {
            "error": str(e)
        }
  



# -----------------------------
# CHAT WITH NOTE (Q&A)
# -----------------------------
class ChatInput(BaseModel):
    text: str
    question: str

@app.post("/chat-with-note")
async def chat_with_note(data: ChatInput):
    if not client:
        return {"error": "Server API Key missing."}

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": (
                        "You are an expert Study Assistant. Use the provided document text to answer the user's question accurately. "
                        "If the answer isn't in the text, say you don't know based on the provided content. "
                        "Keep answers concise and helpful."
                    )
                },
                {
                    "role": "user", 
                    "content": f"DOCUMENT TEXT:\n\n{data.text}\n\nUSER QUESTION: {data.question}"
                }
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

# -----------------------------
# FLASHCARD GENERATOR
# -----------------------------
class FlashcardInput(BaseModel):
    text: str

@app.post("/generate-flashcards")
async def generate_flashcards(data: FlashcardInput):
    if not client:
        return {"error": "Server API Key missing."}

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": (
                        "You are an expert Study Assistant. Generate exactly 5 challenging flashcards from the provided text. "
                        "Return a JSON object with a field 'flashcards' which is a list of objects, each having 'question' and 'answer' fields. "
                        "Return ONLY the JSON object."
                    )
                },
                {
                    "role": "user", 
                    "content": f"Create flashcards for this text:\n\n{data.text}"
                }
            ],
            temperature=0.6,
            max_tokens=2048,
            response_format={"type": "json_object"}
        )
        result = json.loads(completion.choices[0].message.content)
        return result
    except Exception as e:
        return {"error": str(e)}