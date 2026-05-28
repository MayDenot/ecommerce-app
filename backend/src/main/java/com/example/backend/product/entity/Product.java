package com.example.backend.product.entity;

import com.example.backend.category.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "product")
@Schema(description = "Entidad producto del catálogo")
public class Product {
    @Schema(description = "ID del producto", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Nombre del producto", example = "Auriculares Bluetooth")
    @Column
    private String name;

    @Schema(description = "Descripción del producto", example = "Auriculares inalámbricos con cancelación de ruido")
    @Column
    private String description;

    @Schema(description = "URL de la imagen del producto", example = "https://images.unsplash.com/...")
    @Column
    private String image;

    @Schema(description = "Precio del producto", example = "59.99")
    @Column
    private BigDecimal price;

    @Schema(description = "Stock disponible", example = "20")
    @Column
    private Integer stock;

    @Schema(description = "Categoría a la que pertenece el producto")
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}