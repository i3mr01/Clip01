const platforms = document.querySelectorAll('.platform');
const formats = document.querySelectorAll('.format');
const qualities = document.querySelectorAll('.quality');
const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');

// Change active platform
platforms.forEach(platform => {
  platform.addEventListener('click', () => {
    platforms.forEach(p => p.classList.remove('active'));
    platform.classList.add('active');
  });
});

// well, maybe this time you'll hurt like i do...

// Change active format
formats.forEach(format => {
  format.addEventListener('click', () => {
    formats.forEach(f => f.classList.remove('active'));
    format.classList.add('active');
  });
});

// Change active quality
qualities.forEach(quality => {
  quality.addEventListener('click', () => {
    qualities.forEach(q => q.classList.remove('active'));
    quality.classList.add('active');
  });
});

// Download video
searchButton.addEventListener('click', () => {
  const platform = document.querySelector('.platform.active').dataset.platform;
  const format = document.querySelector('.format.active').dataset.format;
  const quality = document.querySelector('.quality.active').dataset.quality;
  const url = searchBar.value.trim();

  if (!url) {
    alert('Please paste a valid video URL.');
    return;
  }

  fetch('/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ platform, format, quality, url }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = data.download_url;
      } else {
        alert(data.message || 'Failed to download.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    });
});