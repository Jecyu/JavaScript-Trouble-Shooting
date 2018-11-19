/**
 * fetch api 返回一个 Promise
 */

fetch("http://example.com/movies.json")
  .then(response => {
    return response.json();
  })
  .then(myJson => {
    console.log(JSON.stringify(myJson));
  })
  .catch(err => console.log("catch err", err));
