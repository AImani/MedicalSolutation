import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { login, profile } from "../core/_requests";
import { useAuth } from "../core/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequestCommand } from "..";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ExceptionError } from "../../general/@types";
import { PageTitle } from "@/_metronic/layout/core";


const defaultValues: LoginRequestCommand = {
  Username: "",
  Password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, saveUser } = useAuth();
  const { t } = useTranslation();
  const loginSchema = Yup.object().shape({
    Username: Yup.string()
      .email(t('Messages.Format', { 0: t('AUTH.INPUT.EMAIL') }))
      .min(3, t('Messages.MinLength', { 0: t('AUTH.INPUT.USERNAME'), 1: 3 }))
      .max(50, t('Messages.MaxLength', { 0: t('AUTH.INPUT.USERNAME'), 1: 50 }))
      .required(t('Messages.Required', { 0: t('AUTH.INPUT.USERNAME') })),
    Password: Yup.string()
      .min(3, t('Messages.MinLength', { 0: t('AUTH.INPUT.PASSWORD'), 1: 3 }))
      .max(50, t('Messages.MaxLength', { 0: t('AUTH.INPUT.PASSWORD'), 1: 50 }))
      .required(t('Messages.Required', { 0: t('AUTH.INPUT.PASSWORD') })),
  });
  const methods = useForm<LoginRequestCommand>({
    defaultValues,
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const queryClient = useQueryClient()
  const onSubmit = methods.handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { data: auth } = await login(values);
      const token = auth?.Data!;
      
      saveAuth({ api_token: token });
      const { data: userInfo } = await profile();

      if (userInfo.Data)
        saveUser(userInfo.Data);

      queryClient.clear();
    } catch (error) {
      const err = error as ExceptionError;
      saveAuth(undefined);
      setLoading(false);
      toast.error(err?.Errors?.join(''))
    }
  });

  return (
    <form
      className="form w-100"
      onSubmit={onSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <PageTitle>{`${t('AUTH.LOGIN.BUTTON')}`}</PageTitle>
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">{t("AUTH.LOGIN.TITLE")}</h1>
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">{t("AUTH.INPUT.EMAIL")}</label>
        <input
          placeholder={t("AUTH.INPUT.EMAIL")}
          {...methods.register("Username")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                methods.formState.dirtyFields.Username &&
                methods.formState.errors.Username,
            },
            {
              "is-valid":
                methods.formState.dirtyFields.Username &&
                !methods.formState.errors.Username,
            }
          )}
          type="email"
          name="Username"
          autoComplete="off"
        />
        {methods.formState.dirtyFields.Username &&
          methods.formState.errors.Username && (
            <div className="fv-plugins-message-container">
              <span role="alert">{methods.formState.errors.Username.message}</span>
            </div>
          )}
      </div>

      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          {t("AUTH.INPUT.PASSWORD")}
        </label>
        <input
          type="password"
          autoComplete="off"
          {...methods.register("Password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                methods.formState.dirtyFields.Password &&
                methods.formState.errors.Password,
            },
            {
              "is-valid":
                methods.formState.dirtyFields.Password &&
                !methods.formState.errors.Password,
            }
          )}
        />
        {methods.formState.dirtyFields.Password &&
          methods.formState.errors.Password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">
                  {methods.formState.errors.Password.message}
                </span>
              </div>
            </div>
          )}
      </div>

      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={
            methods.formState.isSubmitting || !methods.formState.isValid
          }
        >
          {!loading && <span className="indicator-label">{t("AUTH.LOGIN.BUTTON")}</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              {t("Actions.PleaseWait")}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
