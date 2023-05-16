const baseURL = "http://localhost:8080/api/auth";

let user = null;
let socket = null;

const txtUid = document.querySelector("#txtUid");
const txtMsg = document.querySelector("#txtMsg");
const ulUsers = document.querySelector("#ulUsers");
const ulMsgs = document.querySelector("#ulMsgs");
const btnSalir = document.querySelector("#btnSalir");

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
  document.title = user.name;

  await socketConnect();
};

const socketConnect = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });
  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });
  socket.on("get-message", () => {
    console.log("Sockets offline");
  });
  socket.on("active-users", drawUsers);

  socket.on("direct-message", () => {
    console.log("Sockets offline");
  });
};

const drawUsers = (users = []) => {
  let usersHtml = "";
  users.forEach(({name, uid}) => {
    usersHtml += `
    <li>
      <p>
        <h5 class="text-success">${name}</h5>
        <span class="fs-6 text-muted">${uid}</span>
      </p>
    </li>`;
  });
  ulUsers.innerHTML = usersHtml;
};

const main = async () => {
  await jwtValidate();
};

main();
