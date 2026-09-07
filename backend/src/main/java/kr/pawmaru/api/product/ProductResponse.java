package kr.pawmaru.api.product;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(
        Long id,
        Long categoryId,
        String name,
        String description,
        ProductStatus status,
        List<OptionResponse> options
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(), product.getCategoryId(), product.getName(), product.getDescription(),
                product.getStatus(), product.getOptions().stream().map(OptionResponse::from).toList());
    }

    public record OptionResponse(Long id, String name, String sku, BigDecimal price, int stockQuantity) {
        static OptionResponse from(ProductOption option) {
            return new OptionResponse(option.getId(), option.getName(), option.getSku(), option.getPrice(), option.getStockQuantity());
        }
    }
}
