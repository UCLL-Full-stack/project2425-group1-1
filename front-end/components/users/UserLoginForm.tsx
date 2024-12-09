import UserService from "@services/UserService";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@styles/form.module.css";
import { ErrorResponse } from "@types";

const UserLoginForm: React.FC = () => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const clearErrors = () => {
    setErrorMessage(null);
    setNameError(null);
    setPasswordError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    e.preventDefault();
    clearErrors();

    const email = form.get("email") as string;
    if (!email && email.trim() === "") {
      setNameError("Username");
    }

    const password = form.get("password") as string;
    if (!password && password.trim() === "") {
      setPasswordError("Password");
    }

    const resp = await UserService.login({
      email, password
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
      {errorMessage && (<div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
      )}
      <form onSubmit={submitHandler} className={styles.classicForm}>
        <label htmlFor="emailInput">E-mail</label>
        <input className="form-control" id="emailInput" required name="email" />
        {nameError && <div className="text-red-800 ">{nameError}</div>}

        <label htmlFor="passInput">Password</label>
        <input className="form-control" id="passInput" type="password" required name="password" />
        {passwordError && <div className=" text-red-800">{passwordError}</div>}

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default UserLoginForm;
