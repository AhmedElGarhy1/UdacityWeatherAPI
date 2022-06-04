const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static("demo"));

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

let projectData = {};

app.post("/all", getData);

app.get("/all", sendData);

function getData(req, res) {
  projectData = req.body;
  console.log(projectData);
}
function sendData(req, res) {
  res.send(projectData);
}
