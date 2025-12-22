# Replication

Replication in MongoDB is the process of creating multiple copies of data across different servers to ensure data redundancy, high availability, and fault tolerance. A replica set is a group of MongoDB servers that maintain the same dataset.

There are two types of nodes:

- Primary nodes: Handles all write operations and replicates data to secondary nodes.
Secondary

- Secondary nodes: Maintain copies of the data and can serve read operations to improve performance.

It provides: 

- High availability
- Data redundancy
- Fault tolerance
- Disaster recovery

code snippet for replication in mongo DB
```
mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME" // Start MongoDB with Replica Set Configuration

Example:

mongod --replSet rs0 --port 27017 --dbpath /data/rs1
mongod --replSet rs0 --port 27018 --dbpath /data/rs2
mongod --replSet rs0 --port 27019 --dbpath /data/rs3


rs.initiate() // initiate the replica set
rs.status()
rs.isMaster() // to check who is primary
```

# Shrading

Sharding is horizontal partitioning of data across multiple servers (shards) to handle large datasets and high-traffic applications efficiently.

A shard key is a field (or compound field) used to distribute data across shards.

- Shrads are used to store the subsets of data
- config servers maintain metadata about the cluster and data distribution.
- Query Routers(Mongos) are direct client the requests to the appropriate shrads.

Replication and sharding in MongoDB solve different problems: **replication** is used for **high availability and fault tolerance** by maintaining **multiple copies of the same data** across replica set members, where one primary handles writes and secondaries replicate the data, enabling automatic failover and read scaling but **not increasing write capacity**; in contrast, **sharding** is used for **horizontal scalability** by **dividing the dataset into smaller partitions (shards)** and distributing them across multiple servers, which significantly improves **write throughput and storage capacity** but adds operational complexity and requires careful shard key selection—**replication duplicates data for reliability, while sharding distributes data for scale**.

## Vertical & Horizontal scaling

Vertical scaling means increasing the power of a single machine by adding More CPU, More RAM, Faster disk (SSD/NVMe). Basically scale up.

DBs commonly scaled are MySQL, PostgreSQL, Oracle DB, SQL server, etc. Mostly Reational DBs are vertically scaled.

Horizontal scaling means adding more machines (nodes) and distributing load across them. Basically scaling Out.

Examples include MOngoDB, Cassandra, DynamoDB, google spanner, etc.
Mostly NoSQL DBs and Distributed DBs.

### When to use Vertical and Horizontal scaling

use vertical scaling when Application is small to medium, strong ACID guarantees needed. 

use horizontal scaling when massive user base, very large dbs, high read/write throughput speed, cloud native arch. and global avalibility needed.



