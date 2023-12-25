import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from '../helpers/imageHelper';

const Home = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyDtiBA7Z3cIgjqzSktQUm0zGj3uQBAWuso');

  const [search, setSearch] = useState('');
  const [image, setImage] = useState('');
  const [imageInineData, setImageInlineData] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiWith, setLAiWith] = useState('text');

  /**
   * Generative AI Call to fetch text insights
   */
  async function aiRun() {
    setLoading(true);
    setResponse('');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `random meals related to ${search} category with images and prices`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  /**
   * Generative AI Call to fetch image insights
   */
  async function aiImageRun() {
    setLoading(true);
    setResponse('');
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      "What's in this photo?", imageInineData
    ]);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleClick = () => {
    if (aiWith == 'text') {
      aiRun();
    }
    else if (aiWith == 'image') {
      aiImageRun();
    }
  }

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch(e => console.log(e))

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

  return (
    <div>
      <h1>Generative AI Restaurant App!</h1>
      <p>Built with ❤️ using ReactJS + Redux + Google Gemini</p>

      <div style={{ margin: '30px 0' }}>
        <button
          onClick={() => handleAiWith('text')}
          className={aiWith == 'text' ? 'aiWithActive' : ''}>
          AI with Text
        </button>

        <button
          style={{ marginLeft: '20px' }}
          className={aiWith == 'image' ? 'aiWithActive' : ''}
          onClick={() => handleAiWith('image')}>
          AI with Image
        </button>
      </div>

      {
        aiWith == 'text' ?
          <div style={{ display: 'flex' }}>
            <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
            <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
          </div>
          :
          <div>
            <div style={{ display: 'flex' }}>
              <input type='file' onChange={(e) => handleImageChange(e)} />
              <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>
            <img src={image} style={{ width: '50%', marginTop: 30 }} />
          </div>
      }

      {
        loading == true && (aiResponse == '') ?
          <p style={{ margin: '30px 0' }}>Loading ...</p>
          :
          <div style={{ margin: '30px 0' }}>
            <p>{aiResponse}</p>
          </div>
      }
    </div>
  );
};

export default Home;