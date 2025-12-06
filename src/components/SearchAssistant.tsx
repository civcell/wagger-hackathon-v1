import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, X, Sparkles } from 'lucide-react';
import { Location } from '@/data/locations';
import { cn } from '@/lib/utils';

interface SearchAssistantProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
  onClose?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function SearchAssistant({ locations, onLocationSelect, onClose }: SearchAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there, paw-rent! 🐕 I'm here to help you sniff out the paw-fect spots for you and your fur-baby! Ask me things like 'Where can I take my dog to the beach?' or 'Find me a dog park nearby' and I'll help you discover some barktastic places!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAnXwgZWCpdJeYjrkPlJmGsVOVDE16GZZk';

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
      if (!API_KEY || API_KEY === '') {
        throw new Error('API key is missing.');
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Create a context about available locations
      const locationsContext = locations.map(loc => 
        `${loc.name} - ${loc.category} (${loc.description})`
      ).join('\n');

      const model = genAI.getGenerativeModel({ 
        model: 'models/gemini-2.5-flash',
        systemInstruction: `You are a fun, enthusiastic fellow pet owner helping users find dog-friendly places! You speak in a friendly, casual, and playful way using fun pet-related words like:
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

You have access to these dog-friendly locations:
${locationsContext}

When users ask about places, suggest specific locations from the list above. Be enthusiastic, supportive, and relatable - like you're chatting with a friend at the dog park! Keep responses conversational, warm, and use emojis occasionally (🐕🐾🦴🏖️🌳). Don't be robotic or overly formal. Help users find the perfect spot for their furry friend!`
      });

      // Build history from previous messages
      const historyMessages = messages.slice(1, -1);
      
      let text: string;
      
      if (historyMessages.length > 0) {
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
        const result = await model.generateContent(userMessage.content);
        const response = await result.response;
        text = response.text();
      }

      if (text && text.trim()) {
        setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
        
        // Try to match mentioned locations and suggest them
        const mentionedLocations = locations.filter(loc => 
          text.toLowerCase().includes(loc.name.toLowerCase())
        );
        
        if (mentionedLocations.length > 0 && onLocationSelect) {
          // Could auto-select or highlight, but for now just log
          console.log('Mentioned locations:', mentionedLocations);
        }
      } else {
        throw new Error('Empty response from API');
      }
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="flex flex-col w-full max-w-md h-[80vh] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Search Assistant</h2>
              <p className="text-xs text-muted-foreground">Find paw-fect spots!</p>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
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
        <div className="px-4 pb-4 pt-3 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about dog-friendly places..."
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
    </div>
  );
}

