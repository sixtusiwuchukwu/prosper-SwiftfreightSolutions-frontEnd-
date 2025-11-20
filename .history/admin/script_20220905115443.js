// let tableRow = document.getElementsByClassName('table-data')

function openPopUp() {
  document.getElementById("pop-up-section").style.display = "flex";
}

function closePopUp() {
  document.getElementById("pop-up-section").style.display = "none";
}
const GetQoutes = () => {
  // axios.defaults.withCredentials = true;
  let data = [{"_id":"6213b3459a88cdff96add8a5","fullName":"Jenn Cross","email":"jenn.cross.co@gmail.com","phone":"+1 970-209-5578","pickUp":"Benghazi,Libya","dropOff":"13 Poplar St, Montrose, CO 81401","mode":"air","quantity":"1","width":"6cm","height":"15cm","trackId":"CL53027541","status":"DISPATCHED ITEM","currentLocation":"Ankara Esenboğa Airport","createdAt":"2022-02-21T15:44:05.044Z","updatedAt":"2022-04-11T19:37:20.502Z","__v":0},{"_id":"621093ecd9a130af9a288cbd","fullName":"Thomas","email":"hnewtonthomas@gmail.com","phone":"08139356162","pickUp":"Lagos","dropOff":"Owerri","mode":"air","quantity":"1","width":"75","height":"5cm","trackId":"CL53345805","status":"CONFIRMED ORDER","currentLocation":"not Yet","createdAt":"2022-02-19T06:53:32.650Z","updatedAt":"2022-02-19T06:55:22.180Z","__v":0},{"_id":"620f9802dcdcd1f3caf3ac28","fullName":"Dante Okere","email":"ck74real@yahoo.com","phone":"08139356162","pickUp":"Lagos","dropOff":"Abuja","mode":"air","quantity":"4","width":"67","height":"35cm","trackId":"CL71820956","status":"QUALITY CHECK","currentLocation":"Miami ","createdAt":"2022-02-18T12:58:42.962Z","updatedAt":"2022-02-18T17:53:11.928Z","__v":0},{"_id":"620f94ffb8a00334440eee73","fullName":"dddddd","email":"dddd@gmial.com","phone":"2222222222","pickUp":"ddddddd","dropOff":"ddddddd","mode":"road","quantity":"2","width":"222","height":"222","trackId":"CL98900537","status":"CONFIRMED ORDER","currentLocation":"Benin","createdAt":"2022-02-18T12:45:51.441Z","updatedAt":"2022-02-18T19:31:50.228Z","__v":0},{"_id":"620f74eae1950c86934cfc0a","fullName":"gsgsgsggsg","email":"gsgdgdg@gmail.com","phone":"09039591421","pickUp":"gdgdgddg","dropOff":"gsggdgdg","mode":"sea","quantity":"2","width":"222","height":"222","trackId":"CL36066529","status":"CONFIRMED ORDER","currentLocation":"not Yet","createdAt":"2022-02-18T10:28:58.284Z","updatedAt":"2022-02-18T10:28:58.284Z","__v":0},{"_id":"620d1e9b244c4d02728d29f2","fullName":"shopwitbee shopwitbee","email":"sixtusiwuchukwu200@gmail.com","phone":"08100371154","pickUp":"Fffff","dropOff":"Hhhhh","mode":"sea","quantity":"2","width":"22","height":"22","trackId":"CL61049933","status":"CONFIRMED ORDER","currentLocation":"not Yet","createdAt":"2022-02-16T15:56:11.688Z","updatedAt":"2022-02-16T15:56:11.688Z","__v":0},{"_id":"620ccc194a8f5f89bb851aad","fullName":"shopwitbee shopwitbee","email":"sixtusiwuchukwu25@gmail.com","phone":"08100371154","pickUp":"wuse zone6 abuja","dropOff":"maitama","mode":"air","quantity":"2","width":"333","height":"333","trackId":"CL58645960","status":"CONFIRMED ORDER","currentLocation":"not Yet","createdAt":"2022-02-16T10:04:09.011Z","updatedAt":"2022-02-16T10:04:09.011Z","__v":0}]
  axios
    // .get("https://swift-distribution-server.vercel.app/logistics/qoutes", {
    .get("http://localhost:2080/logistics/qoutes", {
      // includes:true,
      withCredentials: true,
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //        'Content-Type': 'application/json'
      // }
    })
    .then((res) => {
      if (res.status == 200) {
        let container = document.querySelector(".tb-container");
        // let node = res.data.map((item) => {
        let node = data.map((item) => {
          return `
      <tr class="table-data" id="table-row">
              <td>${item?.trackId}</td>
              <td>${item?.fullName}</td>
              <td>${item?.email}</td>
              <td>${item?.phone}</td>
              <td>${item?.quantity}</td>
              <td>${item?.width}</td>
              <td>${item?.height}</td>
              <td>${item?.dropOff}</td>
              <td>${item?.pickUp}</td>
              <td>${item?.mode}</td>
              <td>
              ${item?.status.toLowerCase()}
              </td>
              <td>${item?.currentLocation}</td>

            </tr>
`;
        }).join();
        container.innerHTML = node;
      }

      if (res.status == 408) {
        // errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href = "/adminlogin.html";
      }
      // errorResponse(`Error: ${err.message}`);
    });
  // inputs.forEach((item) => {
  //   item.value = "";
  // });
  return false;
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
      `https://swift-distribution-server.vercel.app/logistics/status?trackId=${trackId}`,
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
    .post(`https://swift-distribution-server.vercel.app/user/password`, data, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        withCredentials: true,
      },
    })
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
  
  axios
    .post(`https://swift-distribution-server.vercel.app/user/logout`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   credentials: "include",
      //   withCredentials: true,
      // },
    })
    .then((res)=>{
      if(res.status == 200){
        window.location.replace("/adminlogin.html")
      }
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 408") {
        window.location.href="/adminlogin.html"
      }
      errorResponse(`Error: ${err.message}`);
    });
};
const LocationUpdate = () => {
  let trackId = document.querySelector("#location-Id").value;
  let location = document.querySelector("#location-value").value;
  axios
    .put(
      `https://swift-distribution-server.vercel.app/logistics/location?trackId=${trackId}`,
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
