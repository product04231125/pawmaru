package kr.pawmaru.api.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    Page<ProductResponse> findAll(
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        return productService.findAll(keyword, pageable);
    }

    @GetMapping("/{id}")
    ProductResponse findOne(@PathVariable Long id) {
        return productService.findOne(id);
    }
}
