import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Video, Settings, Home, Users, Sparkles, ChevronLeft, Globe, Type, Share2, Book, Smartphone, Monitor, Mail, Camera, Heart, Send, UserPlus, Check } from 'lucide-react';

export default function FamilyConnectionApp() {
  // State management
  const [language, setLanguage] = useState('el');
  const [textSize, setTextSize] = useState('medium');
  const [currentView, setCurrentView] = useState('onboarding');
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
      appTitle: "Οικογενειακή Επικοινωνία",
      activities: "Δραστηριότητες",
      lessons: "Μαθήματα",
      socialShare: "Κοινοποίηση",
      settings: "Ρυθμίσεις",
      sendSMS: "Αποστολή SMS",
      shareFromSocial: "Κοινοποίηση από Social Media",
      videoCall: "Βιντεοκλήση",
      message: "Μήνυμα",
      suggestedActivities: "Προτεινόμενες Δραστηριότητες",
      basedOnInterests: "Με βάση τα κοινά σας ενδιαφέροντα",
      digitalLessons: "Μαθήματα Τεχνολογίας",
      lesson1: "Πώς να κάνετε βιντεοκλήση",
      lesson2: "Πώς να στείλετε φωτογραφία",
      lesson3: "Πώς να χρησιμοποιείτε το διαδίκτυο με ασφάλεια",
      selectPost: "Επιλέξτε ανάρτηση για κοινοποίηση",
      simplifiedFor: "Απλοποιημένο για τον/την",
      shareThis: "Κοινοποίηση",
      typeMessage: "Πληκτρολογήστε μήνυμα...",
      send: "Αποστολή",
      smsWillBeSent: "Το SMS θα σταλεί στο",
      textSize: "Μέγεθος Κειμένου",
      small: "Μικρό",
      medium: "Μεσαίο",
      large: "Μεγάλο",
      back: "Πίσω",
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
      appTitle: "Family Connection",
      activities: "Activities",
      lessons: "Lessons",
      socialShare: "Share",
      settings: "Settings",
      sendSMS: "Send SMS",
      shareFromSocial: "Share from Social Media",
      videoCall: "Video Call",
      message: "Message",
      suggestedActivities: "Suggested Activities",
      basedOnInterests: "Based on your shared interests",
      digitalLessons: "Digital Lessons",
      lesson1: "How to make a video call",
      lesson2: "How to send a photo",
      lesson3: "How to use the internet safely",
      selectPost: "Select post to share",
      simplifiedFor: "Simplified for",
      shareThis: "Share This",
      typeMessage: "Type a message...",
      send: "Send",
      smsWillBeSent: "SMS will be sent to",
      textSize: "Text Size",
      small: "Small",
      medium: "Medium",
      large: "Large",
      back: "Back",
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
  
  const t = translations[language];
  
  // Text size classes
  const textSizeClasses = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  };
  
  const buttonSizeClasses = {
    small: 'p-3 text-base',
    medium: 'p-4 text-lg',
    large: 'p-5 text-xl'
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
  
  // Sample posts
  const samplePosts = [
    {
      id: 1,
      platform: 'Facebook',
      content: 'Had an amazing day at the beach with family! 🏖️',
      image: '🏖️',
      simplified: {
        el: 'Περάσαμε υπέροχα στην παραλία με την οικογένεια!',
        en: 'We had a wonderful time at the beach with family!'
      }
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Check out this delicious meal I cooked! #homecooking',
      image: '🍝',
      simplified: {
        el: 'Μαγείρεψα ένα νόστιμο φαγητό!',
        en: 'I cooked a delicious meal!'
      }
    }
  ];
  
  // Toggle interest
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
  
  // Render onboarding
  const renderOnboarding = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <h1 className={`${textSizeClasses[textSize]} font-bold text-center`}>
                {t.welcome}
              </h1>
              <p className="text-center text-gray-600">{t.selectRole}</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setUserRole('grandparent');
                    setOnboardingStep(2);
                  }}
                  className={`w-full ${buttonSizeClasses[textSize]} bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors`}
                >
                  <Users className="inline mr-2" />
                  {t.iAmGrandparent}
                </button>
                
                <button
                  onClick={() => {
                    setUserRole('child');
                    setOnboardingStep(2);
                  }}
                  className={`w-full ${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors`}
                >
                  <Heart className="inline mr-2" />
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
              
              <h2 className={`${textSizeClasses[textSize]} font-bold text-center`}>
                {t.yourName}
              </h2>
              
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.yourName}
                className={`w-full ${buttonSizeClasses[textSize]} border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none`}
              />
              
              {userRole === 'child' && (
                <>
                  <input
                    type="text"
                    value={grandparentName}
                    onChange={(e) => setGrandparentName(e.target.value)}
                    placeholder="Όνομα Παππού/Γιαγιάς"
                    className={`w-full ${buttonSizeClasses[textSize]} border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none`}
                  />
                  
                  <input
                    type="tel"
                    value={grandparentPhone}
                    onChange={(e) => setGrandparentPhone(e.target.value)}
                    placeholder={t.grandparentPhone}
                    className={`w-full ${buttonSizeClasses[textSize]} border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none`}
                  />
                </>
              )}
              
              <button
                onClick={() => setOnboardingStep(userRole === 'child' ? 3 : 4)}
                disabled={!userName || (userRole === 'child' && (!grandparentName || !grandparentPhone))}
                className={`w-full ${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
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
              
              <h2 className={`${textSizeClasses[textSize]} font-bold text-center`}>
                {t.selectDevice}
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setGrandparentDevice('basic');
                    setOnboardingStep(4);
                  }}
                  className={`w-full ${buttonSizeClasses[textSize]} bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors`}
                >
                  <Phone className="inline mr-2" />
                  {t.basicPhone}
                </button>
                
                <button
                  onClick={() => {
                    setGrandparentDevice('smartphone');
                    setOnboardingStep(4);
                  }}
                  className={`w-full ${buttonSizeClasses[textSize]} bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors`}
                >
                  <Smartphone className="inline mr-2" />
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
              
              <h2 className={`${textSizeClasses[textSize]} font-bold text-center`}>
                {t.selectInterests}
              </h2>
              
              <div className="grid grid-cols-3 gap-3">
                {availableInterests.map(interest => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`${buttonSizeClasses[textSize]} rounded-xl border-2 transition-all ${
                      userInterests.includes(interest.id)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl">{interest.icon}</div>
                    <div className="text-xs mt-1">{t[interest.id]}</div>
                  </button>
                ))}
              </div>
              
              {userRole === 'child' && (
                <>
                  <p className="text-center text-gray-600 mt-6">
                    {grandparentName} - {t.selectInterests}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {availableInterests.map(interest => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id, true)}
                        className={`${buttonSizeClasses[textSize]} rounded-xl border-2 transition-all ${
                          grandparentInterests.includes(interest.id)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-2xl">{interest.icon}</div>
                        <div className="text-xs mt-1">{t[interest.id]}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              <button
                onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
                disabled={userInterests.length === 0}
                className={`w-full ${buttonSizeClasses[textSize]} bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                <Check className="inline mr-2" />
                {t.complete}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Render Grandparent Home
  const renderGrandparentHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-lg">
        <h1 className={`${textSizeClasses[textSize]} font-bold text-center`}>
          {t.welcome}, {userName}!
        </h1>
      </header>
      
      <main className="p-4 pb-24">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentView('messages')}
            className={`${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <MessageSquare className="w-12 h-12 mx-auto mb-2" />
            {t.message}
          </button>
          
          <button
            onClick={() => alert('Starting video call...')}
            className={`${buttonSizeClasses[textSize]} bg-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <Video className="w-12 h-12 mx-auto mb-2" />
            {t.videoCall}
          </button>
          
          <button
            onClick={() => setCurrentView('activities')}
            className={`${buttonSizeClasses[textSize]} bg-purple-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-2" />
            {t.activities}
          </button>
          
          <button
            onClick={() => setCurrentView('lessons')}
            className={`${buttonSizeClasses[textSize]} bg-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <Book className="w-12 h-12 mx-auto mb-2" />
            {t.lessons}
          </button>
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className={`${buttonSizeClasses[textSize]} text-purple-500`}>
            <Home className="w-8 h-8" />
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className={`${buttonSizeClasses[textSize]} text-gray-600`}
          >
            <Settings className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </div>
  );
  
  // Render Child Home
  const renderChildHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 shadow-lg">
        <h1 className={`${textSizeClasses[textSize]} font-bold text-center`}>
          {t.welcome}, {userName}!
        </h1>
        <p className="text-center mt-2">
          📱 {grandparentName} - {grandparentDevice === 'basic' ? t.basicPhone : t.smartphone}
        </p>
      </header>
      
      <main className="p-4 pb-24">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {grandparentDevice === 'basic' ? (
            <button
              onClick={() => setCurrentView('sms')}
              className={`${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
            >
              <Mail className="w-12 h-12 mx-auto mb-2" />
              {t.sendSMS}
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('messages')}
              className={`${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
            >
              <MessageSquare className="w-12 h-12 mx-auto mb-2" />
              {t.message}
            </button>
          )}
          
          <button
            onClick={() => setCurrentView('socialShare')}
            className={`${buttonSizeClasses[textSize]} bg-purple-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <Share2 className="w-12 h-12 mx-auto mb-2" />
            {t.socialShare}
          </button>
          
          {grandparentDevice === 'smartphone' && (
            <>
              <button
                onClick={() => alert('Starting video call...')}
                className={`${buttonSizeClasses[textSize]} bg-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
              >
                <Video className="w-12 h-12 mx-auto mb-2" />
                {t.videoCall}
              </button>
              
              <button
                onClick={() => setCurrentView('activities')}
                className={`${buttonSizeClasses[textSize]} bg-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
              >
                <Sparkles className="w-12 h-12 mx-auto mb-2" />
                {t.activities}
              </button>
            </>
          )}
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className={`${buttonSizeClasses[textSize]} text-blue-500`}>
            <Home className="w-8 h-8" />
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className={`${buttonSizeClasses[textSize]} text-gray-600`}
          >
            <Settings className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </div>
  );
  
  // Other views...
  const renderSimpleView = (title) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className={`${textSizeClasses[textSize]} font-bold flex-1`}>
            {title}
          </h1>
        </div>
      </header>
      <main className="p-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className={`${textSizeClasses[textSize]}`}>{title} View</p>
        </div>
      </main>
    </div>
  );
  
  // Main render
  switch (currentView) {
    case 'onboarding':
      return renderOnboarding();
    case 'grandparentHome':
      return renderGrandparentHome();
    case 'childHome':
      return renderChildHome();
    case 'messages':
    case 'sms':
    case 'socialShare':
    case 'activities':
    case 'lessons':
    case 'settings':
      return renderSimpleView(t[currentView] || currentView);
    default:
      return renderOnboarding();
  }
}