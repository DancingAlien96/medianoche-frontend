import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/lib/admin-actions";
import { getCategories } from "@/lib/api";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Nuevo producto</h2>
      <ProductForm
        categories={categories}
        action={createProductAction}
        submitLabel="Crear producto"
      />
    </div>
  );
}
