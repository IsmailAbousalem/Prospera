"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown'; // Import react-markdown for Markdown rendering

// Utility function to retrieve financial context from local storage
const getFinancialContextFromLocalStorage = () => {
  const financialContext = localStorage.getItem('financialContext');
  return financialContext ? JSON.parse(financialContext) : null;
}

// Utility function to save chat history to local storage
const saveChatToLocalStorage = (messages) => {
  localStorage.setItem('chatHistoryWithAdvice', JSON.stringify(messages));
}

// Utility function to retrieve chat history from local storage
const getChatFromLocalStorage = () => {
  const savedChat = localStorage.getItem('chatHistoryWithAdvice');
  return savedChat ? JSON.parse(savedChat) : null;
}

export default function ChatbotWithAdvice() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // On component mount, load financial data and chat history
  useEffect(() => {
    const savedChat = getChatFromLocalStorage();
    if (savedChat && savedChat.length > 0) {
      setMessages(savedChat);
    } else {
      const financialContext = getFinancialContextFromLocalStorage();
      if (financialContext) {
        handleSendFinancialAdvice(financialContext);  // Send financial context automatically
      }
    }
  }, []);

  // Save chat history to local storage whenever messages state changes
  useEffect(() => {
    if (messages.length > 0) {
      saveChatToLocalStorage(messages);
    }
  }, [messages]);

  // Function to send financial advice based on user's financial data
  const handleSendFinancialAdvice = async (financialData) => {
    setLoading(true);

    try {
      // Send financial data to your backend API and get a response
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: `Here's my financial data: ${JSON.stringify(financialData)}`
      });

      const botResponse = {
        id: 1,
        text: response.data.choices[0].message.content,  // Assuming response.data has the correct structure
        sender: 'bot'
      };

      setMessages([botResponse]);

    } catch (error) {
      console.error('Error communicating with the API:', error);
      const errorMessage = {
        id: 1,
        text: "Sorry, something went wrong. Please try again.",
        sender: 'bot'
      };
      setMessages([errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-red-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800 text-center">Foxy's Financial Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 text-left`}
              >
                <div className="inline-block p-3 rounded-lg bg-amber-200 text-amber-900">
                  {/* Use ReactMarkdown to render the AI response properly */}
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          {loading && (
            <div className="text-center text-amber-600">
              Processing your financial data...
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
