import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { updateProductAction } from "@/lib/admin-actions";
import { getCategories, getProduct } from "@/lib/api";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const [categories, product] = await Promise.all([
    getCategories(),
    getProduct(id),
  ]);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Editar producto</h2>
      <ProductForm
        categories={categories}
        action={updateProductAction}
        submitLabel="Guardar cambios"
        product={product}
      />
    </div>
  );
}
