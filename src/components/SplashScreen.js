import React, { useEffect, useState } from 'react';
import { Wifi, Users, Heart, Sparkles } from 'lucide-react';

const SplashScreen = ({ setCurrentView }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Φορτώνει...",
    "Προετοιμάζει την οικογενειακή επικοινωνία...",
    "Συνδέει γενιές...",
    "Σχεδόν έτοιμο!"
  ];

  // Roottly Logo Component matching the actual design
  const RoottlyLogo = ({ size = 'xlarge', animated = true }) => {
    return (
      <div className="flex flex-col items-center">
        <div className={`${size === 'xlarge' ? 'w-80 h-32' : 'w-40 h-16'} relative mb-8`}>
          {/* SVG Logo matching the actual Roottly design */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 300 120" 
            style={{filter: animated ? 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' : 'none'}}
          >
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" />
                <stop offset="100%" stopColor="#2E5BBA" />
              </linearGradient>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#E55100" />
              </linearGradient>
            </defs>

            {/* Left figure (Grandfather) - Blue flowing shape */}
            <g className={animated ? 'animate-pulse' : ''} style={animated ? {animationDuration: '3s', animationDelay: '0s'} : {}}>
              {/* Head/body as one flowing shape */}
              <path 
                d="M30 15 C50 10, 70 10, 85 25 C90 35, 85 45, 80 55 C75 70, 70 80, 60 90 C50 95, 40 90, 35 80 C25 70, 20 50, 25 35 C25 25, 27 20, 30 15 Z" 
                fill="url(#blueGradient)"
                className={animated ? 'animate-pulse' : ''}
                style={animated ? {animationDuration: '2s'} : {}}
              />
              
              {/* Glasses - simple black circles */}
              <circle cx="45" cy="35" r="6" fill="none" stroke="#2D2D2D" strokeWidth="3"/>
              <circle cx="65" cy="35" r="6" fill="none" stroke="#2D2D2D" strokeWidth="3"/>
              <line x1="51" y1="35" x2="59" y2="35" stroke="#2D2D2D" strokeWidth="2"/>
              
              {/* Simple smile */}
              <path d="M50 45 Q55 50, 60 45" fill="none" stroke="#2D2D2D" strokeWidth="2"/>
              
              {/* Flowing connection arm extending right */}
              <path 
                d="M80 60 C110 55, 130 50, 150 55 C160 57, 165 60, 168 65" 
                fill="none" 
                stroke="url(#blueGradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
                style={animated ? {animationDelay: '0.5s', animationDuration: '2.5s'} : {}}
              />
            </g>

            {/* Right figure (Grandchild) - Orange flowing shape */}
            <g className={animated ? 'animate-pulse' : ''} style={animated ? {animationDuration: '3s', animationDelay: '0.7s'} : {}}>
              {/* Head/body as one flowing shape */}
              <path 
                d="M215 15 C235 10, 255 10, 270 25 C275 35, 270 45, 265 55 C260 70, 255 80, 245 90 C235 95, 225 90, 220 80 C210 70, 205 50, 210 35 C210 25, 212 20, 215 15 Z" 
                fill="url(#orangeGradient)"
                className={animated ? 'animate-pulse' : ''}
                style={animated ? {animationDuration: '2s'} : {}}
              />
              
              {/* Hair - flowing organic shape */}
              <path 
                d="M220 12 C235 8, 250 8, 265 15 C268 18, 265 22, 260 20 C250 15, 235 12, 225 15 C220 16, 218 14, 220 12 Z" 
                fill="#E55100"
              />
              
              {/* Simple eyes */}
              <circle cx="235" cy="35" r="2" fill="#2D2D2D"/>
              <circle cx="250" cy="35" r="2" fill="#2D2D2D"/>
              
              {/* Simple smile */}
              <path d="M235 45 Q242.5 50, 250 45" fill="none" stroke="#2D2D2D" strokeWidth="2"/>
              
              {/* Flowing connection arm extending left */}
              <path 
                d="M220 60 C190 55, 170 50, 150 55 C140 57, 135 60, 132 65" 
                fill="none" 
                stroke="url(#orangeGradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
                style={animated ? {animationDelay: '1s', animationDuration: '2.5s'} : {}}
              />
            </g>

            {/* Central flowing connection waves */}
            <g className={animated ? 'animate-pulse' : ''} style={animated ? {animationDuration: '3s', animationDelay: '1.2s'} : {}}>
              <path 
                d="M132 65 C140 70, 150 68, 160 65 C170 62, 180 68, 190 65" 
                fill="none" 
                stroke="#FF6B35" 
                strokeWidth="4" 
                strokeLinecap="round"
                opacity="0.8"
              />
              <path 
                d="M135 70 C145 75, 155 73, 165 70 C175 67, 185 73, 195 70" 
                fill="none" 
                stroke="#4A90E2" 
                strokeWidth="3" 
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          </svg>
        </div>
        
        {/* App name and tagline */}
        <div className="text-center">
          <div className={`text-6xl font-bold mb-4 ${animated ? 'animate-fade-in' : ''}`}>
            <span className="text-gray-700" style={{color: '#4A4A4A'}}>Roottly</span>
          </div>
          <div className="text-2xl text-gray-600 font-medium mb-2">
            Συνδέοντας γενιές
          </div>
          <div className="text-lg text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Οικογενειακή επικοινωνία
            <Heart className="w-5 h-5 text-red-400" />
          </div>
        </div>
      </div>
    );
  };

  // Progress animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressTimer);
  }, []);

  // Message rotation
  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1000);

    return () => clearInterval(messageTimer);
  }, []);

  // Auto advance after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('onboarding');
    }, 4000);

    return () => clearTimeout(timer);
  }, [setCurrentView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-lg">
        {/* Main logo */}
        <RoottlyLogo size="xlarge" animated={true} />
        
        {/* Loading message */}
        <div className="mt-12 mb-8">
          <p className="text-2xl text-gray-600 font-medium animate-fade-in">
            {loadingMessages[currentMessage]}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="h-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-white bg-opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-3">
            <span className="text-lg font-semibold text-gray-700">{progress}%</span>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-6 mt-12 opacity-60">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Οικογένεια</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Σύνδεση</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Διασκέδαση</p>
          </div>
        </div>
        
        {/* Version info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Έκδοση 1.0.0 • Made with ❤️ in Greece
          </p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;