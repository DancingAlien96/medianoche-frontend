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
    <section className="vista-form">
      <div className="tope">
        <h2>Editar producto</h2>
      </div>
      <p className="form-sub">Actualice la información y guarde los cambios.</p>
      <ProductForm
        categories={categories}
        action={updateProductAction}
        submitLabel="Guardar cambios"
        product={product}
      />
    </section>
  );
}
