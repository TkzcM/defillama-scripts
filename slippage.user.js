// ==UserScript==
// @name         DefiLlama Slippage Changer
// @namespace    https://github.com/TkzcM
// @version      0.1
// @description  Change Slippage
// @author       Tkzc
// @match        https://swap.defillama.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=defillama.com
// @grant        none
// @run-at document-idle
// ==/UserScript==

const SLIPPAGE_VALUE = '0.05';

(function () {
  "use strict";
  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById("__next");

  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      mutation.addedNodes.forEach(function (added_node) {
        console.log(added_node);
        if (added_node.innerHTML.includes("Custom")) {
          console.log("slippage has been added");
          var input = document.getElementsByTagName("input")[4];
          if (input.placeholder == "Custom") {
            setNativeValue(input, SLIPPAGE_VALUE);
          }
          observer.disconnect();
        }
      });
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
})();
