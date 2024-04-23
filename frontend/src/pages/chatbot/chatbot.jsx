import { useState } from "react";
// import "./App.css"; 
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAvtaFKlE6wFDbTLIA71jiFnSRfjThRTVA",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="bg-gray-900 h-screen p-3 overflow-auto">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded bg-gray-900 border-stone-50 py-2"
        >
            <h1 className="text-4xl font-bold text-center mb-16 text-white">Chat Bot</h1>
          <textarea
            required
            className="border rounded w-full h-32 my-2 min-h-fit p-3 text-white"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type Here to Ask Anything......."
          ></textarea>
          <button
            type="submit"
            className="bg-blue-700 p-3 rounded-xl hover:bg-blue-400 transition-all duration-300 mb-2"
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
        <div className="w-full h-12/12  md:w-4/5 m-auto text-center rounded bg-gray-800 my-1 text-white  mb-40">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default Chatbot;