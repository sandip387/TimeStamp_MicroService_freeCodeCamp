const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  if (!dateParam) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }
  const date = new Date(dateParam);

  if (date.toString() === "Invalid date") {
    return res.json({
      error: "Invalid Date",
    });
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

let listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
