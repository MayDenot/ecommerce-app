package com.example.backend.product.controller;

import com.example.backend.product.dto.request.ProductRequest;
import com.example.backend.product.dto.request.UpdateProductRequest;
import com.example.backend.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Gestión de productos")
public class ProductController {
    private final ProductService productService;

    @Operation(summary = "Obtener todos los productos")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(summary = "Obtener producto por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Producto encontrado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@Valid
                                      @Parameter(description = "ID del producto", example = "1")
                                      @PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @Operation(summary = "Crear producto")
    @ApiResponse(responseCode = "201", description = "Producto creado exitosamente")
    @PostMapping()
    public ResponseEntity<?> save(@Valid @RequestBody ProductRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(dto));
    }

    @Operation(summary = "Actualizar producto")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Producto actualizado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @Parameter(description = "ID del producto", example = "1") @PathVariable Long id,
                                    @Valid @RequestBody UpdateProductRequest dto) {
        productService.update(id, dto);
        return ResponseEntity.ok("Producto actualizado con exito");
    }

    @Operation(summary = "Eliminar producto")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Producto eliminado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@Valid
                                    @Parameter(description = "ID del producto", example = "1")
                                    @PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok("Producto eliminado");
    }
}