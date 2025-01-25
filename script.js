function generateRequestId() {
  // Generate a unique request ID
  // First, a date string like YYYYMMDD
  const now = new Date();
  const month =
    now.getMonth() < 10
      ? `0${now.getMonth() + 1}`
      : (now.getMonth() + 1).toString();
  const day =
    now.getDate() < 10 ? `0${now.getDate()}` : now.getDate().toString();
  const formattedDate = `${now.getFullYear()}${month}${day}`;

  // Then, a zero-padded random number between 0 and 1000
  const randomNumber = Math.round(Math.random() * 1000);
  const randomBit =
    randomNumber < 10
      ? `00${randomNumber}`
      : randomNumber < 100
      ? `0${randomNumber}`
      : randomNumber.toString();

  return `${formattedDate}${randomBit}`;
}

function parseQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return Object.fromEntries(urlParams.entries());
}

function param(name) {
  const params = parseQueryString();
  return params[name];
}

function withSelector(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    return callback(element);
  }

  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetch request ID from local storage, if any
  const shouldGenerateNewRequestId = document.getElementById('request-id');
  const requestId = shouldGenerateNewRequestId
    ? generateRequestId()
    : localStorage.getItem("request-id");
  localStorage.setItem("request-id", requestId);

  withSelector("#request-id", (el) => { el.value = requestId });
  withSelector("#reason", (el) => { el.textContent = requestId });
  withSelector("#subject", (el) => { el.value += ` ID ${requestId}`; });
});
