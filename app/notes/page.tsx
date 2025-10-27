import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

export default async function NotePage() {
  const queryClient = new QueryClient();
  const query = "";
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["note", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
