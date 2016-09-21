CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
  ItemID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(45) NOT NULL,
  DepartmentName VARCHAR(45) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  StockQuantity INT NOT NULL,
  PRIMARY KEY (`ItemID`)
);

INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('TV','TV',399.99,10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('CD','Drive',59.99,10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('DVD','Drive',89.99,10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('RAM','Memory',109.99,10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('HDD','Storage',79.99,20);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('SSD','Storage',139.99,20);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('FDD','Drive',9.99,5);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('USB','Cable',9.99,10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('VCR','TV',59.99,5);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('MSD','Storage',29.99,50);
