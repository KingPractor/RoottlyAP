import React, { useState, useEffect } from 'react';
import { Bluetooth, Smartphone, Users, Wifi, Check, X, RefreshCw, AlertCircle, Heart, QrCode, Copy, Phone } from 'lucide-react';

const ConnectionScreen = ({ 
  userRole, 
  setShowConnection, 
  setIsConnected, 
  setPairedDevice, 
  showSuccessMessage,
  bluetoothService,
  isConnecting
}) => {
  const [connectionStep, setConnectionStep] = useState('waiting');
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [connectionCode] = useState(() => {
    // Generate a random 6-character code
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  });

  // Simulate connection progress
  useEffect(() => {
    if (connectionStep === 'connecting') {
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setConnectionStep('success');
              setTimeout(() => {
                setIsConnected(true);
                setPairedDevice(userRole === 'grandparent' ? 'Εγγόνι' : 'Παππούς');
                setShowConnection(false);
                showSuccessMessage('Συνδέθηκε επιτυχώς!', '📱');
              }, 1500);
            }, 500);
            return 100;
          }
          return prev + 4;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [connectionStep, setIsConnected, setPairedDevice, setShowConnection, showSuccessMessage, userRole]);

  const handleBluetoothConnect = async () => {
    setConnectionStep('connecting');
    setConnectionProgress(0);

    try {
      if (bluetoothService) {
        await bluetoothService.requestAndConnect();
      }
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      setConnectionStep('error');
      setAttempts(prev => prev + 1);
    }
  };

  const resetConnection = () => {
    setConnectionStep('waiting');
    setConnectionProgress(0);
    setAttempts(0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showSuccessMessage('Κωδικός αντιγράφηκε!', '📋');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative">
        {/* Close button */}
        <button
          onClick={() => setShowConnection(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden mb-4 mx-auto">
            <Bluetooth className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Σύνδεση Bluetooth</h1>
          <p className="text-gray-600">Συνδέστε τις συσκευές για πραγματική επικοινωνία</p>
        </div>

        {/* Connection Steps Visual */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
              userRole === 'grandparent' ? 'bg-purple-100 border-purple-500 text-purple-600' : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}>
              <Users className="w-8 h-8" />
            </div>
            <span className="text-sm mt-2 font-semibold">Παππούς/Γιαγιά</span>
          </div>
          
          <Bluetooth className={`w-8 h-8 ${connectionStep === 'connecting' ? 'text-blue-500 animate-pulse' : connectionStep === 'success' ? 'text-green-500' : 'text-gray-400'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
              userRole === 'child' ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}>
              <Smartphone className="w-8 h-8" />
            </div>
            <span className="text-sm mt-2 font-semibold">Παιδί/Εγγόνι</span>
          </div>
        </div>

        {/* Connection Status */}
        {connectionStep === 'waiting' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <Bluetooth className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-4 text-blue-800">Ξεκινήστε Σύνδεση Bluetooth</h3>
              <p className="text-blue-700 mb-6">
                Πατήστε το κουμπί για να αναζητήσετε και να συνδεθείτε με την άλλη συσκευή
              </p>
              <button
                onClick={handleBluetoothConnect}
                disabled={isConnecting}
                className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isConnecting ? 'Αναζήτηση συσκευών...' : 'Ξεκίνα Σύνδεση Bluetooth'}
              </button>
            </div>
            
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2 mx-auto"
            >
              <AlertCircle className="w-4 h-4" />
              Οδηγίες σύνδεσης
            </button>
          </div>
        )}

        {connectionStep === 'connecting' && (
          <div className="space-y-6">
            <div className="text-6xl animate-bounce mb-4">🔄</div>
            <h3 className="text-2xl font-bold text-blue-800">Συνδέεται...</h3>
            
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${connectionProgress}%` }}
              >
                <div className="h-full bg-white bg-opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-gray-600">Δημιουργία ασφαλούς σύνδεσης...</p>
          </div>
        )}

        {connectionStep === 'success' && (
          <div className="space-y-6">
            <div className="text-8xl animate-bounce mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-800">Επιτυχία!</h3>
            <p className="text-green-700 text-xl">Οι συσκευές συνδέθηκαν επιτυχώς</p>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-4">
                <Heart className="w-8 h-8 text-red-500" />
                <span className="text-lg font-semibold text-green-800">
                  Η οικογένεια είναι συνδεδεμένη!
                </span>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        )}

        {connectionStep === 'error' && (
          <div className="space-y-6">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-red-800">Σφάλμα Σύνδεσης</h3>
            <p className="text-red-700">Αποτυχία σύνδεσης Bluetooth. Ελέγξτε ότι το Bluetooth είναι ενεργό και προσπαθήστε ξανά.</p>
            
            <div className="space-y-3">
              <button
                onClick={resetConnection}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Προσπάθεια ξανά
              </button>
              
              <button
                onClick={() => setShowConnection(false)}
                className="w-full bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
              >
                Ακύρωση
              </button>
            </div>
          </div>
        )}

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Οδηγίες Σύνδεσης</h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Ενεργοποιήστε το Bluetooth</h4>
                    <p className="text-gray-600">Βεβαιωθείτε ότι το Bluetooth είναι ενεργό και στις δύο συσκευές</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Βεβαιωθείτε ότι είστε κοντά</h4>
                    <p className="text-gray-600">Οι συσκευές πρέπει να είναι στον ίδιο χώρο (μέχρι 10 μέτρα)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Πατήστε σύνδεση και στις δύο συσκευές</h4>
                    <p className="text-gray-600">Και οι δύο πρέπει να πατήσουν "Ξεκίνα Σύνδεση Bluetooth" ταυτόχρονα</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">✓</div>
                  <div>
                    <h4 className="font-bold mb-1">Επιλέξτε τη συσκευή</h4>
                    <p className="text-gray-600">Όταν εμφανιστεί η λίστα, επιλέξτε την άλλη συσκευή</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-6 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Κατάλαβα
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Ασφαλής σύνδεση • Κρυπτογραφημένα δεδομένα
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionScreen;