export type Product = { id:number; categoryId:number; name:string; description:string; status:"ON_SALE"|"SOLD_OUT"|"HIDDEN"; options:{id:number;name:string;sku:string;price:number;stockQuantity:number}[] };
type ProductPage = { content: Product[] };

export async function getProducts(keyword = ""): Promise<Product[]> {
  const baseUrl = process.env.API_INTERNAL_URL ?? "http://localhost:8080";
  try {
    const response = await fetch(`${baseUrl}/api/products?keyword=${encodeURIComponent(keyword)}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Product API returned ${response.status}`);
    return ((await response.json()) as ProductPage).content;
  } catch { return []; }
}
