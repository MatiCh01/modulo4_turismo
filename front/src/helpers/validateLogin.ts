export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export const validateLoginForm = (values: ILoginProps): ILoginErrors => {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es inválido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};