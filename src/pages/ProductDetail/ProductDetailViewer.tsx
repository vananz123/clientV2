import ProductCard from "@/conponents/ProductCard";
import useProductViewerStore from "@/hooks/useProductViewerStore";

function ProductDetailViewer() {
    const {products} = useProductViewerStore()
    console.log(products)
    return <div>
        {products.length > 0 && (
            <>
               {products.map((e)=>(
                 <ProductCard key={e.id} product={e}></ProductCard>
               ))}
            </>
        )}
    </div>;
}

export default ProductDetailViewer;