const channelID = 2164453;
const writeAPIKey = 'QLM652PWKM5IGNE2';
const readAPIKey = 'AUUB7CPMCTROMWTZ';
const fieldNo = 1;

// Function to show the snackbar with a message
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.classList.remove("hidden");
  snackbar.classList.add("show");
  
  // Hide the snackbar after a delay
  setTimeout(function() {
    snackbar.classList.remove("show");
    snackbar.classList.add("hidden");
  }, 3000); // Adjust the delay as needed (in milliseconds)
}



 
// Define another function that uses the latest values
function light_on() {
  fetchCommandData()
    .then(commandString => {
      if (commandString !== null) {
        console.log(`Latest value in buttonState: ${commandString}`);
        if (commandString == 0) {
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
                location.reload();
              } else {
                
                // Display the error message as a toast notification
                showSnackbar("An error occurred please wait some second & then refresh ");
                console.log('Failed to write value.');
              }
            })

            .catch(error => {
              showSnackbar("An error occurred please wait some second & then refresh ");
              console.error('Error writing value:', error.message);
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
                location.reload();
              } else {
               
                // Display the error message as a toast notification
                showSnackbar("An error occurred please wait some second & then refresh ");
                console.log('Failed to write value.');
              }
            })
            .catch(error => {
              
              // Display the error message as a toast notification
             // Show the error message using the snackbar
              showSnackbar("An error occurred please wait some second & then refresh ");
              console.error('Error writing value:', error);
            });

        }
        


      } //main if function end
      else {
        console.log(`No data available for buttonState.`);
        showSnackbar("An error occurred please wait some second & then refresh ");
      }

     
    })
    .catch(error => {
      
      showSnackbar("An error occurred please wait some second & then refresh ");
      console.error('Error:', error);
    });

}

function light_off() {
  fetchCommandData()
    .then(commandString => {
      if (commandString !== null) {
        console.log(`Latest value in Field ${fieldNo}: ${commandString}`);
        if (commandString == 0) {
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
                location.reload();
              } else {
                
                // Display the error message as a toast notification
               showSnackbar("An error occurred please wait some second & then refresh ");
               console.log('Failed to write value.');
              }
            })

            .catch(error => {
              
              showSnackbar("An error occurred please wait some second & then refresh ");
              console.error('Error writing value:', error.message);
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
                location.reload();
              } 
              else {
                
                // Display the error message as a toast notification
                showSnackbar("An error occurred please wait some second & then refresh ");
                console.log('Failed to write value.');
              }
            })
            .catch(error => {
             
              // Show the error message using the snackbar
              showSnackbar("An error occurred please wait some second & then refresh ");
              console.error('Error writing value:', error.message);
            });

        }

        


      }
      else {
        console.log(`No data available for buttonState`);
        showSnackbar("An error occurred please wait some second & then refresh ");
      }


    })
    .catch(error => {
      showSnackbar("An error occurred please wait some second & then refresh ");
      console.error('Error:', error);
    });


}

async function fetchServerData() {
  try {
    const apiUrl1 = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNo}.json?results=1&api_key=${readAPIKey}`;
    
    const [response1, response2] = await Promise.all([
      fetch(apiUrl1),
      fetchCommandData() // Call the function to fetch command data
    ]);

    const data1 = await response1.json();
    

    const serverValue = data1.feeds[0][`field${fieldNo}`];
    
    return { serverValue, commandString: response2 };
  } 
  catch (error) {
      
      showSnackbar("An error occurred please wait some second & then refresh ");
      console.error('Error fetching data:', error);   
  }
}

async function fetchCommandData() {
  try {
  const allCommandsUrl = `https://api.thingspeak.com/talkbacks/49636/commands.json?api_key=MXC1RWFOWJPUIZSH`;
  const response = await fetch(allCommandsUrl);
  const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    const firstCommand = data[0];
    const commandString = firstCommand.command_string;

    
    return commandString;
  } else {
    console.log("No commands found in the response or unexpected response structure.");
    console.error('Error fetching data:', error);  
  }
} catch (error) {
  console.error('Error fetching data:', error);  
  console.error("Error fetching command data:", error);
}

}

async function onPageLoad() {
  try {
    const { serverValue, commandString } = await fetchServerData();
    console.log("Server Value:", serverValue);
    console.log("Command String:", commandString);
    if (serverValue !== null && commandString !== null) {
    console.log(`Latest value in Field ${fieldNo}: ${serverValue}`);
    console.log(`Latest value in talkbacks buttonState: ${commandString}`);
    if (serverValue == commandString){
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
    showSnackbar("An error occurred please wait some second & then refresh ");
  }
  } 
  catch (error) {
    
    showSnackbar("An error occurred please wait some second & then refresh ");
    console.error("Error:", error);
  }
}

window.onload = onPageLoad;


