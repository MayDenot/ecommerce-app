package com.example.backend.order.service;

import com.example.backend.cart.entity.Cart;
import com.example.backend.cart.entity.CartItem;
import com.example.backend.cart.repository.CartRepository;
import com.example.backend.exception.*;
import com.example.backend.order.dto.response.OrderResponse;
import com.example.backend.order.entity.Order;
import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderStatus;
import com.example.backend.order.mapper.OrderMapper;
import com.example.backend.order.repository.OrderRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @Transactional
    public OrderResponse checkout(String email) {
        Cart cart = cartRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new CartNotFoundException(email));

        if (cart.getCartItems().isEmpty()) {
            throw new CartEmptyException();
        }

        User user = cart.getUser();

        Order order = new Order();

        order.setUser(user);

        order.setStatus(OrderStatus.PENDING);

        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new InsufficientStockException(product.getStock());
            }

            product.setStock(product.getStock() - cartItem.getQuantity());

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);

            orderItem.setProduct(product);

            orderItem.setQuantity(cartItem.getQuantity());

            orderItem.setUnitPrice(cartItem.getUnitPrice());

            orderItem.setSubtotal(cartItem.getSubtotal());

            orderItems.add(orderItem);

            total = total.add(cartItem.getSubtotal());
        }

        order.setItems(orderItems);

        order.setTotalPrice(total);

        Order savedOrder = orderRepository.save(order);

        cart.getCartItems().clear();

        cart.setTotalPrice(BigDecimal.ZERO);

        cartRepository.save(cart);

        return OrderMapper.toResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrders() {
        return orderRepository.findAll().stream()
                .map(OrderMapper::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        return OrderMapper.toResponse(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUser(String email) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(OrderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        order.setStatus(status);
        return OrderMapper.toResponse(orderRepository.save(order));
    }
}
