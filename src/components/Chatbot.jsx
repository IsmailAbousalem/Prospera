"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown for Markdown rendering

// Utility function to save chat history to local storage
const saveChatToLocalStorage = (messages) => {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}

// Utility function to retrieve chat history from local storage
const getChatFromLocalStorage = () => {
  const savedChat = localStorage.getItem('chatHistory');
  return savedChat ? JSON.parse(savedChat) : null;
}

export default function FoxyBotChat() {
  const initialMessage = [{ id: 1, text: "Hello! I'm Foxy Bot. How can I help you with your finances today?", sender: 'bot' }];
  const [messages, setMessages] = useState(initialMessage);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // On component mount, load saved chat history from local storage if it exists
  useEffect(() => {
    const savedChat = getChatFromLocalStorage();
    if (savedChat && savedChat.length > 0) {
      setMessages(prevMessages => [...initialMessage, ...savedChat]);  // Load chat history from local storage, preserving the initial message
    }
  }, []);

  // Save chat history to local storage whenever messages state changes
  useEffect(() => {
    if (messages.length > 0) {
      saveChatToLocalStorage(messages.filter(msg => msg.id !== 1)); // Save only user and bot messages, excluding the initial message
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add the user's message to the conversation
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    // Set loading state
    setLoading(true);

    try {
      // Make a request to your backend API (replace the URL with your actual backend endpoint)
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: inputMessage,
      });

      // Get the bot's response from the API
      const botResponse = {
        id: messages.length + 2,
        text: response.data.choices[0].message.content,  // Assuming response.data has the correct structure
        sender: 'bot'
      };

      // Update the state with the bot's response
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      // Handle any errors
      console.error('Error communicating with the API:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, something went wrong. Please try again.",
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-red-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800 text-center">Get Financial with Foxy Bot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {/* Render the message using ReactMarkdown to handle Markdown formatting */}
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleSendMessage();
                }
              }}
              className="flex-grow border-amber-300 focus:border-amber-500 focus:ring-amber-500"
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-amber-500 hover:bg-amber-600 text-white"
              disabled={loading}
            >
              <SendIcon className="h-4 w-4 mr-2" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
