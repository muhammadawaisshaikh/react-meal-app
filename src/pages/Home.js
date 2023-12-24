import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Generative AI Call to fetch dishes
   */
  async function aiRun() {
    setLoading(true);
    const prompt = `random meals related to ${search} category with images and prices`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleClick = () => {
    aiRun();
  }

  return (
    <div>
      <h1>Generative AI Restaurant App!</h1>
      <p>Built with ❤️ using ReactJS + Redux + Google Gemini</p>

      <div style={{ display: 'flex' }}>
        <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
        <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
      </div>

      {
        loading == true && search != '' ?
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