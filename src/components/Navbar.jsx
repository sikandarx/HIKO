import '../App.css'
import Logo from '../assets/logo.png'

function Navbar() {

  return (
    <>
    <div className='mnav'>
        <img src={Logo} alt="logo" className='lg1'/>
        <div className='ncent'>
        <div className='nitem2'>
            <svg viewBox="0 0 448 512" width="100" title="arrow-left" className='arr'>
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" fill="white"/>
            </svg>
            <div className='bk'>Back to Main</div>
        </div>
        <button className="gradient-border-button">Buy $HIKO</button>
        </div>
        <div className='nitem4'></div>
    </div>
    </>
  )
}

export default Navbar