"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import ProductTabsViewer from "@/components/product/techspecblock";
import { ChevronLeft, ShoppingCart, FileText, CheckCircle2 } from "lucide-react";

// ... (Interfaces remain exactly as you provided)

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [tabs, setTabs] = useState<TabContent[]>([]);
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/inventory/itemDetails/${id}`);
        const data = await res.json();
        if (!data?.item) { setLoading(false); return; }

        const mapped: Product = {
          id: data.item.item_id,
          name: data.item.name,
          description: data.item.description || "No description available.",
          price: data.item.rate || 0,
          imageUrls: data.item.images?.length > 0 ? data.item.images : [`/api/inventory/images/${data.item.item_id}`],
          specs: {
            type: data.item.product_type || "N/A",
            sku: data.item.sku || "N/A",
            manufacturer: data.item.manufacturer || "N/A",
          },
        };
        setProduct(mapped);
        setMainImage(mapped.imageUrls[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id]);

  useEffect(() => {
    const loadProductSpec = async () => {
      try {
        const res = await fetch(`/api/inventory/techspec/${id}`);
        const data = await res.json();
        if (data?.tabs) setTabs(data.tabs);
        if (data?.pdfs) setPdfs(data.pdfs);
      } catch (error) {
        console.error("Failed to load product tech spec:", error);
      }
    };
    if (id) loadProductSpec();
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-slate-800 py-28">
      {/* Back Button - Compact */}
      <div className="max-w-6xl mx-auto py-4 px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={16} />
          Back to list
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader color="#2563eb" size={35} />
        </div>
      ) : !product ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium">Product not found</p>
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-center overflow-hidden">
                <Image
                  src={mainImage!}
                  alt={product.name}
                  width={400}
                  height={400}
                  unoptimized
                  className="object-contain p-6 mix-blend-multiply"
                />
              </div>

              {/* Smaller Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(url)}
                    className={`relative w-16 h-16 rounded-md border transition-all ${
                      mainImage === url ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"
                    }`}
                  >
                    <img src={url} className="w-full h-full object-contain p-1" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  <CheckCircle2 size={12} />
                  <span>{product.specs?.manufacturer}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">SKU: {product.specs?.sku}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="py-2">
                <span className="text-2xl font-bold text-slate-900">
                  QAR {product.price.toLocaleString()}
                </span>
              </div>

              {/* Compact Specs List */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Specifications</h3>
                <dl className="grid grid-cols-1 gap-y-2 text-sm">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key} className="flex border-b border-slate-50 pb-1.5 justify-between">
                      <dt className="text-slate-500 capitalize">{key}</dt>
                      <dd className="font-medium text-slate-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Medium-sized Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.imageUrls[0],
                  })}
                  className="flex-1 bg-slate-900 hover:bg-black text-white text-sm font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                
                <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <FileText size={16} />
                  Quote
                </button>
              </div>
            </div>
          </div>

          {/* Lower Section: Tabs */}
          <div className="mt-16 border-t border-slate-100 pt-10">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Technical Details</h2>
              <ProductTabsViewer tabs={tabs} pdfs={pdfs} />
          </div>
        </main>
      )}
    </div>
  );
}