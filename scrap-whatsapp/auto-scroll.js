// AI Generated
// Reference -
// https://chat.deepseek.com/a/chat/s/28777e42-a771-482b-b233-af8ea924856c

function autoScrollWithInfiniteLoad(
  modalContent,
  callbackFn,
  scrollSpeed = 100,
) {
  let scrolling = true;
  let scrollInterval;

  // Create observer to detect new content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        // console.log("New content loaded, continuing scroll");
        // New content added, ensure we keep scrolling
        if (scrolling) {
          scrollToBottom();
        }
      }
    });
  });

  // Configure observer
  observer.observe(modalContent, {
    childList: true,
    subtree: true,
  });

  function scrollToBottom() {
    callbackFn();
    if (!scrolling) return;

    modalContent.scrollBy({
      top: scrollSpeed,
      behavior: "smooth",
    });
  }

  function start() {
    scrolling = true;
    scrollInterval = setInterval(scrollToBottom, 20);
  }

  function stop() {
    scrolling = false;
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    observer.disconnect();
  }

  return { start, stop };
}

// Usage
modalClass =
  ".x1n2onr6.x1n2onr6.xupqr0c.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x6ikm8r.x1odjw0f.x1hc1fzr.x1anedsm.x1280gxy";
modalContent = document.querySelector(modalClass);
autoScroll = autoScrollWithInfiniteLoad(
  modalContent,
  GrabWhatsAppGroupParticipantsNumbers,
);

// In case of failure
// autoScrollWithInfiniteLoad(document.querySelector(modalClass), GrabWhatsAppGroupParticipantsNumbers)
autoScroll.start();

// To stop later
// autoScroll.stop();
