import axios from "axios";
import { BackOfficeAuthenticatedUserDto, IdentityUser, LoginRequestCommand } from "./_models";
import { Result } from "../../general/@types";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/Auth/Login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const REQUEST_USER_PROFILE = `${API_URL}/User/get`;

// Server should return AuthModel
export function login(dto: LoginRequestCommand) {
  return axios.post<Result<string>>(LOGIN_URL, dto);
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function profile() {
  return axios.get<Result<IdentityUser>>(REQUEST_USER_PROFILE);
}