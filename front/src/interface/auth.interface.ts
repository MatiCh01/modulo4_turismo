// Lo que enviamos al backend en el registro
export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

// Lo que enviamos al backend en el login
export interface ILoginProps {
  email: string;
  password: string;
}

// Estructura de la respuesta exitosa del login que persistiremos
export interface IUserSession {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
  };
}