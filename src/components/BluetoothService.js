// BluetoothService.js - Real Bluetooth functionality
class BluetoothService {
  constructor() {
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristic = null;
    this.isConnected = false;
    this.onMessageReceived = null;
    this.onConnectionStatusChanged = null;
    
    // Custom UUID for Roottly messaging service
    this.SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
    this.CHARACTERISTIC_UUID = '87654321-4321-4321-4321-cba987654321';
  }

  // Check if Web Bluetooth is supported
  isBluetoothSupported() {
    return 'bluetooth' in navigator;
  }

  // Start advertising for connection (Grandparent device)
  async startAdvertising() {
    if (!this.isBluetoothSupported()) {
      throw new Error('Bluetooth is not supported in this browser');
    }

    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'Roottly' }],
        optionalServices: [this.SERVICE_UUID]
      });

      this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));
      
      this.server = await this.device.gatt.connect();
      this.service = await this.server.getPrimaryService(this.SERVICE_UUID);
      this.characteristic = await this.service.getCharacteristic(this.CHARACTERISTIC_UUID);
      
      // Start notifications
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', this.handleNotification.bind(this));
      
      this.isConnected = true;
      this.onConnectionStatusChanged?.(true);
      
      return true;
    } catch (error) {
      console.error('Failed to start advertising:', error);
      throw error;
    }
  }

  // Connect to advertising device (Child device)
  async connectToDevice() {
    if (!this.isBluetoothSupported()) {
      throw new Error('Bluetooth is not supported in this browser');
    }

    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'Roottly' }],
        optionalServices: [this.SERVICE_UUID]
      });

      this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));
      
      this.server = await this.device.gatt.connect();
      this.service = await this.server.getPrimaryService(this.SERVICE_UUID);
      this.characteristic = await this.service.getCharacteristic(this.CHARACTERISTIC_UUID);
      
      // Start notifications
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', this.handleNotification.bind(this));
      
      this.isConnected = true;
      this.onConnectionStatusChanged?.(true);
      
      return true;
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    }
  }

  // Send message via Bluetooth
  async sendMessage(message) {
    if (!this.isConnected || !this.characteristic) {
      throw new Error('Not connected to device');
    }

    try {
      const messageData = {
        type: 'message',
        text: message.text,
        timestamp: message.timestamp,
        sender: message.sender,
        id: message.id
      };

      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(messageData));
      
      await this.characteristic.writeValue(data);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // Handle incoming notifications
  handleNotification(event) {
    try {
      const decoder = new TextDecoder();
      const data = decoder.decode(event.target.value);
      const messageData = JSON.parse(data);
      
      if (messageData.type === 'message') {
        this.onMessageReceived?.(messageData);
      }
    } catch (error) {
      console.error('Failed to handle notification:', error);
    }
  }

  // Handle disconnection
  onDisconnected() {
    this.isConnected = false;
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristic = null;
    this.onConnectionStatusChanged?.(false);
  }

  // Disconnect from device
  async disconnect() {
    if (this.server && this.server.connected) {
      await this.server.disconnect();
    }
    this.onDisconnected();
  }

  // Set message received callback
  setMessageReceivedCallback(callback) {
    this.onMessageReceived = callback;
  }

  // Set connection status callback
  setConnectionStatusCallback(callback) {
    this.onConnectionStatusChanged = callback;
  }
}

// Export the service
window.BluetoothService = BluetoothService;