import { fetchNoteByCategory } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FilterPageClient from "./FilterPage.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", category],
    queryFn: () => fetchNoteByCategory(category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterPageClient category={category} />
    </HydrationBoundary>
  );
}
