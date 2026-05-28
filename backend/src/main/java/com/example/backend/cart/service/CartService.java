package com.example.backend.cart.service;

import com.example.backend.cart.dto.response.CartResponse;
import com.example.backend.cart.entity.Cart;
import com.example.backend.cart.entity.CartItem;
import com.example.backend.cart.mapper.CartMapper;
import com.example.backend.cart.repository.CartItemRepository;
import com.example.backend.cart.repository.CartRepository;
import com.example.backend.exception.*;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(String userEmail) {
        Cart cart = cartRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new CartNotFoundException(userEmail));
        return CartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse add(String userEmail, Long productId, Integer quantity) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException(userEmail));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createCart(user));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        if (product.getStock() < quantity) {
            throw new InsufficientStockException(product.getStock());
        }

        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();

            cartItem.setQuantity(cartItem.getQuantity() + quantity);

            cartItem.setSubtotal(
                    cartItem.getUnitPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()))
            );

            cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem = new CartItem();

            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
            cartItem.setSubtotal(
                    product.getPrice()
                            .multiply(BigDecimal.valueOf(quantity))
            );
            cartItemRepository.save(cartItem);
            cart.getCartItems().add(cartItem);
        }

        updateCartTotal(cart);
        cartRepository.save(cart);
        return CartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse delete(Long idCartItem) {
        CartItem cartItem = cartItemRepository.findById(idCartItem)
                .orElseThrow(() ->
                        new CartItemNotFoundException(idCartItem));

        Cart cart = cartItem.getCart();

        cart.getCartItems().remove(cartItem);

        cartItemRepository.delete(cartItem);

        updateCartTotal(cart);

        cartRepository.save(cart);

        return CartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse changeQuantity(Long idCartItem, Integer newQuantity) {
        CartItem item = cartItemRepository.findById(idCartItem)
                .orElseThrow(() -> new CartItemNotFoundException(idCartItem));

        if (newQuantity <= 0) {
            throw new IllegalArgumentException(
                    "La cantidad debe ser mayor a 0"
            );
        }

        if (item.getProduct().getStock() < newQuantity) {
            throw new InsufficientStockException(
                    item.getProduct().getStock()
            );
        }

        item.setQuantity(newQuantity);

        item.setSubtotal(
                item.getUnitPrice()
                        .multiply(BigDecimal.valueOf(newQuantity))
        );

        updateCartTotal(item.getCart());

        return CartMapper.toResponse(item.getCart());
    }

    @Transactional
    public CartResponse clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new CartNotFoundException(cartId));

        cart.getCartItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);

        return CartMapper.toResponse(cart);
    }

    private void updateCartTotal(Cart cart) {
        BigDecimal total = cart.getCartItems()
                .stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalPrice(total);
    }

    private Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setTotalPrice(BigDecimal.ZERO);
        return cartRepository.save(cart);
    }
}
