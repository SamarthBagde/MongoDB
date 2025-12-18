# Filters in MongoDB

In MongoDB, filters are used to select documents that match certain conditions.


## 1. Comparison Filters

Used with numbers, dates.

| Operator | Meaning          |
| -------- | ---------------- |
| `$eq`    | equal            |
| `$ne`    | not equal        |
| `$gt`    | greater than     |
| `$gte`   | greater or equal |
| `$lt`    | less than        |
| `$lte`   | less or equal    |

<br>
<br>


### Example : 
```
db.users.find({ age: { $gt: 18 } })
```

<hr>

## 2. Logical Filters

Logical filters are used when more than one condition is involved.

### a) $and

ALL conditions must be true

#### Example :

```
db.users.find({
  $and: [
    { age: { $gt: 18 } },
    { city: "Pune" }
  ]
})
```

### b) $or

ANY condition can be true

#### Example : 
```
db.users.find({
  $or: [
    { age: 18 },
    { age: 21 }
  ]
})

Users whose age is 18 OR 21
```

### c) $not

Negates a condition

#### Example : 

```
db.users.find({
  age: { $not: { $gt: 18 } }
})

Users whose age is NOT greater than 18
```

### d) $nor

None of the conditions should be true

#### Example : 

```
db.users.find({
  $nor: [
    { city: "Pune" },
    { age: 18 }
  ]
})

Users who => are NOT from Pune AND age is NOT 18
```

### e) $in

Field value must match ANY value in the array

#### Example : 

```
db.users.find({
  age: { $in: [20, 22, 25] }
})

Matches => age = 20 OR 22 OR 25
```
### f) $nin

Field value must NOT be in the array

#### Example : 

```
db.users.find({
  age: { $nin: [18, 21] }
})

Matches => Users whose age is not 18 and not 21
```

<hr>

## 3. Array Filters

Match Element in Array. Checks if array contains a value

### Example : 

```
db.users.find({
  skills: "MongoDB"
})


o/p :

{
  "name": "Samarth",
  "skills": ["Node.js", "MongoDB", "React"]
}


Matched because "MongoDB" exists in array
```


### a) $all

Array must contain ALL specified values

#### Example : 

```
db.users.find({
  skills: { $all: ["Node.js", "MongoDB"] }
})
```

### a) $size

Matches arrays of exact size

#### Example : 

```
db.users.find({
  skills: { $size: 3 }
})
```
 
 