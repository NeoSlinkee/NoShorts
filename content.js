function hideShorts() {
    const selectors = [
      // Shorts shelf on the home page
      "ytd-reel-shelf-renderer",
      'ytd-rich-section-renderer[section-identifier="shorts"]',
  
      // Shorts items in feeds
      "ytd-reel-item-renderer",
  
      // Shorts links in side nav / mini nav
      "ytd-guide-entry-renderer a[href^=\"/shorts\"]",
      "ytd-mini-guide-entry-renderer a[href^=\"/shorts\"]",
  
      // Any direct Shorts links in grids and carousels
      "a[href^=\"/shorts\"]"
    ];
  
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        let target = el;
  
        // If it is a link, hide the container card, not only the link
        if (target.tagName === "A") {
          target =
            target.closest(
              "ytd-guide-entry-renderer," +
              "ytd-mini-guide-entry-renderer," +
              "ytd-rich-item-renderer," +
              "ytd-video-renderer," +
              "ytd-grid-video-renderer"
            ) || target;
        }
  
        target.style.display = "none";
      });
    });
  }
  
  // Block direct Shorts pages (optional)
  // Comment this out if you do not want redirects
  function blockDirectShorts() {
    if (location.pathname.startsWith("/shorts")) {
      // Redirect to YouTube home or whatever you prefer
      location.replace("https://www.youtube.com/");
    }
  }
  
  hideShorts();
  blockDirectShorts();
  
  // Watch for SPA navigation and dynamically loaded content
  const observer = new MutationObserver(() => {
    hideShorts();
    blockDirectShorts();
  });
  
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
  