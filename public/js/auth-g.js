const baseURL = "http://localhost:8080/api/auth";

// login Manual
const myForm = document.querySelector("form");
myForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const urlM = `${baseURL}/login`;
  const formData = {};

  for (let elem of myForm.elements) {
    if (elem.name.length > 0) {
      formData[elem.name] = elem.value;
    }
  }

  fetch(urlM, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then(({msg, token}) => {
      if (!token) {
        console.warn(msg);
      }
      localStorage.setItem("token", token);
    })
    .catch(console.warn);
});

// login Google
function handleCredentialResponse(response) {
  const body = {
    id_token: response.credential,
  };

  const urlG = `${baseURL}/google`;

  fetch(urlG, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem("email", resp.user.email);
      localStorage.setItem("token", resp.token);
    })
    .catch(console.warn);
}

// logout Google
const button = document.getElementById("google_sign_out");
button.onclick = () => {
  // console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
