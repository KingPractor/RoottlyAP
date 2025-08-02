import React, { useState } from 'react';
import { ChevronLeft, Video, Camera, Monitor, Play, X, Trophy, Star, CheckCircle, XCircle, Award, RotateCcw, ArrowLeft, ArrowRight, Phone, MessageCircle, Shield, Wifi, Eye } from 'lucide-react';

// Enhanced lesson content with very simple explanations and visual elements
const lessonContent = {
  el: {
    1: {
      title: "Πώς να κάνετε βιντεοκλήση",
      icon: "📹",
      steps: [
        {
          title: "Βήμα 1: Βρείτε την εφαρμογή",
          content: "Ψάξτε στην οθόνη σας για ένα κουμπί που έχει μια κάμερα ή λέει 'Βιντεοκλήση'. Πατήστε το με το δάχτυλό σας.",
          image: "📱",
          explanation: "Όπως ανοίγετε την τηλεόραση πατώντας το κουμπί ON, έτσι πατάτε και εδώ ένα κουμπί για να ξεκινήσει η βιντεοκλήση.",
          example: "Σκεφτείτε το σαν το κουμπί που πατάτε στο τηλεχειριστήριο για να ανοίξετε την TV - το ίδιο απλό είναι!",
          tip: "Το κουμπί είναι συνήθως πράσινο ή μπλε χρώμα, σαν τη θάλασσα!",
          visual: "videoCallStart"
        },
        {
          title: "Βήμα 2: Δείτε τον εαυτό σας",
          content: "Όταν ανοίξει η εφαρμογή, θα δείτε το πρόσωπό σας στην οθόνη, σαν καθρέφτη. Αυτό είναι φυσιολογικό!",
          image: "🪞",
          explanation: "Είναι σαν να κοιτάζετε σε έναν καθρέφτη - βλέπετε τον εαυτό σας και μπορεί να σας βλέπει και ο άλλος.",
          example: "Όπως όταν κοιτάζετε στον καθρέφτη το πρωί για να χτενιστείτε, έτσι βλέπετε τον εαυτό σας και στην οθόνη.",
          tip: "Κρατήστε το τηλέφωνο σταθερά, σαν όταν διαβάζετε εφημερίδα!",
          visual: "videoPreview"
        },
        {
          title: "Βήμα 3: Χρησιμοποιήστε τα κουμπιά",
          content: "Βλέπετε κουμπιά στην οθόνη. Το μικρόφωνο για τον ήχο, η κάμερα για την εικόνα. Πατήστε τα για να τα ανοίξετε ή κλείσετε.",
          image: "🎤",
          explanation: "Όπως έχετε κουμπιά στο ραδιόφωνο για την ένταση, έτσι έχετε και εδώ κουμπιά για το μικρόφωνο και την κάμερα.",
          example: "Σαν όταν κλείνετε το ραδιόφωνο για να μην κάνει θόρυβo, έτσι κλείνετε και το μικρόφωνο.",
          tip: "Το κόκκινο χρώμα σημαίνει κλειστό, το πράσινο σημαίνει ανοιχτό!",
          visual: "videoControls"
        },
        {
          title: "Βήμα 4: Τελειώστε την κλήση",
          content: "Όταν θέλετε να τελειώσετε, πατήστε το κόκκινο κουμπί. Μοιάζει με το παλιό τηλέφωνο!",
          image: "📞",
          explanation: "Σαν όταν κλείνατε το παλιό τηλέφωνο κατεβάζοντας το ακουστικό, έτσι πατάτε και εδώ το κόκκινο κουμπί.",
          example: "Θυμηθείτε το παλιό σας τηλέφωνο - όταν τελειώνατε, κατεβάζατε το ακουστικό. Εδώ πατάτε το κόκκινο κουμπί.",
          tip: "Το κόκκινο κουμπί είναι σαν το κλείσιμο του παλιού τηλεφώνου!",
          visual: "videoEnd"
        }
      ],
      quiz: [
        {
          question: "Τι χρώμα έχει συνήθως το κουμπί για να αρχίσει η βιντεοκλήση;",
          options: ["Κόκκινο", "Πράσινο ή Μπλε", "Μαύρο"],
          correct: 1
        },
        {
          question: "Τι βλέπετε πρώτα όταν ανοίγει η βιντεοκλήση;",
          options: ["Τον άλλον άνθρωπο", "Τον εαυτό σας σαν καθρέφτη", "Μια μαύρη οθόνη"],
          correct: 1
        },
        {
          question: "Πώς τελειώνουμε τη βιντεοκλήση;",
          options: ["Πατάμε το πράσινο κουμπί", "Πατάμε το κόκκινο κουμπί", "Κλείνουμε το τηλέφωνο"],
          correct: 1
        },
        {
          question: "Τι σημαίνει το κόκκινο χρώμα στα κουμπιά;",
          options: ["Ανοιχτό", "Κλειστό", "Δεν έχει σημασία"],
          correct: 1
        }
      ]
    },
    2: {
      title: "Πώς να στείλετε φωτογραφία",
      icon: "📸",
      steps: [
        {
          title: "Βήμα 1: Ανοίξτε τα μηνύματα",
          content: "Βρείτε την εφαρμογή που λέει 'Μηνύματα' και πατήστε την. Εκεί γράφετε συνήθως στην οικογένεια.",
          image: "💬",
          explanation: "Είναι σαν να ανοίγετε ένα τετράδιο για να γράψετε ένα γράμμα μέσα.",
          example: "Όπως παίρνετε χαρτί και στυλό για να γράψετε γράμμα, έτσι ανοίγετε τα μηνύματα για να στείλετε φωτογραφία.",
          tip: "Μοιάζει με μια φυσαλίδα συνομιλίας, σαν στα κόμικς!",
          visual: "messageApp"
        },
        {
          title: "Βήμα 2: Βρείτε το κουμπί κάμερας",
          content: "Μέσα στα μηνύματα, ψάξτε για ένα εικονίδιο που μοιάζει με φωτογραφική μηχανή ή το σύμβολο +.",
          image: "📷",
          explanation: "Σαν όταν βάζετε φωτογραφία μέσα σε ένα γράμμα, έτσι πατάτε το κουμπί της κάμερας.",
          example: "Θυμηθείτε όταν βάζατε φωτογραφίες στα γράμματα που στέλνατε - το ίδιο κάνετε και εδώ, αλλά ηλεκτρονικά.",
          tip: "Συνήθως είναι δίπλα από εκεί που γράφετε τα γράμματα!",
          visual: "cameraButton"
        },
        {
          title: "Βήμα 3: Διαλέξτε φωτογραφία",
          content: "Θα σας δείξει τις φωτογραφίες σας, σαν άλμπουμ. Πατήστε αυτή που θέλετε να στείλετε.",
          image: "🖼️",
          explanation: "Όπως διαλέγετε φωτογραφία από το άλμπουμ για να τη δείξετε σε κάποιον, έτσι και εδώ.",
          example: "Είναι σαν να ανοίγετε το παλιό σας άλμπουμ και να διαλέγετε μια όμορφη φωτογραφία για να τη δείξετε.",
          tip: "Μπορείτε να τη δείτε πρώτα σε μεγάλο μέγεθος πριν την στείλετε!",
          visual: "photoGallery"
        },
        {
          title: "Βήμα 4: Στείλτε τη φωτογραφία",
          content: "Πατήστε 'Αποστολή' ή το κουμπί με το βέλος για να στείλετε τη φωτογραφία. Περιμένετε λίγο να ταξιδέψει!",
          image: "✉️",
          explanation: "Όπως βάζετε ένα γράμμα στο γραμματοκιβώτιο, έτσι στέλνετε και τη φωτογραφία.",
          example: "Σαν όταν πηγαίνατε στο ταχυδρομείο και στέλνατε γράμμα - τώρα το κάνετε από το σπίτι σας!",
          tip: "Το βέλος δείχνει προς τα δεξιά, σαν να πετάει το μήνυμα!",
          visual: "sendButton"
        }
      ],
      quiz: [
        {
          question: "Πού ανοίγουμε για να στείλουμε φωτογραφία;",
          options: ["Μηνύματα", "Κάμερα", "Ρυθμίσεις"],
          correct: 0
        },
        {
          question: "Ποιο σύμβολο δείχνει συνήθως την κάμερα;",
          options: ["📷 ή +", "❌", "🔒"],
          correct: 0
        },
        {
          question: "Πώς διαλέγουμε φωτογραφία;",
          options: ["Την πατάμε σαν από άλμπουμ", "Την γράφουμε", "Την ζωγραφίζουμε"],
          correct: 0
        },
        {
          question: "Με τι στέλνουμε τη φωτογραφία;",
          options: ["Με το βέλος ή 'Αποστολή'", "Με το Χ", "Με το μείον"],
          correct: 0
        }
      ]
    },
    3: {
      title: "Ασφαλής χρήση του διαδικτύου",
      icon: "🛡️",
      steps: [
        {
          title: "Βήμα 1: Προσοχή με τους κωδικούς",
          content: "Μην δίνετε ποτέ σε αγνώστους τον κωδικό της τράπεζας ή άλλα προσωπικά στοιχεία, όπως δεν δίνετε τα κλειδιά του σπιτιού.",
          image: "🔒",
          explanation: "Όπως δεν δίνετε τα κλειδιά του σπιτιού σε αγνώστους, έτσι δεν δίνετε και τους κωδικούς σας.",
          example: "Αν χτυπήσει κάποιος άγνωστος την πόρτα και ζητήσει τα κλειδιά σας, δεν θα τα δώσετε. Το ίδιο και με τους κωδικούς!",
          tip: "Η τράπεζα σας δεν θα σας ζητήσει ποτέ κωδικούς στο τηλέφωνο!",
          visual: "passwordSafety"
        },
        {
          title: "Βήμα 2: Προσοχή με παράξενα μηνύματα",
          content: "Αν λάβετε email ή μήνυμα από άγνωστο που σας ζητά να πατήσετε κάπου ή να δώσετε στοιχεία, μην το κάνετε. Διαγράψτε το.",
          image: "⚠️",
          explanation: "Σαν όταν χτυπάει άγνωστος την πόρτα και λέει ότι θα σας δώσει δώρα - δεν ανοίγετε.",
          example: "Όπως δεν ανοίγετε την πόρτα σε αγνώστους που υπόσχονται δώρα, έτσι δεν πατάτε σε παράξενα μηνύματα.",
          tip: "Αν κάτι φαίνεται πολύ καλό για να είναι αληθινό, μάλλον δεν είναι!",
          visual: "suspiciousEmail"
        },
        {
          title: "Βήμα 3: Δυνατοί κωδικοί",
          content: "Φτιάξτε κωδικούς που έχουν γράμματα, αριθμούς και σύμβολα μαζί. Μην βάλετε την ημερομηνία γέννησής σας ή το όνομά σας.",
          image: "🔑",
          explanation: "Σαν όταν βάζετε δυνατό λουκέτο στην πόρτα και όχι απλό κλειδί, έτσι βάζετε και δυνατό κωδικό.",
          example: "Όπως προτιμάτε ισχυρή κλειδαριά στο σπίτι, έτσι θέλετε και ισχυρό κωδικό.",
          tip: "Ένας καλός κωδικός είναι σαν ένα δυνατό λουκέτο!",
          visual: "strongPassword"
        },
        {
          title: "Βήμα 4: Ζητήστε βοήθεια",
          content: "Αν δεν είστε σίγουροι για κάτι, ρωτήστε κάποιον που εμπιστεύεστε (παιδί, εγγόνι, φίλο) πριν κάνετε οτιδήποτε.",
          image: "🤝",
          explanation: "Σαν όταν ρωτάτε το φαρμακοποιό για τα φάρμακα, έτσι ρωτάτε και για τον υπολογιστή.",
          example: "Όπως ρωτάτε το γιατρό πριν πάρετε φάρμακο, έτσι ρωτάτε κάποιον έμπιστο πριν δώσετε στοιχεία.",
          tip: "Καλύτερα να ρωτήσετε παρά να κάνετε λάθος!",
          visual: "askForHelp"
        }
      ],
      quiz: [
        {
          question: "Τι κάνετε αν σας ζητήσουν κωδικό τράπεζας στο τηλέφωνο;",
          options: ["Τον δίνω αμέσως", "Κλείνω και ρωτάω κάποιον έμπιστο", "Ζητάω περισσότερες πληροφορίες"],
          correct: 1
        },
        {
          question: "Πώς πρέπει να είναι ένας καλός κωδικός;",
          options: ["Μόνο αριθμοί", "Γράμματα, αριθμοί και σύμβολα μαζί", "Μόνο το όνομά μου"],
          correct: 1
        },
        {
          question: "Τι κάνουμε με παράξενα email από αγνώστους;",
          options: ["Τα διαβάζουμε προσεκτικά", "Τα διαγράφουμε", "Τα στέλνουμε σε φίλους"],
          correct: 1
        },
        {
          question: "Πότε ρωτάμε για βοήθεια;",
          options: ["Ποτέ", "Όταν δεν είμαστε σίγουροι", "Μόνο όταν έχουμε πρόβλημα"],
          correct: 1
        }
      ]
    },
    4: {
      title: "Σύνδεση στο Wi-Fi",
      icon: "📶",
      steps: [
        {
          title: "Βήμα 1: Βρείτε τις ρυθμίσεις",
          content: "Ψάξτε για ένα εικονίδιο που μοιάζει με γρανάζι ⚙️ και λέει 'Ρυθμίσεις'. Πατήστε το.",
          image: "⚙️",
          explanation: "Σαν όταν ρυθμίζετε την τηλεόραση με το τηλεχειριστήριο, έτσι ρυθμίζετε και το τηλέφωνο.",
          example: "Όπως έχετε κουμπιά στο τηλεχειριστήριο για να ρυθμίσετε την TV, έτσι έχετε και Ρυθμίσεις στο τηλέφωνο.",
          tip: "Μοιάζει με το γρανάζι ενός ρολογιού!",
          visual: "settingsIcon"
        },
        {
          title: "Βήμα 2: Βρείτε το Wi-Fi",
          content: "Μέσα στις ρυθμίσεις, ψάξτε για τη λέξη 'Wi-Fi' ή εικονίδια που μοιάζουν με κυματάκια 📶.",
          image: "📶",
          explanation: "Σαν όταν ψάχνετε σταθμό στο ραδιόφωνο, έτσι ψάχνετε και το Wi-Fi.",
          example: "Θυμηθείτε όταν ψάχνατε καλό σταθμό στο ραδιόφωνο - το ίδιο κάνετε για να βρείτε καλό Wi-Fi!",
          tip: "Τα κυματάκια μοιάζουν με τα κύματα της θάλασσας!",
          visual: "wifiIcon"
        },
        {
          title: "Βήμα 3: Διαλέξτε το δίκτυό σας",
          content: "Θα δείτε μια λίστα με ονόματα δικτύων. Βρείτε το όνομα του Wi-Fi του σπιτιού σας και πατήστε το.",
          image: "📋",
          explanation: "Σαν όταν διαλέγετε τηλεοπτικό κανάλι από τη λίστα, έτσι διαλέγετε και το Wi-Fi.",
          example: "Όπως διαλέγετε από τη λίστα καναλιών στην TV το κανάλι που θέλετε, έτσι διαλέγετε και το Wi-Fi σας.",
          tip: "Το όνομα βρίσκεται πίσω από το μικρό κουτί (router) που έχει φωτάκια!",
          visual: "wifiList"
        },
        {
          title: "Βήμα 4: Βάλτε τον κωδικό",
          content: "Πληκτρολογήστε τον κωδικό που είναι γραμμένος πίσω από το router και πατήστε 'Σύνδεση' ή 'Connect'.",
          image: "🔐",
          explanation: "Σαν όταν βάζετε κλειδί στην πόρτα για να μπείτε στο σπίτι.",
          example: "Όπως χρειάζεστε κλειδί για να ανοίξετε την πόρτα του σπιτιού, έτσι χρειάζεστε κωδικό για το Wi-Fi.",
          tip: "Ο κωδικός είναι συνήθως δίπλα από το όνομα του δικτύου στο router!",
          visual: "wifiPassword"
        }
      ],
      quiz: [
        {
          question: "Πού βρίσκουμε συνήθως το όνομα και τον κωδικό του Wi-Fi;",
          options: ["Στο τηλέφωνο", "Πίσω από το router (το κουτί με τα φωτάκια)", "Στην τηλεόραση"],
          correct: 1
        },
        {
          question: "Σε τι μοιάζει το εικονίδιο των ρυθμίσεων;",
          options: ["Σε γρανάζι ⚙️", "Σε λουλούδι", "Σε αυτοκίνητο"],
          correct: 0
        },
        {
          question: "Πώς μοιάζουν τα κυματάκια του Wi-Fi;",
          options: ["Με βουνά", "Με κύματα θάλασσας 📶", "Με σύννεφα"],
          correct: 1
        },
        {
          question: "Τι κάνουμε μετά που βάλουμε τον κωδικό;",
          options: ["Πατάμε 'Σύνδεση'", "Κλείνουμε το τηλέφωνο", "Πετάμε το router"],
          correct: 0
        }
      ]
    },
    5: {
      title: "Αναγνώριση ψεύτικων ειδήσεων",
      icon: "🔍",
      steps: [
        {
          title: "Βήμα 1: Κοιτάξτε από πού έρχεται",
          content: "Δείτε αν η είδηση έρχεται από γνωστό κανάλι ή εφημερίδα που εμπιστεύεστε, όπως το δελτίο ειδήσεων της TV.",
          image: "📰",
          explanation: "Σαν όταν ακούτε νέα από γείτονα ή από δημοσιογράφο - ποιον εμπιστεύεστε περισσότερο;",
          example: "Αν σας πει κάτι ο γείτονας και κάτι άλλο το δελτίο ειδήσεων της TV, ποιον πιστεύετε περισσότερο;",
          tip: "Εμπιστευτείτε μόνο γνωστά ΜΜΕ όπως το δελτίο ειδήσεων της TV!",
          visual: "newsSource"
        },
        {
          title: "Βήμα 2: Προσέξτε τον τίτλο",
          content: "Αν ο τίτλος φωνάζει 'ΣΟΚ!', 'ΑΠΙΣΤΕΥΤΟ!', 'ΔΕΙΤΕ ΤΙ ΕΓΙΝΕ!' ή 'ΤΡΟΜΕΡΟ!', να είστε καχύποπτοι.",
          image: "⚡",
          explanation: "Σαν όταν κάποιος φωνάζει στο δρόμο για να πουλήσει κάτι - συνήθως δεν είναι αληθινό.",
          example: "Όπως οι πλανόδιοι πωλητές φωνάζουν 'ΤΕΛΕΥΤΑΙΑ ΕΥΚΑΙΡΙΑ!' για να τραβήξουν προσοχή, έτσι και οι ψεύτικες ειδήσεις.",
          tip: "Σοβαρές ειδήσεις δεν φωνάζουν - είναι ήρεμες!",
          visual: "clickbaitTitle"
        },
        {
          title: "Βήμα 3: Ψάξτε αλλού",
          content: "Αν η είδηση είναι σημαντική και αληθινή, θα την βρείτε και σε άλλα κανάλια ή εφημερίδες.",
          image: "🔎",
          explanation: "Σαν όταν ακούτε κάτι για τον καιρό - το ελέγχετε και από άλλο κανάλι για να βεβαιωθείτε.",
          example: "Όπως βλέπετε τον καιρό σε διαφορετικά κανάλια για να βεβαιωθείτε, έτσι ελέγχετε και τις ειδήσεις.",
          tip: "Ελέγξτε 2-3 διαφορετικές πηγές!",
          visual: "multipleSources"
        },
        {
          title: "Βήμα 4: Μην το μοιραστείτε",
          content: "Αν δεν είστε 100% σίγουροι ότι η είδηση είναι αληθινή, μην την στείλετε σε άλλους ανθρώπους.",
          image: "🚫",
          explanation: "Σαν όταν ακούτε μια φήμη για κάποιον - δεν την επαναλαμβάνετε μέχρι να είστε σίγουροι ότι είναι αλήθεια.",
          example: "Όπως δεν λέτε κουτσομπολιά χωρίς να είστε σίγουροι, έτσι δεν στέλνετε και ψεύτικες ειδήσεις.",
          tip: "Καλύτερα να μην πείτε κάτι αμφίβολο παρά να διαδώσετε ψέματα!",
          visual: "dontShare"
        }
      ],
      quiz: [
        {
          question: "Ποιες ειδήσεις είναι πιο αξιόπιστες;",
          options: ["Από γνωστά κανάλια και εφημερίδες", "Από αγνώστους", "Από τα social media"],
          correct: 0
        },
        {
          question: "Τι πρέπει να κάνετε αν μια είδηση έχει τίτλο 'ΣΟΚ! ΔΕΙΤΕ ΤΙ ΕΓΙΝΕ!';",
          options: ["Να την μοιραστώ αμέσως", "Να είμαι καχύποπτος", "Να την πιστέψω"],
          correct: 1
        },
        {
          question: "Πόσες πηγές πρέπει να ελέγξουμε;",
          options: ["Μία", "2-3 διαφορετικές", "Καμία"],
          correct: 1
        },
        {
          question: "Τι κάνουμε αν δεν είμαστε σίγουροι για μια είδηση;",
          options: ["Δεν την μοιραζόμαστε", "Την στέλνουμε παντού", "Την τυπώνουμε"],
          correct: 0
        }
      ]
    }
  }
};

// Visual components for each lesson step
const VisualComponent = ({ type, size = "large" }) => {
  const baseSize = size === "small" ? "w-16 h-16" : "w-32 h-32";
  
  switch (type) {
    case "videoCallStart":
      return (
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">📱</div>
            <div className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 text-2xl font-bold cursor-pointer transform hover:scale-105 transition-all">
              <Video className="w-8 h-8" />
              Βιντεοκλήση
            </div>
            <p className="text-green-700 font-semibold text-center">↑ Πατήστε εδώ για να ξεκινήσετε!</p>
          </div>
        </div>
      );
    
    case "videoPreview":
      return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border-4 border-gray-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-black rounded-xl p-8 relative">
              <div className="text-4xl">👤</div>
              <div className="absolute top-2 right-2 text-green-400">🔴</div>
            </div>
            <p className="text-gray-700 font-semibold text-center">Βλέπετε τον εαυτό σας<br/>σαν σε καθρέφτη!</p>
          </div>
        </div>
      );
    
    case "videoControls":
      return (
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-4 border-blue-300">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-4xl">📹 Κουμπιά Ελέγχου</div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 p-4 rounded-full">
                  <div className="text-white text-2xl">🎤</div>
                </div>
                <p className="text-sm mt-2 text-green-700 font-bold">ΑΝΟΙΧΤΟ</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-500 p-4 rounded-full">
                  <div className="text-white text-2xl">🎤</div>
                </div>
                <p className="text-sm mt-2 text-red-700 font-bold">ΚΛΕΙΣΤΟ</p>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-center">Πράσινο = Ανοιχτό<br/>Κόκκινο = Κλειστό</p>
          </div>
        </div>
      );
    
    case "videoEnd":
      return (
        <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-6 border-4 border-red-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">📞</div>
            <div className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full flex items-center gap-3 text-2xl font-bold cursor-pointer transform hover:scale-105 transition-all">
              <Phone className="w-8 h-8" />
            </div>
            <p className="text-red-700 font-semibold text-center">↑ Κόκκινο κουμπί για τέλος<br/>σαν το παλιό τηλέφωνο!</p>
          </div>
        </div>
      );
    
    case "messageApp":
      return (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-500 p-6 rounded-2xl">
              <MessageCircle className="w-16 h-16 text-white" />
            </div>
            <p className="text-2xl font-bold">💬 Μηνύματα</p>
            <p className="text-green-700 font-semibold text-center">Πατήστε εδώ για να ανοίξετε<br/>τα μηνύματα!</p>
          </div>
        </div>
      );
    
    case "cameraButton":
      return (
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border-4 border-blue-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-4 items-center">
              <div className="bg-gray-200 p-3 rounded-lg">
                <span className="text-lg">Γράψτε μήνυμα...</span>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-white text-xl font-bold">+</span>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-center">↑ Πατήστε την κάμερα 📷 ή το +</p>
          </div>
        </div>
      );
    
    case "photoGallery":
      return (
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-yellow-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-2xl font-bold">📸 Οι Φωτογραφίες μου</div>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl cursor-pointer transform hover:scale-110 transition-all ${i === 3 ? 'bg-blue-300 border-4 border-blue-500' : 'bg-gray-200'}`}>
                  🖼️
                </div>
              ))}
            </div>
            <p className="text-orange-700 font-semibold text-center">Πατήστε τη φωτογραφία<br/>που θέλετε!</p>
          </div>
        </div>
      );
    
    case "sendButton":
      return (
        <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300 w-full max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center text-2xl">🖼️</div>
                <div className="flex-1 text-sm text-gray-600">Φωτογραφία επιλέχθηκε</div>
                <div className="bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <p className="text-green-700 font-semibold text-center">↑ Πατήστε το βέλος για αποστολή!</p>
          </div>
        </div>
      );
    
    case "passwordSafety":
      return (
        <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-6 border-4 border-red-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-6xl mb-2">🏠</div>
                <div className="text-4xl mb-2">🔑</div>
                <p className="text-red-700 font-bold">Κλειδιά σπιτιού<br/>ΔΕΝ δίνω σε αγνώστους!</p>
              </div>
              <div className="text-6xl self-center">=</div>
              <div className="text-center">
                <div className="text-6xl mb-2">💻</div>
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-red-700 font-bold">Κωδικούς<br/>ΔΕΝ δίνω σε αγνώστους!</p>
              </div>
            </div>
          </div>
        </div>
      );
    
    case "suspiciousEmail":
      return (
        <div className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-2xl p-6 border-4 border-yellow-400">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-red-400 w-full max-w-sm">
              <div className="text-red-600 font-bold text-lg">⚠️ ΠΡΟΣΟΧΗ!</div>
              <div className="text-sm mt-2">ΣΟΚ! ΚΕΡΔΙΣΑΤΕ 1.000.000€!</div>
              <div className="text-sm text-blue-600 underline mt-2">Πατήστε ΕΔΩ ΑΜΕΣΩΣ!</div>
              <div className="text-xs text-gray-500 mt-2">Από: stranger@fake.com</div>
            </div>
            <div className="text-6xl">🚫</div>
            <p className="text-red-700 font-bold text-center">ΠΟΤΕ μην πατάτε<br/>τέτοια μηνύματα!</p>
          </div>
        </div>
      );
    
    case "strongPassword":
      return (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">❌ ΚΑΚΟΣ</div>
                <div className="bg-red-200 p-3 rounded-lg mt-2">
                  <div className="font-mono text-lg">123456</div>
                  <div className="font-mono text-lg">Maria1980</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">✅ ΚΑΛΟΣ</div>
                <div className="bg-green-200 p-3 rounded-lg mt-2">
                  <div className="font-mono text-lg">M@r!a#2024$</div>
                  <div className="text-xs text-green-700 mt-1">Γράμματα + Αριθμοί + Σύμβολα</div>
                </div>
              </div>
            </div>
            <p className="text-green-700 font-semibold text-center">Δυνατός κωδικός = Ασφαλές σπίτι!</p>
          </div>
        </div>
      );
    
    case "askForHelp":
      return (
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 border-4 border-blue-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6 items-center">
              <div className="text-6xl">👵</div>
              <div className="text-4xl">💭</div>
              <div className="text-6xl">👨‍👩‍👧‍👦</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
              <p className="text-lg font-semibold text-blue-800">"Παιδί μου, δεν είμαι σίγουρη για αυτό το μήνυμα. Μπορείς να με βοηθήσεις;"</p>
            </div>
            <p className="text-blue-700 font-semibold text-center">Καλύτερα να ρωτήσω<br/>παρά να κάνω λάθος!</p>
          </div>
        </div>
      );
    
    case "settingsIcon":
      return (
        <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl p-6 border-4 border-gray-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">📱</div>
            <div className="bg-gray-700 p-6 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="text-white text-6xl">⚙️</div>
            </div>
            <p className="text-2xl font-bold">Ρυθμίσεις</p>
            <p className="text-gray-700 font-semibold text-center">↑ Ψάξτε για το γρανάζι!</p>
          </div>
        </div>
      );
    
    case "wifiIcon":
      return (
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border-4 border-blue-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-4xl font-bold">Ρυθμίσεις</div>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300 w-full max-w-sm">
              <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg cursor-pointer">
                <div className="text-3xl">📶</div>
                <div className="text-xl font-semibold">Wi-Fi</div>
                <div className="ml-auto text-blue-600">▶</div>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-center">↑ Πατήστε στο Wi-Fi!</p>
          </div>
        </div>
      );
    
    case "wifiList":
      return (
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-2xl font-bold">📶 Διαθέσιμα Wi-Fi</div>
            <div className="bg-white p-4 rounded-lg border-2 border-green-300 w-full max-w-sm space-y-2">
              <div className="flex items-center gap-3 p-3 bg-green-200 border-2 border-green-500 rounded-lg cursor-pointer">
                <div className="text-2xl">🏠</div>
                <div className="text-lg font-semibold">SPITI_MOU_WIFI</div>
                <div className="text-2xl">📶</div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer opacity-50">
                <div className="text-2xl">🏠</div>
                <div className="text-lg">GEITONA_WIFI</div>
                <div className="text-2xl">🔒</div>
              </div>
            </div>
            <p className="text-green-700 font-semibold text-center">↑ Πατήστε το δικό σας Wi-Fi!</p>
          </div>
        </div>
      );
    
    case "wifiPassword":
      return (
        <div className="bg-gradient-to-br from-yellow-100 to-green-100 rounded-2xl p-6 border-4 border-yellow-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="bg-gray-800 p-4 rounded-lg text-white text-xs">
                  <div>📶 WIFI: SPITI_MOU</div>
                  <div>🔑 PASS: mypass123</div>
                </div>
                <p className="text-sm mt-2 font-bold">Router<br/>(το κουτί με τα φωτάκια)</p>
              </div>
              <div className="text-4xl">➡️</div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <input type="password" value="mypass123" readOnly className="text-center border rounded p-2" />
                  <div className="bg-green-500 text-white p-2 rounded mt-2 cursor-pointer">Σύνδεση</div>
                </div>
                <p className="text-sm mt-2 font-bold">Στο τηλέφωνο</p>
              </div>
            </div>
            <p className="text-green-700 font-semibold text-center">Αντιγράψτε τον κωδικό από το router!</p>
          </div>
        </div>
      );
    
    case "newsSource":
      return (
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 border-4 border-green-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">✅ ΕΜΠΙΣΤΟΣ</div>
                <div className="bg-green-200 p-3 rounded-lg mt-2">
                  <div className="text-2xl">📺</div>
                  <div className="text-sm font-bold">ΕΡΤ, ΣΚΑΙ, ANT1</div>
                  <div className="text-xs">Γνωστά κανάλια</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">❌ ΑΜΦΙΒΟΛΟ</div>
                <div className="bg-red-200 p-3 rounded-lg mt-2">
                  <div className="text-2xl">❓</div>
                  <div className="text-sm font-bold">unknown-news.com</div>
                  <div className="text-xs">Άγνωστη πηγή</div>
                </div>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-center">Εμπιστευτείτε μόνο γνωστά ΜΜΕ!</p>
          </div>
        </div>
      );
    
    case "clickbaitTitle":
      return (
        <div className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-2xl p-6 border-4 border-yellow-400">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-red-400 w-full max-w-md">
              <div className="text-red-600 font-bold text-xl text-center mb-2">🚨 ΣΟΚ! ΑΠΙΣΤΕΥΤΟ!</div>
              <div className="text-lg text-center text-red-700">ΔΕΙΤΕ ΤΙ ΕΓΙΝΕ! ΤΡΟΜΕΡΟ!</div>
              <div className="text-center mt-2 text-red-500"> ΠΑΤΗΣΤΕ ΕΔΩ!</div>
            </div>
            <div className="text-6xl">⚠️</div>
            <p className="text-red-700 font-bold text-center">Τίτλοι που φωνάζουν<br/>συνήθως ΨΕΜΑΤΑ!</p>
          </div>
        </div>
      );
    
    case "multipleSources":
      return (
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-4 border-blue-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-2xl font-bold">🔍 Έλεγχος σε πολλές πηγές</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-200 p-3 rounded-lg text-center">
                <div className="text-2xl">📺</div>
                <div className="text-xs font-bold">ΕΡΤ</div>
                <div className="text-xs text-green-700">✅ Επιβεβαιώνει</div>
              </div>
              <div className="bg-green-200 p-3 rounded-lg text-center">
                <div className="text-2xl">📰</div>
                <div className="text-xs font-bold">Καθημερινή</div>
                <div className="text-xs text-green-700">✅ Επιβεβαιώνει</div>
              </div>
              <div className="bg-green-200 p-3 rounded-lg text-center">
                <div className="text-2xl">📻</div>
                <div className="text-xs font-bold">Real FM</div>
                <div className="text-xs text-green-700">✅ Επιβεβαιώνει</div>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-center">3/3 πηγές το επιβεβαιώνουν<br/>= Μάλλον αληθινό!</p>
          </div>
        </div>
      );
    
    case "dontShare":
      return (
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 border-4 border-orange-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <div className="bg-gray-200 p-3 rounded-lg">
                  <div className="text-sm">Αμφίβολη είδηση</div>
                  <div className="text-xs text-gray-600">Δεν είμαι σίγουρος...</div>
                </div>
              </div>
              <div className="text-6xl text-red-600">🚫</div>
              <div className="text-center">
                <div className="text-4xl mb-2">📤</div>
                <div className="bg-red-200 p-3 rounded-lg">
                  <div className="text-sm line-through">Αποστολή</div>
                  <div className="text-xs text-red-700">ΔΕΝ στέλνω!</div>
                </div>
              </div>
            </div>
            <p className="text-red-700 font-bold text-center">Αν δεν είμαι σίγουρος<br/>ΔΕΝ το μοιράζομαι!</p>
          </div>
        </div>
      );
    
    default:
      return (
        <div className={`${baseSize} bg-gray-200 rounded-lg flex items-center justify-center`}>
          <span className="text-4xl">🖼️</span>
        </div>
      );
  }
};

const Lessons = ({ 
  setCurrentView, 
  completedLessons = [],
  completeLesson,
  gameScore = 0,
  setGameScore,
  t = {}, 
  textSizeClasses = { small: 'text-sm', medium: 'text-base', large: 'text-lg' }, 
  buttonSizeClasses = { small: 'px-3 py-2', medium: 'px-4 py-3', large: 'px-6 py-4' }, 
  textSize = 'medium', 
  language = 'el'
}) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  const lessons = [
    { id: 1, title: "Πώς να κάνετε βιντεοκλήση", icon: <Video className="w-8 h-8" />, color: 'from-blue-400 to-blue-600', emoji: '📹' },
    { id: 2, title: "Πώς να στείλετε φωτογραφία", icon: <Camera className="w-8 h-8" />, color: 'from-green-400 to-green-600', emoji: '📸' },
    { id: 3, title: "Ασφαλής χρήση διαδικτύου", icon: <Shield className="w-8 h-8" />, color: 'from-purple-400 to-purple-600', emoji: '🛡️' },
    { id: 4, title: "Σύνδεση στο Wi-Fi", icon: <Wifi className="w-8 h-8" />, color: 'from-orange-400 to-orange-600', emoji: '📶' },
    { id: 5, title: "Αναγνώριση ψεύτικων ειδήσεων", icon: <Eye className="w-8 h-8" />, color: 'from-red-400 to-red-600', emoji: '🔍' }
  ];

  const resetLesson = () => {
    setCurrentStep(0);
    setShowQuiz(false);
    setCurrentQuestion(0);
    setQuizAnswers([]);
    setShowQuizResult(false);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
  };

  const nextStep = () => {
    const lesson = lessonContent[language][selectedLesson];
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Start quiz after completing all steps
      setShowQuiz(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    const lesson = lessonContent[language][selectedLesson];
    const currentQ = lesson.quiz[currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    setSelectedAnswer(answerIndex);
    setShowAnswerFeedback(true);
    
    const newAnswers = [...quizAnswers, isCorrect];
    setQuizAnswers(newAnswers);
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < lesson.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowAnswerFeedback(false);
      } else {
        // Quiz completed
        setShowQuizResult(true);
        const finalScore = newAnswers.filter(answer => answer).length;
        const totalQuestions = lesson.quiz.length;
        
        // Award points based on performance
        if (finalScore === totalQuestions) {
          setGameScore(prev => prev + 20); // Perfect score
        } else if (finalScore >= totalQuestions * 0.7) {
          setGameScore(prev => prev + 15); // Good score
        } else {
          setGameScore(prev => prev + 10); // Participation
        }
        
        // Mark lesson as completed if score is good enough
        if (finalScore >= totalQuestions * 0.6) {
          completeLesson(selectedLesson);
        }
      }
    }, 2000);
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setQuizAnswers([]);
    setShowQuizResult(false);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
  };

  // Main lesson list view
  if (!selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('grandparentHome')}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className={`${textSizeClasses[textSize]} font-bold`}>
                📚 Ψηφιακά Μαθήματα
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-yellow-300 font-semibold">{gameScore} πόντοι</span>
                <span className="text-blue-200 ml-2">
                  {completedLessons.length}/5 ✓
                </span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-3`}>
                📈 Πρόοδος Μαθημάτων
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessons.length / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedLessons.length} από 5 μαθήματα ολοκληρώθηκαν
              </p>
            </div>

            {lessons.map(lesson => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isLocked = lesson.id > 1 && !completedLessons.includes(lesson.id - 1);
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && (setSelectedLesson(lesson.id), resetLesson())}
                  disabled={isLocked}
                  className={`w-full bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all flex items-center gap-4 ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${lesson.color} text-white p-4 rounded-xl relative`}>
                    <div className="text-4xl">{lesson.emoji}</div>
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 bg-gray-500 bg-opacity-70 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`${textSizeClasses[textSize]} font-bold text-gray-800`}>
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      {isCompleted ? (
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Ολοκληρώθηκε
                        </span>
                      ) : isLocked ? (
                        <span className="text-gray-500">
                          Κλειδωμένο
                        </span>
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          Πατήστε για να ξεκινήσετε
                        </span>
                      )}
                    </div>
                  </div>
                  <Play className="w-6 h-6 text-gray-400" />
                </button>
              );
            })}

            {/* Achievement badges */}
            {completedLessons.length > 0 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                <h3 className={`${textSizeClasses[textSize]} font-bold text-yellow-800`}>
                  🎉 Συγχαρητήρια!
                </h3>
                <p className="text-yellow-700 mt-1">
                  {completedLessons.length === 1 && "Πρώτο μάθημα ολοκληρώθηκε!"}
                  {completedLessons.length === 3 && "Μισά μαθήματα ολοκληρώθηκαν!"}
                  {completedLessons.length === 5 && "Όλα τα μαθήματα ολοκληρώθηκαν! Είστε ειδικός!"}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Individual lesson view
  const lesson = lessonContent[language][selectedLesson];
  const currentStepData = lesson.steps[currentStep];

  // Quiz result view
  if (showQuizResult) {
    const totalQuestions = lesson.quiz.length;
    const correctAnswers = quizAnswers.filter(answer => answer).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 shadow-lg">
          <h1 className={`${textSizeClasses[textSize]} font-bold text-center`}>
            📊 Κουίζ - Αποτελέσματα
          </h1>
        </header>
        
        <main className="p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className={`text-8xl mb-4 ${passed ? '' : 'grayscale'}`}>
                {passed ? '🎉' : '😅'}
              </div>
              
              <h2 className={`${textSizeClasses[textSize]} font-bold mb-4 ${
                passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {passed ? 'Μπράβο!' : 'Δοκιμάστε ξανά!'}
              </h2>
              
              <div className="text-6xl font-bold mb-4 text-blue-600">
                {percentage}%
              </div>
              
              <p className={`${textSizeClasses[textSize]} text-gray-600 mb-2`}>
                {correctAnswers} από {totalQuestions} σωστές απαντήσεις
              </p>
              
              {passed && (
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 mb-4">
                  <p className="text-yellow-800 font-semibold">
                    🏆 +{correctAnswers === totalQuestions ? 20 : correctAnswers >= totalQuestions * 0.7 ? 15 : 10} πόντοι!
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                {passed ? (
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className={`w-full ${buttonSizeClasses[textSize]} bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all`}
                  >
                    <CheckCircle className="inline mr-2 w-5 h-5" />
                    Επόμενο Μάθημα
                  </button>
                ) : (
                  <button
                    onClick={retryQuiz}
                    className={`w-full ${buttonSizeClasses[textSize]} bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all`}
                  >
                    <RotateCcw className="inline mr-2 w-5 h-5" />
                    Επανάληψη
                  </button>
                )}
                
                <button
                  onClick={() => setSelectedLesson(null)}
                  className={`w-full ${buttonSizeClasses[textSize]} bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors`}
                >
                  Πίσω
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Quiz view
  if (showQuiz) {
    const currentQ = lesson.quiz[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-lg">
          <h1 className={`${textSizeClasses[textSize]} font-bold text-center`}>
            🧠 Κουίζ - Ερώτηση {currentQuestion + 1}/{lesson.quiz.length}
          </h1>
        </header>
        
        <main className="p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / lesson.quiz.length) * 100}%` }}
                ></div>
              </div>
              
              <h2 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-6`}>
                {currentQ.question}
              </h2>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showAnswerFeedback && handleQuizAnswer(index)}
                    disabled={showAnswerFeedback}
                    className={`w-full ${buttonSizeClasses[textSize]} text-left rounded-xl border-2 transition-all ${
                      showAnswerFeedback
                        ? index === currentQ.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : index === selectedAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                        : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        showAnswerFeedback && index === currentQ.correct
                          ? 'bg-green-500'
                          : showAnswerFeedback && index === selectedAnswer
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}>
                        {showAnswerFeedback && index === currentQ.correct ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showAnswerFeedback && index === selectedAnswer ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
              
              {showAnswerFeedback && (
                <div className={`mt-4 p-4 rounded-lg text-center ${
                  selectedAnswer === currentQ.correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className="text-4xl mb-2">
                    {selectedAnswer === currentQ.correct ? '🎉' : '😔'}
                  </div>
                  <p className="font-semibold">
                    {selectedAnswer === currentQ.correct ? 'Σωστό!' : 'Λάθος!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Step-by-step lesson view
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="text-white hover:bg-white/20 rounded-xl p-3 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="flex-1">
            <h1 className={`${textSizeClasses[textSize]} font-bold`}>
              {lesson.icon} {lesson.title}
            </h1>
            <p className="text-blue-200 text-lg">
              Βήμα {currentStep + 1} από {lesson.steps.length}
            </p>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-blue-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">{currentStepData.image}</div>
              <h2 className={`${textSizeClasses[textSize]} font-bold text-gray-800 mb-6 text-2xl`}>
                {currentStepData.title}
              </h2>
              <p className={`${textSizeClasses[textSize]} text-gray-700 leading-relaxed text-xl mb-6`}>
                {currentStepData.content}
              </p>
            </div>
            
            {/* Visual Component */}
            {currentStepData.visual && (
              <div className="mb-8">
                <VisualComponent type={currentStepData.visual} />
              </div>
            )}
            
            {/* Example section */}
            {currentStepData.example && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-green-800 font-bold text-lg mb-3 flex items-center gap-2">
                  🌟 Παράδειγμα για καλύτερη κατανόηση:
                </h3>
                <p className="text-green-700 text-lg leading-relaxed">
                  {currentStepData.example}
                </p>
              </div>
            )}
            
            {/* Tip section */}
            {currentStepData.tip && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="text-yellow-800 font-bold text-lg mb-3 flex items-center gap-2">
                  💡 Χρήσιμη συμβουλή:
                </h3>
                <p className="text-yellow-800 text-lg">
                  {currentStepData.tip}
                </p>
              </div>
            )}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`${buttonSizeClasses[textSize]} bg-gray-500 text-white rounded-2xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-8 py-4 text-xl font-bold flex items-center gap-2`}
            >
              <ArrowLeft className="w-6 h-6" />
              Προηγούμενο
            </button>
            
            <button
              onClick={nextStep}
              className={`${buttonSizeClasses[textSize]} bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all px-8 py-4 text-xl font-bold flex items-center gap-2`}
            >
              {currentStep === lesson.steps.length - 1 ? 'Κουίζ' : 'Επόμενο'}
              {currentStep === lesson.steps.length - 1 ? <Trophy className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lessons;