import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "포우마루 | 반려생활의 좋은 선택",
  description: "반려동물과 보호자를 위한 라이프스타일 쇼핑몰",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header"><Link className="brand" href="/">포우마루</Link><nav aria-label="주요 메뉴"><Link href="/products">전체상품</Link><Link href="/products?category=dog">강아지</Link><Link href="/products?category=cat">고양이</Link></nav><div className="account"><span>로그인</span><span>장바구니</span></div></header>
        {children}
        <footer>© 2026 PAWMARU · 반려생활의 좋은 선택</footer>
      </body>
    </html>
  );
}
