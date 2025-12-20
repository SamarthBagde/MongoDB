# Aggregation 

Aggregation is used to process, transform, and analyze data using a pipeline of stages.

- Documents enter the pipeline
- Each stage transforms them
- Final output is returned


<b>Syntax</b>

```
db.collection.aggregate([
  { stage1 },
  { stage2 },
  ...
])
```

<hr>

## Aggregation Pipeline

Pipeline flow:

```
Input Docs
   ↓
$match
   ↓
$project
   ↓
$group
   ↓
$sort
   ↓
Output
```

<hr>


## 1. $match — Filtering Stage

Filters documents (same as find() but inside pipeline)

<b>Syntax</b>

```
{ $match: { field: condition } }
```

<b>Example</b>
```
db.users.aggregate([
  { $match: { age: { $gte: 18 }, city: "Pune" } }
])
```

Always place $match as early as possible
<hr>

## 2. $project — Shape Documents

- Include / exclude fields
- Rename fields
- Create computed fields


<b>Include/Exclude fields</b>

```
{
  $project: {
    name: 1,
    email: 1,
    _id: 0
  }
}
```

<b>Rename fields</b>

```
{
  $project: {
    username: "$name",
    mail: "$email"
  }
}
```

<b>Computed fields</b>

```
{
  $project: {
    name: 1,
    isAdult: { $gte: ["$age", 18] }
  }
}
```
<b>Output </b> 
```
[
  { "name": "Samarth", "isAdult": true },
  { "name": "Rohit", "isAdult": false },
  { "name": "Ankit", "isAdult": true }
]
```

<hr>

## 3. $group

Groups documents and applies aggregate functions

<b>Syntax</b>

```
{
  $group: {
    _id: "$field",
    result: { $sum: "$value" }
  }
}
```

<b>Example</b><br>
Count users per city

```
db.users.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: { $sum: 1 }
    }
  }
])
```

<b>Common Operators</b>

| Operator    | Description        |
| ----------- | ------------------ |
| `$sum`      | Total              |
| `$avg`      | Average            |
| `$min`      | Minimum            |
| `$max`      | Maximum            |
| `$first`    | First value        |
| `$last`     | Last value         |
| `$push`     | Push all values    |
| `$addToSet` | Push unique values |


<hr>

## 4. $sort — Sorting Results

Sorts documents ascending or descending.

<b>Syntax</b>

```
{ $sort: { field: 1 / -1 } }   
```

- 1 = ascending sort
- -1 = descending sort


<b>Example</b>

```
db.users.aggregate([
  { $sort: { age: 1 } }
])
```

<b>Note :</b> $sort should come after $match but before $group whenever possible. After $group, sorting happens in memory (slow)

<hr>

## 5. $limit

Limits number of documents to fetch

<b>Example</b>

```
{ $limit: 5 }
```

<hr>

## 6. $skip

Skips N documents befor returning result

<b>Example</b>

```
{ $skip: 5 }
```

<hr>

## 7. $unwind - Explode Arrays

Converts array elements into separate documents

<b>Example </b>
```
Data :  

{ "name": "Sam", "skills": ["Node", "MongoDB"] }

Pipeline :

{ $unwind: "$skills" }
```
<b>Output </b> 
```
{ "name": "Sam", "skills": "Node" }
{ "name": "Sam", "skills": "MongoDB" }
```

<hr>

## 7. $lookup — JOIN

Joins documents from another collection

<b>Example</b>

```
db.orders.aggregate([
  {
    $lookup: {
      from: "users",          // collection to join
      localField: "userId",   // field from orders
      foreignField: "_id",    // field from users
      as: "userDetails"       // output array field
    }
  }
])
```

- Output is always an array
- LEFT JOIN behavior

<b>Performance Tips</b>

- Index foreignField
- Use $lookup after $match

<hr>

## 8. $addFields — Add Without Removing

Adds new fields without removing existing ones

<b>Example</b>
```
{
  $addFields: {
    isAdult: { $gte: ["$age", 18] }
  }
}

```

<b>Output </b>  
```
{ "name": "Sam", "age": 22, "isAdult": true }

```

<b>Difference from $project</b>

| `$project`                 | `$addFields` |
| -------------------------- | ------------ |
| Removes unspecified fields | Keeps all    |
| Reshapes doc               | Only adds    |


<hr>

## 9. $count

Counts number of documents after pipeline

<b>Example</b>

```
db.users.aggregate([
  { $match: { city: "Pune" } },
  { $count: "totalUsers" }
])
```
<b>Output </b> 
```
{ "totalUsers": 3 }
```

<b>Equivalent $group</b>

```
{ $group: { _id: null, totalUsers: { $sum: 1 } } }
```

<hr>

## 10. $facet

Run multiple aggregations in one query

<b>Example</b>

```
db.users.aggregate([
  {
    $facet: {
      stats: [
        { $group: { _id: "$city", count: { $sum: 1 } } }
      ],
      adults: [
        { $match: { age: { $gte: 18 } } }
      ]
    }
  }
])
```

<b>Output </b> 

```
{
  "stats": [
    { "_id": "Pune", "count": 3 }
  ],
  "adults": [
    { "name": "Sam", "age": 22 }
  ]
}
```

- $facet avoids multiple DB calls.