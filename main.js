document.querySelector(".cool-button").addEventListener("click", () => {
  document.querySelector("#click-count-display").textContent = parseInt(document.querySelector("#click-count-display").textContent) + 1
})

document.querySelectorAll(".main-nav a").forEach(el => {
  el.addEventListener("click", handleNavClick)
})

async function handleNavClick(e) {
  e.preventDefault()
  makeActiveAndFetchContent(e.target)
  history.pushState(e.target.href, null, e.target.href)
}

// handle the on back button pop state event
window.addEventListener("popstate", function (e) {
  document.querySelectorAll(".main-nav a").forEach(async el => {
    if (e.state == el.href) {
      makeActiveAndFetchContent(el)
    }
  })

})

async function makeActiveAndFetchContent(x) {
  document.querySelectorAll(".main-nav a").forEach(el => el.classList.remove("active"))
  x.classList.add("active")

  const thePromise = await fetch(x)
  const theData = await thePromise.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(theData, 'text/html')
  document.querySelector(".content-area").innerHTML = doc.querySelector(".content-area").innerHTML
}