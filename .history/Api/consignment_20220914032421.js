const GetItem = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const Id = urlParams.get("id");
  if (!Id) {
    window.location = "index.html";
  }
  document.querySelector("#trackId").textContent = Id;

  axios
    // .get(`https://swift-distribution-server.vercel.app/logistics/trackitem?trackId=${Id}`, {
    .get(`https://api.swiftfreightsolutions.ltd/logistics/trackitem?trackId=${Id}`, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        withCredentials: true,

      },
    })
    .then((res) => {
      if (res.status == 200) {
        let circle = document.querySelectorAll(".circle");
        let bar = document.querySelectorAll(".bar");
        let labels = [
          "CONFIRMED ORDER",
          "PROCESSING ORDER",
          "QUALITY CHECK",
          "DISPATCHED ITEM",
          "PRODUCT DELIVERED",
        ];
        let index = labels.indexOf(res.data.status);

        for (let i = 0; i <= index; i++) {
          if (i === index) {
            circle[i].classList.add("pg-active");
            bar[i].classList.add("pg-active");
          } else {
            circle[i].classList.add("pg-done");
            bar[i].classList.add("pg-done");
          }
        }

        document.querySelector("#mode").innerHTML = res.data.mode;
        document.querySelector("#status").innerHTML =
          res.data.status.toLowerCase();
        document.querySelector("#location").innerHTML =
          res.data.currentLocation;
      }
      if (res.status == 206) {
        errorResponse(`Error: ${res.data.message}`);
      }
    });
};

GetItem();
