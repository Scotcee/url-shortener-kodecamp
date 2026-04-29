window.toggleMenu = function () {
  document.getElementById("mobileMenu").classList.toggle("active");
};

const input = document.getElementById("urlInput");
const button = document.getElementById("shortenButton");
const container = document.getElementById("shortenedUrls");

button.addEventListener("click", shortenLink);

function shortenLink() {
  let url = input.value.trim();

  if (!url) {
    showError("Please enter a URL");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    new URL(url);
  } catch {
    showError("Please enter a valid URL");
    return;
  }

  fetch("/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result_url) {
        addLinkToUI(url, data.result_url);
        input.value = "";
        clearError();
      } else {
        showError("Failed to shorten the URL");
      }
    })
    .catch(() => showError("An error occurred. Try again."));
}

function showError(message) {
  input.classList.add("is-invalid");
  if (!document.querySelector(".error-text")) {
    const error = document.createElement("small");
    error.className = "text-danger error-text";
    error.textContent = message;
    input.parentElement.appendChild(error);
  }
}

function clearError() {
  input.classList.remove("is-invalid");
  const error = document.querySelector(".error-text");
  if (error) error.remove();
}

function addLinkToUI(original, short) {
  const div = document.createElement("div");
  div.className =
    "result-box d-lg-flex justify-content-between align-items-center";
  div.innerHTML = `
    <p class="mb-2 mb-lg-0">${original}</p>
    <div class="d-flex flex-column flex-lg-row align-items-center gap-2">
      <a href="${short}" target="_blank" class="text-info">${short}</a>
      <button class="btn btn-sm custom-btn copy-btn">Copy</button>
    </div>
  `;
  container.prepend(div);
  div.querySelector(".copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(short);
    div.querySelector(".copy-btn").textContent = "Copied!";
  });
}
