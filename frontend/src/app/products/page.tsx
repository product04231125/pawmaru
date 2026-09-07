import { getProducts } from "@/lib/products";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
  const { keyword = "" } = await searchParams;
  const products = await getProducts(keyword);
  return (
    <main className="section products-page"><p className="eyebrow">PAWMARU PRODUCTS</p><h1>전체상품</h1><form className="search" action="/products"><input name="keyword" defaultValue={keyword} placeholder="상품명을 검색해 보세요" aria-label="상품명" /><button type="submit">검색</button></form>
      {products.length === 0 ? <div className="empty"><span>🐾</span><strong>상품을 준비하고 있어요.</strong><p>DB에 상품이 등록되면 이 화면에 바로 표시됩니다.</p></div> : <div className="product-grid">{products.map((product) => { const prices = product.options.map((option) => option.price); return <article className="product-card" key={product.id}><div className="product-image">PAWMARU</div><p>포우마루 셀렉트</p><h2>{product.name}</h2><strong>{prices.length ? Math.min(...prices).toLocaleString("ko-KR") : "가격 준비 중"}{prices.length ? "원" : ""}</strong></article>; })}</div>}
    </main>
  );
}
