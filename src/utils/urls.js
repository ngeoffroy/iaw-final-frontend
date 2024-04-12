export const srvURL = "http://127.0.0.1:8000/";

export const loginURL = srvURL.concat("auth/login/");
export const logoutURL = srvURL.concat("auth/logout/");
export const denunciasURL = srvURL.concat("denuncias/");

export const changeStatusURL = (id, status) => {
  let url = srvURL.concat("changestatus/?id=", id, "&status=", status);
  return url;
};

export const changeAutorizadosURL = (id, autorizado) => {
  let url = srvURL.concat(
    "changeautorizado/?id=",
    id,
    "&autorizado=",
    autorizado
  );
  return url;
};
