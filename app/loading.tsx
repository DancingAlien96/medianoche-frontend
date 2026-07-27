import { WatchSpinner } from "@/components/ui/watch-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <WatchSpinner className="w-10 h-10 text-accent" />
    </div>
  );
}
