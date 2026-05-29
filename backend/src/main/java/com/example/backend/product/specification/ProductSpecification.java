package com.example.backend.product.specification;

import com.example.backend.product.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> hasSearch(String search) {
        return (root, query, cb) -> {

            if (search == null || search.isBlank()) {
                return null;
            }

            String likeSearch = "%" + search.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("name")), likeSearch),
                    cb.like(cb.lower(root.get("description")), likeSearch)
            );
        };
    }

    public static Specification<Product> hasCategory(String category) {
        return (root, query, cb) -> {

            if (category == null || category.isBlank()) {
                return null;
            }

            return cb.like(
                    cb.lower(root.get("category").get("name")),
                    "%" + category.toLowerCase() + "%"
            );
        };
    }
}
