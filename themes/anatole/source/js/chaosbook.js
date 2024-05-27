document.addEventListener("DOMContentLoaded", function() {
    fetch('/chaosbook_list.json')
      .then(response => response.json())
      .then(files => {
        if (files.length > 0) {
          const randomFile = files[Math.floor(Math.random() * files.length)];
          fetch(`/chaosbook/posts/${randomFile}`)
            .then(response => response.text())
            .then(htmlContent => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(htmlContent, 'text/html');
              const content = doc.querySelector('.content').innerHTML;
              const contentElement = document.getElementById('random-content');
              contentElement.innerHTML = content;
              contentElement.style.marginLeft = '20px';
            });
        }
      });
  });
  