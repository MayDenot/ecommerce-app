package com.example.backend.dev;

import com.example.backend.cart.repository.CartItemRepository;
import com.example.backend.cart.repository.CartRepository;
import com.example.backend.category.entity.Category;
import com.example.backend.category.repository.CategoryRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
public class SeedController {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final ReviewRepository reviewRepository;

    @PostMapping("/seed")
    public ResponseEntity<?> seed() {

        if (categoryRepository.count() > 0 || productRepository.count() > 0) {
            return ResponseEntity.badRequest()
                    .body("La base ya contiene datos.");
        }

        Category smartphones = categoryRepository.save(
                new Category(
                        null,
                        "Smartphones",
                        "Teléfonos inteligentes",
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                        null
                ));

        Category notebooks = categoryRepository.save(
                new Category(
                        null,
                        "Notebooks",
                        "Computadoras portátiles",
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                        null
                ));

        Category gaming = categoryRepository.save(
                new Category(
                        null,
                        "Gaming",
                        "Periféricos y accesorios gamer",
                        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
                        null
                ));

        Category audio = categoryRepository.save(
                new Category(
                        null,
                        "Audio",
                        "Auriculares y parlantes",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                        null
                ));

        Category monitors = categoryRepository.save(
                new Category(
                        null,
                        "Monitores",
                        "Monitores para trabajo y gaming",
                        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
                        null
                ));

        Category tablets = categoryRepository.save(
                new Category(
                        null,
                        "Tablets",
                        "Tablets y accesorios",
                        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
                        null
                ));

        Category components = categoryRepository.save(
                new Category(
                        null,
                        "Componentes",
                        "Hardware para PC",
                        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
                        null
                ));

        Category smartHome = categoryRepository.save(
                new Category(
                        null,
                        "Smart Home",
                        "Automatización del hogar",
                        "https://images.unsplash.com/photo-1558002038-1055907df827",
                        null
                ));

        List<Product> products = new ArrayList<>();

        // SMARTPHONES

        products.add(product(
                "Samsung Galaxy S24 Ultra",
                "Smartphone Samsung 512GB",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                1899999,
                15,
                smartphones));

        products.add(product(
                "Samsung Galaxy A55",
                "Smartphone Samsung gama media",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                699999,
                20,
                smartphones));

        products.add(product(
                "iPhone 15 Pro",
                "Apple iPhone 15 Pro 256GB",
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
                2199999,
                10,
                smartphones));

        products.add(product(
                "Google Pixel 8",
                "Google Pixel 8 128GB",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                1399999,
                8,
                smartphones));

        // NOTEBOOKS

        products.add(product(
                "MacBook Air M3",
                "Notebook Apple M3 13 pulgadas",
                "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
                2499999,
                7,
                notebooks));

        products.add(product(
                "Dell XPS 13",
                "Ultrabook premium Dell",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                1899999,
                6,
                notebooks));

        products.add(product(
                "Lenovo ThinkPad X1 Carbon",
                "Notebook empresarial Lenovo",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                1999999,
                4,
                notebooks));

        products.add(product(
                "ASUS Zenbook 14",
                "Notebook ultraliviana ASUS",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                1599999,
                9,
                notebooks));

        // GAMING

        products.add(product(
                "Logitech G Pro X Superlight",
                "Mouse gamer profesional",
                "https://images.unsplash.com/photo-1527814050087-3793815479db",
                159999,
                25,
                gaming));

        products.add(product(
                "Razer DeathAdder V3",
                "Mouse gamer Razer",
                "https://images.unsplash.com/photo-1527814050087-3793815479db",
                139999,
                18,
                gaming));

        products.add(product(
                "HyperX Alloy Origins",
                "Teclado mecánico RGB",
                "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
                169999,
                12,
                gaming));

        products.add(product(
                "Logitech G733",
                "Auriculares gamer inalámbricos",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                199999,
                15,
                gaming));

        // AUDIO

        products.add(product(
                "Sony WH-1000XM5",
                "Auriculares premium con cancelación de ruido",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                499999,
                12,
                audio));

        products.add(product(
                "AirPods Pro 2",
                "Auriculares Apple inalámbricos",
                "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
                449999,
                10,
                audio));

        products.add(product(
                "JBL Flip 6",
                "Parlante portátil Bluetooth",
                "https://images.unsplash.com/photo-1589003077984-894e133dabab",
                159999,
                22,
                audio));

        // MONITORES

        products.add(product(
                "LG UltraGear 27",
                "Monitor gaming 27 pulgadas",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
                699999,
                8,
                monitors));

        products.add(product(
                "Samsung Odyssey G7",
                "Monitor curvo gaming",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
                899999,
                6,
                monitors));

        products.add(product(
                "Dell UltraSharp U2723QE",
                "Monitor profesional 4K",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
                799999,
                5,
                monitors));

        // TABLETS

        products.add(product(
                "iPad Air M2",
                "Tablet Apple iPad Air",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
                1299999,
                10,
                tablets));

        products.add(product(
                "Samsung Galaxy Tab S9",
                "Tablet Samsung premium",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
                1099999,
                12,
                tablets));

        // COMPONENTES

        products.add(product(
                "RTX 4070 Super",
                "Placa de video NVIDIA",
                "https://images.unsplash.com/photo-1591488320449-011701bb6704",
                1199999,
                5,
                components));

        products.add(product(
                "Ryzen 7 7800X3D",
                "Procesador AMD",
                "https://images.unsplash.com/photo-1591799265444-d66432b91588",
                699999,
                7,
                components));

        products.add(product(
                "Samsung 990 Pro 2TB",
                "SSD NVMe PCIe 4.0",
                "https://images.unsplash.com/photo-1591799265444-d66432b91588",
                249999,
                15,
                components));

        // SMART HOME

        products.add(product(
                "Amazon Echo Dot",
                "Asistente inteligente Alexa",
                "https://images.unsplash.com/photo-1543512214-318c7553f230",
                99999,
                20,
                smartHome));

        products.add(product(
                "Google Nest Mini",
                "Asistente inteligente Google",
                "https://images.unsplash.com/photo-1543512214-318c7553f230",
                89999,
                18,
                smartHome));

        productRepository.saveAll(products);

        return ResponseEntity.ok(
                "Seed completado correctamente. Categorías: "
                        + categoryRepository.count()
                        + " - Productos: "
                        + productRepository.count()
        );
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {

        cartItemRepository.deleteAll();
        reviewRepository.deleteAll();

        productRepository.deleteAll();
        categoryRepository.deleteAll();

        return ResponseEntity.ok("Datos eliminados");
    }

    private Product product(
            String name,
            String description,
            String image,
            double price,
            int stock,
            Category category
    ) {
        return new Product(
                null,
                name,
                description,
                image,
                BigDecimal.valueOf(price),
                stock,
                category
        );
    }
}
