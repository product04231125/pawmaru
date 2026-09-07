import type { Product } from "@/lib/products";

const visuals = ["green", "round rose", "bottle", "toy", "gold", "blue", "bottle rose", "round green"];
const labels = ["REAL DUCK", "SOFT SALMON", "GOOD CARE", "PLAY RING", "PURE FARM", "CAT DAILY"];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const prices = product.options.map((option) => option.price);
  const price = prices.length ? Math.min(...prices) : null;
  return <article className="product-card"><div className="product-thumb">{index < 2 && <span className="product-badge">{index ? "NEW" : "BEST"}</span>}<button className="heart" aria-label={`${product.name} 찜하기`}>♡</button><div className={`pack ${visuals[index % visuals.length]}`}><small>PAWMARU</small><b>{labels[index % labels.length]}</b><em>{product.options[0]?.name ?? "SELECT"}</em></div></div><div className="product-meta"><span className="product-brand">PAWMARU SELECT</span><div className="product-name">{product.name}</div><div className="price-row"><span className="price">{price === null ? "가격 준비 중" : `${price.toLocaleString("ko-KR")}원`}</span></div><div className="rating"><strong>★ 4.9</strong> · 새 상품</div></div></article>;
}
