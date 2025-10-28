"use client";

import NoteList from "@/components/NoteList/NoteList";
import { fetchNoteByCategory } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface FilterPageClientProps {
  category?: string | undefined;
}

export default function FilterPageClient({ category }: FilterPageClientProps) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", category],
    queryFn: () => fetchNoteByCategory(category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && !data && <p>Something went wrong.</p>}
      {isSuccess && data && <NoteList notes={data.notes} />}
    </>
  );
}
