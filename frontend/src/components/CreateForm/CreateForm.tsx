import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikErrors } from "formik";
import Button from "../Button";
import * as Yup from "yup";
import { createNewspost } from "../../store/action/newsposts/newspostsAction";
import { useTypedDispatch } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import { selectConfig } from "../../config/config";

interface CreateValues {
  title: string;
  text: string;
  genre: "Politic" | "Business" | "Sport" | "Other";
  isPrivate: Boolean;
}

const CreateForm: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const initialValues: CreateValues = {
    title: "",
    text: "",
    genre: "Other",
    isPrivate: false,
  };
  const handleSubmit = async (
    values: CreateValues,
    actions: FormikHelpers<CreateValues>
  ) => {
    try {
      const PostSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, "Too Short!")
          .max(100, "Too Long!")
          .required("Title is required"),

        text: Yup.string()
          .min(2, "Too Short!")
          .max(1000, "Too Long!")
          .required("Post is required"),

        genre: Yup.string().required("Gener is required!"),
      });
      await PostSchema.validate(values, { abortEarly: false });

      const id = await dispatch(createNewspost("/api/newsposts", values));
      if(id){
        actions.setSubmitting(false);
        navigate(`/newsposts/${id}`);
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Title" className="border-red-500 rounded-md p-2 border-solid border-2" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="text">Post</label>
            <Field as="textarea" id="text" name="text" placeholder="text" className="border-red-500 rounded-md p-2 border-solid border-2" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="genre" style={{ display: "block" }}>
              Genre
            </label>
            <Field as="select" name="genre" id="genre" className="border-red-500 rounded-md p-2 border-solid border-2" >
              {selectConfig.map((item) => (
                <option key={item.id} value={item.text}>
                  {item.text}
                </option>
              ))}
            </Field>
          </div>
          <div className="flex gap-3">
          <label htmlFor="isPrivate">
            <Field type="checkbox" name="isPrivate" className="border-red-500 rounded-md mr-3 border-solid border-2" />
            NewsPost is Private
          </label>
          </div>
          <Button id="createPost" />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateForm;
