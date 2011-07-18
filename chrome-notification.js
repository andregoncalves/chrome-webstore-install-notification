(function() {
  // Configuration Parameters
  var message_html    = "<App> is now available in the Chrome Web Store"
  // Webstore install page URL
  var app_install_url = "https://chrome.google.com/webstore/detail/lnempicjilmahngopecohbcbldlijkib";
  // 24x24 App icon
  var app_icon        = "";
  var cookie          = "_webstore_preference";
  // URL for stylesheet
  var stylesheet_url  = "chrome-notification.css";
  // Analytics event tracking (or leave empty)
  var g_analytics     = ['_trackEvent', 'Web', 'Chrome-bar', 'Install'];
  // End configuration parameters


  if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Chrome') != -1) {
    var isInstalled = window.chrome && window.chrome.app && window.chrome.app.isInstalled;
    var isCancelled = document.cookie.indexOf(cookie + "=true") >= 0;

    createNotificationBar = function() {
      var container = document.createElement('div');
      container.id = "chrome-bar";
      container.style.display = "none";

      var right = document.createElement('div');
      right.className = "right";

      var button = document.createElement('button');
      button.id = "chrome-install";
      button.innerText = "Install"
      button.addEventListener('click', function() {
        if (g_analytics)
          if (window._gaq) _gaq.push(g_analytics);

        window.open(app_install_url);
        return false;
      });

      var close = document.createElement('span');
      close.innerText = "x";
      close.addEventListener('click', function() {
        container.style.display = "none";
        document.cookie = cookie + "=true";
        return false;
      });

      right.appendChild(button);
      right.appendChild(close);
      container.appendChild(right);

      var icon = document.createElement('img');
      icon.src = app_icon;
      container.appendChild(icon);

      var message = document.createElement('p');
      message.innerHTML = message_html;
      container.appendChild(message);

      document.body.insertBefore(container, document.body.childNodes[0]);
    }

    addStylesheet = function() {
      if (stylesheet_url)
      {
        var css_link = document.createElement("link");
        css_link.rel = "stylesheet";
        css_link.href = stylesheet_url;
        document.head.appendChild(css_link);
      }
    }

    animatedDisplay = function() {
      var bar = document.getElementById('chrome-bar');
      bar.style.display = "";

      window.addEventListener('load', function() {
        setTimeout(function() {
          bar.className = 'visible';
        }, 500);
      })
    }

    if (!isInstalled && !isCancelled) {
      createNotificationBar();
      addStylesheet();
      animatedDisplay();
    }
  }
})();