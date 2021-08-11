package com.kaplan.sample.controller;

import com.kaplan.sample.model.Product;
import com.kaplan.sample.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
@RequestMapping("api/v1")
public class InventoryController {

    @Autowired
    private IProductService productService;

    @GetMapping("products")
    public List<Product> allProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("products/{sku}")
    public Product productBySKU(@PathVariable Long sku) {
        return productService.getProductBySKU(sku);
    }

    @DeleteMapping("products/{sku}")
    public void deleteProduct(@PathVariable Long sku) {
        productService.deleteProductBySKU(sku);
    }

    @PostMapping("products")
    public Product saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("products")
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }
}
