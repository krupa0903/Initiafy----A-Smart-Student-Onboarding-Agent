import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ChatAssistant() {
  const { chatMessages, addChatMessage, currentStudent } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const getInitiaResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('admission') || lowerMessage.includes('apply')) {
      return `To apply for admission, follow these steps:\n\n1️⃣ Fill out the online admission form on the official college portal\n2️⃣ Upload required documents\n3️⃣ Verify eligibility\n4️⃣ Pay the admission fee before 30th July\n\nWould you like me to guide you step-by-step?`;
    }

    if (lowerMessage.includes('document')) {
      return `You'll need:\n\n• 10th Marksheet\n• 12th Marksheet\n• Aadhar Card\n• Transfer Certificate\n• Passport-size photographs\n\nPlease ensure scanned copies are clear.\n\nWould you like me to check which documents are pending in your profile?`;
    }

    if (lowerMessage.includes('deadline') || lowerMessage.includes('miss')) {
      return `If you miss the 30th July deadline:\n\n• Your application may not be considered\n• You may need to wait for the next admission cycle\n\nI recommend completing pending steps early.`;
    }

    if (lowerMessage.includes('how am i') || lowerMessage.includes('progress')) {
      return `You've completed ${currentStudent?.tasksCompleted} of ${currentStudent?.totalTasks} onboarding steps — great progress! 🎉\n\nYour next important task is 'Pay Admission Fee', due in 3 days.\n\nWould you like a reminder?`;
    }

    if (lowerMessage.includes('overwhelm') || lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return `That's completely understandable. Starting college can feel overwhelming.\n\nYou've already completed most of your tasks — let's focus on one step at a time. I'm here to help.`;
    }

    if (lowerMessage.includes('upload') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return `I'm sorry you're facing that issue.\n\nWould you like me to notify the admin team for assistance?`;
    }

    if (lowerMessage.includes('hostel') || lowerMessage.includes('accommodation')) {
      return `For hostel registration:\n\n1️⃣ Complete the hostel application form\n2️⃣ Select your preferred hostel type\n3️⃣ Pay the hostel fee\n4️⃣ Submit required documents\n\nDeadline: 25th July\n\nWould you like help with any specific step?`;
    }

    if (lowerMessage.includes('fee') || lowerMessage.includes('payment')) {
      return `To pay your admission fee:\n\n1️⃣ Log into the student portal\n2️⃣ Navigate to 'Fee Payment' section\n3️⃣ Select 'Admission Fee'\n4️⃣ Complete payment using available methods (UPI, Card, Net Banking)\n\nAmount: ₹50,000\nDeadline: 30th July\n\nNeed help with the payment process?`;
    }

    return `I'm here to help with your onboarding process! You can ask me about:\n\n• Admission process\n• Required documents\n• Fee payment\n• Hostel registration\n• Your progress status\n\nWhat would you like to know?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'student' as const,
      message: input,
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getInitiaResponse(input);
      const initiaMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'initia' as const,
        message: response,
        timestamp: new Date(),
      };
      addChatMessage(initiaMessage);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-1">
            Initia – Your AI Onboarding Assistant
          </h2>
          <p className="text-sm text-[#6B7280]">
            I'm here to make your college onboarding smooth and stress-free
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  msg.sender === 'student'
                    ? 'bg-white border border-[#A78BFA] text-[#1F2937]'
                    : 'bg-[#F3F0FF] text-[#1F2937]'
                }`}
              >
                {msg.sender === 'initia' && (
                  <div className="text-xs font-semibold text-[#A78BFA] mb-2">Initia</div>
                )}
                <div className="whitespace-pre-line text-sm leading-relaxed">{msg.message}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#F3F0FF] rounded-2xl p-4 max-w-[70%]">
                <div className="text-xs font-semibold text-[#A78BFA] mb-2">Initia</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#E5E7EB] p-6">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 h-12 border-[#E5E7EB] focus:border-[#A78BFA] focus:ring-[#A78BFA]"
            />
            <Button
              onClick={handleSend}
              className="h-12 px-6 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
