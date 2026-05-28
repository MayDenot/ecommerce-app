package com.example.backend.order.dto.response;

import com.example.backend.order.entity.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "Respuesta de una orden de compra")
public class OrderResponse {
    @Schema(description = "ID de la orden", example = "1")
    private Long id;

    @Schema(description = "Items de la orden")
    private List<OrderItemResponse> items;

    @Schema(description = "Precio total de la orden", example = "199.99")
    private BigDecimal totalPrice;

    @Schema(description = "Estado de la orden", example = "PENDING")
    private OrderStatus status;

    @Schema(description = "Fecha de creación de la orden")
    private LocalDateTime createdAt;
}
