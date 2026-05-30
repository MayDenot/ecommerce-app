package com.example.backend.review.controller;

import com.example.backend.review.dto.request.ReviewRequest;
import com.example.backend.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(
            @PathVariable Long productId,
            @RequestBody @Valid ReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(
                reviewService.createReview(
                        productId,
                        userDetails.getUsername(),
                        request
                )
        );
    }

    @GetMapping
    public ResponseEntity<?> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(
                reviewService.getReviewsByProduct(productId)
        );
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> delete(@PathVariable Long reviewId) {
        reviewService.delete(reviewId);
        return ResponseEntity.noContent().build();
    }
}
