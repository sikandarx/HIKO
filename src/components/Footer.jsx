import React, { useEffect, useState } from 'react';
import '../App.css'
import Footerimg from '../assets/footer-image.png'
import Ximg from '../assets/x-icon.png'
import Tlimg from '../assets/telegram-icon.png'
import Rimg from '../assets/raydium-icon.png'
import Deximg from '../assets/dexscreener-icon.png'
import Bimg from '../assets/birdeye-icon.png'

function Footer() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <div className='imgfk'>
    <img src={Footerimg} alt='Cats collage' className='ftimg'/>
    </div>
    <div className='fft1'>
        <div className='pr2'>{isMobile ? 'Copyright © 2024 Hiko Foundation All right reserved.' : 'Copyright © 2024 Hiko Foundation | All right reserved.'}</div>
        <div className='fft2'>
            <div className='icns2'>
                 <img src={Ximg} alt='X icon' className='icns'/>
                 <img src={Tlimg} alt='Telegram icon' className='icns'/>
                 <img src={Rimg} alt='Raydium icon' className='icns'/>
                 <img src={Deximg} alt='dex Screener icon' className='icns'/>
                 <img src={Bimg} alt='Birdeye icon' className='icns'/>
            </div>
            <button className="gradient-border-button">Buy $HIKO</button>
        </div>
    </div>
    </>
  )
}

export default Footer