// Click user by default
document.getElementById("user").click();

// Adjust height of image
let formHeight = document.getElementById("content-padding").offsetHeight;
let image = document.getElementById("imgLeft");
image.style.height = formHeight + 100 + "px";
let role = "user";
let img = "";
const fileInput = document.getElementById("profileimg");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    // const dataUrl = event.target.result;
    img = reader.result.split(",")[1];
  };

  // Read the file as a data URL
  reader.readAsDataURL(file);
});

const Register = async e => {
  e.preventDefault();
  let model = {
    role,
    base64: img,
    profileimg:
      "/assets/avatars/" +
      role +
      "/" +
      document.getElementById("email").value +
      ".png",
    fullname: document.getElementById("fullname").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    contactnum: document.getElementById("contactnum").value,
  };
  if (
    document.getElementById("password").value ===
    document.getElementById("cpassword").value
  ) {
    await fetch("register", {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (
          response.status === 404 ||
          response.status === 500 ||
          response.status === 400
        ) {
          alert("Something went wrong please check all inputs.");
        } else {
          if(response.isOwner){
            window.location.href = "/main-owner";
          } else {
            window.location.href = "/main-user";
          }
          
        }
      })
      .catch(err => {
        alert("Something went wrong please check all inputs.");
      });
  } else {
    alert("Password and confirm password must be the same.");
  }
};

const Reset = val => {
  role = val;
  document.getElementById("user-form").reset();
};
document.getElementById("user-form").addEventListener("submit", Register);
document.querySelectorAll(".choice").forEach(element => {
  element.addEventListener("click", function () {
    const role = this.id; //to get role
    Reset(role);
  });
});

// If user is clicked
// document.getElementById("user").addEventListener("click", () => {
//   document.getElementById("user-form").style.display = "block";
//   document.getElementById("owner-form").style.display = "none";
// });

// document.getElementById("owner").addEventListener("click", () => {
//   document.getElementById("user-form").style.display = "none";
//   document.getElementById("owner-form").style.display = "block";
//   let formHeight = document.getElementById("content-padding").offsetHeight;
//   let image = document.getElementById("imgLeft");
//   image.style.height = formHeight + 100 + "px";
// });
