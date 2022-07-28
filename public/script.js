
function createInput(event) {
  // remove event listener
  const targetElement = event.target || event.srcElement;
  targetElement.removeEventListener("input",createInput);

  // establish correct id number
  const parentList = document.getElementById("list"); 
  const numChildren = parentList.childElementCount;
  const newName = "option" + (numChildren+1);

  // create new input element to append
  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("placeholder", "Enter Option");
  newInput.setAttribute("class", "option-input noSelect");
  newInput.setAttribute("name", newName);
  newInput.setAttribute("id", newName);


  newInput.addEventListener("input", createInput)

  parentList.appendChild(newInput);
}

const element = document.getElementById("option3");
element.addEventListener("input", createInput)