package com.example.backend.category.service;

import com.example.backend.category.dto.request.CategoryRequest;
import com.example.backend.category.dto.response.CategoryResponse;
import com.example.backend.category.entity.Category;
import com.example.backend.category.mapper.CategoryMapper;
import com.example.backend.category.repository.CategoryRepository;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryResponse findById(Long id) {
        Category cat = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        return CategoryMapper.toResponse(cat);
    }

    @Transactional
    public CategoryResponse save(CategoryRequest dto) {
        Category category = categoryRepository.findByName(dto.getName())
                .orElseThrow(() -> new CategoryNotFoundException(dto.getName()));

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        categoryRepository.save(category);

        return CategoryMapper.toResponse(category);
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest dto) {
        Category cat = categoryRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        cat.setName(dto.getName());
        cat.setDescription(dto.getDescription());

        categoryRepository.save(cat);
        return CategoryMapper.toResponse(cat);
    }

    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException(id);
        }
        categoryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public CategoryResponse findByName(String name) {
        Category cat = categoryRepository.findByName(name)
                .orElseThrow(() -> new CategoryNotFoundException(name));
        return CategoryMapper.toResponse(cat);
    }
}
