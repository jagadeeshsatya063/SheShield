import React, { useState, useEffect } from 'react';
import { sendSOS } from '../services/api';

function SOSButton({ token }) {
  const [status, setStatus] = useState('');

  // Shake-to-activate
  useEffect(() => {
    let lastX = null, lastY = null, lastZ = null, lastTime = 0;
    function handleMotion(event) {
      const { x, y, z } = event.accelerationIncludingGravity;
      const now = Date.now();
      if (lastX !== null && lastY !== null && lastZ !== null) {
        const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
        if (delta > 25 && now - lastTime > 1000) { // shake threshold
          triggerSOS();
          lastTime = now;
        }
      }
      lastX = x; lastY = y; lastZ = z;
    }
    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
    // eslint-disable-next-line
  }, []);

  const triggerSOS = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        await sendSOS({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }, token);
        setStatus('SOS sent!');
      } catch (err) {
        setStatus('Failed to send SOS');
      }
    }, () => setStatus('Failed to get location'));
  };

  return (
    <div className="sos-container">
      <button className="sos-btn" onClick={triggerSOS}>Send SOS</button>
      <p>Or shake your device to trigger SOS</p>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default SOSButton; 