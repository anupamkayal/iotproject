// script.js
const commandId="34633337"
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
