from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import pathlib
import google.generativeai as genai

# init Flask
app = Flask(__name__)

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

@app.route('/', methods=['GET'])
def home():
    return 'Welcome to Gemini Python Rest Api'

# API Endpoint to generate content from text prompt
@app.route('/generate', methods=['POST'])
def generate_content():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    # calling Gemini Model here to get response against the text prompt
    response = model.generate_content(prompt)
    return jsonify({'text': response.text})

# API Endpoint to generate content from text, Image prompt
@app.route('/generate-from-image', methods=['POST'])
def generate_content_from_image():
    data = request.json
    prompt = data.get('prompt')
    image_url = data.get('image_url')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    response = model.generate_content([prompt, image_url])
    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(debug=True)