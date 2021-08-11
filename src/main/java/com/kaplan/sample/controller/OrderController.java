package com.kaplan.sample.controller;

import com.kaplan.sample.model.Order;
import com.kaplan.sample.model.Product;
import com.kaplan.sample.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
@RequestMapping("api/v1")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @PostMapping("/uploadOrderFile")
    public ResponseEntity<Order> uploadOrderFile(@RequestParam("file") MultipartFile file) {

        orderService.uploadOrderFile(file);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            ResponseEntity.internalServerError();
        }
        Order order = orderService.createOrderFromSpreadsheet();
        Order responseOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(responseOrder);
    }

    @GetMapping("orders")
    public List<Order> allOrders() {
        return orderService.getAllOrders();

    }
}
