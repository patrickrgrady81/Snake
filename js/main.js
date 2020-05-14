import Game from "./game.js"

window.addEventListener('DOMContentLoaded', run);

function run() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const game = new Game(width, height, ctx);

  // const localResetDb = "5/13/2020";
  const versionName = `The ES6 Update`;
  const version = `v1.1.0 (${versionName})`;

  populateVersion(document.getElementsByClassName("version"));

  const signin = document.getElementById("signin-btn");
  const signup = document.getElementById("signup-btn");
  const signIn = document.getElementById("signIn");
  const signUp = document.getElementById("signUp");

  signin.addEventListener("click", switchMenus)
  signup.addEventListener("click", switchMenus);

  const anon = document.getElementById("anon-btn");
  anon.addEventListener("click", async e => {
    e.preventDefault();
    const username = "anonymous";
    const password = "password";
    let response;
    const fetchInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    }

    try {
      response = await fetch(game.site.concat("login"), fetchInfo);
    } catch (error) { 
      console.log(error);
    }
    if (response) {
      const data = await response.json();
      if (data.user) {
        game.loginAndStart(data);
      } else {
        let error = document.getElementById("errorSignIn");
        error.innerHTML = "Invalid username or password";
      }
    }
  });

  window.addEventListener("submit", async e => {
    e.preventDefault();

    if (e.target.id === "signInForm") {
      const username = e.target[0].value.toLowerCase();
      const password = e.target[1].value;
      let response;
      const fetchInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      }
      
      response = await fetch(game.site.concat("login"), fetchInfo);
      const data = await response.json();
        if (data.user) {
          game.loginAndStart(data)
        } else {
          let error = document.getElementById("errorSignIn")
          error.innerHTML = "Invalid username or password";
        }
    } else {
      const username = e.target[0].value.toLowerCase();
      const email = e.target[1].value.toLowerCase();
      const password = e.target[2].value;
      const password_confirmation = e.target[3].value;
      let response;
      const fetchInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username, email, password, password_confirmation
        })
      }

      response = await fetch(game.site.concat("signup"), fetchInfo)
      const data = await response.json();
        if (data.user) {
          game.loginAndStart(data)
        } else {
          const error = document.getElementById("errorSignUp")
          if (data.error) {
            error.innerHTML = data.error;
          } else {
            error.innerHTML = "Invalid username or password";
          }
        }
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