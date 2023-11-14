import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers, FormikErrors } from "formik";
import Button from "../Button";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNewspostById,
  updateANewspost,
} from "../../store/action/newsposts/newspostsAction";
import {
  RootStore,
  useTypedDispatch,
  useTypedSelector,
} from "../../store/Store";
import { selectConfig } from "../../config/config";
import LogOut from "../LogOut";

interface UpdatedValues {
  title: string;
  text: string;
  genre: "Politic" | "Business" | "Sport" | "Other";
  isPrivate: Boolean;
}

const EditForm: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const newspost = useTypedSelector((state: RootStore) =>
    id ? state.newsposts?.newsposts?.[id] : null
  );

  const initialValues: UpdatedValues = {
    title: newspost?.title || "",
    text: newspost?.text || "",
    genre: newspost?.genre || "Other",
    isPrivate: newspost?.isPrivate || false,
  };

  useEffect(() => {
    if (id) {
      dispatch(getNewspostById("/api/newsposts/", id));
    }
  }, [id, dispatch]);
  const handleSubmit = async (
    values: UpdatedValues,
    actions: FormikHelpers<UpdatedValues>
  ) => {
    try {
      const PostSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Title is required"),

        text: Yup.string()
          .min(2, "Too Short!")
          .max(256, "Too Long!")
          .required("Post is required"),

        genre: Yup.string().required("Gener is required!")
      });
      await PostSchema.validate(values, { abortEarly: false });
      if (id) {
        const updatedId = await dispatch(
          updateANewspost("/api/newsposts/", values, id)
        );
        actions.setSubmitting(false);
        navigate(`/newsposts/${updatedId}`);
        actions.setSubmitting(false);
        navigate(`/newsposts/${updatedId}`);
      }
    } catch (errors) {
      if (Yup.ValidationError.isError(errors)) {
        const formErrors: FormikErrors<any> = {};
        errors.inner.forEach((error) => {
          if (typeof error.path === "string") {
            formErrors[error.path] = error.message;
          }
        });
        actions.setErrors(formErrors);
      }
    }
  };
  return (
    <div className="max-w-[500px] mx-auto my-[20px]">
      <LogOut/>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Title" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="text">Post</label>
            <Field id="text" name="text" placeholder="text" />
          </div>
          <div>
            <label htmlFor="genre" style={{ display: "block" }}>
            Genre
            </label>
            <select name="genre" id="genre" style={{ display: "block" }}>
              {selectConfig.map((item) => (
                <option key={item.id} value={item.text}>{item.text}</option>
              ))}
            </select>
          </div>
          <div>
          <label htmlFor="isPrivate">
            <Field type="checkbox" name="isPrivate" />
            NewsPost is Private
          </label>
          </div>
          <Button id="updatePost" />
        </Form>
      </Formik>
    </div>
  );
};

export default EditForm;
