package com.example.backend.category.entity;

import com.example.backend.product.entity.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "Categoría de productos")
@Entity
@Table(name = "category")
public class Category {
    @Schema(description = "ID de la categoría", example = "1")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Nombre único de la categoría", example = "Tecnología")
    @Column(nullable = false, unique = true)
    private String name;

    @Schema(description = "Descripción de la categoría", example = "Dispositivos y accesorios tech")
    @Column
    private String description;

    @Schema(description = "Imagen de la categoría", example = "")
    @Column
    private String image;

    @Schema(description = "Productos pertenecientes a esta categoría")
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
