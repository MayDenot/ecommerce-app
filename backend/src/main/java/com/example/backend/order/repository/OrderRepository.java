package com.example.backend.order.repository;

import com.example.backend.order.entity.Order;
import com.example.backend.product.entity.Product;
import com.example.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("""
        SELECT COUNT(oi) > 0
        FROM OrderItem oi
        WHERE oi.order.user = :user
        AND oi.product = :product
    """)
    boolean existsByUserAndProduct(User user, Product product);
}
