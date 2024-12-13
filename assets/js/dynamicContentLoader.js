const q = new URLSearchParams(window.location.search);
const s = q.get('s');
const p = q.get('p');
const t = q.get('t');
const h = q.get('h');
const u = q.get('u');

document.addEventListener('DOMContentLoaded', () => {
  if (s === '0') {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.display = 'none';
  }

  let found = false;
  document.querySelectorAll('article').forEach(article => {
    if (article.dataset.page === p) {
      article.classList.add('active');
      found = true;
      if (t) {
        const title = article.querySelector('#customTitle');
        if (title) title.textContent = decodeURIComponent(t);
      }
    } else {
      article.classList.remove('active');
    }
  });

  if (!found) {
    const defaultArticle = document.querySelector('article[data-page="about"]');
    if (defaultArticle) defaultArticle.classList.add('active');
  }

if (u) {
  document.getElementById('errorPath').innerHTML = u;
  alert(u);
}

  
  //Make yours!! Decryption -max -id45695 SE.key M$X142@1324
  if (h) {
    try {
      const decrypted = CryptoJS.AES.decrypt(h, 'utf8').toString(CryptoJS.enc.Utf8);
      const decompressed = LZString.decompressFromBase64(decrypted);
      document.getElementById('contentArea').innerHTML = decompressed || '<p>Error decoding content.</p>';
    } catch {
      document.getElementById('contentArea').innerHTML = '<p>Error decoding content.</p>';
    }
  } else {
    document.getElementById('contentArea').innerHTML = '<p>No HTML content found in the URL.</p>';
  }
});

//Make yours!! Encryption -max -id12515
document.getElementById('cook').addEventListener('click', function () {
  const input = document.getElementById('htmlInput').value;
  const pageTitle = document.getElementById('pageTitle').value;
  if (!input) {
    alert('Enter HTML content');
    return;
  }
  const currentUrl = window.location.origin + window.location.pathname;
  const compressed = LZString.compressToBase64(input);
  const encrypted = CryptoJS.AES.encrypt(compressed, 'utf8').toString();
  const url = `${(currentUrl)}?p=1&t=${encodeURIComponent(pageTitle)}&h=${encodeURIComponent(encrypted)}`;
  document.getElementById("cook").style.display = "none";
  document.getElementById("preview").style.display = "flex";
  document.getElementById("share").style.display = "flex";
  document.getElementById('output').value = url;
  document.getElementById("preview").addEventListener("click", openPreview);
  document.getElementById("share").addEventListener("click", share);
  function openPreview() { window.open(url, "_blank"); }
function share() {
if (navigator.share) {
  navigator.share({
    title: 'This link holds something incredible. Dont wait, check it out now!',
    text: 'Something amazing is waiting for you. Open now!',
    url: url
  }).then(() => {
    console.log('Share was successful');
  }).catch((error) => {
    console.log('Error sharing:', error);
  });
} else {
  copyToClipboard(url);
  alert('Link copied to clipboard! You can now paste it anywhere to share.');
}
function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
}
});
