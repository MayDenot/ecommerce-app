package com.example.backend.product.service;

import com.example.backend.category.entity.Category;
import com.example.backend.category.repository.CategoryRepository;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.product.dto.request.ProductRequest;
import com.example.backend.product.dto.request.UpdateProductRequest;
import com.example.backend.product.dto.response.ProductResponse;
import com.example.backend.product.entity.Product;
import com.example.backend.product.mapper.ProductMapper;
import com.example.backend.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return ProductMapper.toResponse(product);
    }

    @Transactional
    public ProductResponse save(ProductRequest dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));

        Product product = ProductMapper.toEntity(dto);

        product.setCategory(category);

        productRepository.save(product);

        return ProductMapper.toResponse(product);
    }

    @Transactional
    public ProductResponse update(Long id, UpdateProductRequest dto) {
        Product prod = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));


        prod.setName(dto.getName());
        prod.setDescription(dto.getDescription());
        prod.setImage(dto.getImage());
        prod.setPrice(dto.getPrice());
        prod.setStock(dto.getStock());
        prod.setCategory(category);

        productRepository.save(prod);
        return ProductMapper.toResponse(prod);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }
}
