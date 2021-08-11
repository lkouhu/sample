package com.kaplan.sample.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ORDERS")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double amount;
    private Date created_date;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy="order")
    private Set<OrderItem> orderItems;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", amount=" + amount +
                ", created_date=" + created_date +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id.equals(order.id) &&
                amount.equals(order.amount) &&
                created_date.equals(order.created_date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, amount, created_date);
    }
}
