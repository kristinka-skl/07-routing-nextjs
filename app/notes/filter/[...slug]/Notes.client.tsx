"use client";
import css from "./page.module.css";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

interface FilterPageClientProps {
  category?: string | undefined;
}

export default function FilterPageClient({ category }: FilterPageClientProps) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", query, currentPage, category],
    queryFn: () => fetchNotes(query, currentPage, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isError) {
      toast("Sorry, something went wrong, please try again");
    }
  }, [isError]);
  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setCurrentPage(1);
  }, 1000);
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onChange={changeQuery} />}
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={currentPage - 1}
            />
          )}
          {
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
          }
        </header>

        <Toaster position="top-right" reverseOrder={false} />
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
