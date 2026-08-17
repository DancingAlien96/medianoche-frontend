import Image from "next/image";
import { RequestStatusSelect } from "@/components/admin/request-status-select";
import { adminGetRequests } from "@/lib/api";
import { formatOrderDate } from "@/lib/orders";
import { getToken } from "@/lib/session";

export default async function AdminRequestsPage() {
  const token = (await getToken())!;
  const requests = await adminGetRequests(token);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Requerimientos ({requests.length})
      </h2>

      {requests.length === 0 ? (
        <p className="text-muted py-12 text-center">
          Aún no hay requerimientos.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {r.brand ?? "Sin marca"}
                    {r.name ? ` · ${r.name}` : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {formatOrderDate(r.createdAt)} · {r.phone}
                  </p>
                </div>
                <RequestStatusSelect id={r.id} status={r.status} />
              </div>

              <p className="text-sm whitespace-pre-line">{r.description}</p>

              {r.photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {r.photos.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-20 h-20 rounded-md overflow-hidden bg-surface-2 border border-border block"
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
