import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/lib/admin-actions";
import { getCategories } from "@/lib/api";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <section className="vista-form">
      <div className="tope">
        <h2>Nuevo producto</h2>
      </div>
      <p className="form-sub">
        Complete la información y guarde para publicarlo en la tienda.
      </p>
      <ProductForm
        categories={categories}
        action={createProductAction}
        submitLabel="Guardar producto"
      />
    </section>
  );
}
