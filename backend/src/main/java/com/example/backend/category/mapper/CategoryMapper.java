package com.example.backend.category.mapper;

import com.example.backend.category.dto.request.CategoryRequest;
import com.example.backend.category.dto.response.CategoryResponse;
import com.example.backend.category.entity.Category;

public class CategoryMapper {
    public static Category toEntity(CategoryRequest dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return category;
    }

    public static CategoryResponse toResponse(Category category) {
        return new CategoryResponse (
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
