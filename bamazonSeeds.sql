DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id integer NOT NULL AUTO_INCREMENT,
    product_name varchar(10) NOT NULL,
    department_name varchar(15),
    price INTEGER(5),
    stock_quantity INTEGER(5),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('The NoPhone Air','Electronics', 8.78, 688),('Savage Choices Party Game','Toys and Games', 35.00, 30),('Razer Phone 2 Gaming Smartphone','Electronics', 1170.39, 73),('Tortuga 1667 Board Game','Toys and Games', 36.56, 4),('Misfortune Cookies','Food', 48.02, 1050);

