const shutdown = require('electron-shutdown-command');

function prevent(event) {
  event = event || window.event;
  event.preventDefault();
  _time();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function _time() {
  const h = document.getElementById('hour');
  const m = document.getElementById('minutes');
  const s = document.getElementById('seconds');
  const error = document.getElementById('error');
  error.style.display = 'block';
  //check if empty
  if ( h === null || m === null || s === null) {
    error.innerHTML = 'Specify an IP and a port number first!'
    error.style.display = 'block';
  } else {
    if (h.value === '') { var hours = 0}
    else { var hours = Number.parseInt(h.value);}
    if (m.value === '') { var min = 0}
    else { var min = Number.parseInt(m.value);}
    if (s.value === '') { var secs = 0}
    else { var secs = Number.parseInt(s.value);}
    if (hours === 0 & min === 0) { _h = false; }
    else { _h = true; }
    while (true) {
      if (secs === 0) {
        if (min !== 0) {
          min = min - 1;
          secs = 59;
        }
      }
      if (min === 0) {
        if (hours !== 0) {
          hours = hours - 1;
          min = 59;
        }
      }
      if (hours === 0 && _h) {
        min = 59;
        secs = 59;
        _h = false
      }
      secs = secs - 1;
      if (hours === 0 & min === 0 & secs === 0) { break }
      h.value = hours;
      m.value = min;
      s.value = secs;
      await sleep(1000);
    }
    console.log('found');
    h.value = 0;
    m.value = 0;
    s.value = 0;
    error.style.color = 'red';
    error.style.fontSize = '2rem';
    error.style.fontWeight = 'bold';
    error.style.innerHTML = 'Shutting Down....';
    error.style.display = 'block';
    shutdown.shutdown();
  }
}

