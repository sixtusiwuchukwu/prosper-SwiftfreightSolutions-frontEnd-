// import {errorResponse,successResponse} from "./toster"

const HandleEnquiry = () => {
  let inputs = document.querySelectorAll(".enquireInput");
  let data = {
    name: inputs[0].value,
    email: inputs[1].value,
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
  document.querySelector(".wpcf7-submit").value = "proccessing..."

  axios
    // .post("https://swift-distribution-server.onrender.com/logistics/createqoute", data, {
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

function closeModal() {
  const modal = document.getElementById('modal');

  modal.classList.remove('show');
}

window.addEventListener('click',   
  (event) => {
     if (event.target == modal) {
         closeModal();   
 
     }
 });
