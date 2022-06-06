function makeCustomPopup(popup_id, title, message) {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName === 'Escape') {
            window.location.href='#';
        }
    });

    let $popup = $('#popup-window');
    let popup = '';

    popup += `
          <div id="${popup_id}" class="overlay">
            <div class="popup">
              <h2>${title}</h2>
              <a class="close" href="#">&times;</a>
              <div class="content">
                <p>${message}</p>
              </div>
            </div>
          </div>
        `;

    $popup.html(popup);
}

function showCustomPopup(popup_id, title, message) {
    makeCustomPopup(popup_id, title, message);
    window.location.href=`#${popup_id}`;
}

