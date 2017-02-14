
const BASE_URL = "http://188.166.33.205/api/"

export function updateDevice(device, callback){
    let REQUEST_URL = BASE_URL + "devices/" + device._id;
    device.type = device.__t;
    fetch(REQUEST_URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device)
    }).then((response) => response.text())
        .then((responseText) => {
          console.log("Device updated");
          setTimeout(callback, 1000);
        })
        .catch((error) => {
          console.warn(error);
        });
    }

export function get(url, callback){
  let REQUEST_URL = BASE_URL + url;
  fetch(REQUEST_URL)
    .then((response) => response.json())
      .then((responseData) => {
        callback(responseData);
      })
    .done();
}
