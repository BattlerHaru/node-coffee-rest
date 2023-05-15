// login

function handleCredentialResponse(response) {
  const body = {
    id_token: response.credential,
  };

  const url = "http://localhost:8080/api/auth/google";

  fetch(url, {
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

// logout

const button = document.getElementById("google_sign_out");

button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
