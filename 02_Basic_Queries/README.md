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