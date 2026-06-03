package com.example.backend.order.controller;

import com.example.backend.order.dto.request.BuyNowRequest;
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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @Operation(
            summary = "Obtener mis órdenes",
            description = "Retorna todas las órdenes realizadas por el usuario autenticado"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Órdenes obtenidas correctamente",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "No autorizado"
            )
    })
    @GetMapping("/my-orders")
    public ResponseEntity<?> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userDetails.getUsername()));
    }

    @Operation(
            summary = "Actualizar estado de una orden",
            description = "Permite cambiar el estado de una orden existente"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Estado actualizado correctamente",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Orden no encontrada"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "No autorizado"
            )
    })
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @Parameter(
                    description = "ID de la orden",
                    example = "1"
            )
            @PathVariable Long id,

            @Parameter(
                    description = "Nuevo estado de la orden",
                    example = "SHIPPED"
            )
            @RequestParam OrderStatus status
    ) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }

    @Operation(
            summary = "Comprar producto directamente",
            description = "Crea una orden inmediata sin utilizar el carrito de compras"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Compra realizada correctamente",
                    content = @Content(schema = @Schema(implementation = OrderResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos o stock insuficiente"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Producto no encontrado"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "No autorizado"
            )
    })
    @PostMapping("/buy-now")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse buyNow(
            @io.swagger.v3.oas.annotations.parameters.RequestBody (
                description = "Datos de la compra inmediata",
                required = true,
                content = @Content(
                    schema = @Schema(implementation = BuyNowRequest.class)
                )
            )
            @Valid @RequestBody BuyNowRequest request,
            Authentication authentication
    ) {
        return orderService.buyNow(
                authentication.getName(),
                request
        );
    }
}