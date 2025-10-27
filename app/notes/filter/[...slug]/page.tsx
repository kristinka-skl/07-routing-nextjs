import NoteList from "@/components/NoteList/NoteList";
import { fetchNoteByCategory } from "@/lib/api";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await fetchNoteByCategory(category);
  console.log(response);
  return (
    <div>
      <h1>Filtered Notes List</h1>
      <p>Current path: {slug?.join(" / ") || "home"}</p>
      {/* <NoteList notes={response} /> */}
    </div>
  );
}
