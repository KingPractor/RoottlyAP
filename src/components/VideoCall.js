import React, { useState, useEffect } from 'react';
import { Video, Phone, Mic, MicOff, VideoOff, Volume2, VolumeX } from 'lucide-react';

const VideoCall = ({ contactName, onEndCall, language, textSizeClasses, textSize }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // Simulate connection process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const translations = {
    el: {
      connecting: "Συνδέεται...",
      connected: "Συνδεδεμένος",
      mute: "Σίγαση",
      unmute: "Ακούγεται",
      endCall: "Τέλος κλήσης",
      cameraOn: "Κάμερα ενεργή",
      cameraOff: "Κάμερα ανενεργή",
      speakerOn: "Ηχείο ενεργό",
      speakerOff: "Ηχείο ανενεργό"
    },
    en: {
      connecting: "Connecting...",
      connected: "Connected",
      mute: "Mute",
      unmute: "Unmute",
      endCall: "End call",
      cameraOn: "Camera on",
      cameraOff: "Camera off",
      speakerOn: "Speaker on",
      speakerOff: "Speaker off"
    }
  };

  const t = translations[language] || translations.el;

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col z-50">
      {/* Status bar */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <div className={`${textSizeClasses[textSize]} font-semibold`}>
          {contactName}
        </div>
        <div className="text-sm mt-1">
          {isConnected ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t.connected} • {formatDuration(callDuration)}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>{t.connecting}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Main video (contact) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {isConnected ? (
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">👨‍🦳</div>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <p className={`${textSizeClasses[textSize]} text-white font-semibold`}>
                  {contactName}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2 text-white text-opacity-80">
                  {!isMuted && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-4 bg-green-400 rounded-sm animate-pulse"></div>
                      <div className="w-2 h-3 bg-green-400 rounded-sm animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-5 bg-green-400 rounded-sm animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-4">📞</div>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className={`${textSizeClasses[textSize]} text-white`}>
                {t.connecting}
              </p>
            </div>
          )}
        </div>
        
        {/* Self video (picture-in-picture) */}
        <div className="absolute bottom-20 right-4 w-32 h-24 bg-gray-700 rounded-lg shadow-lg border-2 border-white overflow-hidden">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <VideoOff className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="text-2xl">👤</div>
            </div>
          )}
        </div>

        {/* Mute indicator */}
        {isMuted && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
            <MicOff className="w-4 h-4" />
            <span className="text-sm font-semibold">{t.mute}</span>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex justify-center gap-6">
          {/* Mute/Unmute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all transform hover:scale-110 ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            } text-white shadow-lg`}
            title={isMuted ? t.unmute : t.mute}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          {/* Speaker */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-4 rounded-full transition-all transform hover:scale-110 ${
              isSpeakerOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            } text-white shadow-lg`}
            title={isSpeakerOn ? t.speakerOn : t.speakerOff}
          >
            {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          
          {/* End Call */}
          <button
            onClick={onEndCall}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all transform hover:scale-110 shadow-lg"
            title={t.endCall}
          >
            <Phone className="w-6 h-6 rotate-135" />
          </button>
          
          {/* Video On/Off */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full transition-all transform hover:scale-110 ${
              isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            } text-white shadow-lg`}
            title={isVideoOff ? t.cameraOff : t.cameraOn}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        </div>

        {/* Control labels for accessibility */}
        <div className="flex justify-center gap-6 mt-2">
          <span className="text-xs text-gray-400 text-center w-14">
            {isMuted ? t.unmute : t.mute}
          </span>
          <span className="text-xs text-gray-400 text-center w-14">
            {isSpeakerOn ? t.speakerOn : t.speakerOff}
          </span>
          <span className="text-xs text-gray-400 text-center w-14">
            {t.endCall}
          </span>
          <span className="text-xs text-gray-400 text-center w-14">
            {isVideoOff ? t.cameraOff : t.cameraOn}
          </span>
        </div>
      </div>

      {/* Connection quality indicator */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-1 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-1 h-4 bg-green-400 rounded-sm"></div>
          <div className="w-1 h-5 bg-green-400 rounded-sm"></div>
          <div className="w-1 h-4 bg-gray-400 rounded-sm"></div>
        </div>
        <span className="ml-1">{isConnected ? 'HD' : '...'}</span>
      </div>
    </div>
  );
};

export default VideoCall;