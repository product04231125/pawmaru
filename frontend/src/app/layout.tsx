import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "포우마루 — 반려생활을 더 다정하게", description: "반려동물 프로필 기반 맞춤형 용품 쇼핑몰 포우마루" };

function Icon({ name }: { name: "search" | "user" | "cart" }) {
  if (name === "search") return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
  if (name === "user") return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.2 3.5-6 8-6s7.2 1.8 8 6"/></svg>;
  return <svg viewBox="0 0 24 24"><path d="M3 4h2l2.2 10.3a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.6L20 7H6"/><circle cx="10" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ko"><body><div className="announcement">신규 회원 가입 시 첫 구매 10% 할인 · 30,000원 이상 무료배송</div><header className="site-header"><div className="container header-inner"><Link className="logo" href="/"><span className="logo-mark">●</span>포우마루 <small>PAWMARU</small></Link><nav className="main-nav" aria-label="주 메뉴"><Link href="/">홈</Link><Link href="/products">전체상품</Link><Link href="/products?pet=dog">강아지</Link><Link href="/products?pet=cat">고양이</Link><Link href="/#profile">맞춤추천</Link><Link href="/#event">이벤트</Link></nav><div className="header-actions"><button className="icon-button" aria-label="검색"><Icon name="search"/></button><button className="icon-button" aria-label="마이페이지"><Icon name="user"/></button><div className="cart-wrap"><button className="icon-button" aria-label="장바구니"><Icon name="cart"/></button><span className="cart-badge">2</span></div></div></div></header>{children}<footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Link className="logo" href="/"><span className="logo-mark">●</span>포우마루</Link><p>반려동물과 보호자의 더 건강하고 행복한 일상을 위해 좋은 것만 정성껏 고릅니다.</p></div><div><h4>SHOP</h4><Link href="/products">전체상품</Link><Link href="/products?pet=dog">강아지</Link><Link href="/products?pet=cat">고양이</Link></div><div><h4>HELP</h4><span>공지사항</span><span>자주 묻는 질문</span><span>문의하기</span></div><div><h4>ABOUT</h4><span>포우마루 이야기</span><span>이용약관</span><span>개인정보처리방침</span></div></div><div className="copyright">© 2026 PAWMARU. Graduation project.</div></div></footer></body></html>;
}
