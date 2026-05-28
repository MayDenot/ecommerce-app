package com.example.backend.order.entity;

import com.example.backend.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Schema(description = "Entidad orden de compra")
@Table(name = "orders")
public class Order {
    @Schema(description = "ID de la orden", example = "1")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Usuario que realizó la orden")
    @ManyToOne
    private User user;

    @Schema(description = "Items de la orden")
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    @Schema(description = "Precio total", example = "199.99")
    private BigDecimal totalPrice;

    @Schema(description = "Estado de la orden", example = "PENDING")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Schema(description = "Fecha de creación")
    private LocalDateTime createdAt;
}