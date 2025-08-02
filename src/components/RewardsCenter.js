import React, { useState } from 'react';
import { ChevronLeft, Trophy, Gift, Star, Crown, Zap, Heart, Lock, Check, ShoppingBag, Sparkles, Award, Medal, Diamond, Flame, Users } from 'lucide-react';

const RewardsCenter = ({ 
  setCurrentView, 
  userRole,
  gameScore,
  setGameScore,
  completedLessons,
  unlockedFeatures,
  setUnlockedFeatures,
  claimedRewards,
  setClaimedRewards,
  t, 
  textSizeClasses, 
  buttonSizeClasses,
  textSize,
  userName = 'Χρήστης' // Default value for userName
}) => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState(null);

  // Enhanced rewards with proper functionality
  const rewards = [
    {
      id: 'avatar_pack_1',
      name: 'Πακέτο Avatar "Κλασικό"',
      description: 'Ξεκλειδώστε 3 νέα avatars: Χαρούμενος Παππούς, Κουλ Γιαγιά, Σοφός Παππούς',
      cost: 150,
      icon: '👥',
      type: 'avatar_pack',
      category: 'Avatars',
      rarity: 'common'
    },
    {
      id: 'accessory_pack_1',
      name: 'Πακέτο Αξεσουάρ "Βασικό"',
      description: 'Πάρτε καπέλο, γυαλιά και λουλούδι δωρεάν!',
      cost: 80,
      icon: '🎩',
      type: 'accessory_pack',
      category: 'Αξεσουάρ',
      rarity: 'common'
    },
    {
      id: 'larger_text',
      name: 'Μεγαλύτερα Γράμματα',
      description: 'Ξεκλειδώστε ακόμα μεγαλύτερη γραμματοσειρά για καλύτερη ανάγνωση',
      cost: 100,
      icon: '🔤',
      type: 'feature',
      category: 'Χαρακτηριστικά',
      rarity: 'useful'
    },
    {
      id: 'voice_commands',
      name: 'Φωνητικές Εντολές',
      description: 'Χρησιμοποιήστε τη φωνή σας για να πλοηγηθείτε στην εφαρμογή',
      cost: 200,
      icon: '🎤',
      type: 'feature',
      category: 'Χαρακτηριστικά',
      rarity: 'premium'
    },
    {
      id: 'themes_pack',
      name: 'Πακέτο Θεμάτων',
      description: 'Αλλάξτε τα χρώματα της εφαρμογής: Θάλασσα, Φύση, Νύχτα',
      cost: 75,
      icon: '🎨',
      type: 'theme_pack',
      category: 'Εμφάνιση',
      rarity: 'common'
    },
    {
      id: 'premium_lessons',
      name: 'Premium Μαθήματα',
      description: 'Πρόσβαση σε 15 επιπλέον μαθήματα για προχωρημένους',
      cost: 300,
      icon: '📚',
      type: 'feature',
      category: 'Μαθήματα',
      rarity: 'premium'
    },
    {
      id: 'family_sharing',
      name: 'Οικογενειακή Κοινοποίηση',
      description: 'Μοιραστείτε την πρόοδό σας με όλη την οικογένεια',
      cost: 120,
      icon: '👨‍👩‍👧‍👦',
      type: 'feature',
      category: 'Κοινωνικά',
      rarity: 'useful'
    },
    {
      id: 'celebration_effects',
      name: 'Εφέ Γιορτής',
      description: 'Πυροτεχνήματα και κομφετί όταν ολοκληρώνετε μαθήματα!',
      cost: 50,
      icon: '🎉',
      type: 'feature',
      category: 'Εφέ',
      rarity: 'fun'
    },
    {
      id: 'golden_avatar',
      name: 'Χρυσό Avatar',
      description: 'Εξαιρετικό χρυσό avatar μόνο για τους καλύτερους!',
      cost: 500,
      icon: '👑',
      type: 'avatar',
      category: 'Avatars',
      rarity: 'legendary'
    }
  ];

  // Enhanced achievements system
  const achievements = [
    {
      id: 'first_lesson',
      name: 'Πρώτο Μάθημα',
      description: 'Ολοκληρώστε το πρώτο σας μάθημα',
      reward: 25,
      icon: '🎯',
      completed: completedLessons.length >= 1,
      rarity: 'common'
    },
    {
      id: 'three_lessons',
      name: 'Τρία Μαθήματα',
      description: 'Ολοκληρώστε 3 μαθήματα',
      reward: 50,
      icon: '🏆',
      completed: completedLessons.length >= 3,
      rarity: 'useful'
    },
    {
      id: 'five_lessons',
      name: 'Όλα τα Μαθήματα',
      description: 'Ολοκληρώστε όλα τα 5 βασικά μαθήματα',
      reward: 100,
      icon: '⭐',
      completed: completedLessons.length >= 5,
      rarity: 'rare'
    },
    {
      id: 'master_tech',
      name: 'Μάστερ Τεχνολογίας',
      description: 'Κερδίστε 500 πόντους συνολικά',
      reward: 150,
      icon: '👑',
      completed: gameScore >= 500,
      rarity: 'premium'
    },
    {
      id: 'daily_user',
      name: 'Καθημερινός Χρήστης',
      description: 'Συνδεθείτε στην εφαρμογή για 7 συνεχόμενες μέρες',
      reward: 75,
      icon: '📅',
      completed: true, // Simulated
      rarity: 'useful'
    },
    {
      id: 'social_butterfly',
      name: 'Κοινωνική Πεταλούδα',
      description: 'Στείλτε 20 μηνύματα στην οικογένεια',
      reward: 60,
      icon: '🦋',
      completed: true, // Simulated
      rarity: 'fun'
    },
    {
      id: 'avatar_collector',
      name: 'Συλλέκτης Avatar',
      description: 'Αγοράστε 5 διαφορετικά avatars',
      reward: 80,
      icon: '🎭',
      completed: false,
      rarity: 'rare'
    },
    {
      id: 'big_spender',
      name: 'Μεγάλος Αγοραστής',
      description: 'Ξοδέψτε 300 πόντους στο κατάστημα',
      reward: 120,
      icon: '💎',
      completed: false,
      rarity: 'premium'
    },
    {
      id: 'legend',
      name: 'Θρύλος του Roottly',
      description: 'Φτάστε 1000 πόντους και ολοκληρώστε όλα τα μαθήματα',
      reward: 250,
      icon: '🌟',
      completed: gameScore >= 1000 && completedLessons.length >= 5,
      rarity: 'legendary'
    }
  ];

  const canAfford = (cost) => gameScore >= cost;
  const isOwned = (rewardId) => claimedRewards.includes(rewardId);

  const claimReward = (reward) => {
    if (canAfford(reward.cost) && !isOwned(reward.id)) {
      setGameScore(prev => prev - reward.cost);
      setClaimedRewards(prev => [...prev, reward.id]);
      setUnlockedFeatures(prev => [...prev, reward.id]);
      
      // Show purchase modal
      setPurchasedItem(reward);
      setShowPurchaseModal(true);
    }
  };

  const claimAchievement = (achievement) => {
    if (achievement.completed && !isOwned(achievement.id)) {
      setGameScore(prev => prev + achievement.reward);
      setClaimedRewards(prev => [...prev, achievement.id]);
      
      // Show achievement modal
      setPurchasedItem({...achievement, type: 'achievement'});
      setShowPurchaseModal(true);
    }
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setPurchasedItem(null);
  };

  const getProgressPercentage = () => {
    return Math.min((gameScore / 1000) * 100, 100);
  };

  const getNextMilestone = () => {
    const milestones = [100, 250, 500, 750, 1000];
    return milestones.find(m => gameScore < m) || 1000;
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'border-gray-300 bg-gray-50',
      useful: 'border-blue-300 bg-blue-50',
      fun: 'border-purple-300 bg-purple-50',
      rare: 'border-orange-300 bg-orange-50',
      premium: 'border-indigo-300 bg-indigo-50',
      legendary: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 animate-pulse'
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <header className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-10 shadow-2xl">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
            className="text-white hover:bg-white/20 rounded-3xl p-6 transition-colors border-4 border-white/30 hover:border-white shadow-lg"
          >
            <ChevronLeft className="w-16 h-16" />
          </button>
          <div className="flex-1">
            <h1 className={`${textSizeClasses[textSize]} font-bold text-4xl mb-3`}>
              🏆 Κέντρο Ανταμοιβών
            </h1>
            <div className="flex items-center gap-8 mt-4">
              <div className="flex items-center gap-4 bg-white bg-opacity-25 rounded-3xl px-8 py-4 shadow-lg">
                <Trophy className="w-10 h-10 text-yellow-300" />
                <span className="text-yellow-300 font-bold text-3xl">{gameScore} πόντοι</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-green-300" />
                <span className="text-green-300 font-semibold text-xl">Επόμενος στόχος: {getNextMilestone()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-lg mb-3">
            <span className="text-yellow-100">Πρόοδος προς επόμενο επίπεδο</span>
            <span className="text-yellow-100">{Math.floor(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-6 relative overflow-hidden">
            <div 
              className="bg-yellow-300 h-6 rounded-full transition-all duration-500 shadow-lg relative"
              style={{ width: `${getProgressPercentage()}%` }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
            </div>
            {/* Milestone markers */}
            {[20, 40, 60, 80].map(percent => (
              <div 
                key={percent}
                className="absolute top-0 w-1 h-6 bg-white bg-opacity-50"
                style={{ left: `${percent}%` }}
              ></div>
            ))}
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Tabs */}
          <div className="flex mb-10 bg-white rounded-3xl shadow-xl p-4">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 ${buttonSizeClasses[textSize]} rounded-3xl transition-all text-2xl font-bold flex items-center justify-center gap-3 ${
                activeTab === 'achievements' 
                ? 'bg-yellow-500 text-white shadow-lg' 
                : 'text-yellow-600 hover:bg-yellow-100'
              }`}
            >
              <Award className="w-8 h-8" />
              🏅 Επιτεύγματα
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex-1 ${buttonSizeClasses[textSize]} rounded-3xl transition-all text-2xl font-bold flex items-center justify-center gap-3 ${
                activeTab === 'shop' 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'text-orange-600 hover:bg-orange-100'
              }`}
            >
              <ShoppingBag className="w-8 h-8" />
              🛍️ Κατάστημα
            </button>
          </div>

          {/* Achievements Section */}
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <h2 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-8 flex items-center gap-4 text-3xl`}>
                🏅 Τα Επιτεύγματά σας
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-3xl p-8 shadow-xl border-4 transition-all hover:shadow-2xl ${
                      achievement.completed && !isOwned(achievement.id)
                        ? 'border-green-400 bg-green-50 animate-pulse'
                        : isOwned(achievement.id)
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200'
                    } ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="text-center">
                      <div className={`text-6xl mb-4 ${!achievement.completed ? 'grayscale' : ''}`}>
                        {achievement.icon}
                      </div>
                      {achievement.rarity === 'legendary' && (
                        <div className="text-2xl mb-2">✨</div>
                      )}
                      <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 text-xl mb-3`}>
                        {achievement.name}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">{achievement.description}</p>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-yellow-600">
                          💰 +{achievement.reward} πόντοι
                        </div>
                        {isOwned(achievement.id) ? (
                          <span className="text-blue-600 font-bold flex items-center justify-center gap-2 text-lg">
                            <Check className="w-6 h-6" />
                            Κερδήθηκε!
                          </span>
                        ) : achievement.completed ? (
                          <button
                            onClick={() => claimAchievement(achievement)}
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors text-lg shadow-lg"
                          >
                            Κέρδισε τώρα!
                          </button>
                        ) : (
                          <span className="text-gray-500 flex items-center justify-center gap-2 text-lg">
                            <Lock className="w-5 h-5" />
                            Κλειδωμένο
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Rewards Shop */}
          {activeTab === 'shop' && (
            <div className="space-y-8">
              <h2 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-8 flex items-center gap-4 text-3xl`}>
                🛍️ Κατάστημα Ανταμοιβών
              </h2>
              
              {/* Category filters */}
              <div className="flex flex-wrap gap-4 mb-8">
                {['Όλα', 'Avatars', 'Χαρακτηριστικά', 'Εμφάνιση', 'Αξεσουάρ'].map(category => (
                  <button
                    key={category}
                    className="px-6 py-3 bg-white border-2 border-orange-300 rounded-2xl hover:bg-orange-50 transition-colors font-semibold"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rewards.map(reward => {
                  const affordable = canAfford(reward.cost);
                  const owned = isOwned(reward.id);
                  
                  return (
                    <div
                      key={reward.id}
                      className={`bg-white rounded-3xl p-8 shadow-xl transition-all border-4 ${
                        owned
                          ? 'border-green-400 bg-green-50'
                          : affordable
                          ? 'hover:shadow-2xl transform hover:scale-105 border-orange-200 hover:border-orange-400'
                          : 'opacity-75 border-gray-200'
                      } ${getRarityColor(reward.rarity)}`}
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4">{reward.icon}</div>
                        
                        {/* Rarity badge */}
                        {reward.rarity === 'legendary' && (
                          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                            <Crown className="w-4 h-4" />
                            ΘΡΥΛΙΚΟ
                          </div>
                        )}
                        {reward.rarity === 'premium' && (
                          <div className="inline-flex items-center gap-1 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                            <Diamond className="w-4 h-4" />
                            PREMIUM
                          </div>
                        )}
                        
                        <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                          {reward.category}
                        </div>
                        <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-4 text-xl leading-tight`}>
                          {reward.name}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{reward.description}</p>
                        
                        <div className="space-y-4">
                          {owned ? (
                            <div className="text-green-600 font-bold flex items-center justify-center gap-2 text-lg">
                              <Check className="w-6 h-6" />
                              Αγοράστηκε!
                            </div>
                          ) : (
                            <>
                              <div className={`font-bold text-2xl ${affordable ? 'text-orange-600' : 'text-red-500'}`}>
                                💰 {reward.cost} πόντοι
                              </div>
                              <button
                                onClick={() => claimReward(reward)}
                                disabled={!affordable}
                                className={`w-full py-3 px-6 rounded-2xl font-bold transition-colors text-lg ${
                                  affordable
                                    ? `${reward.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-orange-500'} text-white hover:shadow-xl transform hover:scale-105`
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                {affordable ? (
                                  <>
                                    <ShoppingBag className="inline w-5 h-5 mr-2" />
                                    Αγορά
                                  </>
                                ) : (
                                  'Χρειάζεστε περισσότερους πόντους'
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Tips Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-10">
            <h3 className={`${textSizeClasses[textSize]} font-bold text-blue-800 mb-6 flex items-center gap-4 text-3xl`}>
              💡 Πώς να κερδίσετε πόντους
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-700">
              <div className="space-y-4">
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">📚</span>
                  <span>Ολοκληρώστε μαθήματα: <strong>+25 πόντοι</strong></span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🏆</span>
                  <span>Περάστε κουίζ με άριστα: <strong>+30 πόντοι</strong></span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🎯</span>
                  <span>Κερδίστε επιτεύγματα: <strong>+25-250 πόντοι</strong></span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">📅</span>
                  <span>Χρησιμοποιήστε καθημερινά: <strong>+10 πόντοι</strong></span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">💬</span>
                  <span>Στείλτε μηνύματα: <strong>+5 πόντοι</strong></span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                  <span className="text-3xl">🎡</span>
                  <span>Χρησιμοποιήστε δραστηριότητες: <strong>+8 πόντοι</strong></span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white bg-opacity-50 rounded-3xl p-6 text-center">
              <p className="text-blue-800 font-bold text-2xl">
                🎯 Στόχος: Μαζέψτε 1000 πόντους για να γίνετε "Θρύλος του Roottly"!
              </p>
            </div>
          </div>

          {/* Enhanced Statistics */}
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-10 border-4 border-yellow-200">
            <h3 className="text-3xl font-bold text-yellow-800 mb-8 text-center">📊 Τα Στατιστικά σας</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-green-100 rounded-3xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">📚</div>
                <div className="text-3xl font-bold text-green-800">{completedLessons.length}</div>
                <div className="text-green-600 text-xl">Μαθήματα</div>
                <div className="text-sm text-green-500 mt-1">από 5 συνολικά</div>
              </div>
              <div className="bg-blue-100 rounded-3xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-3xl font-bold text-blue-800">{achievements.filter(a => a.completed && isOwned(a.id)).length}</div>
                <div className="text-blue-600 text-xl">Επιτεύγματα</div>
                <div className="text-sm text-blue-500 mt-1">από {achievements.length} συνολικά</div>
              </div>
              <div className="bg-purple-100 rounded-3xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">🛍️</div>
                <div className="text-3xl font-bold text-purple-800">{claimedRewards.filter(id => rewards.find(r => r.id === id)).length}</div>
                <div className="text-purple-600 text-xl">Αγορές</div>
                <div className="text-sm text-purple-500 mt-1">από {rewards.length} διαθέσιμα</div>
              </div>
              <div className="bg-orange-100 rounded-3xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-3xl font-bold text-orange-800">{gameScore}</div>
                <div className="text-orange-600 text-xl">Πόντοι</div>
                <div className="text-sm text-orange-500 mt-1">συνολικά κερδισμένοι</div>
              </div>
            </div>
            
            {/* Level progress */}
            <div className="mt-8 pt-6 border-t border-yellow-200">
              <div className="text-center mb-4">
                <h4 className="text-2xl font-bold text-yellow-800">🏅 Επίπεδο Παίκτη</h4>
              </div>
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {gameScore < 100 ? '🌱' : 
                     gameScore < 250 ? '🌿' : 
                     gameScore < 500 ? '🌳' : 
                     gameScore < 750 ? '🏆' : 
                     gameScore < 1000 ? '👑' : '⭐'}
                  </div>
                  <div className="font-bold text-yellow-800">
                    {gameScore < 100 ? 'Αρχάριος' : 
                     gameScore < 250 ? 'Μαθητής' : 
                     gameScore < 500 ? 'Ειδικός' : 
                     gameScore < 750 ? 'Πρωταθλητής' : 
                     gameScore < 1000 ? 'Μάστερ' : 'Θρύλος'}
                  </div>
                </div>
                <div className="flex-1 max-w-md">
                  <div className="text-center mb-2">
                    <span className="text-yellow-700">Πρόοδος προς επόμενο επίπεδο</span>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(gameScore % 250) / 250 * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-sm text-yellow-600">
                    {gameScore % 250} / 250 πόντοι
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily/Weekly challenges preview */}
          <div className="mt-10 bg-gradient-to-r from-pink-100 to-red-100 border-4 border-pink-300 rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-pink-800 mb-8 text-center flex items-center justify-center gap-3">
              <Flame className="w-8 h-8" />
              🔥 Ημερήσιες Προκλήσεις
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-3">💬</div>
                <h4 className="font-bold text-lg mb-2">Κοινωνικός</h4>
                <p className="text-gray-600 text-sm mb-3">Στείλτε 5 μηνύματα</p>
                <div className="bg-pink-200 rounded-full h-2 mb-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm text-pink-600">3/5 ✨ +15 πόντοι</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-bold text-lg mb-2">Μαθητής</h4>
                <p className="text-gray-600 text-sm mb-3">Ολοκληρώστε 1 μάθημα</p>
                <div className="bg-blue-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
                <p className="text-sm text-blue-600">0/1 ✨ +25 πόντοι</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-green-300">
                <div className="text-4xl mb-3">🎡</div>
                <h4 className="font-bold text-lg mb-2">Περιπετειώδης</h4>
                <p className="text-gray-600 text-sm mb-3">Χρησιμοποιήστε δραστηριότητες</p>
                <div className="bg-green-200 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-600 font-bold">Ολοκληρώθηκε! +10 πόντοι</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-pink-700 font-semibold">
                ⏰ Οι προκλήσεις ανανεώνονται κάθε 24 ώρες!
              </p>
            </div>
          </div>

          {/* Bonus Weekend Events */}
          <div className="mt-10 bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-indigo-300 rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-indigo-800 mb-8 text-center flex items-center justify-center gap-3">
              <Crown className="w-8 h-8" />
              ✨ Σαββατοκύριακο Bonus
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border-2 border-gold-300">
                <div className="text-6xl mb-4">🏆</div>
                <h4 className="text-2xl font-bold mb-4 text-indigo-800">Διπλοί Πόντοι</h4>
                <p className="text-indigo-600 text-lg mb-4">
                  Το Σαββατοκύριακο κερδίζετε διπλούς πόντους από όλες τις δραστηριότητες!
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl font-bold text-lg">
                  Ενεργό τώρα! 🔥
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">🎁</div>
                <h4 className="text-2xl font-bold mb-4 text-indigo-800">Μυστήριο Δώρο</h4>
                <p className="text-indigo-600 text-lg mb-4">
                  Συμπληρώστε 3 δραστηριότητες την Κυριακή για ένα ειδικό δώρο!
                </p>
                <div className="bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold text-lg">
                  Πρόοδος: 1/3 🎯
                </div>
              </div>
            </div>
          </div>

          {/* Family Leaderboard */}
          <div className="mt-10 bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-300 rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-green-800 mb-8 text-center flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8" />
              👥 Οικογενειακή Κατάταξη
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Μαρία (Γιαγιά)', points: 850, rank: 1, avatar: '👵', trend: '+45' },
                { name: 'Γιάννης (Παππούς)', points: 720, rank: 2, avatar: '👴', trend: '+32' },
                { name: 'Άννα (Εγγονή)', points: 650, rank: 3, avatar: '👧', trend: '+28' },
                { name: 'Νίκος (Εγγονός)', points: 580, rank: 4, avatar: '👦', trend: '+15' }
              ].map((member, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg border-2 flex items-center gap-6 ${
                  member.name.includes(userName) ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl font-bold px-4 py-2 rounded-full ${
                      member.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      member.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      member.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      #{member.rank}
                    </div>
                    <div className="text-4xl">{member.avatar}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                    <p className="text-gray-600">Συνολικοί πόντοι: {member.points}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-lg">↗ {member.trend}</div>
                    <p className="text-sm text-gray-500">αυτή την εβδομάδα</p>
                  </div>
                  
                  {member.rank === 1 && (
                    <div className="text-yellow-500 text-3xl animate-bounce">👑</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-green-700 font-semibold text-lg">
                🎯 Ανταγωνιστείτε με την οικογένειά σας και κερδίστε επιπλέον ανταμοιβές!
              </p>
            </div>
          </div>

          {/* Community Challenges */}
          <div className="mt-10 bg-gradient-to-r from-cyan-100 to-blue-100 border-4 border-cyan-300 rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-cyan-800 mb-8 text-center flex items-center justify-center gap-3">
              <Users className="w-8 h-8" />
              🌍 Κοινοτικές Προκλήσεις
            </h3>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">🌍</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2 text-cyan-800">
                      Παγκόσμια Ημέρα Παππούδων
                    </h4>
                    <p className="text-cyan-600 mb-4">
                      Συμμετέχετε με 50.000+ οικογένειες στην παγκόσμια γιορτή!
                    </p>
                    <div className="bg-cyan-200 rounded-full h-3 mb-4">
                      <div className="bg-cyan-500 h-3 rounded-full" style={{width: '73%'}}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-700">36,500 / 50,000 οικογένειες</span>
                      <span className="text-cyan-700 font-bold">+100 πόντοι όλοι!</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">💌</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2 text-cyan-800">
                      1 Εκατομμύριο Μηνύματα Αγάπης
                    </h4>
                    <p className="text-cyan-600 mb-4">
                      Ας στείλουμε μαζί 1,000,000 μηνύματα αγάπης αυτόν το μήνα!
                    </p>
                    <div className="bg-pink-200 rounded-full h-3 mb-4">
                      <div className="bg-pink-500 h-3 rounded-full" style={{width: '42%'}}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-pink-700">420,350 / 1,000,000 μηνύματα</span>
                      <span className="text-pink-700 font-bold">+50 πόντοι bonus!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Purchase/Achievement Success Modal */}
      {showPurchaseModal && purchasedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-green-400">
            <div className="text-6xl mb-4">
              {purchasedItem.type === 'achievement' ? '🏆' : '🎉'}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-green-800">
              {purchasedItem.type === 'achievement' ? 'Νέο Επίτευγμα!' : 'Επιτυχής Αγορά!'}
            </h3>
            <div className="text-4xl mb-4">{purchasedItem.icon}</div>
            <p className="text-xl mb-6 text-gray-700">
              {purchasedItem.type === 'achievement' ? 'Κερδίσατε: ' : 'Αγοράσατε: '}
              <strong>{purchasedItem.name}</strong>
            </p>
            {purchasedItem.type === 'achievement' && (
              <p className="text-lg mb-6 text-green-600 font-bold">
                +{purchasedItem.reward} πόντοι!
              </p>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  closePurchaseModal();
                  setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome');
                }}
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
              >
                Αρχική Σελίδα
              </button>
              <button
                onClick={closePurchaseModal}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors"
              >
                Συνέχεια
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsCenter;