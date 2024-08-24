const mariadb = require("./database/connect/mariadb");
const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");

async function main(response) {
  console.log("main");

  let conn;
  try {
    conn = await mariadb.getConnection();
    const rows = await conn.query("SELECT * FROM product");
    console.log(rows);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(main_view);
    response.write(JSON.stringify(rows));
  } catch (err) {
    console.error(err);
    response.writeHead(500, { "Content-Type": "text/html" });
    response.write("Database error");
  } finally {
    if (conn) conn.end();
    response.end();
  }
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Error loading image");
      response.end();
      return;
    }

    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Error loading image");
      response.end();
      return;
    }

    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Error loading image");
      response.end();
      return;
    }

    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      " , '" +
      new Date().toLocaleDateString +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write("order page");
  response.end();
}

let handle = {};
handle["/"] = main;
handle["/order"] = order;

handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
