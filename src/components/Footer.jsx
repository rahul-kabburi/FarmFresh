import React from 'react'
import { footerStyles } from '../assets/dummyStyles'
import { FaCcAmex, FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcVisa, FaEnvelope, FaFacebookF, FaInstagram, FaLink, FaMap, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa'
import {BsTelephone} from 'react-icons/bs'
import { FiBookmark, FiMail } from 'react-icons/fi'
import {BiMailSend} from 'react-icons/bi'


const Footer = () => {
    const socialLinks = [
        {
            icon: FaFacebookF,
            url: 'https://www.facebook.com/',
        },
        {
            icon: FaTwitter,
            url: 'https://www.twitter.com/',
        },
        {
            icon: FaInstagram,
            url: 'https://www.instagram.com/',
        },
        {
            icon: FaYoutube,
            url: 'https://www.youtube.com/'
        }
    ]
    return (
        <footer
            className={footerStyles.footer}>
            <div className={footerStyles.topBorder} />
            <div className={footerStyles.container}>
                <div className={footerStyles.grid}>
                    {/**Brand */}
                    <div>
                        <h2 className={footerStyles.brandTitle}>
                            FARM FRESH <span className={footerStyles.brandSpan}>BASKET</span>
                        </h2>
                        <p className={footerStyles.brandText}>
                            Bringing you the fresh organic produce. Our mission is to deliver FARM-FRESH goodness straight to your doorsteps.
                        </p>
                        <div className=' space-x-3 flex'>
                            {socialLinks.map((social, idx) => (
                                <a href={social.url} key={idx} target='_blank' className={footerStyles.socialLink}>
                                    <social.icon className={footerStyles.socialIcon}></social.icon>
                                </a>
                            ))}
                        </div>
                    </div>
                    {/**Quick Links */}
                    <div>
                        <h3 className={footerStyles.sectionTitle}>
                            <FaLink className={footerStyles.sectionIcon} />Quick Links
                        </h3>
                        <ul className={footerStyles.linkList}>
                            {['Home','Items','contact'].map((item, idx) => (
                                <li key={idx}>
                                    <a href={item === 'Home' ? '/' : `${item.toLowerCase()}`} className={footerStyles.linkItem}>
                                        <span className={footerStyles.linkBullet}></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/**contact Information */}
                    <div>
                        <h3 className={footerStyles.sectionTitle}>
                            <BsTelephone/> Contact Us
                        </h3>
                        <ul className=' space-y-4 text-sm sm:text-base'>
                            <li className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconContainer}>
                                    <FaMapMarkerAlt className={footerStyles.contactIcon}/>
                                </div>
                                <div>
                                    <p className=' mt-1.5'>ABC colony, 2nd cross, Bangalore</p>
                                </div>
                            </li>
                            <li className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconContainer}>
                                    <FaPhone className={footerStyles.contactIcon}/>
                                </div>
                                <div className=' mt-1.5'>
                                    <p>+91{' '}9876543276</p>
                                </div>
                            </li>
                            <li className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconContainer}>
                                    <FaEnvelope className={footerStyles.contactIcon}/>
                                </div>
                                <div className='mt-1.5'>rahul.rkabburi@gmail.com</div>
                            </li>
                        </ul>
                    </div>
                    {/**Newsletter */}
                    <div>
                        <h3 className={footerStyles.sectionTitle}>
                            <FiMail className={footerStyles.sectionIcon}/>NewsLetter
                        </h3>
                        <p className={footerStyles.newsletterText}>
                            Subscribe to our newsletter to get the latest updates and offers.
                        </p>
                        <div className={footerStyles.newsletterForm}>
                            <input type="email" placeholder='Enter Email address' className={footerStyles.newsletterInput} />
                            <button className={footerStyles.newsletterButton}>
                                <BiMailSend className=' mr-2 text-lg'/>
                                <span>Subscribe</span>
                            </button>
                        </div>
                        <p className={footerStyles.privacyText}>We respect your privacy. Unsubscribe anytime</p>
                    </div>
                </div>
                {/**Payment Methods */}
                <div className={footerStyles.paymentSection}>
                    <h4 className={footerStyles.paymentTitle}>
                        <FiBookmark className={footerStyles.paymentIcon}/>Payment Method
                    </h4>
                    <div className={footerStyles.paymentMethods}>
                        {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcApplePay].map((Icon, idx) => (
                            <div key={idx} className={footerStyles.paymentItem}><Icon className={footerStyles.paymentIcon}/></div>
                        ))}
                    </div>
                </div>
                {/**HR */}
                <div className={footerStyles.attribution}>
                    <div className={footerStyles.attributionBadge}>
                            <span className={footerStyles.attributionText}>
                                Designed by Rahul Kabburi
                            </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
