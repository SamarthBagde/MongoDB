# Mongoose 

Mongoose is an <b>Object-Document Mapping (ODM)</b> library for MongoDb and Node.js

It helps you to define application level schema, manage relatiomship, and perform CURD operations in structured way similer to SQL CURD operation working.

- It maps JavaScript objects to MongoDB documents.
- Maps JavaScript objects to MongoDB documents


<hr>

## Why Mongoose (ODM) is needed ? 

MongoDB is schema-less.

Application need structure, validation and consistency.

Mongoose enforces rules at application level.

<hr>

## Connecting MongoDB and Express.js using Mongoose

```
import mongoose from "mongoose";

mongoose.connect(<MongoDB_URL>)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
```

<hr>

## Schema define in mongoose

```
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        select : false,
    }
});

const user = mongoose.model("user" , userSchema); // model creation 

export default user;
```

<hr>

## Validation

Validation is the process of ensuring that data entered into MongoDB follows predefined rules before it is saved.

Validation happens at the application level, not database level.

### Types of Validation in Mongoose

<b>a) Built-in Validator :</b> Like required, minLength, maxLength, unique, etc.

<b>Example : </b>

```
name: {
  type: String,
  required: true        // Ensures field must exist
},

role: {
  type: String,
  enum: ["admin", "user", "seller"]     //Restricts values to fixed set
}

```

<b>b) Custom Validation :</b> Used when built-in validation is not enough.

<b>Customer validate syntax : </b>

```
validate: {
  validator: <function>,
  message: <string>
}
```

Note : In validate, validator is property name which takes function as value.

<b>It is not validator library here</b>

<b>Example : </b>

```
age: {
  type: Number,
  validate: {
    validator: function (value) {
      return value % 2 === 0;
    },
    message: "Age must be an even number"
  }
}
```



<b>c) Custom Validation : </b> Validator (npm package: validator) is a popular, well-tested JavaScript validation library used to validate strings.

<b>Example : </b>

```
import validator from "validator";

validator.isEmail("test@gmail.com");   // true
validator.isEmail("test@");            // false
```

```
email: {
  type: String,
  required: true,
  lowercase: true,
  validate: [validator.isEmail, "Invalid email address"]
}
```


```
website: {
  type: String,
  validate: {
    validator: validator.isURL, // validator.isURL third-party library function 
    message: "Invalid URL"
  }
}
```


### Validation is called in these cases

1. .save()
2. .create() (Internally uses .save())
3. .insertMany()
4. .validate() (manual validation)
```
const user = new User({ age: -5 });
await user.validate(); // Only validates, no DB write
```

<b>Validation is NOT called by default in these cases : </b>

1. updateOne()
2. findOneAndUpdate()
3. updateMany()

In this case you must explicitly enable it:

```
await User.findOneAndUpdate(
  { _id },
  { age: -5 },
  {
    runValidators: true
  }
);
```

<hr>

## Hooks

Hooks (also called middleware) are functions that run automatically at specific stages of a document’s lifecycle.

They allow you to: 
- Run logic before an operation

- Run logic after an operation


### Types of Hooks in Mongoose


<b>a) Document Middleware</b>

Runs on document instances

| Hook            | Runs When               |
| --------------- | ----------------------- |
| pre('save')     | Before `.save()`        |
| post('save')    | After `.save()`         |
| pre('validate') | Before validation       |
| pre('remove')   | Before document removal |

<b>Example : </b>

```
schema.pre('save', function (next) {
  console.log("Before save");
  next();
});
```

<b>b) Query Middleware</b>

Query Middleware

| Hook                    | Runs When      |
| ----------------------- | -------------- |
| pre('find')             | Before find    |
| pre('findOne')          | Before findOne |
| pre('updateOne')        | Before update  |
| pre('findOneAndUpdate') | Before update  |

<b>Example : </b>

```
userSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

Automatically hides soft-deleted users
```

<b>c) Aggregate Middleware</b>

Runs on aggregation pipelines

```
schema.pre('aggregate', function () {})
```

<b>Example : </b>

```
schema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isActive: true } });
});
```

<hr>

## Methods

Methods are custom functions attached to a schema.

### There are 3 main types of methods : 

<b>a) Instance Methods (Document Methods) : </b>

Methods that operate on a single document instance. Called on a document, not the model.

<b>Syntax : </b>
```
schema.methods.methodName = function () {
  // this refers to the document
};
```
<b> Example : </b>
```
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

userSchema.methods.isAdult = function () {
  return this.age >= 18;
};

const User = mongoose.model("User", userSchema);



// Usage

const u = await User.findById(id);
console.log(u.isAdult()); // true / false
```

Note : Here `this` referce to Document 



<b>b) Static Methods (Model Methods) : </b>

Methods attached to the Model, not a document. 


<b>Syntax : </b>
```
schema.statics.methodName = function () {
  // this refers to the Model
};
```
<b> Example : </b>
```
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

userSchema.statics.findAdults = function () {
  return this.find({ age: { $gte: 18 } });
};

const User = mongoose.model("User", userSchema);



// Usage

const adults = await User.findAdults();
```

Note : Here `this` referce to Model

<b>c) Query Helper Methods : </b>

Methods added to query chains. Methods added to query chains.


<b>Syntax : </b>
```
schema.query.methodName = function () {
  return this.where(...);
};
```
<b> Example : </b>
```
userSchema.query.byCity = function (city) {
  return this.where({ city });
};

// Usage

const users = await User.find().byCity("Pune");
```

Note : Here `this` referce to Query 

<hr>