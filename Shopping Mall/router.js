function route(pathname, handle, response, productId) {
  console.log("pathname : " + pathname);

  if (pathname === "/favicon.ico") {
    response.writeHead(204); //
    response.end();
    return;
  }

  if (typeof handle[pathname] === "function") {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Page not found");
    response.end();
  }
}

exports.route = route;
