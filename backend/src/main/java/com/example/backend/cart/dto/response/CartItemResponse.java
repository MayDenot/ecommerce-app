package com.example.backend.cart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CartItemResponse {
    private Long id;

    private Long productId;

    private String productName;

    private String image;

    private BigDecimal unitPrice;

    private Integer quantity;

    private BigDecimal subtotal;
}
