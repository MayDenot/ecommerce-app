package com.example.backend.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderItemResponse {
    private Long productId;
    private String productName;
    private String image;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
}
