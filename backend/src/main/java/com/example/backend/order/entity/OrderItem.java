package com.example.backend.order.entity;

import com.example.backend.product.entity.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Schema(description = "Item dentro de una orden")
public class OrderItem {
    @Schema(description = "ID del item", example = "1")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Order order;

    @Schema(description = "Producto comprado")
    @ManyToOne
    private Product product;

    @Schema(description = "Cantidad", example = "2")
    private Integer quantity;

    @Schema(description = "Precio unitario al momento de la compra", example = "59.99")
    private BigDecimal unitPrice;

    @Schema(description = "Subtotal", example = "119.98")
    private BigDecimal subtotal;
}
