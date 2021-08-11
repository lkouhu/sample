package com.kaplan.sample.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="PRODUCT")
@Getter
@Setter
public class Product {
    @Id
    private Long sku;
    private String name;
    private Integer quantity;
    private Double unit_price;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="product")
    private Set<OrderItem> orderItems;

    @Override
    public String toString() {
        return "Product{" +
                "sku=" + sku +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", unit_price=" + unit_price +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return sku.equals(product.sku) &&
                name.equals(product.name) &&
                quantity.equals(product.quantity) &&
                unit_price.equals(product.unit_price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sku, name, quantity, unit_price);
    }
}
