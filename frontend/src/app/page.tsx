import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div><p className="eyebrow">PAWMARU SELECT</p><h1>함께하는 매일을<br />더 건강하고 즐겁게</h1><p>반려동물의 생애와 취향을 생각한 좋은 제품을 소개합니다.</p><Link className="button" href="/products">상품 둘러보기</Link></div>
        <div className="hero-mark" aria-hidden="true">🐾</div>
      </section>
      <section className="section"><p className="eyebrow">SHOP BY FRIEND</p><h2>누구와 함께 살고 있나요?</h2><div className="category-grid"><Link href="/products?category=dog"><span>🐶</span><strong>강아지</strong><small>사료 · 간식 · 산책용품</small></Link><Link href="/products?category=cat"><span>🐱</span><strong>고양이</strong><small>사료 · 모래 · 장난감</small></Link></div></section>
    </main>
  );
}
