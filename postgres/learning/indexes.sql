-- INDEXES

-- Check all the indexes asscoiate to users table
select * from pg_indexes where tablename='users';


-- Create a index for email
CREATE INDEX users_email_idx on users using btree(email);
DROP INDEX users_email_idx;

-- Create hash index for email
CREATE INDEX users_email_hash_idx on users using hash(email);
DROP INDEX users_email_hash_idx;

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'rohitkadam@example.com';
-- without index     Planning Time: 0.877ms    Execution Time: 63.753 ms
-- with btree index  Planning Time: 9.964ms    Execution Time: 0.299  ms 
-- with hash index   Planning Time: 12.684ms   Execution Time: 0.084  ms



-- Composite Index
CREATE INDEX users_first_last_bday on users(first_name, last_name, birthday);
DROP INDEX users_first_last_bday;

-- Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE first_name = 'Rohit';
-- Seq Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE last_name = 'Kadam';
-- Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE first_name = 'Rohit' and last_name = 'Kadam';
-- Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE first_name = 'Rohit' and birthday = '1996-07-14';



-- Covering Index
CREATE INDEX users_auth_idx on users (email) include (id);
DROP INDEX users_auth_idx;
-- Index Only Scan using users_auth_idx on users
EXPLAIN ANALYZE SELECT id FROM users WHERE email = 'rohitkadam@example.com';



-- Partial Index
CREATE INDEX users_email_pro on users (email) WHERE is_pro is true;
DROP INDEX users_email_pro;

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'rohitkadam@example.com' and is_pro is true;



-- Functional Index
CREATE INDEX users_lower_email on users ((LOWER(email)));

