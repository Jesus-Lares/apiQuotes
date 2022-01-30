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
  default: "Error al crear cuenta. Intente nuevamente.",
};
