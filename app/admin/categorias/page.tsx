import { CategoryRow } from "@/components/admin/category-row";
import { NewCategoryForm } from "@/components/admin/new-category-form";
import { getCategories } from "@/lib/api";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h2 className="text-xl font-semibold">Categorías ({categories.length})</h2>

      <NewCategoryForm />

      {categories.length === 0 ? (
        <p className="text-muted py-8 text-center">
          Aún no hay categorías. Crea la primera arriba.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              categories={categories}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-muted">
        Las categorías con productos asignados no se pueden eliminar hasta
        reasignar o quitar esos productos.
      </p>
    </div>
  );
}
