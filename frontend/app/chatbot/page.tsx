"use client";

import { useEffect, useState } from 'react';
import { ChatContainer } from '../../components/ChatContainer';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // Fetch initial message from the API when the component mounts
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/chatbot');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.message); // Set the fetched message in state
        setChatHistory([data.message]); // Start with the initial bot message
      } catch (error) {
        console.error('There was an error fetching the message:', error);
      }
    };

    fetchMessage();
  }, []);

  // Handle user input submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return; // Do not submit if input is empty

    const userMessage = userInput;
    setChatHistory((prevHistory) => [...prevHistory, `You: ${userMessage}`]); // Add user input to chat history

    // Send the user input to the backend
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage })
    });

    const data = await response.json();
    setMessage(data.message); // Set the bot's response in the message state
    setChatHistory((prevHistory) => [...prevHistory, `Bot: ${data.message}`]); // Add bot response to chat history
    setUserInput(''); // Clear the input field
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <ChatContainer  /> {/* Pass chat history to ChatContainer */}
        
      </div>
    </div>
  );
}
