import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <div className={`flex mb-3 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isAi 
            ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none' 
            : 'bg-blue-500 text-white dark:bg-blue-600 rounded-br-none'
        } shadow-sm`}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`text-xs block text-right mt-1 ${
          isAi ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100 dark:text-blue-200'
        }`}>
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
    </div>
  );
};