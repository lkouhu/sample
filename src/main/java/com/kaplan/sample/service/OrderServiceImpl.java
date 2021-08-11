package com.kaplan.sample.service;

import com.kaplan.sample.model.Order;
import com.kaplan.sample.model.OrderItem;
import com.kaplan.sample.model.Product;
import com.kaplan.sample.repository.OrderRepository;
import com.kaplan.sample.repository.ProductRepository;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderServiceImpl implements IOrderService {
    @Value("${app.upload.filename}")
    private String upload_filename;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public void uploadOrderFile(MultipartFile multipartFile) {
        try {
            Path copyLocation = Paths
                    .get(upload_filename);
            Files.copy(multipartFile.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Order createOrderFromSpreadsheet() {

        DataFormatter dataFormatter = new DataFormatter();

        Workbook workbook = null;
        try {
            workbook = WorkbookFactory.create(new File(upload_filename));
        } catch (EncryptedDocumentException | IOException e) {
            e.printStackTrace();
        }

        Sheet sheet = workbook.getSheetAt(0);
        int rowNum = sheet.getLastRowNum();
        Order order = new Order();
        Double amount = 0.0;
        Set<OrderItem> orderItems = new HashSet<>();
        for (int i=1;i<=rowNum;i++) {
            Row row = sheet.getRow(i);
            OrderItem orderItem = new OrderItem();
            String product_sku =dataFormatter.formatCellValue(row.getCell(0));
            Product product = productRepository.findById(Long.parseLong(product_sku)).get();
            orderItem.setProduct(product);
            orderItem.setOrder(order);
            orderItem.setSold_quantity(Integer.parseInt(dataFormatter.formatCellValue(row.getCell(1))));
            orderItem.setUnit_price(Double.parseDouble(dataFormatter.formatCellValue(row.getCell(2))));
            Double itemAmount = orderItem.getUnit_price()*orderItem.getSold_quantity();
            product.setQuantity(product.getQuantity()-orderItem.getSold_quantity());
            productRepository.saveAndFlush(product);
            amount+=itemAmount;
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);

        order.setAmount(Double.parseDouble(String.format("%.2f", amount)));
        order.setCreated_date(new Date());
        return order;
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.saveAndFlush(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
