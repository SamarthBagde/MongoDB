# Projection

Projection in MongoDB is the process of retriving only specific fileds from a document in query result.
<br>

It helps in performance optimization, security, and cleaner responses.

```
Example : 

db.users.find(
  {},
  { name: 1, email: 1 }
)

```
- 0  -> Exclude Field 
<br>
- 1  -> Include Fields


- _id is included by default.


## Projection on Nested Fields

### Example : 

```
db.users.find(
  {},
  { "address.city": 1, name: 1 }
)
```
## Projection with Arrays

### Example : 

Return Full Array

```
db.users.find({}, { skills: 1 })
```

### $slice – Limit Array Outpu

```
db.posts.find(
  {},
  { comments: { $slice: 5 } }
)
```