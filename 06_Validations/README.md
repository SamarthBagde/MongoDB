# Validations

MongoDB schema validation helps keep your data organized and correct. With MongoDB validation rules, we can set up guidelines for what data can be stored in our database.

<br>
We use the command $jsonSchema for specifying the rules. With the '$jsonShema' command inside the validator we specify the schema validation rules. Here with the required property we give a list of fields that every document must have when inserted into the collection.

Example
```
db.createCollection("Customer", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age", "address"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Name must be a string."
                },
                age: {
                    minimum: 1,
                    description: "Age must be greater then 1"
                }

            }
        }
    }
})
```

MongoDB checks for validations only during updates and inserts in that collection.

When we want to update the already existing schema we use 'collMod' command. 'collMod' will fail if the collection has the already existing documents that don't follow the validation rules.

## Validators in Mongoose

Commonly used built-in validators in mongoose:

- required: Makes a field mandatory
- minlength and maxlength: (used for length of strings)
- min and max: (used for numbers)
- enum
- match

Example:

```
username: {
  type: String,
  required: [true, 'Username is required'],
  minlength: [3, 'Username must be at least 3 characters long'] // custom error messages
}, 
role: {
  type: String,
  enum: ['user', 'admin']
},
email: {
  type: String,
  match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

```

Custom function -based validators:

```
score: {
  type: Number,
  validate: {
    validator: function (value) {
      return value % 2 === 0;
    },
    message: 'Score must be an even number'
  }
}
```

Validators do not run on updateOne, findByIdAndUpdate, etc. unless you enable them

```
User.findByIdAndUpdate(id, data, { runValidators: true });
```

