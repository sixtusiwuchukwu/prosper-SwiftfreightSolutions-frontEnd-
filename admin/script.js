// let tableRow = document.getElementsByClassName('table-data')

function openPopUp() {
  document.getElementById("pop-up-section").style.display = "flex";
}

function closePopUp() {
  document.getElementById("pop-up-section").style.display = "none";
}
const GetQoutes = () => {
  // axios.defaults.withCredentials = true;
  axios
    // .get("https://swift-distribution-server.vercel.app/logistics/qoutes", {
    .get("https://api.swiftfreightsolutions.ltd/logistics/qoutes", {
      // .get("http://localhost:2080/logistics/qoutes", {
      // includes:true,
      // withCredentials: true,
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //        'Content-Type': 'application/json'
      // }
    })
    .then((res) => {
      if (res.status == 200) {
        let container = document.querySelector(".tb-container");
        let node = res.data
          .map((item) => {
            return `
      <tr class="table-data" id="table-row">
              <td>${item?.trackId}</td>
              <td>${item?.receiverfullName}</td>
              <td>${item?.receiverEmail}</td>
              <td>${item?.receiverPhone}</td>
              <td>${item?.quantity}</td>
              <td>${item?.weight}</td>
              <td>${item?.dropOff}</td>
              <td>${item?.pickUp}</td>
              <td>${item?.mode}</td>
              <td>
              ${item?.status.toLowerCase()}
              </td>
              <td>${item?.currentLocation}</td>

            </tr>
`;
          })
          .join("");
        container.innerHTML = node;
      }

      if (res.status == 408) {
        errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href = "/adminlogin.html";
      }
      errorResponse(`Error: ${err.message}`);
    });
  // inputs.forEach((item) => {
  //   item.value = "";
  // });
  // return false;
};

GetQoutes();

const HandleSelect = () => {
  console.log(document.querySelector(".select-status"));
};

const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

const StatusUpdate = () => {
  let trackId = document.querySelector("#status-Id").value;

  let status = document.querySelector("#status-value").value;
  axios
    .put(
      `https://api.swiftfreightsolutions.ltd/logistics/status?trackId=${trackId}`,
      // `https://swift-distribution-server.vercel.app/logistics/status?trackId=${trackId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        document.querySelector("#status-Id").value = "";
        document.querySelector("#status-value").value = "";

        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        window.location.reload();
      }
      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href = "/adminlogin.html";
      }
    });
};

const PasswordUpdate = () => {
  let inputs = document.querySelectorAll(".password-Id");
  let data = { oldPassword: inputs[0].value, newPassword: inputs[1].value };
  axios
    .post(
      `https://api.swiftfreightsolutions.ltd/user/password`,
      data,
      {
        // .post(`https://swift-distribution-server.vercel.app/user/password`, data, {
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
        },
      }
    )
    .then((res) => {
      if (res.status == 200 && res.data === "incorrect old password") {
        errorResponse(`Error: ${res.data}`);
      }
      if (res.status == 200 && res.data === "success") {
        inputs[1].value = "";
        inputs[0].value = "";
        successResponse("password updated");
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        window.location.reload();
      }
      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href = "/adminlogin.html";
      }
    });
};

const Logout = () => {
  // axios
  //   .post(`https://api.swiftfreightsolutions.ltd/logout`, {
  //     // headers: {
  //     //   "Content-Type": "application/json",
  //     //   credentials: "include",
  //     //   withCredentials: true,
  //     // },
  //   })
  //   .then((res) => {
  //     if (res.status == 200) {
  //       window.location.replace("/adminlogin.html");
  //     }
  //   })
  //   .catch((err) => {
  //     if (err.message == "Request failed with status code 408") {
  //       window.location.href = "/adminlogin.html";
  //     }
  //     errorResponse(`Error: ${err.message}`);
  //   });
  window.location.replace("/adminlogin.html");

};
const LocationUpdate = () => {
  let trackId = document.querySelector("#location-Id").value;
  let location = document.querySelector("#location-value").value;
  axios
    .put(
      `https://api.swiftfreightsolutions.ltd/logistics/location?trackId=${trackId}`,
      { location },
      {
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        document.querySelector("#location-Id").value = "";
        document.querySelector("#location-value").value = "";
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        window.location.reload();
        // return false;
      }
      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href = "/adminlogin.html";
      }
    });
};
const sendEmail = () => {
  const subject = document.getElementById("subject").value;
  const email = document.getElementById("mail-email").value;
  const body = tinymce.get("mail-body").getContent();

  axios.post(
      `https://api.swiftfreightsolutions.ltd/send-mail`,
      { subject, email, body },
      {
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        alert(res.data.message)
          tinymce.get("mail-body").setContent("");
          document.getElementById("subject").value = ""
          document.getElementById("mail-email").value = ""
      }
    }).catch((err)=>{
      console.log(err)
      alert("...error occured")
    })

  // return false;
};
tinymce.init({
  selector: "#mail-body",
});

const HandleQoute = () => {
  let inputs = document.querySelectorAll("#qoute-input");

  let data = {};
  inputs.forEach((item) => {
    const { name, value } = item;
    data = { ...data, [name]: value };
  });
  document.querySelector(".wpcf7-submit").value = "proccessing..."

  axios
    // .post("https://api.swiftfreightsolutions.ltd/logistics/createqoute", data, {
    .post("http://localhost:2080/logistics/createqoute", data, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
    .then((res) => {
      if (res.status == 200) {
        document.querySelector(".wpcf7-submit").value = "SUBMIT NOW"
        inputs.forEach((item) => {
          item.value = "";
        });
        
        document.getElementById('modal').classList.add('show')
        const closeModalBtn = document.getElementById('close-modal');
        const orderIdDisplay = document.getElementById('order-id');
        orderIdDisplay.textContent = ` ${res.data.message}`;
        closeModalBtn.addEventListener('click', closeModal);

      }


      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
        document.querySelector(".wpcf7-submit").value = "SUBMIT NOW"

      }
    })
    .catch((err) => {
      errorResponse(`Error: ${err.message}`);
      document.querySelector(".wpcf7-submit").value = "SUBMIT NOW"

    });
return false;
};

// const toggleButton = document.querySelector(".toggle-button");
const tabs = document.querySelector(".ul-tabs");

// toggleButton.addEventListener("click", function () {
//   tabs.classList.toggle("active");
//   tabs.style.display = tabs.classList.contains("active") ? "flex" : "none";
// });

// Optionally, add click event listener to body for closing tabs:
document.body.addEventListener("click", function (event) {
  if (
    !event.target.closest(".nav-header-mobile") &&
    tabs.classList.contains("active")
  ) {
    tabs.classList.remove("active");
  }
});
const sidebarCollapseBtn = document.getElementById("sidebarCollapse");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

console.log(sidebarCollapseBtn,"sidebarCollapseBtn")

if (sidebarCollapseBtn) {
  sidebarCollapseBtn.addEventListener("click", () => {
    // 1. Toggle the 'active' class on the sidebar itself
    sidebar.classList.toggle("active");
    // 2. Toggle the 'active' class on the content area to handle padding shift
    content.classList.toggle("active");
  });
}