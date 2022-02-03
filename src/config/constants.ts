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

export const errorsUser: typesObjectString = {
  EMAIL_EXIST: "El email ya esta regitrado con una cuenta.",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  EMAIL_NOT_EXIST: "El usuario no existe.",
  WRONG_PASSWORD: "Contraseña incorrecta.",
  TOKEN_VERICATION_FAILED: "token no valido, inicia sesion de nuevo",
  ALL_USERS:
    "Error al cargar los usuarios. Comprueba que tienes todo corretamente.",
  default:
    "Error al realizar la petición. Comprueba que tienes corretamente todo",
};
export const errorsQuote: typesObjectString = {
  TOKEN_VERICATION_FAILED: "token no valido, inicia sesion de nuevo",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  QUOTE_NOT_EXIST: "La cita no existe.",
  default:
    "Error al realizar la petición. Comprueba que tienes corretamente todo",
};

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
  M1 = H24 * 30,
}
