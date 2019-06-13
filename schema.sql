CREATE DATABASE related
CREATE TABLE products
(
  uuid serial NOT NULL,
  product_name VARCHAR(100),
  price VARCHAR(20),
  images VARCHAR(300),
  category VARCHAR(30),
  CONSTRAINT products_pkey PRIMARY KEY (uuid)
)
