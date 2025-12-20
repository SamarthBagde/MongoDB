# Indexing

An index in MongoDB is a data structure (B-Tree) that improves query performance by allowing MongoDB to quickly locate documents without scanning the entire collection.

## COLLSCAN

Collection Scan <br>

MongoDB checks every document in the collection one by one to find matching data.

### Example

```
db.users.find({ age: 25 })
```
If no index on age exists, MongoDB does:

```
Document 1 → check age
Document 2 → check age
Document 3 → check age
...
Document N → check age
```

## IXSCAN

Index Scan <br>

MongoDB uses an index (B-Tree) to directly find matching documents without scanning all records.

### Example

```
db.users.createIndex({ age: 1 })
db.users.find({ age: 25 })
```
 

```
Index → jump directly to age = 25
Fetch matching document IDs
Read only required documents
```

<hr>

## Indexing types

### 1. Default Index

MongoDB automatically creates an index on _id

```
{ _id: 1 }
```

<hr>

### 2. Single Field Index

Index on one field

```
db.users.createIndex({ age: 1 })   // ascending
db.users.createIndex({ age: -1 })  // descending
```

<b>In Mongoose</b>

```
Schema

const userSchema = new mongoose.Schema({
  email: { type: String, index: true }
});

```
or

```
db.users.createIndex({ email: 1 })
```

<hr>


### 3. Compound Index

Index on multiple fields
<br>

In this order of fields matter

```
db.users.createIndex({ city: 1, age: 1 })
```
Index { city, age } works only if query starts with city


Works For Queries

```
{ city: "Pune", age: 22 }  ✅
{ city: "Pune" }           ✅
{ age: 22 }                ❌
```


<b>In Mongoose</b>

```
const userSchema = new mongoose.Schema({
  city: String,
  age: Number
});

userSchema.index({ city: 1, age: 1 });
```
<hr>


### 4. Text Index

Used for full-text search <br>

It store individual words of a text string. So we can serach for specifi words in text

<b>Only ONE text index per collection allowed</b>

Create
```
db.posts.createIndex({ title: "text", content: "text" })
```

Query
```
db.posts.find({
  $text: { $search: "mongodb indexing" }
})
```

<b>In Mongoose</b>

```
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

postSchema.index({ title: "text", content: "text" });
```
<hr>

### 5. Partial Index

Partial index allow you to index only the documents that match specified filter condition reducing the size and imporving performance for target queries

```
db.user.createIndex(
    {age : 1}, 
    {partialFilterExpression : {age : {$gt : 18}}}
)
```

<b> It will create index on age for those user whose age is greater than 18</b>
<hr>


### 6. TTL Index

TTL index automatically remove documents from a collection after a specified period of time


```
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

This will create index on createdAt field and delete documents aftre 1 hour.

 