
var zCounter = 100;
var winOffset = {
  about:   { top: -20, left: -20 },
  work:    { top:   0, left:   0 },
  contact: { top:  20, left:  20 }
};

function openWin(name) {
  var isMobile = window.innerWidth <= 768;

  if (isMobile) {
    openSheet(name);
    return;
  }

  var win = document.getElementById('win-' + name);

  /* Jika sudah terbuka, cukup bawa ke depan */
  if (win.classList.contains('active')) {
    bringFront('win-' + name);
    return;
  }
  var popupW = 580;
  var popupH = 480;
  var screenW = window.innerWidth;
  var screenH = window.innerHeight;

  var centerLeft = (screenW - popupW) / 2;
  var centerTop  = (screenH - popupH) / 2;

  var off = winOffset[name];
  win.style.left      = (centerLeft + off.left) + 'px';
  win.style.top       = Math.max(40, centerTop + off.top) + 'px';
  win.style.transform = 'none'; /* Hapus transform CSS bawaan */

  win.classList.add('active');
  bringFront('win-' + name);
  makeDrag(win, document.getElementById('winbar-' + name));
}

function closeWin(name) {
  var win = document.getElementById('win-' + name);
  win.classList.remove('active');
}

function bringFront(id) {
  zCounter++;
  document.getElementById(id).style.zIndex = zCounter;
}

function makeDrag(win, titlebar) {
  if (titlebar._dragReady) return;
  titlebar._dragReady = true;

  var dragging = false;
  var startX, startY;
  var startL, startT;

  titlebar.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('win-close')) return;
    dragging = true;

    startX = e.clientX;
    startY = e.clientY;
    win.style.transform = 'none';
    startL = win.offsetLeft;
    startT = win.offsetTop;

    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;

    var dx = e.clientX - startX;
    var dy = e.clientY - startY;

    win.style.left = (startL + dx) + 'px';
    win.style.top  = (startT + dy) + 'px';
  });

  document.addEventListener('mouseup', function() {
    dragging = false;
  });
}

var currentSheet = null;

function openSheet(name) {
  if (currentSheet) {
    document.getElementById('sheet-' + currentSheet).classList.remove('active');
  }

  document.getElementById('sheet-overlay').classList.add('active');
  document.getElementById('sheet-' + name).classList.add('active');
  currentSheet = name;
}

function closeSheet() {
  if (currentSheet) {
    document.getElementById('sheet-' + currentSheet).classList.remove('active');
    currentSheet = null;
  }
  document.getElementById('sheet-overlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
  var closeBtn = document.getElementById('close-notice');

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.getElementById('mobile-notice').style.display = 'none';
    });
  }
});

function copyEmail(el) {
  var email = 'bramantyo@tummal.my.id';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email);
  } else {

    var tmp = document.createElement('input');

    tmp.value = email;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
  }

  var tip = el.querySelector('.email-tip');
  if (tip) {
    tip.textContent = 'Copied! ✓';
    tip.style.background = '#FF9B51';
    setTimeout(function() {
      tip.textContent = 'Copy Email';
      tip.style.background = '';
    }, 1800);
  }
}
