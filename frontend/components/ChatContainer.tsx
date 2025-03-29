"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import GeminiService from '../lib/gemini';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const geminiService = GeminiService.getInstance();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = async (content: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  };

  const handleSendMessage = async (userInput: string) => {
    // Add user message
    await addMessage(userInput, 'user');

    try {
      // Get AI response
      const aiResponse = await geminiService.generateResponse(userInput);
      await addMessage(aiResponse, 'ai');
    } catch (error) {
      console.error('Error in chat:', error);
      await addMessage('Sorry, something went wrong.', 'ai');
    }
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-all duration-200 border-gray-200 dark:border-gray-700">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mr-3">
            <span className="text-blue-500 font-bold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-semibold">Gemini Chat</h3>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <p className="text-xs text-blue-100">Online</p>
            </div>
          </div>
        </div>
        <div className="text-xs bg-blue-700 rounded-full px-2 py-1">
          Beta
        </div>
      </div>

      {/* Messages container */}
      <div className="px-4 py-2 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="font-medium mb-1">Start a conversation</p>
            <p className="text-sm">Ask anything to get started with Gemini AI</p>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input container with additional styling */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};