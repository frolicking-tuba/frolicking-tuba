

const loadModal = () => {
  //reference the below guide on modal form
  //http://www.the-art-of-web.com/javascript/feedback-modal-window/
  document.write(
    '<div id="modal_wrapper">'
    + '<div id="modal_window">'
    + '<div style="text-align: right;"><a id="modal_close" href="#">close <b>X</b></a></div>'
    + '<p>Complete the form below to send an email:</p>'
    + '<form id="modal_feedback" method="POST" action="#" accept-charset="UTF-8">'
    + '<p><label>Your Name<strong>*</strong><br>'
    + '<input type="text" autofocus required size="48" name="name" value=""></label></p>'
    + '<p><label>Email Address<strong>*</strong><br>'
    + '<input type="email" required title="Please enter a valid email address" size="48" name="email" value=""></label></p>'
    + '<p><label>Subject<br>'
    + '<input type="text" size="48" name="subject" value=""></label></p>'
    + '<p><label>Enquiry<strong>*</strong><br>'
    + '<textarea required name="message" cols="48" rows="8"></textarea></label></p>'
    + '<p><input type="submit" name="feedbackForm" value="Send Message"></p>'
    + '</form>'
    + '</div>'
    + '</div>'
  );
  console.log("modal loaded")
  // When the user clicks on <span> (x), close the modal

};

loadModal()


//style="display: none;z-index: 200;position: fixed;left: 50%;top: 50%;width: 360px;overflow: auto;padding: 10px 20px;background: #fff;border: 5px solid #999;border-radius: 10px;box-shadow: 0 0 10px rgba(0,0,0,0.5);"

const getSelectedText = () => {
    let text = "";
    if (typeof window.getSelection != "undefined") {
        //console.log("window",window.getSelection())
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        //console.log("document",document.selection)
        text = document.selection.createRange().text;
    }
    return text;
}

let selectedText;

const doSomethingWithSelectedText = () => {
  let text = getSelectedText()
    if ( text !== ""){
      selectedText = text
      modal_window.style.display = "block";
    };
    // if (selectedText) {
    //     console.log(selectedText)
    //     // When the user clicks on the button, open the modal
    //     modal_window.style.display = "block";
    // }
}

const checkForm = function(e) {
  let form = (e.target) ? e.target : e.srcElement;
  if(form.name.value == "") {
    alert("Please enter your Name");
    form.name.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  } else if(form.email.value == "") {
    alert("Please enter a valid Email address");
    form.email.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  } else if(form.message.value == "") {
    alert("Please enter your comment or question in the Message box");
    form.message.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  } else {
    e.preventDefault()
    return true
  }
};


// Get the modal
const modal = document.getElementById('modal_window');

// Get the <span> element that closes the modal
const closeLink = document.getElementById("modal_close");

const form = document.getElementById("modal_feedback")

//window.attachEvent("onload", modal_init);

// When the user clicks on <span> (x), close the modal
closeLink.onclick = function() {
    modal_window.style.display = "none";
    loadListeners();
}

form.onsubmit = function(e){
  if (checkForm(e)){
      console.log("submitted",selectedText)
      modal_window.style.display = "none";
      removeListener()
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal_window.style.display = "none";
        loadListeners();
    }
}

//make this an add event listener, and then remove this listener when we load modal
const loadListeners = () => {
  document.addEventListener("mouseup", doSomethingWithSelectedText);
  document.addEventListener("keyup", doSomethingWithSelectedText);
}

const removeListener = () => {
  document.removeEventListener("mouseup", doSomethingWithSelectedText);
  document.removeEventListener("keyup", doSomethingWithSelectedText);
}
loadListeners();


// document.onkeyup = doSomethingWithSelectedText;




