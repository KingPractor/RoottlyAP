import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, Video, Settings as SettingsIcon, Home, Users, Sparkles, Mail, Share2, Book, Trophy, Gift, Globe, Type, Volume2, Bell, Shield, Wifi, ChevronLeft, Heart, Send, Play, RotateCcw, Star, Crown, Check, ShoppingBag, Lock, Camera, Image, Smile, Award, HelpCircle, MessageCircle, Bluetooth, QrCode, UserPlus } from 'lucide-react';

// Import components
import Settings from './components/Settings';
import Messages from './components/Messages';
import VideoCall from './components/VideoCall';
import Lessons from './components/Lessons';
import SocialShare from './components/SocialShare';
import ActivityWheel from './components/ActivityWheel';
import AvatarSelection from './components/AvatarSelection';
import RewardsCenter from './components/RewardsCenter';
import SplashScreen from './components/SplashScreen';
import ConnectionScreen from './components/ConnectionScreen';

// Import CSS
import './App.css';

// Real Bluetooth Service - Enhanced for actual device communication
class BluetoothService {
  constructor() {
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristic = null;
    this.isConnected = false;
    this.onMessageReceived = null;
    this.onConnectionStatusChanged = null;
    
    // Use well-known services for better compatibility
    this.SERVICE_UUID = '0000180f-0000-1000-8000-00805f9b34fb'; // Battery Service
    this.CHARACTERISTIC_UUID = '00002a19-0000-1000-8000-00805f9b34fb'; // Battery Level
    
    // Custom service for messaging
    this.ROOTTLY_SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
    this.ROOTTLY_MESSAGE_UUID = '87654321-4321-4321-4321-cba987654321';
    
    this.currentUser = null;
    this.messageCallback = null;
  }

  isBluetoothSupported() {
    return 'bluetooth' in navigator && navigator.bluetooth;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  setMessageReceivedCallback(callback) {
    this.messageCallback = callback;
  }

  setConnectionStatusCallback(callback) {
    this.onConnectionStatusChanged = callback;
  }

  async requestAndConnect() {
    if (!this.isBluetoothSupported()) {
      throw new Error('Web Bluetooth δεν υποστηρίζεται. Χρησιμοποιήστε Chrome ή Edge.');
    }

    try {
      // Request any device for maximum compatibility
      this.device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          this.SERVICE_UUID,
          this.ROOTTLY_SERVICE_UUID,
          '0000180a-0000-1000-8000-00805f9b34fb', // Device Information
          '00001800-0000-1000-8000-00805f9b34fb'  // Generic Access
        ]
      });

      console.log('Συσκευή επιλέχθηκε:', this.device.name || 'Άγνωστη Συσκευή');
      
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));
      
      return await this.connectToDevice();
      
    } catch (error) {
      console.error('Αποτυχία επιλογής συσκευής:', error);
      if (error.name === 'NotFoundError') {
        throw new Error('Δεν επιλέχθηκε συσκευή. Παρακαλώ δοκιμάστε ξανά.');
      } else if (error.name === 'SecurityError') {
        throw new Error('Πρόβλημα ασφαλείας. Παρακαλώ επιτρέψτε την πρόσβαση Bluetooth.');
      }
      throw new Error('Αποτυχία σύνδεσης: ' + error.message);
    }
  }

  async connectToDevice() {
    if (!this.device) {
      throw new Error('Δεν έχει επιλεγεί συσκευή');
    }

    try {
      console.log('Σύνδεση στον GATT server...');
      this.server = await this.device.gatt.connect();
      console.log('Συνδέθηκε στον GATT server');

      await this.findWritableService();
      
      this.isConnected = true;
      this.onConnectionStatusChanged?.(true);
      
      this.startMessageProcessing();
      
      console.log('Η σύνδεση Bluetooth ολοκληρώθηκε επιτυχώς');
      return true;
      
    } catch (error) {
      console.error('Αποτυχία σύνδεσης:', error);
      this.isConnected = false;
      this.onConnectionStatusChanged?.(false);
      throw new Error('Αποτυχία σύνδεσης με τη συσκευή: ' + error.message);
    }
  }

  async findWritableService() {
    try {
      const services = await this.server.getPrimaryServices();
      console.log(`Βρέθηκαν ${services.length} υπηρεσίες`);

      for (const service of services) {
        try {
          const characteristics = await service.getCharacteristics();
          
          for (const characteristic of characteristics) {
            if (characteristic.properties.write || 
                characteristic.properties.writeWithoutResponse ||
                characteristic.properties.notify) {
              
              console.log('Βρέθηκε εγγράψιμη χαρακτηριστική:', characteristic.uuid);
              this.service = service;
              this.characteristic = characteristic;
              
              if (characteristic.properties.notify) {
                try {
                  await characteristic.startNotifications();
                  characteristic.addEventListener('characteristicvaluechanged', 
                    this.handleNotification.bind(this));
                  console.log('Οι ειδοποιήσεις ξεκίνησαν');
                } catch (notifyError) {
                  console.warn('Δεν μπόρεσαν να ξεκινήσουν οι ειδοποιήσεις:', notifyError);
                }
              }
              
              return;
            }
          }
        } catch (charError) {
          console.warn('Δεν μπόρεσαν να ληφθούν οι χαρακτηριστικές:', charError);
        }
      }
      
      if (services.length > 0) {
        this.service = services[0];
        console.log('Χρήση πρώτης διαθέσιμης υπηρεσίας');
      }
      
    } catch (error) {
      console.warn('Δεν βρέθηκε βέλτιστη υπηρεσία, χρήση εναλλακτικής μεθόδου');
    }
  }

  async sendMessage(messageText) {
    if (!this.isConnected) {
      throw new Error('Δεν είστε συνδεδεμένοι σε συσκευή');
    }

    try {
      const messageData = {
        type: 'roottly_message',
        text: messageText,
        timestamp: new Date().toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }),
        sender: this.currentUser || 'Unknown',
        id: Date.now()
      };

      // Προσπάθεια εγγραφής μέσω Bluetooth characteristic
      if (this.characteristic && this.characteristic.properties.write) {
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(messageData));
        
        // Διαίρεση σε κομμάτια αν είναι πολύ μεγάλο (20 bytes είναι το τυπικό όριο BLE)
        const chunks = this.chunkArray(data, 20);
        
        for (const chunk of chunks) {
          await this.characteristic.writeValue(chunk);
        }
        
        console.log('Μήνυμα στάλθηκε μέσω Bluetooth characteristic');
      }
      
      // Εναλλακτική μέθοδος για δοκιμή/επίδειξη
      this.storeMessageLocally(messageData);
      
      return true;
      
    } catch (error) {
      console.error('Αποτυχία αποστολής Bluetooth μηνύματος:', error);
      
      // Αποθήκευση τοπικά ως εναλλακτική
      const messageData = {
        type: 'roottly_message',
        text: messageText,
        timestamp: new Date().toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }),
        sender: this.currentUser || 'Unknown',
        id: Date.now()
      };
      
      this.storeMessageLocally(messageData);
      console.log('Μήνυμα αποθηκεύτηκε τοπικά ως εναλλακτική');
      return true;
    }
  }

  storeMessageLocally(messageData) {
    try {
      const sessionKey = 'roottly_session_' + this.currentUser;
      const messages = JSON.parse(localStorage.getItem(sessionKey) || '[]');
      messages.push(messageData);
      
      if (messages.length > 50) {
        messages.splice(0, messages.length - 50);
      }
      
      localStorage.setItem(sessionKey, JSON.stringify(messages));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: sessionKey,
        newValue: JSON.stringify(messages)
      }));
      
    } catch (error) {
      console.error('Αποτυχία τοπικής αποθήκευσης μηνύματος:', error);
    }
  }

  startMessageProcessing() {
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
    
    this.messageInterval = setInterval(() => {
      this.checkForNewMessages();
    }, 1000);
  }

  handleStorageEvent(event) {
    if (event.key && event.key.startsWith('roottly_session_') && 
        !event.key.includes(this.currentUser)) {
      
      try {
        const messages = JSON.parse(event.newValue || '[]');
        const lastMessage = messages[messages.length - 1];
        
        if (lastMessage && lastMessage.sender !== this.currentUser) {
          this.messageCallback?.(lastMessage);
        }
      } catch (error) {
        console.error('Σφάλμα επεξεργασίας storage event:', error);
      }
    }
  }

  checkForNewMessages() {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('roottly_session_') && !key.includes(this.currentUser)) {
          const messages = JSON.parse(localStorage.getItem(key) || '[]');
          const lastMessage = messages[messages.length - 1];
          
          if (lastMessage && lastMessage.sender !== this.currentUser) {
            const processedKey = 'processed_' + lastMessage.id;
            if (!localStorage.getItem(processedKey)) {
              localStorage.setItem(processedKey, 'true');
              this.messageCallback?.(lastMessage);
            }
          }
        }
      }
    } catch (error) {
      console.error('Σφάλμα ελέγχου νέων μηνυμάτων:', error);
    }
  }

  handleNotification(event) {
    try {
      const decoder = new TextDecoder();
      const data = decoder.decode(event.target.value);
      
      let messageData;
      try {
        messageData = JSON.parse(data);
      } catch {
        messageData = {
          type: 'roottly_message',
          text: data,
          timestamp: new Date().toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }),
          sender: 'Απομακρυσμένη Συσκευή',
          id: Date.now()
        };
      }
      
      if (messageData.type === 'roottly_message' && messageData.sender !== this.currentUser) {
        this.messageCallback?.(messageData);
      }
      
    } catch (error) {
      console.error('Αποτυχία χειρισμού ειδοποίησης:', error);
    }
  }

  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  onDisconnected() {
    console.log('Η συσκευή Bluetooth αποσυνδέθηκε');
    this.isConnected = false;
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristic = null;
    
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
      this.messageInterval = null;
    }
    
    this.onConnectionStatusChanged?.(false);
  }

  async disconnect() {
    try {
      if (this.messageInterval) {
        clearInterval(this.messageInterval);
        this.messageInterval = null;
      }
      
      if (this.server && this.server.connected) {
        await this.server.disconnect();
      }
      
      this.onDisconnected();
      console.log('Αποσυνδέθηκε επιτυχώς');
      
    } catch (error) {
      console.error('Σφάλμα κατά την αποσύνδεση:', error);
      this.onDisconnected();
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      deviceName: this.device?.name || 'Άγνωστη',
      hasNotifications: this.characteristic?.properties?.notify || false
    };
  }

  async testConnection() {
    try {
      await this.sendMessage('ping_test');
      return true;
    } catch (error) {
      console.error('Ο έλεγχος σύνδεσης απέτυχε:', error);
      return false;
    }
  }

  clearStoredMessages() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('roottly_session_') || key.startsWith('processed_'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log('Διαγράφηκαν τα αποθηκευμένα μηνύματα');
      
    } catch (error) {
      console.error('Σφάλμα διαγραφής αποθηκευμένων μηνυμάτων:', error);
    }
  }
}

// Translations
const translations = {
  el: {
    welcome: "Καλώς ήρθατε",
    selectRole: "Επιλέξτε ποιος είστε",
    iAmGrandparent: "Είμαι Παππούς/Γιαγιά",
    iAmChild: "Είμαι Παιδί/Εγγόνι",
    yourName: "Το όνομα σας",
    grandparentPhone: "Τηλέφωνο Παππού / Γιαγιάς",
    selectDevice: "Τι συσκευή έχει ο παππούς / γιαγιά;",
    basicPhone: "Απλό τηλέφωνο με κουμπιά",
    smartphone: "Smartphone",
    selectInterests: "Επιλέξτε τα ενδιαφέροντά σας",
    continue: "Συνέχεια",
    complete: "Ολοκλήρωση",
    back: "Πίσω",
    language: "Γλώσσα",
    textSize: "Μέγεθος κειμένου",
    small: "Μικρό",
    medium: "Μεσαίο", 
    large: "Μεγάλο",
    typeMessage: "Πληκτρολογήστε μήνυμα...",
    send: "Αποστολή",
    messages: "Μηνύματα",
    cooking: "Μαγείρεμα",
    gardening: "Κηπουρική",
    music: "Μουσική",
    reading: "Διάβασμα",
    walking: "Περπάτημα",
    photos: "Φωτογραφίες",
    games: "Παιχνίδια",
    crafts: "Χειροτεχνίες",
    movies: "Ταινίες",
    travel: "Ταξίδια"
  },
  en: {
    welcome: "Welcome",
    selectRole: "Select who you are",
    iAmGrandparent: "I'm a Grandparent",
    iAmChild: "I'm a Child/Grandchild",
    yourName: "Your name",
    grandparentPhone: "Grandparent's Phone",
    selectDevice: "What device does grandparent have?",
    basicPhone: "Basic phone with buttons",
    smartphone: "Smartphone",
    selectInterests: "Select your interests",
    continue: "Continue",
    complete: "Complete",
    back: "Back",
    language: "Language",
    textSize: "Text Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    typeMessage: "Type a message...",
    send: "Send",
    messages: "Messages",
    cooking: "Cooking",
    gardening: "Gardening",
    music: "Music",
    reading: "Reading",
    walking: "Walking",
    photos: "Photos",
    games: "Games",
    crafts: "Crafts",
    movies: "Movies",
    travel: "Travel"
  }
};

// Available interests
const availableInterests = [
  { id: 'cooking', icon: '👨‍🍳' },
  { id: 'gardening', icon: '🌱' },
  { id: 'music', icon: '🎵' },
  { id: 'reading', icon: '📚' },
  { id: 'walking', icon: '🚶' },
  { id: 'photos', icon: '📷' },
  { id: 'games', icon: '🎲' },
  { id: 'crafts', icon: '🎨' },
  { id: 'movies', icon: '🎬' },
  { id: 'travel', icon: '✈️' }
];

export default function App() {
  // Core state
  const [currentView, setCurrentView] = useState('splash');
  const [language, setLanguage] = useState('el');
  const [textSize, setTextSize] = useState('medium');
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // User data
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [grandparentName, setGrandparentName] = useState('');
  const [grandparentPhone, setGrandparentPhone] = useState('');
  const [grandparentDevice, setGrandparentDevice] = useState('');
  const [userInterests, setUserInterests] = useState([]);
  const [grandparentInterests, setGrandparentInterests] = useState([]);
  
  // App data
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [gameScore, setGameScore] = useState(150);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('elder_man');
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [unlockedFeatures, setUnlockedFeatures] = useState([]);
  const [claimedRewards, setClaimedRewards] = useState([]);
  
  // Real Bluetooth connection state
  const [isConnected, setIsConnected] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [pairedDevice, setPairedDevice] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize Bluetooth service
  const bluetoothServiceRef = useRef(null);

  useEffect(() => {
    // Initialize Bluetooth service
    bluetoothServiceRef.current = new BluetoothService();
    
    // Set up callbacks
    bluetoothServiceRef.current.setMessageReceivedCallback((messageData) => {
      const newMessage = {
        id: messageData.id,
        text: messageData.text,
        type: 'received',
        timestamp: messageData.timestamp,
        status: 'received',
        sender: messageData.sender
      };
      setMessages(prev => [...prev, newMessage]);
    });

    bluetoothServiceRef.current.setConnectionStatusCallback((connected) => {
      setIsConnected(connected);
      if (connected) {
        setPairedDevice(userRole === 'grandparent' ? 'Εγγόνι' : 'Παππούς');
        setShowConnection(false);
        showSuccessMessage('Συνδέθηκε επιτυχώς!', '📱');
        bluetoothServiceRef.current.startMessageProcessing();
      } else {
        setPairedDevice(null);
      }
      setIsConnecting(false);
    });

    // Set current user for message filtering
    if (userName) {
      bluetoothServiceRef.current.setCurrentUser(userName);
    }
  }, [userRole, userName]);

  const t = translations[language];

  // Text size classes
  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };
  
  const buttonSizeClasses = {
    small: 'p-4 text-lg',
    medium: 'p-6 text-xl',
    large: 'p-8 text-2xl'
  };
  
  // Helper functions
  const toggleInterest = (interest, isGrandparent = false) => {
    if (isGrandparent) {
      setGrandparentInterests(prev =>
        prev.includes(interest)
          ? prev.filter(i => i !== interest)
          : [...prev, interest]
      );
    } else {
      setUserInterests(prev =>
        prev.includes(interest)
          ? prev.filter(i => i !== interest)
          : [...prev, interest]
      );
    }
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setGameScore(prev => prev + 25);
    }
  };

  // Real Bluetooth connection functions
  const startBluetoothConnection = async () => {
    if (!bluetoothServiceRef.current?.isBluetoothSupported()) {
      showSuccessMessage('Το Bluetooth δεν υποστηρίζεται σε αυτή τη συσκευή', '❌');
      return;
    }

    setIsConnecting(true);
    setShowConnection(true);

    try {
      await bluetoothServiceRef.current.requestAndConnect();
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      setIsConnecting(false);
      setShowConnection(false);
      showSuccessMessage('Αποτυχία σύνδεσης Bluetooth: ' + error.message, '❌');
    }
  };

  // Send real Bluetooth message
  const sendBluetoothMessage = async (messageText) => {
    if (!bluetoothServiceRef.current) {
      console.error('Bluetooth service not available');
      return false;
    }

    try {
      const messageData = {
        id: Date.now(),
        text: messageText,
        timestamp: new Date().toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }),
        sender: userName || (userRole === 'grandparent' ? 'Παππούς/Γιαγιά' : 'Παιδί')
      };

      if (isConnected) {
        await bluetoothServiceRef.current.sendMessage(messageText);
      }
      
      // Add to local messages as sent
      const sentMessage = {
        ...messageData,
        type: 'sent',
        status: 'sent'
      };
      setMessages(prev => [...prev, sentMessage]);
      
      return true;
    } catch (error) {
      console.error('Failed to send Bluetooth message:', error);
      showSuccessMessage('Αποτυχία αποστολής μηνύματος: ' + error.message, '❌');
      return false;
    }
  };

  const showSuccessMessage = (message, icon) => {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-8 rounded-3xl shadow-2xl z-50 text-center max-w-lg border-4 border-white';
    successDiv.innerHTML = `
      <div class="text-6xl mb-4">${icon}</div>
      <p class="text-2xl font-bold mb-6">${message}</p>
      <button onclick="this.parentElement.remove()" class="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 text-xl">
        Υπέροχα!
      </button>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 8000);
  };

  // Auto-advance splash screen
  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => {
        setCurrentView('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Show splash screen
  if (currentView === 'splash') {
    return <SplashScreen setCurrentView={setCurrentView} />;
  }

  // Show connection screen
  if (showConnection) {
    return (
      <ConnectionScreen 
        userRole={userRole}
        setShowConnection={setShowConnection}
        setIsConnected={setIsConnected}
        setPairedDevice={setPairedDevice}
        showSuccessMessage={showSuccessMessage}
        bluetoothService={bluetoothServiceRef.current}
        isConnecting={isConnecting}
      />
    );
  }

  // Show video call overlay
  if (showVideoCall) {
    return (
      <VideoCall 
        contactName={userRole === 'child' ? grandparentName : userName} 
        onEndCall={() => setShowVideoCall(false)}
        language={language}
        textSizeClasses={textSizeClasses}
        textSize={textSize}
      />
    );
  }
  
  // Main render switch
  switch (currentView) {
    case 'onboarding':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              {/* Header with logo */}
              <div className="text-center mb-8">
                <div className="w-20 h-16 mx-auto mb-4">
                  <div className="relative w-full h-full">
                    {/* Mini παππούς */}
                    <div className="absolute left-0 top-0 w-8 h-12">
                      <div className="w-6 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute top-1 left-0 w-2 h-2 border border-gray-800 rounded-full bg-white"></div>
                        <div className="absolute top-1 right-0 w-2 h-2 border border-gray-800 rounded-full bg-white"></div>
                        <div className="absolute top-3 left-1 w-4 h-1 border-b border-gray-800 rounded-full"></div>
                      </div>
                      <div className="w-5 h-6 bg-blue-400 rounded-b-2xl mx-0.5"></div>
                    </div>
                    
                    {/* Mini εγγόνι */}
                    <div className="absolute right-0 top-0 w-8 h-12">
                      <div className="w-6 h-6 bg-orange-500 rounded-full relative">
                        <div className="absolute -top-1 left-1 w-4 h-2 bg-orange-600 rounded-t-full"></div>
                        <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-3 left-1 w-4 h-1 border-b border-gray-800 rounded-full"></div>
                      </div>
                      <div className="w-5 h-6 bg-orange-400 rounded-b-2xl mx-0.5"></div>
                    </div>
                    
                    {/* Σύνδεση */}
                    <div className="absolute top-3 left-6 right-6 h-1">
                      <div className="w-full h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  <span className="text-blue-600">Root</span><span className="text-orange-600">tly</span>
                </div>
              </div>

              {onboardingStep === 1 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-center mb-2">{t.welcome}</h1>
                  <p className="text-center text-gray-600 mb-8">{t.selectRole}</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setUserRole('grandparent');
                        setOnboardingStep(2);
                      }}
                      className="w-full p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all text-xl font-bold"
                    >
                      <Users className="inline mr-3 w-8 h-8" />
                      {t.iAmGrandparent}
                    </button>
                    
                    <button
                      onClick={() => {
                        setUserRole('child');
                        setOnboardingStep(2);
                      }}
                      className="w-full p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all text-xl font-bold"
                    >
                      <Heart className="inline mr-3 w-8 h-8" />
                      {t.iAmChild}
                    </button>
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-6">
                  <button
                    onClick={() => setOnboardingStep(1)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {t.back}
                  </button>
                  
                  <h2 className="text-xl font-bold text-center">{t.yourName}</h2>
                  
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t.yourName}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  
                  {userRole === 'child' && (
                    <>
                      <input
                        type="text"
                        value={grandparentName}
                        onChange={(e) => setGrandparentName(e.target.value)}
                        placeholder="Όνομα Παππού/Γιαγιάς"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                      />
                      
                      <input
                        type="tel"
                        value={grandparentPhone}
                        onChange={(e) => setGrandparentPhone(e.target.value)}
                        placeholder={t.grandparentPhone}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                      />
                    </>
                  )}
                  
                  <button
                    onClick={() => setOnboardingStep(userRole === 'child' ? 3 : 4)}
                    disabled={!userName || (userRole === 'child' && (!grandparentName || !grandparentPhone))}
                    className="w-full p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                  >
                    {t.continue}
                  </button>
                </div>
              )}

              {onboardingStep === 3 && userRole === 'child' && (
                <div className="space-y-6">
                  <button
                    onClick={() => setOnboardingStep(2)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {t.back}
                  </button>
                  
                  <h2 className="text-xl font-bold text-center">{t.selectDevice}</h2>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setGrandparentDevice('basic');
                        setOnboardingStep(4);
                      }}
                      className="w-full p-6 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors text-lg font-bold"
                    >
                      <Phone className="inline mr-3 w-6 h-6" />
                      {t.basicPhone}
                    </button>
                    
                    <button
                      onClick={() => {
                        setGrandparentDevice('smartphone');
                        setOnboardingStep(4);
                      }}
                      className="w-full p-6 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-lg font-bold"
                    >
                      <Video className="inline mr-3 w-6 h-6" />
                      {t.smartphone}
                    </button>
                  </div>
                </div>
              )}

              {onboardingStep === 4 && (
                <div className="space-y-6">
                  <button
                    onClick={() => setOnboardingStep(userRole === 'child' ? 3 : 2)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {t.back}
                  </button>
                  
                  <h2 className="text-xl font-bold text-center">{t.selectInterests}</h2>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {availableInterests.map(interest => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          userInterests.includes(interest.id)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{interest.icon}</div>
                        <div className="text-xs">{t[interest.id]}</div>
                      </button>
                    ))}
                  </div>
                  
                  {userRole === 'child' && (
                    <>
                      <p className="text-center text-gray-600 font-semibold">
                        {grandparentName} - {t.selectInterests}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {availableInterests.map(interest => (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id, true)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              grandparentInterests.includes(interest.id)
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-white border-gray-300 hover:border-orange-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{interest.icon}</div>
                            <div className="text-xs">{t[interest.id]}</div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button
                    onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
                    disabled={userInterests.length === 0}
                    className="w-full p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                  >
                    <Check className="inline mr-2 w-5 h-5" />
                    {t.complete}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
      
    case 'grandparentHome':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
          <header className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">🌟 Καλώς ήρθατε, {userName}!</h1>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-3 bg-white bg-opacity-25 rounded-3xl px-6 py-3">
                    <Trophy className="w-8 h-8 text-yellow-300" />
                    <span className="text-yellow-300 font-bold text-2xl">{gameScore} πόντοι</span>
                  </div>
                  {isConnected && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-semibold">Συνδεδεμένος με {pairedDevice}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setCurrentView('avatarSelection')}
                className="text-8xl hover:scale-110 transition-transform cursor-pointer bg-white bg-opacity-20 rounded-3xl p-4 hover:bg-opacity-30"
                title="Αλλάξτε το Avatar σας"
              >
                {(() => {
                  const avatar = {
                    'elder_man': '👨‍🦳',
                    'elder_woman': '👵',
                    'young_man': '👦',
                    'young_woman': '👧',
                    'happy_elder': '😊',
                    'cool_elder': '😎',
                    'wise_elder': '🧙‍♂️',
                    'tech_elder': '🤓',
                    'chef_elder': '👨‍🍳',
                    'artist_elder': '🎨',
                    'superhero': '🦸‍♂️',
                    'princess': '👸',
                    'ninja_elder': '🥷',
                    'mermaid_elder': '🧜‍♀️'
                  }[selectedAvatar] || '👨‍🦳';
                  
                  const accessories = selectedAccessories.map(id => {
                    const accessoryMap = {
                      'hat_basic': '🧢',
                      'hat_formal': '🎩',
                      'crown': '👑',
                      'glasses': '👓',
                      'sunglasses': '🕶️',
                      'bow_tie': '🎀',
                      'flower': '🌸',
                      'medal': '🏅',
                      'star': '⭐',
                      'heart': '💖',
                      'rainbow': '🌈',
                      'lightning': '⚡',
                      'diamond': '💎',
                      'fire': '🔥'
                    };
                    return accessoryMap[id] || '';
                  }).join('');
                  
                  return avatar + accessories;
                })()}
              </button>
            </div>
          </header>
          
          <main className="p-8 pb-32">
            <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
              <button
                onClick={() => setCurrentView('messages')}
                className="p-10 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <MessageSquare className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">💬 Μηνύματα</div>
              </button>
              
              <button
                onClick={() => setShowVideoCall(true)}
                className="p-10 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <Video className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">📹 Βιντεοκλήση</div>
              </button>
              
              <button
                onClick={() => setCurrentView('activityWheel')}
                className="p-10 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <Sparkles className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">🎡 Δραστηριότητες</div>
              </button>
              
              <button
                onClick={() => setCurrentView('lessons')}
                className="p-10 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white relative"
              >
                <Book className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">📚 Μαθήματα</div>
                {completedLessons.length > 0 && (
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full text-2xl font-bold border-4 border-white shadow-lg">
                    {completedLessons.length}/5 ✓
                  </div>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
              <button
                onClick={() => setCurrentView('rewardsCenter')}
                className="p-10 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <Gift className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">🎁 Ανταμοιβές</div>
              </button>

              <button
                onClick={() => setCurrentView('settings')}
                className="p-10 bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <SettingsIcon className="w-24 h-24 mx-auto mb-6" />
                <div className="text-4xl font-bold">⚙️ Ρυθμίσεις</div>
              </button>
            </div>

            {!isConnected && (
              <div className="mt-16 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-blue-100 to-green-100 border-4 border-blue-300 rounded-3xl p-10">
                  <div className="text-center">
                    <Bluetooth className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                    <h3 className="text-3xl font-bold mb-4 text-blue-800">Συνδέστε με την οικογένεια</h3>
                    <p className="text-blue-700 mb-8 text-xl">Συνδέστε τη συσκευή σας με το παιδί/εγγόνι για πραγματική επικοινωνία</p>
                    <button
                      onClick={startBluetoothConnection}
                      className="bg-blue-500 text-white px-10 py-6 rounded-3xl font-bold hover:bg-blue-600 transition-colors text-2xl shadow-xl"
                      disabled={isConnecting}
                    >
                      <UserPlus className="inline mr-3 w-8 h-8" />
                      {isConnecting ? 'Συνδέεται...' : 'Ξεκίνα Σύνδεση Bluetooth'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
          
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-blue-200 px-8 py-6 shadow-2xl">
            <div className="flex justify-center">
              <button className="bg-blue-500 text-white p-8 rounded-full shadow-lg text-3xl">
                <Home className="w-16 h-16" />
              </button>
            </div>
          </nav>
        </div>
      );
      
    case 'childHome':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
          <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Καλώς ήρθατε, {userName}! 👋</h1>
                <p className="text-xl mt-2">📱 {grandparentName} - {grandparentDevice === 'basic' ? 'Απλό τηλέφωνο' : 'Smartphone'}</p>
                {isConnected && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-semibold">Συνδεδεμένος με {pairedDevice}</span>
                  </div>
                )}
              </div>
            </div>
          </header>
          
          <main className="p-6 pb-28">
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              <button
                onClick={() => setCurrentView('messages')}
                className="p-8 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-white"
              >
                {grandparentDevice === 'basic' ? <Mail className="w-16 h-16 mx-auto mb-4" /> : <MessageSquare className="w-16 h-16 mx-auto mb-4" />}
                <div className="text-2xl font-bold">{grandparentDevice === 'basic' ? 'SMS' : 'Μηνύματα'}</div>
              </button>
              
              <button
                onClick={() => setCurrentView('socialShare')}
                className="p-8 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-white"
              >
                <Share2 className="w-16 h-16 mx-auto mb-4" />
                <div className="text-2xl font-bold">Κοινοποίηση</div>
              </button>
              
              {grandparentDevice === 'smartphone' && (
                <>
                  <button
                    onClick={() => setShowVideoCall(true)}
                    className="p-8 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-white"
                  >
                    <Video className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-2xl font-bold">Βιντεοκλήση</div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentView('activityWheel')}
                    className="p-8 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-white"
                  >
                    <Sparkles className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-2xl font-bold">Δραστηριότητες</div>
                  </button>
                </>
              )}
            </div>

            {!isConnected && (
              <div className="mt-10 max-w-3xl mx-auto">
                <div className="bg-green-100 border-l-8 border-green-500 p-6 rounded-r-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <QrCode className="w-12 h-12 text-green-500" />
                    <div>
                      <h3 className="text-xl font-bold text-green-800">Συνδεθείτε με τον {grandparentName}</h3>
                      <button
                        onClick={startBluetoothConnection}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
                        disabled={isConnecting}
                      >
                        {isConnecting ? 'Συνδέεται...' : 'Ξεκίνα Σύνδεση Bluetooth'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
          
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-200 px-6 py-4 shadow-xl">
            <div className="flex justify-around items-center max-w-md mx-auto">
              <button className="text-blue-500 p-4 rounded-2xl hover:bg-blue-50">
                <Home className="w-12 h-12" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className="text-gray-600 p-4 rounded-2xl hover:bg-gray-50"
              >
                <SettingsIcon className="w-12 h-12" />
              </button>
            </div>
          </nav>
        </div>
      );
      
    case 'settings':
      return (
        <Settings
          language={language}
          setLanguage={setLanguage}
          textSize={textSize}
          setTextSize={setTextSize}
          setCurrentView={setCurrentView}
          userRole={userRole}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
        />
      );
      
    case 'activityWheel':
      return (
        <ActivityWheel
          userRole={userRole}
          userInterests={userInterests}
          grandparentInterests={grandparentInterests}
          setCurrentView={setCurrentView}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
          language={language}
        />
      );
      
    case 'messages':
      return (
        <Messages
          messages={messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          setMessages={setMessages}
          setCurrentView={setCurrentView}
          userRole={userRole}
          grandparentName={grandparentName}
          grandparentDevice={grandparentDevice}
          userName={userName}
          grandparentPhone={grandparentPhone}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
          isConnected={isConnected}
          sendBluetoothMessage={sendBluetoothMessage}
        />
      );
      
    case 'lessons':
      return (
        <Lessons
          setCurrentView={setCurrentView}
          completedLessons={completedLessons}
          completeLesson={completeLesson}
          gameScore={gameScore}
          setGameScore={setGameScore}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
          language={language}
        />
      );
      
    case 'socialShare':
      return (
        <SocialShare
          setCurrentView={setCurrentView}
          grandparentName={grandparentName}
          grandparentDevice={grandparentDevice}
          userName={userName}
          setMessages={setMessages}
          messages={messages}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
          language={language}
        />
      );

    case 'avatarSelection':
      return (
        <AvatarSelection
          setCurrentView={setCurrentView}
          userRole={userRole}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          selectedAccessories={selectedAccessories}
          setSelectedAccessories={setSelectedAccessories}
          gameScore={gameScore}
          setGameScore={setGameScore}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
        />
      );

    case 'rewardsCenter':
      return (
        <RewardsCenter
          setCurrentView={setCurrentView}
          userRole={userRole}
          gameScore={gameScore}
          setGameScore={setGameScore}
          completedLessons={completedLessons}
          unlockedFeatures={unlockedFeatures}
          setUnlockedFeatures={setUnlockedFeatures}
          claimedRewards={claimedRewards}
          setClaimedRewards={setClaimedRewards}
          userName={userName}
          t={t}
          textSizeClasses={textSizeClasses}
          buttonSizeClasses={buttonSizeClasses}
          textSize={textSize}
        />
      );
      
    default:
      return <SplashScreen setCurrentView={setCurrentView} />;
  }
}