import React, { useState } from 'react';

const RetirementPlanningOpenai = () => {
  const [userInput, setUserInput] = useState('');
  const [openAIResponse, setOpenAIResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const generateOpenAIResponse = async () => {
    try {
      // Assuming you have OpenAI API key and endpoint configured
      const apiKey = 'YOUR_OPENAI_API_KEY';
      const endpoint = 'YOUR_OPENAI_API_ENDPOINT';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 150, // Adjust based on the desired response length
        }),
      });

      const responseData = await response.json();
      setOpenAIResponse(responseData.choices[0].text.trim());
    } catch (error) {
      console.error('Error generating OpenAI response:', error);
      setOpenAIResponse('Sorry, an error occurred while generating the response.');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">OpenAI Response Generator</h1>

      <form className="mb-4">
        <label className="block mb-2">Enter your input:</label>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded"
          value={userInput}
          onChange={handleInputChange}
        ></textarea>

        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={generateOpenAIResponse}
        >
          Generate OpenAI Response
        </button>
      </form>

      {openAIResponse && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">OpenAI Response:</h2>
          <p>{openAIResponse}</p>
        </div>
      )}
    </div>
  );
};

export default RetirementPlanningOpenai;
