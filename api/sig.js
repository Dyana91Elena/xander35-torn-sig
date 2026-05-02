const { createCanvas } = require('canvas');

module.exports = async (req, res) => {
  try {
    const apiKey = process.env.TORN_API_KEY;
    const response = await fetch(
      `https://api.torn.com/user/?selections=profile,discord&key=${apiKey}`
    );
    const data = await response.json();

    const level = data.level || '??';
    const name = data.name || 'Xander35';
    const isOnline = data.last_action?.status === 'Online';
    const isIdle = data.last_action?.status === 'Idle';
    const statusText = isOnline ? 'ONLINE' : isIdle ? 'IDLE' : 'OFFLINE';
    const statusColor = isOnline ? '#00ff88' : isIdle ? '#ffaa00' : '#ff4444';

    // Canvas 600x220
    const canvas = createCanvas(600, 220);
    const ctx = canvas.getContext('2d');

    // ── BACKGROUND ──
    const bgGrad = ctx.createLinearGradient(0, 0, 600, 220);
    bgGrad.addColorStop(0, '#020d14');
    bgGrad.addColorStop(1, '#010810');
    ctx.fillStyle = bgGrad;
    ctx.roundRect(0, 0, 600, 220, 12);
    ctx.fill();

    // Dot grid
    ctx.fillStyle = 'rgba(0,255,68,0.12)';
    for (let x = 10; x < 600; x += 20)
      for (let y = 10; y < 220; y += 20)
        { ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI*2); ctx.fill(); }

    // Left dark panel
    ctx.fillStyle = 'rgba(1,12,21,0.7)';
    ctx.fillRect(0, 0, 186, 220);

    // Top/bottom accent lines
    const lineGrad = ctx.createLinearGradient(0, 0, 600, 0);
    lineGrad.addColorStop(0, 'rgba(0,255,136,0)');
    lineGrad.addColorStop(0.3, '#00ff88');
    lineGrad.addColorStop(0.7, '#0099ff');
    lineGrad.addColorStop(1, 'rgba(0,153,255,0)');
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, 0, 600, 2.5);
    ctx.fillRect(0, 217.5, 600, 2.5);

    // Corner brackets
    const corners = [[4,4,36,4,4,36],[596,4,564,4,596,36],[4,216,36,216,4,184],[596,216,564,216,596,184]];
    ctx.strokeStyle = 'rgba(0,255,136,0.7)';
    ctx.lineWidth = 1.5;
    corners.forEach(([x1,y1,x2,y2,x3,y3]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x3,y3); ctx.stroke();
    });

    // ── AVATAR CIRCLE ──
    // Glow
    const avGlow = ctx.createRadialGradient(90,110,0,90,110,80);
    avGlow.addColorStop(0,'rgba(0,255,136,0.12)');
    avGlow.addColorStop(1,'rgba(0,255,136,0)');
    ctx.fillStyle = avGlow;
    ctx.beginPath(); ctx.arc(90,110,80,0,Math.PI*2); ctx.fill();

    // Dashed ring
    ctx.strokeStyle = 'rgba(0,255,136,0.45)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([6,4]);
    ctx.beginPath(); ctx.arc(90,110,74,0,Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);

    // Avatar bg
    ctx.fillStyle = '#0b1e2c';
    ctx.beginPath(); ctx.arc(90,110,72,0,Math.PI*2); ctx.fill();

    // Clip to circle
    ctx.save();
    ctx.beginPath(); ctx.arc(90,110,72,0,Math.PI*2); ctx.clip();

    // Shirt
    ctx.fillStyle = '#0c1f30';
    ctx.beginPath(); ctx.roundRect(20,172,140,70,14); ctx.fill();
    ctx.strokeStyle='rgba(0,153,255,0.45)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(20,178); ctx.quadraticCurveTo(54,150,90,147); ctx.quadraticCurveTo(126,150,160,178); ctx.stroke();

    // Neck
    ctx.fillStyle='#182e3c'; ctx.fillRect(73,148,34,28);

    // Face
    ctx.fillStyle='#182e3c';
    ctx.beginPath(); ctx.roundRect(48,52,84,100,16); ctx.fill();

    // Hair
    ctx.fillStyle='#0a1620';
    ctx.beginPath(); ctx.roundRect(48,40,84,28,10); ctx.fill();
    ctx.beginPath(); ctx.roundRect(42,52,18,50,7); ctx.fill();
    ctx.beginPath(); ctx.roundRect(118,52,18,50,7); ctx.fill();

    // Headphones
    ctx.strokeStyle='#0088cc'; ctx.lineWidth=5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(42,88); ctx.quadraticCurveTo(32,88,32,100); ctx.lineTo(32,118); ctx.quadraticCurveTo(32,126,40,126); ctx.lineTo(48,126); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(138,88); ctx.quadraticCurveTo(148,88,148,100); ctx.lineTo(148,118); ctx.quadraticCurveTo(148,126,140,126); ctx.lineTo(132,126); ctx.stroke();
    ctx.fillStyle='#002a44';
    ctx.strokeStyle='#0099cc'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.roundRect(28,102,17,22,5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(135,102,17,22,5); ctx.fill(); ctx.stroke();

    // Eyes
    ctx.fillStyle='#001408';
    ctx.beginPath(); ctx.roundRect(58,90,28,20,4); ctx.fill();
    ctx.beginPath(); ctx.roundRect(94,90,28,20,4); ctx.fill();
    ctx.fillStyle='rgba(0,255,136,0.92)';
    ctx.beginPath(); ctx.roundRect(62,94,9,9,2); ctx.fill();
    ctx.beginPath(); ctx.roundRect(98,94,9,9,2); ctx.fill();
    ctx.fillStyle='rgba(0,255,136,0.5)';
    ctx.beginPath(); ctx.roundRect(73,96,7,5,1); ctx.fill();
    ctx.beginPath(); ctx.roundRect(109,96,7,5,1); ctx.fill();

    // Glasses
    ctx.strokeStyle='rgba(0,153,255,0.7)'; ctx.lineWidth=1.6; ctx.setLineDash([]);
    ctx.beginPath(); ctx.roundRect(55,87,34,26,5); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(91,87,34,26,5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(89,100); ctx.lineTo(91,100); ctx.stroke();

    // Mouth
    ctx.fillStyle='rgba(0,255,136,0.65)';
    ctx.beginPath(); ctx.roundRect(68,130,44,3.5,2); ctx.fill();

    // Shirt text
    ctx.font = '9px "Courier New"';
    ctx.fillStyle = 'rgba(0,255,136,0.55)';
    ctx.textAlign = 'center';
    ctx.fillText('<Xander35/>', 90, 200);

    ctx.restore();

    // Online dot on avatar
    ctx.fillStyle = '#010c15';
    ctx.beginPath(); ctx.arc(148,168,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = statusColor;
    ctx.beginPath(); ctx.arc(148,168,6,0,Math.PI*2); ctx.fill();

    // Divider
    const divGrad = ctx.createLinearGradient(0,18,0,202);
    divGrad.addColorStop(0,'rgba(0,255,136,0)');
    divGrad.addColorStop(0.5,'rgba(0,255,136,0.5)');
    divGrad.addColorStop(1,'rgba(0,255,136,0)');
    ctx.strokeStyle = divGrad; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(186,18); ctx.lineTo(186,202); ctx.stroke();

    // ── RIGHT CONTENT ──

    // NAME
    const nameGrad = ctx.createLinearGradient(208,0,520,0);
    nameGrad.addColorStop(0,'#00ff88');
    nameGrad.addColorStop(1,'#00ccff');
    ctx.font = 'bold 30px "Courier New"';
    ctx.fillStyle = nameGrad;
    ctx.textAlign = 'left';
    ctx.fillText(name.toUpperCase(), 208, 60);

    // Underline
    ctx.fillStyle = lineGrad;
    ctx.fillRect(208, 65, 340, 1.5);

    // Role tags
    ctx.fillStyle = '#001a0a';
    ctx.strokeStyle = 'rgba(0,255,136,0.65)'; ctx.lineWidth=0.9;
    ctx.beginPath(); ctx.roundRect(208,76,136,20,10); ctx.fill(); ctx.stroke();
    ctx.font = '9.5px "Courier New"';
    ctx.fillStyle = '#00ff88'; ctx.textAlign='center';
    ctx.fillText('SYS. ENGINEER', 276, 90);

    ctx.fillStyle = '#001133';
    ctx.strokeStyle = 'rgba(0,153,255,0.65)';
    ctx.beginPath(); ctx.roundRect(354,76,130,20,10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0099ff';
    ctx.fillText('FULL-STACK DEV', 419, 90);

    // Info lines
    ctx.textAlign='left';
    const rows = [
      [208,120,'stack ›','Python · Linux · Docker · SQL · Git','#00ccff'],
      [208,137,'focus ›','Networking · Security · Automation','#ccddee'],
    ];
    rows.forEach(([x,y,label,val,col])=>{
      ctx.font='9px "Courier New"';
      ctx.fillStyle='rgba(0,255,136,0.45)'; ctx.fillText('$',x,y);
      ctx.fillStyle='#7799aa'; ctx.fillText(label,x+14,y);
      ctx.fillStyle=col; ctx.fillText(val,x+68,y);
    });

    // Status row
    ctx.fillStyle='rgba(0,255,136,0.45)'; ctx.fillText('$',208,154);
    ctx.fillStyle='#7799aa'; ctx.fillText('status ›',222,154);
    ctx.fillStyle = statusColor;
    ctx.beginPath(); ctx.arc(298,150,4,0,Math.PI*2); ctx.fill();
    ctx.fillText(statusText, 308, 154);

    // Level badge
    ctx.fillStyle='#001a0a';
    ctx.strokeStyle='rgba(0,255,136,0.35)'; ctx.lineWidth=0.9;
    ctx.beginPath(); ctx.roundRect(350,143,90,18,9); ctx.fill(); ctx.stroke();
    ctx.font='9px "Courier New"';
    ctx.fillStyle='rgba(0,255,136,0.45)'; ctx.textAlign='left';
    ctx.fillText('lvl:', 358,155);
    ctx.fillStyle='#ffaa44';
    ctx.font='bold 9px "Courier New"';
    ctx.fillText(String(level), 380,155);

    // Torn ID pill
    ctx.fillStyle='#020d14';
    ctx.strokeStyle='rgba(0,255,136,0.35)';
    ctx.beginPath(); ctx.roundRect(208,170,196,22,11); ctx.fill(); ctx.stroke();
    ctx.font='8.5px "Courier New"';
    ctx.fillStyle='rgba(0,255,136,0.45)'; ctx.textAlign='left';
    ctx.fillText('torn.id', 218,184);
    ctx.strokeStyle='rgba(0,255,136,0.3)'; ctx.lineWidth=0.6;
    ctx.beginPath(); ctx.moveTo(245,174); ctx.lineTo(245,188); ctx.stroke();
    ctx.fillStyle='#00ccff';
    ctx.fillText(`#4276245 · ${name}`, 252,184);

    // ── CODE BLOCK ──
    ctx.fillStyle='#010c14';
    ctx.strokeStyle='rgba(0,255,68,0.25)'; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.roundRect(406,106,170,92,7); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#0a1a20';
    ctx.beginPath(); ctx.roundRect(406,106,170,17,7); ctx.fill();
    ctx.fillRect(406,116,170,7);

    // Traffic lights
    [[419,'#ff5f56'],[431,'#ffbd2e'],[443,'#27c93f']].forEach(([x,c])=>{
      ctx.fillStyle=c+'aa'; ctx.beginPath(); ctx.arc(x,114.5,4,0,Math.PI*2); ctx.fill();
    });
    ctx.font='7px "Courier New"'; ctx.fillStyle='rgba(0,255,136,0.35)';
    ctx.fillText('x@dev ~', 452,118);

    const codeLines = [
      [137,'#555','01','#0099ff','const ','#aaccff','user','#888',' = ','#ffcc66','{'],
      [150,'#555','02','#7799aa','  name:','#00ff88',`"${name}"`],
      [163,'#555','03','#7799aa','  lvl: ','#ff9966',String(level)],
      [176,'#555','04','#7799aa','  status:','#00ff88',`"${statusText.toLowerCase()}"`],  // dynamic!
      [189,'#555','05','#ffcc66','}'],
    ];
    codeLines.forEach(row => {
      const y = row[0];
      let x = 416;
      for(let i=1;i<row.length;i+=2){
        ctx.fillStyle=row[i]; ctx.font='7.5px "Courier New"';
        const txt = row[i+1]||'';
        ctx.fillText(txt,x,y);
        x += ctx.measureText(txt).width + 2;
      }
    });

    // Send PNG
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    canvas.createPNGStream().pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating signature');
  }
};
