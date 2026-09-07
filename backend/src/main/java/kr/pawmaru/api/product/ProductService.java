package kr.pawmaru.api.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductResponse> findAll(String keyword, Pageable pageable) {
        return productRepository
                .findByStatusAndNameContainingIgnoreCase(ProductStatus.ON_SALE, keyword == null ? "" : keyword.trim(), pageable)
                .map(ProductResponse::from);
    }

    public ProductResponse findOne(Long id) {
        return productRepository.findWithOptionsByIdAndStatus(id, ProductStatus.ON_SALE)
                .map(ProductResponse::from)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "상품을 찾을 수 없습니다."));
    }
}
