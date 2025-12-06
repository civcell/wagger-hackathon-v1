import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Woof woof! 🐕 Hey there, fellow pet parent! I'm your barktastic AI assistant, ready to help you and your furry friend have the most paw-some adventures! What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAnXwgZWCpdJeYjrkPlJmGsVOVDE16GZZk';
  
  // Debug: Log API key status
  useEffect(() => {
    if (API_KEY) {
      console.log('API Key loaded:', API_KEY.substring(0, 10) + '...');
    } else {
      console.error('API Key is missing!');
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if API key is available
      if (!API_KEY || API_KEY === '') {
        throw new Error('API key is missing. Please check your .env file.');
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Use gemini-2.5-flash (faster) or gemini-2.5-pro (more capable)
      // Model names must include the 'models/' prefix
      const model = genAI.getGenerativeModel({ 
        model: 'models/gemini-2.5-flash',
        systemInstruction: `You are a fun, enthusiastic fellow pet owner and dog lover! You speak in a friendly, casual, and playful way. Use fun pet-related words like:
- "barktastic" (fantastic)
- "paw-some" (awesome)
- "fur-tastic" (fantastic)
- "woof-tastic" (wonderful)
- "sniff out" (find/discover)
- "pawsome" (awesome)
- "fur-bulous" (fabulous)
- "tail-wagging" (exciting/happy)
- "paw-rent" (pet parent)
- "fur-baby" (pet)
- "doggo" (dog)
- "pupper" (puppy)
- "hooman" (human)

Be enthusiastic, supportive, and relatable - like you're chatting with a friend at the dog park! Keep responses conversational, warm, and use emojis occasionally (🐕🐾🦴🏖️🌳). Don't be robotic or overly formal. You're here to help fellow pet owners with dog-friendly places, activities, tips, and general pet care advice in a fun, friendly way!`
      });

      // Build history from previous messages (excluding the initial greeting and new user message)
      const historyMessages = messages.slice(1, -1); // Skip initial greeting, exclude new user message
      
      let text: string;
      
      if (historyMessages.length > 0) {
        // Use chat with history
        const history = historyMessages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
          history: history,
        });

        const result = await chat.sendMessage(userMessage.content);
        const response = await result.response;
        text = response.text();
      } else {
        // First message after greeting - use simple generateContent
        const result = await model.generateContent(userMessage.content);
        const response = await result.response;
        text = response.text();
      }

      if (text && text.trim()) {
        setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
      } else {
        throw new Error('Empty response from API');
      }
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      
      // Show more detailed error message
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error?.message) {
        errorMessage = `Error: ${error.message}`;
      } else if (error?.error?.message) {
        errorMessage = `Error: ${error.error.message}`;
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-4 pb-24 pt-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

