# Basic MongoDB Queries

## 1. Use / Create Database

```
use myDatabase
```
- Switches to database
- Creates it only when data is inserted

<br>
<hr>

## 2. Collection Creation

### Automatic Collection Creation

MongoDB automatically creates a collection when you insert the first document.

```
use myDB

db.users.insertOne({
  name: "Samarth",
  email: "samarth@gmail.com"
})

```


### Manual Collection Creation
```
db.createCollection("users")
```


<br>
<hr>

## 3. Insert Queries

### a) Insert One Document

```
db.users.insertOne({
  name: "Samarth",
  email: "samarth@gmail.com",
  age: 22
})
```

### b) Insert Multiple Documents

```
db.users.insertMany([
  { name: "A", age: 20 },
  { name: "B", age: 25 }
])
```

<br>
<hr>


## 4. Find Queries

```
Syntax 
 
db.collection.find(query, projection, options)
```

### a) Find All Documents

```
db.users.find()
```

### b) Find One Document

```
db.users.findOne({ name: "samarth" })
```

<br>
<hr>

## 5. Update Queries


```
Syntax 
 
db.collection.update(query, update, options)
```

### a) Update One

```
db.users.updateOne(
  { email: "samarth@gmail.com" },
  { $set: { age: 23 } }
)
```


### b) Update Many

```
db.users.updateMany(
  { city: "Pune" },
  { $set: { isActive: true } }
)
```
<br>
<hr>

## 6. Delete Queries

### a) Delete One

```
db.users.deleteOne({ email: "samarth@gmail.com" })
```


### b) Delete Many

```
db.users.deleteMany({ isActive: false })
```

<br>
<hr>

## 7. Regex Queries

A regex (regular expression) query allows you to search text fields using patterns instead of exact matches.

### Regex Symbols and examples: 

1. ^ — Start of String. Matches the beginning of a string

```
db.users.find({
  name: { $regex: "^Sam", $options: "i" }
})
```

2. $ — End of String. Matches the end of a string

```
db.users.find({
  email: { $regex: "@gmail.com$", $options: "i" }
})
```

3. . — Any Single Character. Matches exactly one character (except newline)

```
/a.b/


Matches :

"acb"
"a1b"
```
```
db.users.find({
  name: { $regex: "S.m" }
})
```


4. \* — Zero or More. Matches 0 or more occurrences of previous character

```
/bo*/

Matches :

"b"
"bo"
"booooo"
```
```
db.products.find({
  description: { $regex: "lap*" }
})
```


5. \+ — One or More. Matches 1 or more occurrences
```
/bo+/

Matches :

"bo"
"booo"
```
```
db.reviews.find({
  comment: { $regex: "bo+" }
})
```

6. ? — Zero or One. Previous character is optional

```
/colou?r/

Matches : 

"color"
"colour"
```

```
db.products.find({
  description: { $regex: "colou?r" }
})
```

7. | — OR Operator. Matches either pattern

```
db.products.find({
  name: { $regex: "phone|laptop", $options: "i" }
})
```