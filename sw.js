// Service Worker for Roottly App
const CACHE_NAME = 'roottly-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch events
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Background sync for messages
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  try {
    // Check for pending messages in IndexedDB
    const pendingMessages = await getPendingMessages();
    
    for (const message of pendingMessages) {
      try {
        // Attempt to send via Bluetooth if available
        await sendBluetoothMessage(message);
        // Remove from pending queue
        await removePendingMessage(message.id);
      } catch (error) {
        console.error('Failed to sync message:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getPendingMessages() {
  // Simple localStorage fallback for demo
  try {
    const pending = localStorage.getItem('roottly_pending_messages');
    return pending ? JSON.parse(pending) : [];
  } catch {
    return [];
  }
}

async function removePendingMessage(messageId) {
  try {
    const pending = await getPendingMessages();
    const filtered = pending.filter(msg => msg.id !== messageId);
    localStorage.setItem('roottly_pending_messages', JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove pending message:', error);
  }
}

async function sendBluetoothMessage(message) {
  // This would connect to the Bluetooth service if available
  // For now, just log the attempt
  console.log('Attempting to send message via Bluetooth:', message);
}