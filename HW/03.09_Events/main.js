const EventEmitter = require('events');

// Step 1: Create an EventEmitter object
const myEmitter = new EventEmitter();

// Step 2: Set up event handlers
myEmitter.on('event1', () => {
  console.log('Event 1');
});

myEmitter.on('event2', (message) => {
  console.log(`Event 2: ${message}`);
});

// Step 3: Emit the events
myEmitter.emit('event1');
myEmitter.emit('event2', 'Hello, World!');
