
const commandId="35219432"
function updateTalkbackCommand(newValue) {
  
  const url = `https://api.thingspeak.com/talkbacks/49040/commands/${commandId}.json`;
  const headers = { 'Content-Type': 'application/json' };
  const apiKey="NGUWA3GY2JY1XJ2B"
  
  const data = { 'api_key': apiKey, 'command_string': newValue.toString() };

  fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('Talkback command updated successfully.');
      } else {
        console.log(`Error updating talkback command. HTTP response code: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Error updating talkback command:', error);
    });
}

function onPageLoad() {

  const apiUrl="https://api.thingspeak.com/talkbacks/49040/commands/34633337.json?api_key=NGUWA3GY2JY1XJ2B";
  fetch(apiUrl)
    .then(response => {
      if (!response.ok){
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      let responseData = data;
      console.log(responseData);
      let commandString= responseData.command_string;
      if (commandString === "T1"){
        document.getElementById("LIGHTState").innerHTML = "ON";
        document.getElementById("LightImage").src="on.png";
      }
      else{
        document.getElementById("LIGHTState").innerHTML = "OFF";
        document.getElementById("LightImage").src="off.png";
      }


    })
    .catch(error => {
      console.log("Error", error);
    });

}

window.onload = onPageLoad;
