import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDtiBA7Z3cIgjqzSktQUm0zGj3uQBAWuso');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>

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

export default AiwithText;