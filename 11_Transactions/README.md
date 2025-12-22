# Transaction

A transaction is a group of database operations executed as a single unit of work, where either all operations succeed or none are applied

Earlier MongoDB was schema-less & performance-oriented, optimized for:
- Single-document operations

- Horizontal scaling

But real business applications (banking, e-commerce, wallets) need:

- Multiple updates

- All-or-nothing behavior

Hence Transactions were introduced (MongoDB 4.0+)


<b>MongoDB fully supports ACID in transactions.</b>

ACID = Atomicity, Consistency, Isolation, Durability
<hr>

## Transaction Flow

```
Start Session
Start Transaction
Execute operations
Commit OR Abort
End Session
```

<hr>

### What is a Session?

A session is a logical container that: 
- Tracks transaction state
- Ensures isolation
- Handles commit/rollback

Transactions cannot exist without sessions.

<hr>

### Express + Mongoose Example

```
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(req.user.id).session(session);
    const product = await Product.findById(req.body.productId).session(session);

    if (product.stock < req.body.qty) {
      throw new Error("Out of stock");
    }

    user.balance -= product.price * req.body.qty;
    product.stock -= req.body.qty;

    await user.save({ session });
    await product.save({ session });

    await Order.create(
      [{
        userId: user._id,
        productId: product._id,
        qty: req.body.qty
      }],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json({ message: "Order placed successfully" });

  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
```

<hr>

<b>Transactions are expensive.</b>

Avoid when:

- Single document update

- Logging

- Analytics

- Counters

- High-frequency writes

