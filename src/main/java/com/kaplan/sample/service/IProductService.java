package com.kaplan.sample.service;

import com.kaplan.sample.model.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();

    Product getProductBySKU(Long sku);

    void deleteProductBySKU(Long sku);

    Product saveProduct(Product product);

    Product updateProduct(Product product);
}
