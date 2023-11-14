import React from 'react'
import { Formik, Form, Field, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import { useTypedDispatch } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import { IUserType } from '../../store/action/session/sessionActionTypes';
import { logIn } from '../../store/action/session/sessionAction';
import Button from '../../components/Button';
import { NavLink } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const initialValues: IUserType = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (
    values: IUserType,
    actions: FormikHelpers<IUserType>
  ) => {
    try {
      const UserSchema = Yup.object().shape({
        email: Yup.string()
          .min(2, "Too Short!")
          .max(20, "Too Long!")
          .required("Email is required"),

        password: Yup.string()
          .min(2, "Too Short!")
          .max(15, "Too Long!")
          .required("Password is required"),

        confirmPassword: Yup.string()
          .min(2, "Too Short!")
          .max(15, "Too Long!")
          .required("Confirm Password is required"),

      });
      const errors = await UserSchema.validate(values, { abortEarly: false });
      console.log(errors);
      //await UserSchema.validate(values, { abortEarly: false });
      console.log(values);

      const user: any = await dispatch(logIn("/api/auth/signup", values));
      if (user) {
        actions.setSubmitting(false);
        navigate(`/newsposts`);
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
      <h2 className="">Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Email" className="border-red-500 rounded-md p-2 border-solid border-2" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" placeholder="Password" className="border-red-500 rounded-md p-2 border-solid border-2" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" className="border-red-500 rounded-md p-2 border-solid border-2" />
          </div>
          <Button id="signup" />
        </Form>
      </Formik>
      <NavLink to="/login">Log In</NavLink>
    </div>
  )
}

export default SignUpPage