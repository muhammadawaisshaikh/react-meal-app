from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load the .env file
load_dotenv()

# Access the GOOGLE_API_KEY environment variable
api_key = os.getenv('GOOGLE_API_KEY')

if api_key is None:
    raise ValueError("GOOGLE_API_KEY is not set in the environment variables")

# coonfigure google ai
genai.configure(api_key=api_key)

# configure Gemini Model
model = genai.GenerativeModel('gemini-1.0-pro-latest')

response = model.generate_content("The opposite of hot is")
print(response.text)