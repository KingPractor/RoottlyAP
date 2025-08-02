import React from 'react';
import { Users, Heart, ChevronLeft, Phone, Smartphone, Check } from 'lucide-react';
import { availableInterests } from '../translations/translations';

const Onboarding = ({
  onboardingStep,
  setOnboardingStep,
  userRole,
  setUserRole,
  userName,
  setUserName,
  grandparentName,
  setGrandparentName,
  grandparentPhone,
  setGrandparentPhone,
  grandparentDevice,
  setGrandparentDevice,
  userInterests,
  grandparentInterests,
  toggleInterest,
  setCurrentView,
  t,
  textSizeClasses,
  buttonSizeClasses,
  textSize
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Step 1: Select Role */}
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
          
          {/* Step 2: Enter Name */}
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
          
          {/* Step 3: Grandparent Device (Child only) */}
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
          
          {/* Step 4: Select Interests */}
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
};

export default Onboarding;