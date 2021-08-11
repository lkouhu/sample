package com.kaplan.sample.service;

import com.kaplan.sample.model.Product;
import com.kaplan.sample.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService{
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductBySKU(Long sku) {
        return productRepository.findById(sku).get();
    }

    public void deleteProductBySKU(Long sku) {
        productRepository.deleteById(sku);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.findById(product.getSku()).map(p -> {
            p.setQuantity(product.getQuantity());
            p.setName(product.getName());
            p.setUnit_price(product.getUnit_price());
            return productRepository.saveAndFlush(p);
        }).orElseGet(() -> {
            return productRepository.saveAndFlush(product);
        });
    }
}
