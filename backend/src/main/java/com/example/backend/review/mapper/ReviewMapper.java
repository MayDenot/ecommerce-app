package com.example.backend.review.mapper;

import com.example.backend.product.entity.Product;
import com.example.backend.review.dto.request.ReviewRequest;
import com.example.backend.review.dto.response.ReviewResponse;
import com.example.backend.review.entity.Review;
import com.example.backend.user.entity.User;

import java.time.LocalDateTime;

public class ReviewMapper {
    public static Review toEntity(ReviewRequest request, User user, Product product) {
        Review review = new Review();

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUser(user);
        review.setProduct(product);
        review.setCreatedAt(LocalDateTime.now());

        return review;
    }

    public static ReviewResponse toResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getUser().getName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }
}
