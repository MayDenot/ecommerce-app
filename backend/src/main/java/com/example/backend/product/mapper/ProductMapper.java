package com.example.backend.product.mapper;

import com.example.backend.product.dto.request.ProductRequest;
import com.example.backend.product.dto.response.ProductResponse;
import com.example.backend.product.entity.Product;

public class ProductMapper {

    public static Product toEntity(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setImage(productRequest.getImage());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        return product;
    }

    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage(),
                product.getPrice(),
                product.getStock(),
                product.getCategory().getId()
        );
    }
}
