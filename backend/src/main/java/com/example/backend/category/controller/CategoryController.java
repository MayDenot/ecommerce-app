package com.example.backend.category.controller;

import com.example.backend.category.dto.request.CategoryRequest;
import com.example.backend.category.service.CategoryService;
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
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categorias", description = "Gestión de categorias")
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "Obtener todas las categorias")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @Operation(summary = "Obtener categorias por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Categoria encontrada"),
            @ApiResponse(responseCode = "404", description = "Categoria no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@Valid
                                      @Parameter(description = "ID de la categoria", example = "1")
                                      @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @Operation(summary = "Crear categoria")
    @ApiResponse(responseCode = "201", description = "Categoria creada exitosamente")
    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody CategoryRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.save(dto));
    }

    @Operation(summary = "Actualizar categoria")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Categoria encontrada"),
            @ApiResponse(responseCode = "404", description = "Categoria no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid
                                    @Parameter(description = "ID de la categoria", example = "1")
                                    @PathVariable Long id,
                                    @Valid @RequestBody CategoryRequest dto) {
        categoryService.update(id, dto);
        return ResponseEntity.ok("Categoria actualizado con exito");
    }

    @Operation(summary = "Eliminar categoria")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Categoria encontrada"),
            @ApiResponse(responseCode = "404", description = "Categoria no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@Valid
                                    @Parameter(description = "ID de la categoria", example = "1")
                                    @PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok("Categoria eliminado");
    }
}
