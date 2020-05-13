import Game from "./game.js"

window.addEventListener('DOMContentLoaded', run);

function run() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const game = new Game(width, height, ctx);

  // const localResetDb = "5/13/2020";
  const versionName = `The Major Overhaul Update`;
  const version = `v1.0.0 (${versionName})`;

  populateVersion(document.getElementsByClassName("version"));

  let signin = document.getElementById("signin-btn");
  let signup = document.getElementById("signup-btn");
  let signIn = document.getElementById("signIn");
  let signUp = document.getElementById("signUp");

  signin.addEventListener("click", switchMenus)
  signup.addEventListener("click", switchMenus);

  let anon = document.getElementById("anon-btn");
  anon.addEventListener("click", (e) => {
    e.preventDefault();
    let username = "anonymous";
    let password = "password";

    let res = fetch(game.site.concat("login"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      }
    ).then((res) => {
      return res.json();
    })
      .then((data) => {
        if (data.user) {
          game.loginAndStart(data);
        } else {
          let error = document.getElementById("errorSignIn")
          error.innerHTML = "Invalid username or password";
        }
      })
      .catch((err) => {
        console.log(err);
      })
 
  });

  window.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.id === "signInForm") {
      let username = e.target[0].value.toLowerCase();
      let password = e.target[1].value;
      
      let res = fetch(game.site.concat("login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username, password
          })
        }
      ).then((res) => {
        return res.json();
      })
        .then((data) => {
          if (data.user) {
            game.loginAndStart(data)
          } else {
            let error = document.getElementById("errorSignIn")
            error.innerHTML = "Invalid username or password";
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      let username = e.target[0].value.toLowerCase();
      let email = e.target[1].value.toLowerCase();
      let password = e.target[2].value;
      let password_confirmation = e.target[3].value;

      let res = fetch(game.site.concat("signup"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username, email, password, password_confirmation
          })
        }
      ).then((res) => {
        return res.json();
      })
        .then((data) => {
          if (data.user) {
            game.loginAndStart(data)
          } else {
            let error = document.getElementById("errorSignUp")
            if (data.error) {
              error.innerHTML = data.error;
            } else {
              error.innerHTML = "Invalid username or password";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });


  function switchMenus(e) {
    e.preventDefault();
    signIn.classList.toggle("noShow")
    signIn.classList.toggle("show")
    signUp.classList.toggle("noShow")
    signUp.classList.toggle("show")
    document.getElementById("errorSignIn").innerHTML = "";
    document.getElementById("errorSignUp").innerHTML = "";
  }

  function populateVersion(v) { 
    for (let i = 0; i < v.length; i++) { 
      v[i].innerHTML = version;
    }
  }
}