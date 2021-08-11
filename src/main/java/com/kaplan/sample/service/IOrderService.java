package com.kaplan.sample.service;

import com.kaplan.sample.model.Order;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IOrderService {
    void uploadOrderFile(MultipartFile multipartFile);
    Order createOrderFromSpreadsheet();
    Order saveOrder(Order order);
    List<Order> getAllOrders();
}
