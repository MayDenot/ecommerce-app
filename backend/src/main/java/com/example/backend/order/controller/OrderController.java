package com.example.backend.order.controller;

import com.example.backend.order.dto.response.OrderResponse;
import com.example.backend.order.entity.OrderStatus;
import com.example.backend.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@Tag(name = "Órdenes", description = "Gestión de órdenes de compra")
public class OrderController {
    private final OrderService orderService;

    @Operation(summary = "Realizar checkout", description = "Convierte el carrito del usuario en una orden de compra")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Orden creada correctamente",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))),
            @ApiResponse(responseCode = "400", description = "Carrito vacío"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(orderService.checkout(email));
    }

    @Operation(summary = "Obtener todas las órdenes", description = "Retorna todas las órdenes registradas (solo admin)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de órdenes obtenida correctamente",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<?> getOrders() {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @Operation(summary = "Obtener orden por ID", description = "Retorna el detalle de una orden específica")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Orden encontrada",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))),
            @ApiResponse(responseCode = "404", description = "Orden no encontrada"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
            @Parameter(description = "ID de la orden", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<?> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userDetails.getUsername()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}