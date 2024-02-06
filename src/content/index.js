import { runtime } from "webextension-polyfill";

let contentData = [];

function registerClickListener(listener) {
  window.addEventListener("click", listener);

  return function cleanup() {
    window.removeEventListener("click", listener);
  };
}

function highlightShadowDOMElements(element) {
  element.style.border = "2px solid green";

  if (element.shadowRoot) {
      const shadowChildren = element.shadowRoot.querySelectorAll("*");
    shadowChildren.forEach((child) => highlightShadowDOMElements(child));
  }

  element.querySelectorAll("*").forEach((child) => {
    highlightShadowDOMElements(child);
  });
}

async function sendData(event) {
  if (document.body) {
    highlightShadowDOMElements(document.body);
    const elementDetails = {
      tagName: event.target.tagName,
      innerText: event.target.innerText.substring(0, 50)
    };
    contentData.push(elementDetails);

    return runtime.sendMessage({
      from: "content",
      to: "background",
      action: "click",
      message: contentData,
    });
  }
}

export function init() {
  registerClickListener(sendData);
}

init();
