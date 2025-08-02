import React, { useState } from 'react';
import { ChevronLeft, Check, ShoppingCart, Crown } from 'lucide-react';

const AvatarSelection = ({ 
  setCurrentView, 
  userRole,
  selectedAvatar,
  setSelectedAvatar,
  selectedAccessories,
  setSelectedAccessories,
  gameScore,
  setGameScore,
  t, 
  textSizeClasses, 
  buttonSizeClasses,
  textSize
}) => {
  const [activeTab, setActiveTab] = useState('avatars');
  const [purchasedItems, setPurchasedItems] = useState(['elder_man', 'elder_woman', 'young_man', 'young_woman']);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState(null);

  const avatars = [
    { id: 'elder_man', emoji: '👨‍🦳', name: 'Παππούς', cost: 0 },
    { id: 'elder_woman', emoji: '👵', name: 'Γιαγιά', cost: 0 },
    { id: 'young_man', emoji: '👦', name: 'Εγγονός', cost: 0 },
    { id: 'young_woman', emoji: '👧', name: 'Εγγονή', cost: 0 },
    { id: 'happy_elder', emoji: '😊', name: 'Χαρούμενος Παππούς', cost: 50 },
    { id: 'cool_elder', emoji: '😎', name: 'Κουλ Γιαγιά', cost: 50 },
    { id: 'wise_elder', emoji: '🧙‍♂️', name: 'Σοφός Παππούς', cost: 100 },
    { id: 'tech_elder', emoji: '🤓', name: 'Tech Παππούς', cost: 100 },
    { id: 'chef_elder', emoji: '👨‍🍳', name: 'Σεφ Παππούς', cost: 75 },
    { id: 'artist_elder', emoji: '🎨', name: 'Καλλιτέχνης Γιαγιά', cost: 75 },
    { id: 'superhero', emoji: '🦸‍♂️', name: 'Σούπερ Παππούς', cost: 200 },
    { id: 'princess', emoji: '👸', name: 'Πριγκίπισσα Γιαγιά', cost: 200 },
    { id: 'ninja_elder', emoji: '🥷', name: 'Νίντζα Παππούς', cost: 150 },
    { id: 'mermaid_elder', emoji: '🧜‍♀️', name: 'Γοργόνα Γιαγιά', cost: 150 }
  ];

  const accessories = [
    { id: 'hat_basic', emoji: '🧢', name: 'Καπέλο του Μπέιζμπολ', cost: 25 },
    { id: 'hat_formal', emoji: '🎩', name: 'Κλασικό Καπέλο', cost: 30 },
    { id: 'crown', emoji: '👑', name: 'Κορώνα', cost: 75 },
    { id: 'glasses', emoji: '👓', name: 'Γυαλιά', cost: 20 },
    { id: 'sunglasses', emoji: '🕶️', name: 'Γυαλιά Ηλίου', cost: 35 },
    { id: 'bow_tie', emoji: '🎀', name: 'Παπιγιόν', cost: 40 },
    { id: 'flower', emoji: '🌸', name: 'Λουλούδι', cost: 15 },
    { id: 'medal', emoji: '🏅', name: 'Μετάλλιο', cost: 60 },
    { id: 'star', emoji: '⭐', name: 'Αστέρι', cost: 45 },
    { id: 'heart', emoji: '💖', name: 'Καρδιά', cost: 30 },
    { id: 'rainbow', emoji: '🌈', name: 'Ουράνιο Τόξο', cost: 50 },
    { id: 'lightning', emoji: '⚡', name: 'Κεραυνός', cost: 55 },
    { id: 'diamond', emoji: '💎', name: 'Διαμάντι', cost: 80 },
    { id: 'fire', emoji: '🔥', name: 'Φωτιά', cost: 65 }
  ];

  const canAfford = (cost) => gameScore >= cost;
  const isOwned = (id) => purchasedItems.includes(id);

  const handleAvatarSelect = (avatarId, cost) => {
    if (isOwned(avatarId)) {
      setSelectedAvatar(avatarId);
    } else if (canAfford(cost)) {
      setGameScore(prev => prev - cost);
      setPurchasedItems(prev => [...prev, avatarId]);
      setSelectedAvatar(avatarId);
      
      // Show purchase modal
      const avatarData = avatars.find(a => a.id === avatarId);
      setPurchasedItem({ type: 'avatar', ...avatarData });
      setShowPurchaseModal(true);
    }
  };

  const handleAccessoryToggle = (accessoryId, cost) => {
    if (selectedAccessories.includes(accessoryId)) {
      setSelectedAccessories(prev => prev.filter(id => id !== accessoryId));
    } else if (isOwned(accessoryId)) {
      setSelectedAccessories(prev => [...prev, accessoryId]);
    } else if (canAfford(cost)) {
      setGameScore(prev => prev - cost);
      setPurchasedItems(prev => [...prev, accessoryId]);
      setSelectedAccessories(prev => [...prev, accessoryId]);
      
      // Show purchase modal
      const accessoryData = accessories.find(a => a.id === accessoryId);
      setPurchasedItem({ type: 'accessory', ...accessoryData });
      setShowPurchaseModal(true);
    }
  };

  const getCurrentAvatar = () => {
    const avatar = avatars.find(a => a.id === selectedAvatar);
    return avatar ? avatar.emoji : '👨‍🦳';
  };

  const getAccessoryEmojis = () => {
    return selectedAccessories.map(id => {
      const accessory = accessories.find(a => a.id === id);
      return accessory ? accessory.emoji : '';
    }).join('');
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setPurchasedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-10 shadow-xl">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentView(userRole === 'grandparent' ? 'grandparentHome' : 'childHome')}
            className="text-white hover:bg-white/20 rounded-3xl p-6 transition-colors border-4 border-white/30 hover:border-white shadow-lg"
          >
            <ChevronLeft className="w-16 h-16" />
          </button>
          <div className="flex-1">
            <h1 className={`${textSizeClasses[textSize]} font-bold text-4xl mb-3`}>
              🛍️ Κατάστημα Avatar
            </h1>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-4 bg-white bg-opacity-25 rounded-3xl px-6 py-3">
                <ShoppingCart className="w-8 h-8 text-yellow-300" />
                <span className="text-yellow-300 font-bold text-2xl">💰 {gameScore} πόντοι</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-9xl mb-3">
              {getCurrentAvatar()}{getAccessoryEmojis()}
            </div>
            <p className="text-xl opacity-90 font-semibold">Το Avatar σας</p>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex mb-10 bg-white rounded-3xl shadow-xl p-4">
            <button
              onClick={() => setActiveTab('avatars')}
              className={`flex-1 ${buttonSizeClasses[textSize]} rounded-3xl transition-all text-2xl font-bold ${
                activeTab === 'avatars' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-purple-600 hover:bg-purple-100'
              }`}
            >
              👤 Avatars
            </button>
            <button
              onClick={() => setActiveTab('accessories')}
              className={`flex-1 ${buttonSizeClasses[textSize]} rounded-3xl transition-all text-2xl font-bold ${
                activeTab === 'accessories' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-purple-600 hover:bg-purple-100'
              }`}
            >
              👑 Αξεσουάρ
            </button>
          </div>

          {/* Avatars Tab */}
          {activeTab === 'avatars' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {avatars.map(avatar => {
                const isSelected = selectedAvatar === avatar.id;
                const affordable = canAfford(avatar.cost);
                const owned = isOwned(avatar.id);
                
                return (
                  <button
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar.id, avatar.cost)}
                    disabled={!affordable && avatar.cost > 0 && !owned}
                    className={`relative bg-white rounded-3xl p-10 shadow-xl transition-all transform hover:scale-105 border-4 ${
                      isSelected 
                        ? 'ring-4 ring-purple-500 bg-purple-50 border-purple-400' 
                        : !affordable && avatar.cost > 0 && !owned
                        ? 'opacity-50 cursor-not-allowed border-gray-300'
                        : 'hover:shadow-2xl border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-8xl mb-6">{avatar.emoji}</div>
                    <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-4 text-xl`}>
                      {avatar.name}
                    </h3>
                    
                    {avatar.cost === 0 ? (
                      <div className="text-green-600 font-bold text-lg">🆓 ΔΩΡΕΑΝ</div>
                    ) : owned ? (
                      <div className="text-blue-600 font-bold text-lg">✅ ΔΙΚΟ ΣΑΣ</div>
                    ) : (
                      <div className={`font-bold text-lg ${affordable ? 'text-purple-600' : 'text-red-500'}`}>
                        💰 {avatar.cost} πόντοι
                      </div>
                    )}

                    {isSelected && (
                      <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-4 shadow-lg">
                        <Check className="w-8 h-8" />
                      </div>
                    )}

                    {!affordable && avatar.cost > 0 && !owned && (
                      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-3xl flex items-center justify-center">
                        <div className="text-6xl">🔒</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Accessories Tab */}
          {activeTab === 'accessories' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {accessories.map(accessory => {
                const isSelected = selectedAccessories.includes(accessory.id);
                const affordable = canAfford(accessory.cost);
                const owned = isOwned(accessory.id);
                
                return (
                  <button
                    key={accessory.id}
                    onClick={() => handleAccessoryToggle(accessory.id, accessory.cost)}
                    disabled={!affordable && !owned}
                    className={`relative bg-white rounded-3xl p-10 shadow-xl transition-all transform hover:scale-105 border-4 ${
                      isSelected 
                        ? 'ring-4 ring-pink-500 bg-pink-50 border-pink-400' 
                        : !affordable && !owned
                        ? 'opacity-50 cursor-not-allowed border-gray-300'
                        : 'hover:shadow-2xl border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-8xl mb-6">{accessory.emoji}</div>
                    <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-4 text-xl`}>
                      {accessory.name}
                    </h3>
                    
                    {owned ? (
                      <div className="text-blue-600 font-bold text-lg">
                        {isSelected ? '✨ ΦΟΡΙΕΤΑΙ' : '💼 ΔΙΚΟ ΣΑΣ'}
                      </div>
                    ) : (
                      <div className={`font-bold text-lg ${affordable ? 'text-pink-600' : 'text-red-500'}`}>
                        💰 {accessory.cost} πόντοι
                      </div>
                    )}

                    {isSelected && (
                      <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-4 shadow-lg">
                        <Check className="w-8 h-8" />
                      </div>
                    )}

                    {!affordable && !owned && (
                      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-3xl flex items-center justify-center">
                        <div className="text-6xl">🔒</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-10 text-center">
            <h3 className={`${textSizeClasses[textSize]} font-bold text-blue-800 mb-6 text-3xl`}>
              💡 Οδηγίες
            </h3>
            <p className="text-blue-700 text-2xl leading-relaxed">
              {activeTab === 'avatars' 
                ? 'Επιλέξτε το avatar που σας αρέσει! Κερδίστε πόντους από μαθήματα για να ξεκλειδώσετε νέα avatars. Τα δωρεάν avatars είναι πάντα διαθέσιμα!'
                : 'Πατήστε τα αξεσουάρ για να τα φορέσετε ή να τα βγάλετε. Μπορείτε να φορέσετε πολλά μαζί! Δημιουργήστε το δικό σας μοναδικό στυλ!'
              }
            </p>
            <div className="mt-8 bg-white bg-opacity-50 rounded-3xl p-6">
              <p className="text-blue-800 font-semibold text-2xl">
                🎯 Συμβουλή: Ολοκληρώστε μαθήματα για να κερδίσετε περισσότερους πόντους!
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-10 text-center border-4 border-purple-200">
            <h3 className="text-3xl font-bold text-purple-800 mb-8">👀 Προεπισκόπηση</h3>
            <div className="text-10xl mb-6">{getCurrentAvatar()}{getAccessoryEmojis()}</div>
            <p className="text-2xl text-gray-600 mb-6">Έτσι φαίνεστε τώρα!</p>
            
            <div className="flex justify-center gap-6">
              <div className="bg-purple-100 rounded-3xl px-8 py-4">
                <span className="text-purple-800 font-semibold text-xl">Avatar: </span>
                <span className="text-purple-600 text-xl">{avatars.find(a => a.id === selectedAvatar)?.name || 'Παππούς'}</span>
              </div>
              {selectedAccessories.length > 0 && (
                <div className="bg-pink-100 rounded-3xl px-8 py-4">
                  <span className="text-pink-800 font-semibold text-xl">Αξεσουάρ: </span>
                  <span className="text-pink-600 text-xl">{selectedAccessories.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Purchase Success Modal */}
      {showPurchaseModal && purchasedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-green-400">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-4 text-green-800">Επιτυχής Αγορά!</h3>
            <div className="text-4xl mb-4">{purchasedItem.emoji}</div>
            <p className="text-xl mb-6 text-gray-700">
              Αγοράσατε: <strong>{purchasedItem.name}</strong>
            </p>
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

export default AvatarSelection;