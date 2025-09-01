import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Mic } from "lucide-react";

const TransactionForm = ({ onSubmit, parsingResult, onConfirm, onCancel }) => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript + " ";
          }
        }
        setInput((prev) => (prev + " " + finalTranscript).trim() || interimTranscript.trim());
      };

      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!listening) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  return (
    <div
      className={`shadow rounded-lg p-6 mt-6 transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='e.g., "Coffee at Starbucks $5"'
          className={`flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
            isDark
              ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />

        {/* Parse Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Parse
        </button>

        {/* YouTube-style Voice Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition duration-300 ${
            listening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          }`}
        >
          <Mic
            className={`w-6 h-6 ${
              listening ? "text-white" : "text-gray-800 dark:text-gray-200"
            }`}
          />
        </button>
      </form>

      {parsingResult && (
        <div
          className={`mt-4 p-4 rounded border transition-colors duration-300 ${
            isDark
              ? "bg-gray-700 text-gray-200 border-gray-600"
              : "bg-gray-50 text-gray-700 border-gray-300"
          }`}
        >
          <h3 className="font-semibold mb-2">Parsed Transaction:</h3>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Amount:</strong> ${parsingResult.amount}
            </li>
            <li>
              <strong>Category:</strong> {parsingResult.category}
            </li>
            <li>
              <strong>Description:</strong> {parsingResult.description}
            </li>
            <li>
              <strong>Merchant:</strong> {parsingResult.merchant}
            </li>
            <li>
              <strong>Date:</strong>{" "}
              {new Date(parsingResult.date).toLocaleString()}
            </li>
            <li>
              <strong>Confidence:</strong>{" "}
              {Math.round(parsingResult.confidence * 100)}%
            </li>
          </ul>

          <div className="mt-4 flex gap-3">
            <button
              onClick={onConfirm}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
