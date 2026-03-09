(function () {
  var bookingUrl = 'https://calendly.com/loopworker/30min';
  var query = new URLSearchParams(window.location.search);
  var sourceMeta = {
    utm_source: query.get('utm_source') || '',
    utm_medium: query.get('utm_medium') || '',
    utm_campaign: query.get('utm_campaign') || '',
    utm_content: query.get('utm_content') || '',
    referrer: document.referrer || '',
    landing_page: window.location.href
  };
  var form = document.getElementById('audit-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var email = data.get('email') || '';
      var budget = data.get('budget') || '';
      var notes = data.get('notes') || '';
      var styleName = form.getAttribute('data-style') || 'Style';

      window.open(
        bookingUrl +
          '?name=' + encodeURIComponent(name) +
          '&email=' + encodeURIComponent(email) +
          '&a1=' + encodeURIComponent(styleName) +
          '&a2=' + encodeURIComponent(sourceMeta.utm_source || 'direct') +
          '&a3=' + encodeURIComponent(sourceMeta.utm_campaign || ''),
        '_blank',
        'noopener,noreferrer'
      );

      setTimeout(function () {
        var subject = encodeURIComponent('Creative Audit Request - ' + styleName + ' - ' + name);
        var body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Style: ' + styleName + '\n' +
          'Budget: ' + budget + '\n' +
          'Notes: ' + notes + '\n\n' +
          'UTM Source: ' + sourceMeta.utm_source + '\n' +
          'UTM Medium: ' + sourceMeta.utm_medium + '\n' +
          'UTM Campaign: ' + sourceMeta.utm_campaign + '\n' +
          'UTM Content: ' + sourceMeta.utm_content + '\n' +
          'Referrer: ' + sourceMeta.referrer + '\n' +
          'Landing Page: ' + sourceMeta.landing_page
        );
        window.location.href = 'mailto:alex@loopworker.com?subject=' + subject + '&body=' + body;
      }, 240);
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-image');
  document.querySelectorAll('.js-lightbox').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightbox.classList.add('open');
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox) {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }
  });
})();
