package com.example.backend.order.mapper;

import com.example.backend.order.dto.response.OrderItemResponse;
import com.example.backend.order.dto.response.OrderResponse;
import com.example.backend.order.entity.Order;
import com.example.backend.order.entity.OrderItem;

import java.util.List;

public class OrderMapper {
    public static OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        OrderItemResponse orderItemResponse = new OrderItemResponse();

        orderItemResponse.setProductId(orderItem.getProduct().getId());
        orderItemResponse.setProductName(orderItem.getProduct().getName());
        orderItemResponse.setImage(orderItem.getProduct().getImage());
        orderItemResponse.setQuantity(orderItem.getQuantity());
        orderItemResponse.setUnitPrice(orderItem.getUnitPrice());
        orderItemResponse.setSubtotal(orderItem.getSubtotal());

        return orderItemResponse;
    }

    public static OrderResponse toResponse(Order order) {
        List<OrderItemResponse> orderItems = order.getItems()
                .stream()
                .map(OrderMapper::toOrderItemResponse)
                .toList();;

        return new OrderResponse(
                order.getId(),
                orderItems,
                order.getTotalPrice(),
                order.getStatus(),
                order.getCreatedAt()
        );
    }
}
