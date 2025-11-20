// import {errorResponse,successResponse} from "./toster"

const HandleEnquiry = () => {
  let inputs = document.querySelectorAll(".enquireInput");
  let data = {
    name: inputs[0].value,
    emial: inputs[1].value,
    message: inputs[2].value,
  };

  successResponse("successfully Sent");
  inputs[0].value = inputs[1].value = inputs[2].value = "";
};
const HandleContact = () => {
  let inputs = document.querySelectorAll(".input1");
  inputs.forEach((item) => {
    item.value = "";
  });
  successResponse("successfully Sent");

  return false;
};
const HandleSubscription = () => {
  document.querySelector(".news").value=""

  successResponse("Your subscription has been confirmed");

  return false;
};

const HandleTrackInput = () => {
  let input = document.querySelector(".trackInput");
  console.log(input.value);
  window.location = `consignment.html?id=${input.value}`;
  input.value = "";
  return false;
};

const HandleQoute = () => {
  let inputs = document.querySelectorAll("#qoute-input");
  let data = {};
  inputs.forEach((item) => {
    const { name, value } = item;
    data = { ...data, [name]: value };
  });
  axios
    .post("https://sddlogistics.herokuapp.com/logistics/createqoute", data, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
    .then((res) => {
      if (res.status == 200) {
        let container =
          document.querySelector(".my-screen-reader-response") ||  document.querySelector(".screen-reader-response") ;
        console.log(container);
        container.style =
          "font-Size:20px;font-weight:bolder;padding-bottom:10px";
        container.textContent = ` ${res.data.message}`;
      }

      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
      }
    })
    .catch((err) => {
      errorResponse(`Error: ${err.message}`);
    });
  inputs.forEach((item) => {
    item.value = "";
  });
  return false;
};
