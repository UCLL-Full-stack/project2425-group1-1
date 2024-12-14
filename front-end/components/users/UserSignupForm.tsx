import UserService from "@services/UserService";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@styles/form.module.css";
import { ErrorResponse } from "@types";

const UserSignupForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    e.preventDefault();
    setErrorMessage(null);

    const userData = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    let resp = await UserService.signup(userData);
    if (!resp.ok) {
      const error = await resp.json() as ErrorResponse;
      setErrorMessage(error.message);
      return;
    }

    resp = await UserService.login({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });
    if (!resp.ok) {
      const error = await resp.json() as ErrorResponse;
      setErrorMessage(error.message);
      return;
    }

    localStorage.setItem("auth", JSON.stringify(await resp.json()));
    router.push("/");
  };

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={submitHandler} className={styles.classicForm}>
        <label htmlFor="firstNameInput">First Name</label>
        <input
          className="form-control"
          id="firstNameInput"
          required
          name="firstName"
        />
        <label htmlFor="lastNameInput">Last Name</label>
        <input
          className="form-control"
          id="lastNameInput"
          required
          name="lastName"
        />
        <label htmlFor="emailInput">E-mail</label>
        <input
          className="form-control"
          id="emailInput"
          required
          name="email"
        />
        <label htmlFor="passInput">Password</label>
        <input
          className="form-control"
          id="passInput"
          type="password"
          required
          name="password"
        />
        <button type="submit" className="btn btn-primary">
          Sign-up
        </button>
      </form>
    </>
  );
};

export default UserSignupForm;