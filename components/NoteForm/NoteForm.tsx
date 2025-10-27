import css from "./NoteForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "../../lib/api";
import type { NoteFormData } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const initialValues: NoteFormData = {
  title: "",
  content: "",
  tag: "Todo",
};
const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Name is required"),
  content: Yup.string().max(500, "Note is too long"),
  tag: Yup.mixed()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}
export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (NoteFormData: NoteFormData) =>
      await createNote(NoteFormData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["note"],
      });
      toast("Successfully submitted!");
      onClose();
    },
    onError: () => toast("Sorry, something went wrong, please try again"),
  });

  const fieldId = useId();
  const handleSubmit = (
    values: NoteFormData,
    actions: FormikHelpers<NoteFormData>
  ) => {
    mutate(values, {
      onSuccess: () => actions.resetForm(),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <Field
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
        />
        <ErrorMessage name="title" component="span" className={css.error} />
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <Field
          as="textarea"
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
        />
        <ErrorMessage name="content" component="span" className={css.error} />
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <Field
          as="select"
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage name="tag" component="span" className={css.error} />
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
