# Schema Design

Schema design means how you structure documents, collections, and relationships so that:

- Queries run fast

- Data is easy to maintain


Design your schema based on how your application reads data, not how it stores data.

<hr>

## 1. Embed vs Reference

### Embedding (Nested documents)

Use when   
- Data is used together
- One-to-few relationship
- Data doesn’t grow infinitely.

<b> Example </b>
```
{
  _id: ObjectId("..."),
  name: "Samarth",
  email: "sam@example.com",
  addresses: [
    { city: "Pune", pincode: 411001 },
    { city: "Nagpur", pincode: 440001 }
  ]
}
```

- Fast reads
- Document size can grow


### Referencing (Normalized)

Use when  
- One-to-many or many-to-many
- Data grows large
- Shared across multiple documents

<b> Example </b>
```
// users
{
  _id: ObjectId("u1"),
  name: "Samarth"
}

// orders
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"), // reference to user
  total: 1500
}

```

<hr>

## 2. Polymorphic Pattern

Same collection, different document shapes.

<b>Example </b>

```
{
  type: "student",
  college: "XYZ"
}

{
  type: "teacher",
  experience: 10
}

```

Used in: users with roles

<hr>

## 3. Document Size Limit

Max document size = 16MB

Avoid infinite arrays, chat messages embedded forever, and logs inside user documnets

Reference for scalability