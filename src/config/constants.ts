export enum Collections {
  users = "Users",
}
export enum RoleUser {
  client = "client",
  admin = "admin",
}

type typesObjectString = {
  [key: string]: string;
};
export const createConstants: typesObjectString = {
  Users: "(id,name,email,password,registerDate,role,state)",
};

export const errorCreateUser: typesObjectString = {
  EMAIL_EXIST: "El email ya esta regitrado con una cuenta.",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  EMAIL_NOT_EXIST: "El usuario no existe.",
  WRONG_PASSWORD: "Contraseña incorrecta.",
  TOKEN_VERICATION_FAILED: "token no valido, inicia sesion de nuevo",
  default:
    "Error al realizar la petición. Comprueba que tienes corretamente todo",
};

export const SECRET_KEY = process.env.SECRET || "JesusLaresContrerasApiQuotes";

/**
 * H = horas
 * M = minutos
 * D = dias
 */

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
  M1 = H24 * 30,
}
