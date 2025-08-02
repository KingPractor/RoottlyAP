import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, Phone, Video, Paperclip, Smile, Camera, Image, Heart, ThumbsUp, Bluetooth, BluetoothConnected } from 'lucide-react';

const Messages = ({ 
  messages, 
  messageInput, 
  setMessageInput, 
  setMessages,
  setCurrentView, 
  userRole, 
  grandparentName,
  grandparentDevice,
  userName,
  grandparentPhone,
  t, 
  textSizeClasses, 
  buttonSizeClasses,
  textSize,
  isConnected = false,
  sendBluetoothMessage = null
}) => {
  
  const [showEmojis, setShowEmojis] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  
  const emojis = ['😊', '❤️', '👍', '🎉', '🌺', '☕', '🍰', '🌞', '🌙', '⭐', '🤗', '😘', '👋', '🙏', '💕'];
  
  const quickReplies = {
    el: [
      "Καλημέρα! ☀️",
      "Καληνύχτα! 🌙", 
      "Τι κάνεις;",
      "Σε αγαπώ! ❤️",
      "Πώς είσαι;",
      "Φιλιά! 😘",
      "Μπράβο! 👏",
      "Εντάξει! 👍",
      "Ευχαριστώ! 🙏",
      "Να είσαι καλά! 🌟"
    ],
    en: [
      "Good morning! ☀️",
      "Good night! 🌙",
      "How are you?",
      "Love you! ❤️",
      "How are things?",
      "Kisses! 😘",
      "Well done! 👏",
      "Okay! 👍",
      "Thank you! 🙏",
      "Take care! 🌟"
    ]
  };
  
  const handleSendMessage = async (text = messageInput) => {
    if (!text.trim() || isSending) return;
    
    setIsSending(true);
    const messageText = text.trim();
    
    try {
      if (isConnected && sendBluetoothMessage) {
        // Send via real Bluetooth
        const success = await sendBluetoothMessage(messageText);
        if (success) {
          setMessageInput('');
          setShowQuickReplies(false);
          showDeliveryNotification('Στάλθηκε μέσω Bluetooth! 📡');
        } else {
          showDeliveryNotification('Αποτυχία αποστολής μέσω Bluetooth! ❌');
        }
      } else {
        // Demo mode - show that real connection is needed
        const newMessage = {
          id: Date.now(),
          text: messageText,
          type: 'sent',
          timestamp: new Date().toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }),
          status: 'demo',
          sender: userName || (userRole === 'grandparent' ? 'Παππούς/Γιαγιά' : 'Παιδί')
        };
        
        setMessages(prev => [...prev, newMessage]);
        setMessageInput('');
        setShowQuickReplies(false);
        showDeliveryNotification('Demo μήνυμα - Συνδεθείτε για πραγματικά μηνύματα! 📱');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showDeliveryNotification('Σφάλμα αποστολής μηνύματος! ❌');
    } finally {
      setIsSending(false);
    }
  };
  
  const showDeliveryNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };
  
  const addEmoji = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojis(false);
  };

  const sendQuickReply = (reply) => {
    handleSendMessage(reply);
  };
  
  const isGrandparentView = userRole === 'grandparent';
  const contactName = isGrandparentView ? userName : grandparentName;
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  // Initial welcome messages
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = [
        { 
          id: 1, 
          text: 'Καλώς ήρθατε στο Roottly! 👋', 
          type: 'received', 
          timestamp: '09:00', 
          status: 'received', 
          sender: 'Σύστημα' 
        }
      ];
      
      if (!isConnected) {
        welcomeMessages.push({
          id: 2, 
          text: 'Συνδεθείτε μέσω Bluetooth για πραγματικά μηνύματα! 📱', 
          type: 'received', 
          timestamp: '09:01', 
          status: 'received', 
          sender: 'Σύστημα'
        });
      } else {
        welcomeMessages.push({
          id: 2, 
          text: `Συνδεδεμένοι επιτυχώς! Μπορείτε τώρα να στέλνετε πραγματικά μηνύματα! 🎉`, 
          type: 'received', 
          timestamp: '09:01', 
          status: 'received', 
          sender: 'Σύστημα'
        });
      }
      
      setMessages(welcomeMessages);
    }
  }, [messages.length, setMessages, isConnected]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
              {isGrandparentView ? '👶' : '👨‍🦳'}
            </div>
            
            <div className="flex-1">
              <h1 className={`${textSizeClasses[textSize]} font-bold`}>
                💬 Μηνύματα {contactName ? `- ${contactName}` : ''}
              </h1>
              {grandparentDevice === 'basic' && userRole === 'child' && (
                <p className="text-sm opacity-80">📱 SMS - {grandparentPhone}</p>
              )}
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <div className="flex items-center gap-1">
                    <BluetoothConnected className="w-4 h-4 text-green-300" />
                    <span className="text-xs text-green-300">Bluetooth συνδεδεμένο</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Bluetooth className="w-4 h-4 text-gray-300" />
                    <span className="text-xs text-gray-300">Χωρίς σύνδεση</span>
                  </div>
                )}
                <p className="text-xs opacity-70 ml-2">
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      γράφει...
                    </span>
                  ) : (
                    isConnected ? 'συνδεδεμένος' : 'demo λειτουργία'
                  )}
                </p>
              </div>
            </div>
            
            {grandparentDevice !== 'basic' && (
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Connection Status Banner */}
      {!isConnected && (
        <div className="bg-yellow-100 border-b-2 border-yellow-300 p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <Bluetooth className="w-5 h-5 text-yellow-700" />
            <span className="text-yellow-800 font-semibold">
              Μηνύματα σε λειτουργία demo - Συνδεθείτε μέσω Bluetooth για πραγματικά μηνύματα
            </span>
          </div>
        </div>
      )}
      
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {grandparentDevice === 'basic' && userRole === 'child' && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-lg p-3 mb-4 text-center">
              <p className="text-yellow-800 font-semibold">
                📱 SMS θα σταλεί στο {grandparentPhone}
              </p>
            </div>
          )}
          
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'sent' || msg.type === 'sms' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-xs sm:max-w-sm">
                <div
                  className={`${buttonSizeClasses[textSize]} rounded-2xl shadow-md ${
                    msg.type === 'sent' || msg.type === 'sms'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white'
                  }`}
                >
                  {msg.image && <div className="text-4xl mb-2">{msg.image}</div>}
                  <p className="break-words">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${
                      msg.type === 'sent' || msg.type === 'sms' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                    {msg.type === 'sent' && (
                      <div className="text-xs flex items-center gap-1">
                        {msg.status === 'sending' && '⏳'}
                        {msg.status === 'sent' && '✓'}
                        {msg.status === 'delivered' && '✓✓'}
                        {msg.status === 'demo' && '🔒'}
                        {isConnected && <Bluetooth className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="bg-gray-100 border-t p-3">
          <div className="flex flex-wrap gap-2 max-w-2xl mx-auto">
            {quickReplies[t.language || 'el'].map((reply, index) => (
              <button
                key={index}
                onClick={() => sendQuickReply(reply)}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                disabled={isSending}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Emoji Picker */}
      {showEmojis && (
        <div className="bg-white border-t p-3">
          <div className="flex flex-wrap gap-2 max-w-2xl mx-auto">
            {emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-200">
        <div className="p-4">
          <div className="flex gap-2 max-w-2xl mx-auto">
            {/* Quick replies button */}
            <button
              onClick={() => {
                setShowQuickReplies(!showQuickReplies);
                setShowEmojis(false);
              }}
              className={`${buttonSizeClasses[textSize]} text-purple-600 hover:text-purple-800 transition-colors`}
              disabled={isSending}
            >
              <Heart className="w-6 h-6" />
            </button>
            
            {/* Emoji button */}
            <button
              onClick={() => {
                setShowEmojis(!showEmojis);
                setShowQuickReplies(false);
              }}
              className={`${buttonSizeClasses[textSize]} text-gray-600 hover:text-gray-800 transition-colors`}
              disabled={isSending}
            >
              <Smile className="w-6 h-6" />
            </button>
            
            {/* Message input */}
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
              placeholder={isConnected ? "Πληκτρολογήστε μήνυμα..." : "Συνδεθείτε για πραγματικά μηνύματα..."}
              disabled={isSending}
              className={`flex-1 ${buttonSizeClasses[textSize]} border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50`}
            />
            
            {/* Send button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!messageInput.trim() || isSending}
              className={`${buttonSizeClasses[textSize]} bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all px-6 flex items-center gap-2`}
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {isConnected && <Bluetooth className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
          
          {/* Bluetooth instruction */}
          {!isConnected && (
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600">
                💡 Πηγαίνετε στην αρχική σελίδα για να συνδεθείτε μέσω Bluetooth
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;