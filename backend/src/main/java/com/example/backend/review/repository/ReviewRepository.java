package com.example.backend.review.repository;

import com.example.backend.product.entity.Product;
import com.example.backend.review.entity.Review;
import com.example.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);

    boolean existsByUserAndProduct(User user, Product product);

    @Query("""
        SELECT AVG(r.rating)
        FROM Review r
        WHERE r.product.id = :productId
    """)
    Double getAverageRating(@Param("productId") Long productId);

    Integer countByProductId(Long productId);
}
