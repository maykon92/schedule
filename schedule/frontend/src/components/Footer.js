import './Footer.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { BsClock } from "react-icons/bs";

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  }

  const urlInstagram = 'https://www.instagram.com';
  const urlWhatsApp = 'https://web.whatsapp.com/';
  const urlFaceBook = 'https://www.facebook.com/';
  const urlLinkdin = 'https://www.linkedin.com/';
  const urlYoutube = 'https://www.youtube.com/';

  return (
      <footer className='footer'>
          <span id='legend'>
            <BsClock/> 
            <p>Schedule &copy; {getYear()}</p>
          </span>
          <div className='media'>
            <a href={urlInstagram} target="_blank" rel="noopener noreferrer" title='Instagram'>
              <FaInstagram size={30} />
            </a>
            <a href={urlWhatsApp} target="_blank" rel='noopener noreferrer' title="Whats App">
              <FaWhatsapp size={30} />
            </a>
            <a href={urlFaceBook} target="_blank" rel='noopener noreferrer' title="FaceBook">
              <FaFacebookF size={30} />
            </a>
            <a href={urlLinkdin} target='_blank' rel='noopener noreferrer' title='Linkdin'>
              <FaLinkedinIn size={30}/>
            </a>
            <a href={urlYoutube} target='_blank' rel='noopener noreferrer' title='Youtube'>
              <FaYoutube size={30}/>
            </a>
          </div>
      </footer>
  )
}

export default Footer
