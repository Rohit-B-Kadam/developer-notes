const http = require("node:http");

const PORT = 8000;
const HOSTNAME = "localhost";

const friends = [
  {
    id: 0,
    name: "Nicola Tesla"
  },
  {
    id: 1,
    name: "Isaac Newton"
  },
  {
    id: 2,
    name: "Albert Einstein"
  }
]

function friendsAPI(req, res, items) {
  res.setHeader("content-type", "application/json");
  let data = undefined
  if ( items.length === 3 ) {
    data = friends.find(value => value.id === Number(items[2]))
    if (!data) {
      res.statusCode = 404
      return
    }
  } else {
    data = friends
  }
  res.write(JSON.stringify(data));
}

function messageAPI(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h2>Good Morning,</h2>");
  res.write("<p>Hello friend, How are you?</p>");
  res.write("</body>");
  res.write("</html>");
}

const server = http.createServer((req, res) => {
  console.log(`Receive request for ${req.url}`)
  const items = req.url.split("/")

  if (items[1] === "messages") {
    messageAPI(req, res, items);
  } else if (items[1] === "friends") {
    friendsAPI(req, res, items);
  } else {
    res.statusCode = 404;
  }
  res.end();
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
