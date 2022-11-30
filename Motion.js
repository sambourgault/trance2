var x, y, z;

window.addEventListener('devicemotion', function(e) 
{ 
  x = parseFloat(e.acceleration.x).toFixed(3);
  y = parseFloat(e.acceleration.y).toFixed(3);
  z = parseFloat(e.acceleration.z).toFixed(3); 

  console.log("(", x, ", ", y, ", ", z, ") \n");
});

window.addEventListener('click', function()
{
  
} );

function getPerm(){
  DeviceMotionEvent.requestPermission()
}

window.onload = function() {
  var xebraState = new Xebra.State({
    hostname: "192.168.0.145",
    port: 8086,
    supported_objects: Xebra.SUPPORTED_OBJECTS, 
    auto_connect: false,
    supported_objects: ["button"]
  });
  xebraState.connect();

  function updateObj(object){
    if (object.getParamValue("varname") === "slider") {
      console.log("success");
    }
  }

  // Do something when a button gets added to the Max patcher
  xebraState.on("object_added", function(object) {
    if (object.type === "button") addHTMLButton(object);
});

// Do something when a button is removed
xebraState.on("object_removed", function(object) {
    if (object.type === "button") removeHTMLButton(object);
});

  xebraState.on("object_added", updateObj);

  xebraState.on("object_changed", updateObj);

  function resetPatcher() {
    var patcher = xebraState.getPatchers(); // Assuming it's the first patcher
    console.log(patcher);
    var object = xebraState.getObjectsByScriptingName("slider");
    console.log(object);
    if (object) {
        object.setParamValue("value", 75);
    }

  }

  var slider;
  slider.setParamValue("value", 72);
  resetPatcher();
}

function addHTMLButton(object) {
  var newButton = document.createElement("button");
  newButton.id = "button-" + object.id;
  newButton.onmousedown = function() {
      object.setParamValue("value", 1);
  };
  newButton.onmouseup = function() {
      object.setParamValue("value", 0);
  };
  newButton.appendChild(document.createTextNode("Button " + object.id));
  document.getElementById("container").appendChild(newButton);
}







