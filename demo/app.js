const apiKey = "&appid=${Enter Own Code Here}";
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=";
let d = new Date();

document.getElementById("generate").addEventListener("click", doSomeThing);

// function do Every thing in this code
function doSomeThing() {
  const zip = document.getElementById("zip").value;
  getWeather(baseUrl, zip, apiKey)
    .then(handelData)
    .then(retrieveData)
    .then(emptyInputs)
    .catch(handelError);
}
// function doSomeThing() {
//   const zip = document.getElementById("zip").value;
//   getWeather(baseUrl, zip, apiKey)
//     .then(handelData)
//     .then(retrieveData)
//     .then(emptyInputs);
// }

// Get the weather data by zip code
const getWeather = async (baseUrl, code, key) => {
  const response = await fetch(baseUrl + code.toString() + key);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

// send the data to local server
const putData = async (url, data) => {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const request = await fetch(url, options);
  try {
    const newData = await request.json();
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

// get the data form local server
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    // message
    console.log(allData);
    // udate ui
    updateUI(allData);
  } catch (error) {
    console.log("error", error);
  }
};

// update elements in ui
function updateUI(allData) {
  document.getElementById("temp").innerHTML = `${Math.round(
    allData.temp
  )} Degree`;
  document.getElementById("content").innerHTML = `${allData.feel}`;
  document.getElementById("date").innerHTML = `${allData.date}`;
}

// handel the data and errors if user put invalid zip code
function handelData(data) {
  const fellings = document.getElementById("feelings").value;
  document.querySelector("h1").innerHTML = "";
  formatedData = {
    temp: data.list[0].main.temp,
    date: d,
    feel: fellings,
  };
  putData("/all", formatedData);
}

// it just empty the inputs after submitting
function emptyInputs() {
  document.getElementById("zip").value = "";
  document.getElementById("feelings").value = "";
}

function handelError() {
  document.querySelector("h1").innerHTML = "Please, Enter A Valid ZIP Code";
  document.getElementById("temp").innerHTML = ``;
  document.getElementById("content").innerHTML = ``;
  document.getElementById("date").innerHTML = ``;
}
