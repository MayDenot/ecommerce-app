package com.example.backend.cart.controller;

import com.example.backend.cart.dto.response.CartResponse;
import com.example.backend.cart.service.CartService;
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
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Carrito", description = "Gestión del carrito de compras")
public class CartController {
    private final CartService cartService;

    @Operation(summary = "Agregar producto al carrito", description = "Agrega un producto al carrito del usuario autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Producto agregado correctamente",
                    content = @Content(schema = @Schema(implementation = CartResponse.class))),
            @ApiResponse(responseCode = "404", description = "Producto o usuario no encontrado"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "ID del producto", example = "1") @RequestParam Long productId,
            @Parameter(description = "Cantidad a agregar", example = "2") @RequestParam Integer quantity) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(cartService.add(email, productId, quantity));
    }

    @Operation(summary = "Obtener carrito", description = "Retorna el carrito del usuario autenticado con todos sus items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carrito obtenido correctamente",
                    content = @Content(schema = @Schema(implementation = CartResponse.class))),
            @ApiResponse(responseCode = "404", description = "Carrito no encontrado"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<CartResponse> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(cartService.getCart(email));
    }

    @Operation(summary = "Cambiar cantidad de un item", description = "Modifica la cantidad de un producto en el carrito")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cantidad actualizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Item del carrito no encontrado"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @PatchMapping("/items/{idCartItem}")
    public ResponseEntity<?> changeQuantity(
            @Parameter(description = "ID del item del carrito", example = "1") @PathVariable Long idCartItem,
            @Parameter(description = "Nueva cantidad", example = "3") @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.changeQuantity(idCartItem, quantity));
    }

    @Operation(summary = "Eliminar item del carrito", description = "Elimina un producto específico del carrito")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item eliminado correctamente"),
            @ApiResponse(responseCode = "404", description = "Item del carrito no encontrado"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @DeleteMapping("/items/{idCartItem}")
    public ResponseEntity<?> delete(
            @Parameter(description = "ID del item del carrito", example = "1") @PathVariable Long idCartItem) {
        return ResponseEntity.ok(cartService.delete(idCartItem));
    }

    @Operation(summary = "Vaciar carrito", description = "Elimina todos los items del carrito del usuario autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Carrito vaciado correctamente"),
            @ApiResponse(responseCode = "404", description = "Carrito no encontrado"),
            @ApiResponse(responseCode = "403", description = "No autorizado")
    })
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(cartService.clearCart(email));
    }
}