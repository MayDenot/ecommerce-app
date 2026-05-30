package com.example.backend.review.service;

import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.exception.ReviewAlreadyExistsException;
import com.example.backend.exception.ReviewNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.order.repository.OrderRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.review.dto.request.ReviewRequest;
import com.example.backend.review.dto.response.ReviewResponse;
import com.example.backend.review.entity.Review;
import com.example.backend.review.mapper.ReviewMapper;
import com.example.backend.review.repository.ReviewRepository;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public ReviewResponse createReview(Long productId, String email, ReviewRequest reviewRequest) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(productId));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException(email));

        if (!orderRepository.existsByUserAndProduct(user, product)) {
            throw new RuntimeException(
                    "Solo los usuarios que compraron el producto pueden dejar una reseña"
            );
        }

        if (reviewRepository.existsByUserAndProduct(user, product)) {
            throw new ReviewAlreadyExistsException();
        }

        Review review = ReviewMapper.toEntity(
                reviewRequest,
                user,
                product
        );

        reviewRepository.save(review);

        return ReviewMapper.toResponse(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Transactional
    public void delete(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ReviewNotFoundException(reviewId));

        reviewRepository.delete(review);
    }
}
