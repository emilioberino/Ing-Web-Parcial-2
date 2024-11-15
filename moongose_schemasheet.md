import mongoose from 'mongoose';
# 1 Básico de Schema
```sh
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  age: Number
});
```
# 2. Tipos de Datos

```sh
const schemaTypes = new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  array: [String],
  nested: {
    field: String
  },
  objectId: mongoose.Schema.Types.ObjectId,
  mixed: mongoose.Schema.Types.Mixed,
  decimal: mongoose.Schema.Types.Decimal128,
  map: Map,
  buffer: Buffer
});
```

# 3. Validators

```sh
const validateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: 'Email inválido'
    }
  },
  age: {
    type: Number,
    min: [18, 'Debe ser mayor de edad'],
    max: [100, 'Edad inválida']
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 50
  }
});

```

# 4. Relaciones

```sh

// 1. Event Schema with Guests Array
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest'
  }]
});

// 2. Guest Schema with Event Reference
const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

// 3. Example Usage
// Create Event and Guest
const event = await Event.create({
  name: 'Birthday Party',
  date: new Date()
});

const guest = await Guest.create({
  name: 'John Doe',
  email: 'john@example.com',
  event: event._id
});

// Add guest to event
event.guests.push(guest._id);
await event.save();

// 4. Population Queries
// Get event with guests
const populatedEvent = await Event
  .findById(eventId)
  .populate('guests');

// Get guest with event
const populatedGuest = await Guest
  .findById(guestId)
  .populate('event');

```