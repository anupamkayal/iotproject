const channelID = 2164453;
const writeAPIKey = 'QLM652PWKM5IGNE2';
const readAPIKey = 'AUUB7CPMCTROMWTZ';
const fieldNo = 1;
const fieldNumber = 2;
function fetchButtonValues() {

const apiUrl = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNumber}.json?results=1&api_key=${readAPIKey}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const latestEntry = data[0];
        buttonValue = parseInt(latestEntry.field2);
        console.log('Latest value:', buttonValue);
      } else {
        console.log('No data available.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



 
// Define another function that uses the latest values
function light_on() {
  fetchButtonValues()
    .then(buttonValue => {
      if (buttonValue !== null) {
        console.log(`Latest value in Field ${fieldNumber}: ${buttonValue}`);
        if (buttonValue == 0) {
       // update the server value to 1
          const apiUrl = `https://api.thingspeak.com/update.json`;
          const formData = new URLSearchParams();
          formData.append('api_key', writeAPIKey);
          formData.append(`field${fieldNo}`, 1);
          fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data && data.created_at) {
                console.log('Value written successfully:', 1);
              } else {
                console.log('Failed to write value.');
              }
            })

            .catch(error => {
              console.error('Error writing value:', error);
            });

        }
        else {

          const apiUrl = `https://api.thingspeak.com/update.json`;
          const formData = new URLSearchParams();
          formData.append('api_key', writeAPIKey);
          formData.append(`field${fieldNo}`, 0);
          fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data && data.created_at) {
                console.log('Value written successfully:', 0);
              } else {
                console.log('Failed to write value.');
              }
            })
            .catch(error => {
              console.error('Error writing value:', error);
            });

        }
        


      } //main if function end
      else {
        console.log(`No data available for Field ${fieldNumber}.`);
      }

     
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

function light_off() {
  fetchButtonValues()
    .then(buttonValue => {
      if (buttonValue !== null) {
        console.log(`Latest value in Field ${fieldNumber}: ${buttonValue}`);
        if (buttonValue == 0) {
       // update the server value to 1
          const apiUrl = `https://api.thingspeak.com/update.json`;
          const formData = new URLSearchParams();
          formData.append('api_key', writeAPIKey);
          formData.append(`field${fieldNo}`, 0);
          fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data && data.created_at) {
                console.log('Value written successfully:', 0);
              } else {
                console.log('Failed to write value.');
              }
            })

            .catch(error => {
              console.error('Error writing value:', error);
            });

        }

        else {
          const apiUrl = `https://api.thingspeak.com/update.json`;
          const formData = new URLSearchParams();
          formData.append('api_key', writeAPIKey);
          formData.append(`field${fieldNo}`, 1);
          fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data && data.created_at) {
                console.log('Value written successfully:', 1);
              } else {
                console.log('Failed to write value.');
              }
            })
            .catch(error => {
              console.error('Error writing value:', error);
            });

        }

        


      }
      else {
        console.log(`No data available for Field ${fieldNumber}.`);
      }


    })
    .catch(error => {
      console.error('Error:', error);
    });


}

function fatchServerData(){
  const apiUrl1 = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNo}.json?results=1&api_key=${readAPIKey}`;
  const apiUrl2 = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNumber}.json?results=1&api_key=${readAPIKey}`;
  return Promise.all([
    fetch(apiUrl1).then(response => response.json()),
    fetch(apiUrl2).then(response => response.json())
  ])
  .then(([data1, data2]) => {
    serverValue = data1 && data1.length > 0 ? parseInt(data1[0].field1) : null;
    buttonState = data2 && data2.length > 0 ? parseInt(data2[0].field2) : null;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


}


function onPageLoad() {
  fatchServerData().then(() => {
  // Ensure that the fetch has completed before using the values
  if (serverValue !== null && buttonState !== null) {
    console.log(`Latest value in Field ${fieldNo}: ${serverValue}`);
    console.log(`Latest value in Field ${fieldNumber}: ${buttonState}`);
    if (serverValue == buttonState){
      document.getElementById("LIGHTState").innerHTML = "OFF";
      document.getElementById("LightImage").src="off.png";
    }
    else{
      document.getElementById("LIGHTState").innerHTML = "ON";
      document.getElementById("LightImage").src="on.png";

    }
  } 
  else {
    console.log('Data not available yet.');
  }
  });

}

window.onload = onPageLoad;


