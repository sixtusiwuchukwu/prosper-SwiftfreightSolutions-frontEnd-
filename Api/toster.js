  function successResponse(message){
    let container = document.querySelector(".m-screen-reader-response")||document.querySelector(".screen-reader-response");
    container.textContent = `${message}`;
    setTimeout(() => {
        container.textContent=""
      container.classList.remove("my-quform-sucess-message");
    }, 2000);
    container.classList.add("my-quform-sucess-message");
  };
  
  
function errorResponse (message){
    let container = document.querySelector(".screen-reader-response");
    container.textContent = `${message}`;
    setTimeout(() => {
        container.textContent=""
      container.classList.remove("my-quform-error-message");
    }, 2000);
     container.classList.add("my-quform-error-message");
    
  };