export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
}

export const validateRegisterForm = (values: IRegisterProps): IRegisterErrors => {
  const errors: IRegisterErrors = {};

  if (!values.name) errors.name = "El nombre es requerido";
  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es inválido";
  }
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (values.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }
  if (!values.address) errors.address = "La dirección es requerida";
  if (!values.phone) errors.phone = "El teléfono es requerido";

  return errors;
};