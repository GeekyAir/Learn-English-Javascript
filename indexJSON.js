var button = document.getElementById("generate");
var input1 = document.getElementById("numberofletters");
var div = document.getElementById("div");

//load event
window.addEventListener("load", function () {
  localStorage[
    JSON.stringify(new Interactions("load", "document", getTime()).display())
  ] = "document";
});

//unload event
window.addEventListener("unload", function () {
  localStorage[
    JSON.stringify(new Interactions("unload", "document", getTime()).display())
  ] = "document";
});

//Generate button event
button.addEventListener("click", function (e) {
  div.innerHTML = "";
  if (input1.value < 1 || input1.value > 26) {
    alert("PLZ ENTER A VALID NUMBER");
    input1.value = "";
  } else {
    let value = input1.value;
    let list = randomUniqueNum(value);
    for (let i = 0; i < list.length; i++) {
      let chr = String.fromCharCode(64 + list[i]);
      div.innerHTML += `<button type = button id =${chr}>${chr}</button> `;
    }
    localStorage[
      JSON.stringify(new Interactions("click", "Generate", getTime()).display())
    ] = "Generate";
  }
});
//Get pictures out for viewing
div.addEventListener("click", function (e) {
  document.getElementById("pic_div").innerHTML = "";
  let cont = e.target.innerHTML.charCodeAt(0);
  if (cont > 64 && cont < 91) {
    let img = document.createElement("img");
    img.src = `Pics/${e.target.innerHTML}.jpg`;
    document.getElementById("pic_div").appendChild(img);
    localStorage[
      JSON.stringify(
        new Interactions("click", e.target.innerHTML, getTime()).display()
      )
    ] = e.target.innerHTML;
  }
});

//Generate random characters
function randomUniqueNum(outputCount) {
  let arr = [];
  let range = 26;
  for (let i = 1; i <= range; i++) {
    arr.push(i);
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

//Store interactions in Localstorage
function Interactions(event_type, event_target, event_time) {
  this.event_type = event_type;
  this.event_target = event_target;
  this.event_time = event_time;

  this.display = function () {
    return `${this.event_type} ${this.event_time}`;
  };
}
//Get time function
function getTime() {
  var today = new Date();
  let current_time = `${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()} , ${today.toDateString()}`;
  return current_time;
}
/*for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    if(value.equals(desired_value))
    console.log(key + " => " + value);
}
*/
