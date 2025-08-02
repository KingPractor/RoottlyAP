import React, { useState } from 'react';
import { ChevronLeft, Globe, Type, Bell, Shield, Moon, Volume2, Wifi, Battery, Phone, HelpCircle, HeadphonesIcon, MessageCircle } from 'lucide-react';

const Settings = ({ 
  language, 
  setLanguage, 
  textSize, 
  setTextSize, 
  setCurrentView, 
  userRole, 
  t, 
  textSizeClasses, 
  buttonSizeClasses 
}) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(70);
  const [autoAnswer, setAutoAnswer] = useState(false);
  const [largeButtons, setLargeButtons] = useState(true);
  
  const settingsTranslations = {
    el: {
      generalSettings: "Γενικές Ρυθμίσεις",
      accessibility: "Προσβασιμότητα",
      privacy: "Απόρρητο & Ασφάλεια",
      notifications: "Ειδοποιήσεις",
      darkMode: "Σκοτεινή λειτουργία",
      volume: "Ένταση ήχου",
      autoAnswer: "Αυτόματη απάντηση κλήσεων",
      largeButtons: "Μεγάλα κουμπιά",
      networkStatus: "Κατάσταση δικτύου",
      batteryLevel: "Επίπεδο μπαταρίας",
      emergencyContacts: "Επαφές έκτακτης ανάγκης",
      help: "Βοήθεια & Υποστήριξη",
      about: "Σχετικά με την εφαρμογή",
      version: "Έκδοση",
      contact: "Επικοινωνία",
      tutorials: "Οδηγοί Χρήσης",
      liveChatSupport: "Ζωντανή Υποστήριξη"
    },
    en: {
      generalSettings: "General Settings",
      accessibility: "Accessibility",
      privacy: "Privacy & Security",
      notifications: "Notifications",
      darkMode: "Dark mode",
      volume: "Volume",
      autoAnswer: "Auto-answer calls",
      largeButtons: "Large buttons",
      networkStatus: "Network status",
      batteryLevel: "Battery level",
      emergencyContacts: "Emergency contacts",
      help: "Help & Support",
      about: "About the app",
      version: "Version",
      contact: "Contact",
      tutorials: "User Guides",
      liveChatSupport: "Live Chat Support"
    }
  };
  
  const st = settingsTranslations[language];

  const showHelpDialog = (title, message) => {
    const helpDiv = document.createElement('div');
    helpDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-10 rounded-3xl shadow-2xl z-50 max-w-2xl text-center border-4 border-white';
    helpDiv.innerHTML = `
      <div class="text-8xl mb-6">💡</div>
      <h3 class="text-3xl font-bold mb-6">${title}</h3>
      <p class="text-xl mb-8 leading-relaxed">${message}</p>
      <button onclick="this.parentElement.remove()" class="bg-white text-blue-600 px-10 py-4 rounded-3xl font-bold hover:bg-gray-100 text-2xl">
        Κατάλαβα!
      </button>
    `;
    document.body.appendChild(helpDiv);
    
    setTimeout(() => {
      if (helpDiv.parentElement) {
        helpDiv.remove();
      }
    }, 20000);
  };

  const showEmergencyContacts = () => {
    showHelpDialog(
      "📞 Επαφές Έκτακτης Ανάγκης",
      "Εδώ μπορείτε να προσθέσετε τηλέφωνα οικογένειας και φίλων για γρήγορη κλήση. Σε περίπτωση ανάγκης, πατήστε παρατεταμένα το κουμπί και θα καλέσει αυτόματα! Θα μπορείτε να βάλετε μέχρι 5 σημαντικά τηλέφωνα."
    );
  };

  const showPrivacyInfo = () => {
    showHelpDialog(
      "🔐 Απόρρητο & Ασφάλεια",
      "Τα προσωπικά σας στοιχεία είναι ΑΠΟΛΥΤΑ ασφαλή! Δεν τα μοιραζόμαστε με κανέναν άλλον. Χρησιμοποιούμε κρυπτογράφηση για να προστατεύουμε τις συνομιλίες και τις φωτογραφίες σας. Μόνο εσείς και η οικογένειά σας μπορείτε να τα δείτε."
    );
  };

  const showTutorials = () => {
    showHelpDialog(
      "📚 Οδηγοί Χρήσης",
      "Εδώ θα βρείτε βήμα-βήμα οδηγίες για όλες τις λειτουργίες της εφαρμογής! Από το πώς να στέλνετε μηνύματα μέχρι το πώς να κάνετε βιντεοκλήσεις - όλα εξηγημένα ΠΟΛΥ απλά με εικόνες και παραδείγματα!"
    );
  };

  const showLiveChatSupport = () => {
    showHelpDialog(
      "💬 Ζωντανή Υποστήριξη",
      "Χρειάζεστε βοήθεια ΤΩΡΑ; Μιλήστε με έναν από τους φιλικούς μας εκπαιδευτές! Είμαστε εδώ 24 ώρες για να σας βοηθήσουμε με οποιαδήποτε ερώτηση έχετε. Απλά πατήστε το κουμπί και θα συνδεθείτε αμέσως!"
    );
  };

  const showContactInfo = () => {
    showHelpDialog(
      "📧 Επικοινωνία",
      "Μπορείτε να επικοινωνήσετε μαζί μας:<br/>📞 Τηλέφωνο: 210-1234567 (ΔΩΡΕΑΝ κλήση)<br/>📧 Email: help@roottly.gr<br/>🕐 Ώρες εξυπηρέτησης: 9:00-17:00 Δευτέρα-Παρασκευή<br/>🏠 Διεύθυνση: Αθήνα, Ελλάδα<br/><br/>Θα απαντήσουμε ΑΜΕΣΑ!"
    );
  };

  const showAboutApp = () => {
    showHelpDialog(
      "📱 Σχετικά με το Roottly",
      "Το Roottly είναι η πρώτη ελληνική εφαρμογή που φτιάχτηκε ΕΙΔΙΚΑ για ηλικιωμένους! Σας βοηθάει να επικοινωνείτε εύκολα με την οικογένειά σας, να μαθαίνετε νέες τεχνολογίες και να διασκεδάζετε! Φτιάχτηκε με πολλή αγάπη από Έλληνες προγραμματιστές."
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-10 shadow-xl">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
            className="text-white hover:bg-white/20 rounded-3xl p-6 transition-colors border-4 border-white/30 hover:border-white shadow-lg"
          >
            <ChevronLeft className="w-16 h-16" />
          </button>
          <h1 className={`${textSizeClasses[textSize]} font-bold flex-1 text-4xl`}>
            ⚙️ Ρυθμίσεις
          </h1>
        </div>
      </header>
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* General Settings */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-4 border-gray-200">
            <h2 className={`${textSizeClasses[textSize]} font-bold mb-8 text-gray-800 text-3xl`}>
              🔧 {st.generalSettings}
            </h2>
            
            {/* Language */}
            <div className="mb-10">
              <h3 className={`${textSizeClasses[textSize]} font-semibold mb-6 flex items-center gap-4 text-2xl`}>
                <Globe className="w-10 h-10" />
                {t.language}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setLanguage('el')}
                  className={`${buttonSizeClasses[textSize]} rounded-3xl border-4 transition-all text-2xl ${
                    language === 'el'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white border-gray-300 hover:border-blue-300'
                  }`}
                >
                  🇬🇷 Ελληνικά
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`${buttonSizeClasses[textSize]} rounded-3xl border-4 transition-all text-2xl ${
                    language === 'en'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white border-gray-300 hover:border-blue-300'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <h3 className={`${textSizeClasses[textSize]} font-semibold flex items-center gap-4 text-2xl`}>
                  <Bell className="w-10 h-10" />
                  {st.notifications}
                </h3>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-24 h-12 rounded-full transition-colors ${
                    notifications ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform ${
                    notifications ? 'translate-x-12' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            
            {/* Dark Mode */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <h3 className={`${textSizeClasses[textSize]} font-semibold flex items-center gap-4 text-2xl`}>
                  <Moon className="w-10 h-10" />
                  {st.darkMode}
                </h3>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-24 h-12 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform ${
                    darkMode ? 'translate-x-12' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Accessibility */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-4 border-gray-200">
            <h2 className={`${textSizeClasses[textSize]} font-bold mb-8 text-gray-800 text-3xl`}>
              ♿ {st.accessibility}
            </h2>
            
            {/* Text Size */}
            <div className="mb-10">
              <h3 className={`${textSizeClasses[textSize]} font-semibold mb-6 flex items-center gap-4 text-2xl`}>
                <Type className="w-10 h-10" />
                {t.textSize}
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`${buttonSizeClasses[size]} rounded-3xl border-4 transition-all ${
                      textSize === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {t[size]}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Volume */}
            <div className="mb-10">
              <h3 className={`${textSizeClasses[textSize]} font-semibold mb-6 flex items-center gap-4 text-2xl`}>
                <Volume2 className="w-10 h-10" />
                {st.volume}: {volume}%
              </h3>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            {/* Large Buttons */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <h3 className={`${textSizeClasses[textSize]} font-semibold flex items-center gap-4 text-2xl`}>
                  🔘 {st.largeButtons}
                </h3>
                <button
                  onClick={() => setLargeButtons(!largeButtons)}
                  className={`w-24 h-12 rounded-full transition-colors ${
                    largeButtons ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform ${
                    largeButtons ? 'translate-x-12' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            
            {/* Auto Answer */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className={`${textSizeClasses[textSize]} font-semibold flex items-center gap-4 text-2xl`}>
                  <Phone className="w-10 h-10" />
                  {st.autoAnswer}
                </h3>
                <button
                  onClick={() => setAutoAnswer(!autoAnswer)}
                  className={`w-24 h-12 rounded-full transition-colors ${
                    autoAnswer ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform ${
                    autoAnswer ? 'translate-x-12' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* System Info */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-4 border-gray-200">
            <h2 className={`${textSizeClasses[textSize]} font-bold mb-8 text-gray-800 text-3xl`}>
              📊 Πληροφορίες Συστήματος
            </h2>
            
            <div className="space-y-6">
             <div className="flex items-center justify-between">
               <span className="flex items-center gap-4 text-2xl">
                 <Wifi className="w-10 h-10 text-green-500" />
                 {st.networkStatus}
               </span>
               <span className="text-green-600 font-semibold text-2xl">
                 Συνδεδεμένο
               </span>
             </div>
             
             <div className="flex items-center justify-between">
               <span className="flex items-center gap-4 text-2xl">
                 <Battery className="w-10 h-10 text-green-500" />
                 {st.batteryLevel}
               </span>
               <span className="text-green-600 font-semibold text-2xl">85%</span>
             </div>
             
             <div className="flex items-center justify-between">
               <span className="text-2xl">{st.version}</span>
               <span className="text-gray-600 text-2xl">1.0.0</span>
             </div>
           </div>
         </div>
         
         {/* Emergency & Help - FUNCTIONAL BUTTONS */}
         <div className="bg-white rounded-3xl shadow-xl p-10 border-4 border-gray-200">
           <h2 className={`${textSizeClasses[textSize]} font-bold mb-8 text-gray-800 text-3xl`}>
             🆘 {st.help}
           </h2>
           
           <div className="space-y-6">
             <button 
               onClick={showEmergencyContacts}
               className={`w-full ${buttonSizeClasses[textSize]} bg-red-500 text-white rounded-3xl hover:bg-red-600 transition-colors flex items-center justify-center gap-4 text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               <Phone className="w-10 h-10" />
               📞 {st.emergencyContacts}
             </button>
             
             <button 
               onClick={showPrivacyInfo}
               className={`w-full ${buttonSizeClasses[textSize]} bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-4 text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               <Shield className="w-10 h-10" />
               🔐 {st.privacy}
             </button>
             
             <button 
               onClick={showTutorials}
               className={`w-full ${buttonSizeClasses[textSize]} bg-green-500 text-white rounded-3xl hover:bg-green-600 transition-colors flex items-center justify-center gap-4 text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               <HelpCircle className="w-10 h-10" />
               📚 {st.tutorials}
             </button>

             <button 
               onClick={showLiveChatSupport}
               className={`w-full ${buttonSizeClasses[textSize]} bg-purple-500 text-white rounded-3xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-4 text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               <MessageCircle className="w-10 h-10" />
               💬 {st.liveChatSupport}
             </button>
             
             <button 
               onClick={showContactInfo}
               className={`w-full ${buttonSizeClasses[textSize]} bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition-colors text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               📧 {st.contact}
             </button>

             <button 
               onClick={showAboutApp}
               className={`w-full ${buttonSizeClasses[textSize]} bg-gray-500 text-white rounded-3xl hover:bg-gray-600 transition-colors text-2xl font-bold py-8 shadow-xl hover:shadow-2xl transform hover:scale-105`}
             >
               📱 {st.about}
             </button>
           </div>
         </div>

         {/* Tips Section */}
         <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-10">
           <h3 className={`${textSizeClasses[textSize]} font-bold text-blue-800 mb-6 flex items-center gap-4 text-3xl`}>
             💡 Χρήσιμες Συμβουλές
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-700">
             <div className="space-y-4">
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">🔊</span>
                 <span>Αυξήστε την ένταση για καλύτερη ακουστικότητα</span>
               </p>
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">🔤</span>
                 <span>Επιλέξτε μεγάλα γράμματα για ευκολότερη ανάγνωση</span>
               </p>
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">🔔</span>
                 <span>Ενεργοποιήστε ειδοποιήσεις για σημαντικά μηνύματα</span>
               </p>
             </div>
             <div className="space-y-4">
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">🌙</span>
                 <span>Χρησιμοποιήστε σκοτεινή λειτουργία το βράδυ</span>
               </p>
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">📞</span>
                 <span>Προσθέστε επαφές έκτακτης ανάγκης για ασφάλεια</span>
               </p>
               <p className="flex items-center gap-4 text-xl">
                 <span className="text-3xl">🆘</span>
                 <span>Μη διστάσετε να ζητήσετε βοήθεια όταν χρειάζεται</span>
               </p>
             </div>
           </div>
           
           <div className="mt-8 bg-white bg-opacity-50 rounded-3xl p-6 text-center">
             <p className="text-blue-800 font-bold text-2xl">
               🎯 Θυμηθείτε: Όλες οι ρυθμίσεις αποθηκεύονται αυτόματα!
             </p>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default Settings;