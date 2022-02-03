export const SECRET_KEY = process.env.SECRET || "JesusLaresContrerasApiQuotes";

export enum Collections {
  users = "Users",
  quotes = "Quotes",
  shuffle = "ViewQuotes",
}
export enum RoleUser {
  client = "client",
  admin = "admin",
}

type typesObjectString = {
  [key: string]: string;
};
export const createConstants: typesObjectString = {
  Users: "(id,name,email,password,registerDate,role)",
  Quotes: "(id,quote,writer,role,idUser,registerDate)",
  ViewQuotes: "(userId,quoteId)",
};

export const messageUser: typesObjectString = {
  EMAIL_EXIST: "El email ya esta regitrado con una cuenta.",
  GET_ALL: "Lista de usuarios cargada correctamente",
  GET: "Usuario cargado correctamente.",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  CREATE_SUCCESS: "Usuario creado correctamente.",
  EMAIL_NOT_EXIST: "El usuario no existe.",
  WRONG_PASSWORD: "Contraseña incorrecta.",
  TOKEN_VERICATION_FAILED: "token no valido, inicia sesion de nuevo",
  DELETE_SUCCESS: "Usuario eliminado.",
  UPDATE_SUCCESS: "Usuario eliminado.",
  ALL_USERS:
    "Error al cargar los usuarios. Comprueba que tienes todo corretamente.",
  ERROR_DEFAULT:
    "Error al realizar la petición. Comprueba que tienes corretamente todo",
};
export const messageViewQuotes: typesObjectString = {
  NOT_ACCESS: "Ya no se tiene acceso a esta cita.",
  INVALID_KEY: "Su clave es invalida.",
  EMPTY_RESPONSE:
    "No cuenta con ninguna cita y el permiso para obtener las globales esta bloqueado.",
  ERROR_DEFAULT:
    "Error al realizar la petición. Comprueba que tienes corretamente todo.",
};
export const messageQuotes: typesObjectString = {
  GET__ALL: "Lista de citas cargada correctamente.",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  CREATE_SUCCESS: "Cita creada correctamente.",
  DELETE_SUCCESS: "Cita eliminada correctamente.",
  UPDATE_SUCCESS: "Cita actualizada correctamente.",
  ERROR_DEFAULT:
    "Error al realizar la petición. Comprueba que tienes corretamente todo.",
};
export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
  M1 = H24 * 30,
}
