import React from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';

const SocialShare = ({ 
  setCurrentView, 
  grandparentName,
  grandparentDevice,
  userName,
  setMessages,
  messages,
  t, 
  textSizeClasses, 
  buttonSizeClasses,
  textSize,
  language
}) => {
  
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
    },
    {
      id: 3,
      platform: 'Facebook',
      content: 'My garden is blooming beautifully this spring 🌺🌻🌷',
      image: '🌻',
      simplified: {
        el: 'Ο κήπος μου ανθίζει όμορφα την άνοιξη!',
        en: 'My garden is blooming beautifully in spring!'
      }
    }
  ];

  const sharePost = (post) => {
    const simplifiedText = post.simplified[language];
    
    if (grandparentDevice === 'basic') {
      const smsText = `${userName}: ${simplifiedText}`;
      alert(`SMS: ${smsText}`);
      setMessages([...messages, {
        id: Date.now(),
        text: smsText,
        type: 'sms',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } else {
      setMessages([...messages, {
        id: Date.now(),
        text: simplifiedText,
        image: post.image,
        type: 'social',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('childHome')}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className={`${textSizeClasses[textSize]} font-bold flex-1`}>
            {t.shareFromSocial}
          </h1>
        </div>
      </header>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto">
          <p className={`${textSizeClasses[textSize]} text-center mb-6 text-gray-600`}>
            {t.selectPost}
          </p>
          
          <div className="space-y-4">
            {samplePosts.map(post => (
             <div key={post.id} className="bg-white rounded-xl shadow-md p-4">
               <div className="flex items-start gap-4">
                 <div className="text-4xl">{post.image}</div>
                 <div className="flex-1">
                   <p className="font-semibold text-gray-800">{post.platform}</p>
                   <p className="text-gray-600 mt-1">{post.content}</p>
                   <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                     <p className="text-sm text-gray-500">{t.simplifiedFor} {grandparentName}:</p>
                     <p className={`${textSizeClasses[textSize]} text-blue-800 font-medium mt-1`}>
                       {post.simplified[language]}
                     </p>
                   </div>
                   <button
                     onClick={() => sharePost(post)}
                     className={`mt-3 ${buttonSizeClasses[textSize]} bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors`}
                   >
                     <Share2 className="inline mr-2 w-5 h-5" />
                     {t.shareThis}
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </main>
   </div>
 );
};

export default SocialShare;