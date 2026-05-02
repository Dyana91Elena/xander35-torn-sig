const { Resvg } = require('@resvg/resvg-js');
 
module.exports = async (req, res) => {
  try {
    const apiKey = process.env.TORN_API_KEY;
    const response = await fetch(
      `https://api.torn.com/user/?selections=profile&key=${apiKey}`
    );
    const data = await response.json();
 
    const level = data.level || '??';
    const name = data.name || 'Xander35';
    const statusRaw = data.last_action?.status || 'Offline';
    const isOnline = statusRaw === 'Online';
    const isIdle = statusRaw === 'Idle';
    const statusText = isOnline ? 'ONLINE' : isIdle ? 'IDLE' : 'OFFLINE';
    const statusColor = isOnline ? '#00ff88' : isIdle ? '#ffaa00' : '#ff4444';
    const dotAlt = isOnline ? '#00cc66' : isIdle ? '#cc8800' : '#cc2222';
 
    const svg = `<svg viewBox="0 0 600 220" width="600" height="220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020d14"/>
      <stop offset="100%" stop-color="#010810"/>
    </linearGradient>
    <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00ccff"/>
    </linearGradient>
    <linearGradient id="topLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset="30%" stop-color="#00ff88"/>
      <stop offset="70%" stop-color="#0099ff"/>
      <stop offset="100%" stop-color="#0099ff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="divV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset="50%" stop-color="#00ff88" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="avGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.6" fill="#00ff44" fill-opacity="0.18"/>
    </pattern>
    <clipPath id="avClip"><circle cx="90" cy="110" r="72"/></clipPath>
    <clipPath id="card"><rect width="600" height="220" rx="12"/></clipPath>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <g clip-path="url(#card)">
    <rect width="600" height="220" fill="url(#bg)"/>
    <rect width="600" height="220" fill="url(#dots)"/>
    <rect width="186" height="220" fill="#010c15" fill-opacity="0.7"/>
    <rect x="0" y="0" width="600" height="2.5" fill="url(#topLine)"/>
    <rect x="0" y="217.5" width="600" height="2.5" fill="url(#topLine)"/>
    <line x1="4" y1="4" x2="36" y2="4" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="4" y1="4" x2="4" y2="36" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="596" y1="4" x2="564" y2="4" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="596" y1="4" x2="596" y2="36" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="4" y1="216" x2="36" y2="216" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="4" y1="216" x2="4" y2="184" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="596" y1="216" x2="564" y2="216" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="596" y1="216" x2="596" y2="184" stroke="#00ff88" stroke-width="1.5" stroke-opacity="0.7"/>
    <circle cx="90" cy="110" r="80" fill="url(#avGlow)"/>
    <circle cx="90" cy="110" r="74" fill="none" stroke="#00ff88" stroke-width="1.2" stroke-dasharray="6 4" stroke-opacity="0.45"/>
    <circle cx="90" cy="110" r="72" fill="#0b1e2c"/>
    <g clip-path="url(#avClip)">
      <rect x="20" y="172" width="140" height="70" rx="14" fill="#0c1f30"/>
      <path d="M20,178 Q54,150 90,147 Q126,150 160,178" fill="none" stroke="#0099ff" stroke-width="2" stroke-opacity="0.45"/>
      <rect x="73" y="148" width="34" height="28" fill="#182e3c"/>
      <rect x="48" y="52" width="84" height="100" rx="16" fill="#182e3c"/>
      <rect x="48" y="40" width="84" height="28" rx="10" fill="#0a1620"/>
      <rect x="42" y="52" width="18" height="50" rx="7" fill="#0a1620"/>
      <rect x="118" y="52" width="18" height="50" rx="7" fill="#0a1620"/>
      <path d="M42,88 Q32,88 32,100 L32,118 Q32,126 40,126 L48,126" fill="none" stroke="#0088cc" stroke-width="5" stroke-linecap="round"/>
      <path d="M138,88 Q148,88 148,100 L148,118 Q148,126 140,126 L132,126" fill="none" stroke="#0088cc" stroke-width="5" stroke-linecap="round"/>
      <rect x="28" y="102" width="17" height="22" rx="5" fill="#002a44" stroke="#0099cc" stroke-width="1.2"/>
      <rect x="135" y="102" width="17" height="22" rx="5" fill="#002a44" stroke="#0099cc" stroke-width="1.2"/>
      <rect x="58" y="90" width="28" height="20" rx="4" fill="#001408"/>
      <rect x="94" y="90" width="28" height="20" rx="4" fill="#001408"/>
      <rect x="62" y="94" width="9" height="9" rx="2" fill="#00ff88" opacity="0.92"/>
      <rect x="98" y="94" width="9" height="9" rx="2" fill="#00ff88" opacity="0.92"/>
      <rect x="73" y="96" width="7" height="5" rx="1" fill="#00ff88" opacity="0.5"/>
      <rect x="109" y="96" width="7" height="5" rx="1" fill="#00ff88" opacity="0.5"/>
      <rect x="55" y="87" width="34" height="26" rx="5" fill="none" stroke="#0099ff" stroke-width="1.6" stroke-opacity="0.7"/>
      <rect x="91" y="87" width="34" height="26" rx="5" fill="none" stroke="#0099ff" stroke-width="1.6" stroke-opacity="0.7"/>
      <line x1="89" y1="100" x2="91" y2="100" stroke="#0099ff" stroke-width="1.6" stroke-opacity="0.7"/>
      <rect x="68" y="130" width="44" height="3.5" rx="2" fill="#00ff88" fill-opacity="0.65"/>
      <text x="90" y="200" text-anchor="middle" font-family="monospace" font-size="9" fill="#00ff88" fill-opacity="0.55">&lt;Xander35/&gt;</text>
    </g>
    <circle cx="148" cy="168" r="8" fill="#010c15"/>
    <circle cx="148" cy="168" r="6" fill="${statusColor}"/>
    <circle cx="148" cy="168" r="3" fill="${dotAlt}"/>
    <line x1="186" y1="18" x2="186" y2="202" stroke="url(#divV)" stroke-width="1"/>
    <text x="208" y="60" font-family="monospace" font-size="28" font-weight="bold" letter-spacing="4" fill="url(#nameGrad)">${name.toUpperCase()}</text>
    <rect x="208" y="65" width="340" height="1.5" fill="url(#topLine)" fill-opacity="0.5"/>
    <rect x="208" y="76" width="136" height="20" rx="10" fill="#001a0a" stroke="#00ff88" stroke-width="0.9" stroke-opacity="0.65"/>
    <text x="276" y="90" text-anchor="middle" font-family="monospace" font-size="9" fill="#00ff88">SYS. ENGINEER</text>
    <rect x="354" y="76" width="130" height="20" rx="10" fill="#001133" stroke="#0099ff" stroke-width="0.9" stroke-opacity="0.65"/>
    <text x="419" y="90" text-anchor="middle" font-family="monospace" font-size="9" fill="#0099ff">FULL-STACK DEV</text>
    <text x="208" y="120" font-family="monospace" font-size="9" fill="#00ff88" fill-opacity="0.45">$</text>
    <text x="222" y="120" font-family="monospace" font-size="9" fill="#7799aa">stack &gt;</text>
    <text x="265" y="120" font-family="monospace" font-size="9" fill="#00ccff">Python · Linux · Docker · SQL · Git</text>
    <text x="208" y="137" font-family="monospace" font-size="9" fill="#00ff88" fill-opacity="0.45">$</text>
    <text x="222" y="137" font-family="monospace" font-size="9" fill="#7799aa">focus &gt;</text>
    <text x="265" y="137" font-family="monospace" font-size="9" fill="#ccddee">Networking · Security · Automation</text>
    <text x="208" y="154" font-family="monospace" font-size="9" fill="#00ff88" fill-opacity="0.45">$</text>
    <text x="222" y="154" font-family="monospace" font-size="9" fill="#7799aa">status &gt;</text>
    <circle cx="276" cy="150" r="4" fill="${statusColor}"/>
    <text x="286" y="154" font-family="monospace" font-size="9" fill="${statusColor}">${statusText}</text>
    <rect x="340" y="143" width="85" height="18" rx="9" fill="#001a0a" stroke="#00ff88" stroke-width="0.9" stroke-opacity="0.35"/>
    <text x="352" y="155" font-family="monospace" font-size="9" fill="#7799aa">lvl:</text>
    <text x="374" y="155" font-family="monospace" font-size="9" font-weight="bold" fill="#ffaa44">${level}</text>
    <rect x="208" y="170" width="196" height="22" rx="11" fill="#020d14" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.35"/>
    <text x="218" y="184" font-family="monospace" font-size="8" fill="#00ff88" fill-opacity="0.45">torn.id</text>
    <line x1="245" y1="174" x2="245" y2="188" stroke="#00ff88" stroke-width="0.6" stroke-opacity="0.3"/>
    <text x="252" y="184" font-family="monospace" font-size="8" fill="#00ccff">#4276245 · ${name}</text>
    <rect x="406" y="106" width="170" height="92" rx="7" fill="#010c14" stroke="#00ff44" stroke-width="0.5" stroke-opacity="0.25"/>
    <rect x="406" y="106" width="170" height="17" rx="7" fill="#0a1a20"/>
    <rect x="406" y="116" width="170" height="7" fill="#0a1a20"/>
    <circle cx="419" cy="114.5" r="4" fill="#ff5f56" fill-opacity="0.65"/>
    <circle cx="431" cy="114.5" r="4" fill="#ffbd2e" fill-opacity="0.65"/>
    <circle cx="443" cy="114.5" r="4" fill="#27c93f" fill-opacity="0.65"/>
    <text x="452" y="118" font-family="monospace" font-size="7" fill="#00ff88" fill-opacity="0.35">x@dev ~</text>
    <text x="416" y="137" font-family="monospace" font-size="7.5" fill="#555">01</text>
    <text x="430" y="137" font-family="monospace" font-size="7.5" fill="#0099ff">const user = {</text>
    <text x="416" y="150" font-family="monospace" font-size="7.5" fill="#555">02</text>
    <text x="430" y="150" font-family="monospace" font-size="7.5" fill="#7799aa">  name: </text>
    <text x="472" y="150" font-family="monospace" font-size="7.5" fill="#00ff88">"${name}"</text>
    <text x="416" y="163" font-family="monospace" font-size="7.5" fill="#555">03</text>
    <text x="430" y="163" font-family="monospace" font-size="7.5" fill="#7799aa">  lvl: </text>
    <text x="466" y="163" font-family="monospace" font-size="7.5" fill="#ff9966">${level}</text>
    <text x="416" y="176" font-family="monospace" font-size="7.5" fill="#555">04</text>
    <text x="430" y="176" font-family="monospace" font-size="7.5" fill="#7799aa">  status: </text>
    <text x="478" y="176" font-family="monospace" font-size="7.5" fill="${statusColor}">"${statusText.toLowerCase()}"</text>
    <text x="416" y="189" font-family="monospace" font-size="7.5" fill="#ffcc66">}</text>
    <rect x="427" y="182" width="5" height="8" rx="1" fill="#00ff88" fill-opacity="0.8"/>
  </g>
</svg>`;
 
    const resvg = new Resvg(svg, { font: { loadSystemFonts: false } });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
 
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.end(pngBuffer);
 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
};
