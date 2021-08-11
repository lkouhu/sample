create schema if not exists kaplan;
set schema kaplan;
CREATE TABLE PRODUCT(
                            SKU NUMBER(20) PRIMARY KEY,
                            NAME VARCHAR2(20) NOT NULL,
                            QUANTITY NUMBER(5) NOT NULL,
                            UNIT_PRICE NUMBER(5,2) NOT NULL
);
CREATE TABLE `ORDERS`(
                        ID NUMBER(10) PRIMARY KEY AUTO_INCREMENT,
                        AMOUNT NUMBER(5,2) NOT NULL,
                        CREATED_DATE DATE
);
CREATE TABLE ORDER_ITEM(
                      ORDER_ITEM_ID NUMBER(10) PRIMARY KEY auto_increment,
                      SOLD_QUANTITY NUMBER(5) NOT NULL,
                      UNIT_PRICE NUMBER(5,2) NOT NULL,
                      PRODUCT_SKU NUMBER(20) NOT NULL,
                      ORDER_ID NUMBER(10) NOT NULL ,
                      foreign key (PRODUCT_SKU) references PRODUCT(SKU),
                      foreign key (ORDER_ID) references `ORDERS`(ID)
);
