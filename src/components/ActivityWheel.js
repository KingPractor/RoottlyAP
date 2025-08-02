import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, RotateCcw, Star, Trophy, Home } from 'lucide-react';

const ActivityWheel = ({ 
  userRole,
  userInterests,
  grandparentInterests,
  setCurrentView, 
  t, 
  textSizeClasses, 
  buttonSizeClasses,
  textSize,
  language 
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Available interests with icons
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

  // Get relevant activities based on interests
  const getRelevantActivities = () => {
    const activities = {
      el: {
        cooking: ["Μαγειρέψτε παραδοσιακές συνταγές", "Φτιάξτε γλυκά", "Ετοιμάστε καφέ ελληνικό"],
        gardening: ["Ποτίστε τα φυτά", "Φυτέψτε βασιλικό", "Καθαρίστε τον κήπο"],
        music: ["Ακούστε αγαπημένα τραγούδια", "Τραγουδήστε μαζί", "Χορέψτε"],
        reading: ["Διαβάστε εφημερίδα", "Διαβάστε ένα βιβλίο", "Γράψτε ημερολόγιο"],
        walking: ["Βόλτα στο πάρκο", "Βόλτα στη γειτονιά", "Γυμναστική στο σπίτι"],
        photos: ["Δείτε παλιές φωτογραφίες", "Τραβήξτε νέες φωτογραφίες", "Φτιάξτε άλμπουμ"],
        games: ["Παίξτε σκάκι", "Λύστε σταυρόλεξα", "Παίξτε χαρτιά"],
        crafts: ["Ζωγραφίστε", "Πλέξτε", "Φτιάξτε χειροτεχνίες"],
        movies: ["Δείτε ελληνική ταινία", "Δείτε ντοκιμαντέρ", "Δείτε κωμωδία"],
        travel: ["Δείτε φωτογραφίες από ταξίδια", "Σχεδιάστε ταξίδι", "Διαβάστε για προορισμούς"],
        general: [
          "Πιείτε καφέ με φίλους",
          "Καλέστε έναν συγγενή",
          "Κάντε βιντεοκλήση",
          "Μοιραστείτε αναμνήσεις",
          "Γράψτε γράμμα",
          "Οργανώστε το σπίτι",
          "Κάντε διαλογισμό",
          "Ακούστε τις ειδήσεις"
        ]
      },
      en: {
        cooking: ["Cook traditional recipes", "Make desserts", "Prepare Greek coffee"],
        gardening: ["Water the plants", "Plant basil", "Clean the garden"],
        music: ["Listen to favorite songs", "Sing together", "Dance"],
        reading: ["Read newspaper", "Read a book", "Write diary"],
        walking: ["Walk in the park", "Walk in neighborhood", "Exercise at home"],
        photos: ["Look at old photos", "Take new photos", "Make album"],
        games: ["Play chess", "Solve crosswords", "Play cards"],
        crafts: ["Paint", "Knit", "Make crafts"],
        movies: ["Watch Greek movie", "Watch documentary", "Watch comedy"],
        travel: ["Look at travel photos", "Plan a trip", "Read about destinations"],
        general: [
          "Have coffee with friends",
          "Call a relative",
          "Make video call",
          "Share memories",
          "Write a letter",
          "Organize the house",
          "Meditate",
          "Listen to news"
        ]
      }
    };

    const userActivities = userRole === 'grandparent' ? userInterests : grandparentInterests;
    let allActivities = [];
    
    // Add activities based on interests
    userActivities.forEach(interest => {
      if (activities[language] && activities[language][interest]) {
        allActivities.push(...activities[language][interest]);
      }
    });
    
    // Add general activities
    if (activities[language] && activities[language].general) {
      allActivities.push(...activities[language].general);
    }
    
    // If no specific activities, use all general ones
    if (allActivities.length === 0) {
      allActivities = activities[language]?.general || activities.el.general;
    }
    
    return allActivities.slice(0, 8); // Limit to 8 activities for the wheel
  };

  const wheelActivities = getRelevantActivities();
  const segmentAngle = 360 / wheelActivities.length;

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setSelectedActivity(null);

    // Random spin: 3-5 full rotations plus random angle
    const minSpins = 3;
    const maxSpins = 5;
    const spins = Math.random() * (maxSpins - minSpins) + minSpins;
    const finalAngle = Math.random() * 360;
    const totalRotation = spins * 360 + finalAngle;
    
    setRotation(prev => prev + totalRotation);
    
    // Calculate which segment we land on
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle) % wheelActivities.length;
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedActivity(wheelActivities[selectedIndex]);
      setShowResult(true);
    }, 3000);
  };

  const resetWheel = () => {
    setSelectedActivity(null);
    setShowResult(false);
    setRotation(0);
  };

  // Wheel colors
  const colors = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
    'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-10 shadow-xl">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
            className="text-white hover:bg-white/20 rounded-3xl p-6 transition-colors border-4 border-white/30 hover:border-white shadow-lg"
          >
            <ChevronLeft className="w-16 h-16" />
          </button>
          <h1 className={`${textSizeClasses[textSize]} font-bold flex-1 text-4xl`}>
            🎡 Ρόδα Δραστηριοτήτων
          </h1>
        </div>
      </header>
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-10">
            <p className={`${textSizeClasses[textSize]} text-gray-600 mb-6 text-2xl`}>
              {isSpinning ? "Περιστρέφεται..." : "Περιστρέψτε τη ρόδα για μια τυχαία δραστηριότητα!"}
            </p>
          </div>

          {/* Wheel Container */}
          <div className="relative flex justify-center items-center mb-12">
            {/* Pointer */}
            <div className="absolute top-0 z-20 transform -translate-x-1/2 -translate-y-3">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-600 shadow-lg"></div>
            </div>
            
            {/* Wheel */}
            <div className="relative">
              <div 
                className={`w-96 h-96 rounded-full relative overflow-hidden shadow-2xl transition-transform duration-3000 ease-out border-8 border-white ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? '3s' : '0.3s'
                }}
              >
                {wheelActivities.map((activity, index) => {
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute w-full h-full ${colors[index % colors.length]}`}
                      style={{
                        clipPath: `polygon(50% 50%, ${
                          50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)
                        }%, ${
                          50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)
                        }%)`
                      }}
                    >
                      <div 
                        className="absolute text-white font-bold text-lg p-3 transform"
                        style={{
                          top: `${50 + 30 * Math.sin((startAngle + segmentAngle/2 - 90) * Math.PI / 180)}%`,
                          left: `${50 + 30 * Math.cos((startAngle + segmentAngle/2 - 90) * Math.PI / 180)}%`,
                          transform: `translate(-50%, -50%) rotate(${startAngle + segmentAngle/2}deg)`,
                          maxWidth: '100px',
                          textAlign: 'center',
                          fontSize: wheelActivities.length > 6 ? '12px' : '14px'
                        }}
                      >
                        {activity.slice(0, 25)}
                        {activity.length > 25 ? '...' : ''}
                      </div>
                    </div>
                  );
                })}
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center border-4 border-gray-200">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-6">
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`${buttonSizeClasses[textSize]} bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none px-12 py-6`}
            >
              <Play className="inline mr-3 w-8 h-8" />
              {isSpinning ? "Περιστρέφεται..." : "Περιστρέψτε τη Ρόδα!"}
            </button>

            <button
              onClick={resetWheel}
              className={`${buttonSizeClasses[textSize]} bg-gray-500 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-10 py-6 ml-6`}
            >
              <RotateCcw className="inline mr-3 w-6 h-6" />
              Επαναφορά
            </button>
          </div>

          {/* FIXED Result Section */}
          {showResult && selectedActivity && (
            <div className="mt-12">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-3xl p-10 shadow-2xl text-center transform scale-105 border-4 border-white">
                <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-300" />
                <h2 className={`${textSizeClasses[textSize]} font-bold mb-4 text-3xl`}>
                  🎉 Επιλεγμένη Δραστηριότητα!
                </h2>
                <p className={`${textSizeClasses[textSize]} text-2xl mb-8 bg-white bg-opacity-20 rounded-2xl p-6`}>
                  {selectedActivity}
                </p>
                <div className="flex gap-6 justify-center flex-wrap">
                  <button
                    onClick={() => {
                      // Show activity started message
                      const activityDiv = document.createElement('div');
                      activityDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-10 rounded-3xl shadow-2xl z-50 text-center border-4 border-white max-w-lg';
                      activityDiv.innerHTML = `
                        <div class="text-8xl mb-6">🚀</div>
                        <h3 class="text-3xl font-bold mb-4">Τέλεια Επιλογή!</h3>
                        <p class="text-xl mb-8">Απολαύστε τη δραστηριότητά σας!</p>
                        <button onclick="this.parentElement.remove()" class="bg-white text-green-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 text-2xl">
                          Ξεκινάω!
                        </button>
                      `;
                      document.body.appendChild(activityDiv);
                      setTimeout(() => activityDiv.remove(), 8000);
                    }}
                    className={`${buttonSizeClasses[textSize]} bg-white text-blue-600 rounded-3xl font-bold hover:bg-gray-100 transition-colors px-10 py-6 shadow-xl text-2xl`}
                  >
                    Ξεκινήστε Δραστηριότητα 🚀
                  </button>
                  <button
                    onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
                    className={`${buttonSizeClasses[textSize]} bg-yellow-400 text-yellow-900 rounded-3xl font-bold hover:bg-yellow-300 transition-colors px-10 py-6 shadow-xl text-2xl`}
                  >
                    <Home className="inline mr-3 w-6 h-6" />
                    Αρχική Σελίδα
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activity suggestions based on interests */}
          <div className="mt-16">
            <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-8 text-center text-3xl`}>
              💡 Βασισμένα στα Ενδιαφέροντά σας
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(userRole === 'grandparent' ? userInterests : grandparentInterests).slice(0, 4).map(interest => {
                const interestData = availableInterests.find(i => i.id === interest);
                return interestData ? (
                  <div key={interest} className="bg-white rounded-2xl p-6 shadow-xl text-center border-4 border-orange-200 hover:border-orange-400 transition-colors">
                    <div className="text-4xl mb-3">{interestData.icon}</div>
                    <div className="text-lg font-semibold text-gray-700">
                      {language === 'el' ? {
                        cooking: 'Μαγείρεμα',
                        gardening: 'Κηπουρική',
                        music: 'Μουσική',
                        reading: 'Διάβασμα',
                        walking: 'Περπάτημα',
                        photos: 'Φωτογραφίες',
                        games: 'Παιχνίδια',
                        crafts: 'Χειροτεχνίες',
                        movies: 'Ταινίες',
                        travel: 'Ταξίδια'
                      }[interest] : {
                        cooking: 'Cooking',
                        gardening: 'Gardening',
                        music: 'Music',
                        reading: 'Reading',
                        walking: 'Walking',
                        photos: 'Photos',
                        games: 'Games',
                        crafts: 'Crafts',
                        movies: 'Movies',
                        travel: 'Travel'
                      }[interest]}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-10">
            <h3 className={`${textSizeClasses[textSize]} font-bold text-blue-800 mb-6 flex items-center gap-4 text-3xl`}>
              💡 Πώς να Χρησιμοποιήσετε τη Ρόδα
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-700">
              <div className="space-y-4">
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🎯</span>
                  <span>Πατήστε το κουμπί για να περιστρέψετε τη ρόδα</span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">⏱️</span>
                  <span>Περιμένετε να σταματήσει η ρόδα</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🎉</span>
                  <span>Δείτε την επιλεγμένη δραστηριότητα</span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🚀</span>
                  <span>Ξεκινήστε να απολαμβάνετε!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityWheel;