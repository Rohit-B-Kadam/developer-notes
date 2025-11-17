
-- Problem 1
-- Create a table named work_sessions with the following columns and specifications:
-- session_id: A unique identifier for each session. Must be a large integer type (bigint) and serve as the primary key.
-- employee_id: The ID of the employee (integer).
-- start_time: The time the session began (timestamp without time zone).
-- end_time: The time the session ended (timestamp without time zone). This column must not be null.
-- duration: The length of the work session. This must be a generated column that automatically calculates the difference between end_time and start_time (using an interval data type).
-- notes: Any optional notes about the session (text, can be null).
-- Constraint: Add a check constraint to ensure that end_time is always strictly after start_time.


CREATE TABLE work_sessions (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	employee_id BIGINT NOT NULL,
	start_time TIMESTAMPTZ NOT NULL,
	end_time TIMESTAMPTZ NOT NULL,
	duration INTERVAL GENERATED ALWAYS AS (end_time - start_time) STORED,
	notes TEXT,
	CONSTRAINT check_start_time_small_then_end_time CHECK (start_time < end_time)
);

DROP TABLE work_sessions;

SELECT * FROM work_sessions;

INSERT INTO
	work_sessions (employee_id, start_time, end_time, notes)
VALUES
	(1, '2025-11-14 11:30:00', '2025-11-14 12:30:00', 'Testing');

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------


-- Problem 2:
-- Create a table named perishable_inventory with the following columns and specifications:
-- product_sku: The Stock Keeping Unit. a simple text/string type (e.g., varchar(20)).
-- batch_number: An integer representing the production batch.
-- quantity: The current stock count (integer). Must have a default value of 0.
-- manufacture_date: The date the product was made (date).
-- shelf_life_duration: The official shelf life of the product. Use the interval data type for this.
-- expiration_date: The date the product will expire. This must be a generated column that calculates manufacture_date plus shelf_life_duration.
-- Constraint: The combination of product_sku and batch_number must be unique together (a composite unique constraint).


CREATE TABLE perishable_inventory (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	product_sku VARCHAR(20) NOT NULL,
	batch_number INTEGER NOT NULL,
	quantity INTEGER DEFAULT 0,
	manufacture_date DATE NOT NULL,
	shelf_life_duration INTERVAL NOT NULL,
	expiration_date DATE GENERATED ALWAYS AS (manufacture_date + shelf_life_duration) STORED,
	UNIQUE(product_sku, batch_number)
);

DROP TABLE perishable_inventory;

SELECT * FROM perishable_inventory;

INSERT INTO perishable_inventory 
	(product_sku, batch_number, manufacture_date, shelf_life_duration)
	VALUES
	('123456', 1, '2025-11-14', '10 months 6 days');


---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------


-- PROBLEM 3. E-Commerce Order System

-- Part A: Table shipping_methods
-- id: A unique identifier (integer). Make this the Primary Key.
-- name: The name of the method (e.g., 'Standard', 'Express', 'Overnight'). Use varchar(50). It must be Unique.
-- estimated_delivery_time: The typical time it takes to deliver. Use the interval data type (e.g., '5 days', '24 hours'). This cannot be NULL.
-- base_cost: The cost of this shipping method (numeric or decimal). It must be greater than or equal to 0 (Check Constraint).

-- Part B: The Main Table (customer_orders)
-- id: A unique identifier for the order. Use bigint as the Primary Key.
-- order_date: The timestamp when the order was placed. Default it to now().
-- shipping_method_id: The ID of the shipping method chosen.
-- processing_time: The time the warehouse takes to pack the item. Use interval. Default it to '24 hours'.
-- promised_delivery_date: This is the critical deadline shown to the customer. This column calculates: order_date + processing_time
-- total_amount: The order total (numeric).
-- Constraint: Ensure total_amount is positive.


CREATE TABLE shipping_methods (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	estimated_delivery_time INTERVAL NOT NULL,
	base_cost numeric NOT NULL CHECK (base_cost >= 0)
);

DROP TABLE shipping_methods;

INSERT INTO shipping_methods 
	(name, estimated_delivery_time, base_cost)
	VALUES
	('STANDARD', '7 days', 100),
	('EXPRESS', '2 days', 500),
	('OVERNIGHT', '12 hours', 1000);

SELECT * FROM shipping_methods;


CREATE TABLE customer_orders (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	order_date TIMESTAMPTZ DEFAULT now() NOT NULL,
	shipping_method_id BIGINT REFERENCES shipping_methods(id),
	processing_time INTERVAL DEFAULT '24 hours',
	total_amount numeric CHECK(total_amount >= 0)
);

INSERT INTO customer_orders
	(shipping_method_id, total_amount)
	VALUES
	(10, 10000);

SELECT * FROM customer_orders;








