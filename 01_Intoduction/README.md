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

<hr>

## Schema vs Schemaless DB

<b>Schema based DB : </b>

A schema is a formal blueprint that defines how data must be stored in a database.

- Data must follow the structure

- Invalid data is rejected

- Structure is known in advance


<b>No Schema based DB (Schemaless) :</b>

Schemaless means:

- No predefined structure is enforced by the database

- Each record/document can have different fields

- Schema is defined at runtime, not beforehand

<br>
<br>



| Aspect         | Schema         | Schemaless        |
| -------------- | -------------- | ----------------- |
| Structure      | Fixed          | Flexible          |
| Enforcement    | Database level | Application level |
| Change cost    | High           | Low               |
| Predictability | High           | Low               |

<hr>

## Advantages & Disadvantages

<b>Advantages</b>

1. Schema Flexibility
2. High Performance - Optimized for fast reads and writes
3. Horizontal Scalability (Sharding)
4. Powerful Aggregation Framework
5. Built-in Replication (High Availability)
6. ACID Transactions Support (MongoDB 4.0+)
7. Cloud-Friendly (MongoDB Atlas)

<b>Disadvantages</b>

1. No Enforced Schema by Default
2. Higher Memory Consumption
3. Not Ideal for Complex Joins
4. Poor Choice for Highly Structured Data

<hr>