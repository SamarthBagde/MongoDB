# What is MongoDB ?

- MongoDB is an open-source NoSQL document oriented database. 
- It stores data in JSON like documents. Internally use BSON (Binary JSON) format for storing data
- It schemaless, mean database system does not required a predefined structure. So it is flexible




## Document

A document is the basic unit of data in MongoDB.
It is similar to one row in a SQL table, but much more powerful.

```
Example

{
  "_id": ObjectId("65a12f9c3e1b2a0012abcd34"),
  "name": "Samarth",
  "age": 21,
  "skills": ["Node.js", "MongoDB", "React"],
  "isActive": true,
  "address": {
    "city": "Pune",
    "state": "Maharashtra"
  },
}
```

- <b>Maximum Document Size - 16 MB.</b> This limit is hard and cannot be increased.


## Collection

A collection is a group of documents.
It is similar to a table in SQL, but more flexible.



```
Example

Database
 └── Collection (users)
      ├── Document 1
      ├── Document 2
      ├── Document 3
      ├── Document 4
```

