# Mongoose CRUD Operations Cheatsheet

## Model Definition

### Read
```sh
// Find all documents
const users = await User.find();

// Find with conditions
const user = await User.findOne({ email: 'john@example.com' });

// Find by ID
const user = await User.findById('id');

// Find with specific fields
const users = await User.find().select('name email');

// Find with limit and sort
const users = await User.find()
  .sort({ name: 1 })
  .limit(10);
```

### Update
```sh
// Update one document
const result = await User.updateOne(
  { email: 'john@example.com' },
  { name: 'John Doe' }
);

// Update multiple documents
const result = await User.updateMany(
  { age: { $lt: 18 } },
  { status: 'minor' }
);

// Find and update
const user = await User.findOneAndUpdate(
  { email: 'john@example.com' },
  { name: 'John Doe' },
  { new: true }
);
```

### Delete

```sh
// Delete one document
const result = await User.deleteOne({ email: 'john@example.com' });

// Delete multiple documents
const result = await User.deleteMany({ age: { $lt: 18 } });

// Find and delete
const user = await User.findOneAndDelete({ email: 'john@example.com' });
```
### Query

```sh
// Comparison
const users = await User.find({ age: { $gt: 18 } });  // Greater than
const users = await User.find({ age: { $lt: 18 } });  // Less than
const users = await User.find({ age: { $in: [18, 21] } });  // In array

// Logical
const users = await User.find()
  .or([{ age: { $lt: 18 } }, { age: { $gt: 65 } }]);

// Regular Expression
const users = await User.find({ name: /john/i });
```