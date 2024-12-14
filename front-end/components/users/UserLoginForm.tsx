import UserService from "@services/UserService";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@styles/form.module.css";
import { ErrorResponse } from "@types";
import { useTranslation } from 'next-i18next';

const UserLoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    e.preventDefault();
    setErrorMessage(null);

    const resp = await UserService.login({
      email: form.get("email") as string,
      password: form.get("password") as string
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
        <label htmlFor="emailInput">{t('common.email')}</label>
        <input className="form-control" id="emailInput" required name="email" />
        <label htmlFor="passInput">{t('common.password')}</label>
        <input className="form-control" id="passInput" type="password" required name="password" />
        <button type="submit" className="btn btn-primary">
          {t('login.login')}
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
