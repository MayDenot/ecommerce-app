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
import com.example.backend.product.specification.ProductSpecification;
import com.example.backend.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public Page<ProductResponse> findAll(String search, String category, Pageable pageable) {
        Specification<Product> spec = Specification
                .where(ProductSpecification.hasSearch(search)
                .and(ProductSpecification.hasCategory(category)));

        return productRepository.findAll(spec, pageable)
                .map(product -> {
                    Double averageRating =
                            reviewRepository.getAverageRating(product.getId());
                    Integer totalReviews =
                            Math.toIntExact(
                                    reviewRepository.countByProductId(product.getId())
                            );
                    return ProductMapper.toResponse(
                            product,
                            averageRating != null ? averageRating : 0.0,
                            totalReviews
                    );
                });
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        Double averageRating =
                reviewRepository.getAverageRating(product.getId());

        Integer totalReviews =
                Math.toIntExact(
                        reviewRepository.countByProductId(product.getId())
                );

        return ProductMapper.toResponse(product, averageRating, totalReviews);
    }

    @Transactional
    public ProductResponse save(ProductRequest dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));

        Product product = ProductMapper.toEntity(dto);

        product.setCategory(category);

        productRepository.save(product);

        Double averageRating =
                reviewRepository.getAverageRating(product.getId());

        Integer totalReviews =
                Math.toIntExact(
                        reviewRepository.countByProductId(product.getId())
                );

        return ProductMapper.toResponse(product, averageRating, totalReviews);
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

        Double averageRating =
                reviewRepository.getAverageRating(prod.getId());

        Integer totalReviews =
                Math.toIntExact(
                        reviewRepository.countByProductId(prod.getId())
                );

        return ProductMapper.toResponse(prod, averageRating, totalReviews);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }
}
