# Capped Collection

A capped collection is a fixed-size collection that maintains insertion order and automatically overwrites the oldest documents when it reaches its size limit.

### Key Characteristics : 
- Fixed size (mandatory)

- Insertion order preserved

- Oldest data auto-deleted

- Very fast writes

- No manual delete/update

- Cannot grow or shrink


### Application :

To efficiently store:

- Logs

- Events

- Cache-like data

- Streaming data

Without worrying about cleanup.

<hr>

## How Capped Collection Works

```
[ Doc1 ][ Doc2 ][ Doc3 ][ Doc4 ]   | max size (4)
                                 ↑
                              New doc replaces Doc1
```

<hr>

## Creating a Capped Collection

```
db.createCollection("logs", {
  capped: true,
  size: 1024 * 1024, // Max size of collection overall - 1 MB
  max: 1000          // number of max documents
});
```

<hr>

<b>Note : </b>

- In a MongoDB capped collection, size specifies the total preallocated storage in bytes, while max limits the number of documents.
- The collection preallocates the specified size to ensure fast inserts, independent of actual document sizes.

<b>For example</b>, if size = 70 MB, max = 4, and each document is 16 MB, 4 documents (64 MB) fit easily, with some extra space reserved for overhead.
- If a new document exceeds either the size or max limit, MongoDB automatically removes the oldest documents or rejects the insert if the document is too large.

<b>For example</b>,  If a capped collection has size = 40 MB and max = 4, but each document is 16 MB, then the total size required for 4 documents would be 64 MB, which exceeds the allocated 40 MB. In this case, MongoDB cannot store all 4 documents at once. It will only store as many documents as can fit within the 40 MB size limit, and if you try to insert a document that would exceed the size, the insert will fail. Even though max allows 4 documents, the size limit takes precedence, so the actual number of documents stored will be less than max.