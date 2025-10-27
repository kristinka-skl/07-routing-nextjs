import type { Note, NoteFormData } from "../types/note";
import axios from "axios";
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
const PER_PAGE = 10;

export async function fetchNotes(
  query: string,
  page: number
): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page: page,
      perPage: PER_PAGE,
    },
  });
  return data;
}

export async function createNote(newNote: NoteFormData): Promise<Note> {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
