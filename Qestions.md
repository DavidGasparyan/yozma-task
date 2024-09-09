# 1. Angular Dependency Injection

Angular Dependency Injection (DI) is a custom implementation of a design pattern called Inversion of Control (IoC). It allows us to remove hard-coded dependencies, making the application loosely coupled, extendable, and maintainable. DI lets us reuse the same class instance in multiple services or components (depending on the level we provide the service).

There are four ways to inject services in Angular using the provider array:
- **useValue**: Helps to use legacy object patterns.
- **useClass**: Allows us to keep the provider name but use a different class.
- **useExisting**: Reuses an available service.
- **useFactory**: Used when we need to decide the service instance at runtime based on some conditional logic (e.g., `if { } .. else { }`).

# 2. SQL Query

```sql
SELECT id, name, email, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;
```

### 1. Optimization
Put an index on the created_at column to get faster search, and the tradeoff will be more storage space to store the index.
```sql
CREATE INDEX idx_users_created_at ON users (created_at);
```


### 2. Optimization
For even faster search since we query multiple columns, if we query all the time all 4 columns together, then include other columns to index as well. Tradeoff will be a little more storage space to hold index.
```sql
CREATE INDEX idx_users_created_at_covering ON users (created_at) INCLUDE (id, name, email);
```

### 3. Optimization
In case table continues to grow for PostgreSQL we can utilize partitioning to keep records in separate partitions. For example hold each year data in a separate partition. I just chose a simple example to use partitioning by date range. We can also do partitioning by hash value. Depends on what we need.
```sql
CREATE TABLE users_partitioned (
    id SERIAL,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE users_2023 PARTITION OF users_partitioned FOR VALUES FROM ('2023-01-01') TO ('2023-12-31'); 
CREATE TABLE users_2024 PARTITION OF users_partitioned FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');
```


# 3. Status Codes

Each first digit of a status code indicates a reason:

- 1xx: Information messages
- 2xx: Success messages
  - 200: Success (typically used for GET requests)
- 3xx: Redirection messages
  - 301 and 302: Common redirection codes 
- 4xx: Client error messages
  - 401: Unauthorized access
  - 403: Forbidden access
- 5xx: Server error messages
  - 500: Internal server error (the most dreaded one)


# 4. Status Codes

```sql
WITH user_order_summary AS (
    SELECT
        u.id AS user_id,
        u.name,
        u.email,
        COUNT(o.id) AS order_count,
        SUM(o.amount) AS total_spent
    FROM
        users u
    JOIN
        orders o ON u.id = o.user_id
    WHERE
        o.order_date >= NOW() - INTERVAL '1 month'
    GROUP BY
        u.id, u.name, u.email
)
SELECT
    name,
    email,
    order_count,
    total_spent
FROM
    user_order_summary
WHERE
    order_count > 5
ORDER BY
    total_spent DESC;
```