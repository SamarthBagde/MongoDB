# Data Types

### 1. String

```
{ "name": "Samarth" }
```
<hr>

### 2. Number Types

MongoDB has multiple numeric types

- integer (32-bit) 
<br> Range: -2^31 to 2^31 - 1
```
{ "age": NumberInt(21) }
```
- Long (64-bit)
```
{ "population": NumberLong(1234567890) }
```
- Double (default)
<br>
Floating-point precision issue possible

```
{ "price": 99.99 }
```
- Decimal128
<br>
High precision
<br>Used for financial data

```
{ "amount": NumberDecimal("1234.56") }
```

<hr>

### 3. Boolean

```
{
  "isActive": true , 
  "available": false
}
```

<hr>

### 4. ObjectId

- Unique <br>
- Auto-generated <br>
- Default primary key 

```
{ "_id": ObjectId("65a12f9c3e1b2a0012abcd34") }
```

<hr>

### 5. Date

- Stored in UTC

```
{ "createdAt": ISODate("2025-12-18T10:30:00Z") }
```

<hr>


### 6. Array

- Stores multiple values.
- Arrays can contain: Same types, Mixed types, Objects

```
{ "skills": ["Node.js", "MongoDB", "React"] }
```

<hr>