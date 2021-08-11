package com.kaplan.sample.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ORDER_ITEM")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_item_id;
    private Integer sold_quantity;
    private Double unit_price;
    @ManyToOne
    @JoinColumn(name = "product_sku", nullable=false)
    @JsonIgnore
    private Product product;
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @Override
    public String toString() {
        return "OrderItem{" +
                "order_item_id=" + order_item_id +
                ", sold_quantity=" + sold_quantity +
                ", unit_price=" + unit_price +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return order_item_id.equals(orderItem.order_item_id) &&
                sold_quantity.equals(orderItem.sold_quantity) &&
                unit_price.equals(orderItem.unit_price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_item_id, sold_quantity, unit_price);
    }
}
