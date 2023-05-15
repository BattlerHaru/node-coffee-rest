const baseURL = "http://localhost:8080/api/auth";

let user = null;
let socket = null;

const jwtValidate = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("No hay token en el servidor.");
  }

  const url = `${baseURL}/`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-token": token,
    },
  });

  const {user: userDB, token: tokenDB} = await resp.json();

  localStorage.setItem("token", tokenDB);
  user = userDB;
};

const main = async () => {
  await jwtValidate();
};

main();

// const socket = io();
