import React, { useEffect, useRef, useState } from 'react'
import { cartStyles, navbarStyles } from '../assets/dummyStyles'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { navItems } from '../assets/Dummy';
import { FiMenu, FiUser, FiX } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../pages/CartContext';


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(location.pathname)
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('authToken')));
    // const [cartBounce, setCartBounce] = useState(false);
    const prevCartCountRef = useRef(cartCount)
    const mobileMenuRef = useRef(null)

    //TEMP------------------------------------
    useEffect(() => {
        setActiveTab(location.pathname)
        setIsOpen(false)
    }, [location])
    //-------------------------------------------

    //Listen for auth changes--------------------------------------------
    useEffect(() => {
        const handler = () => {
            setIsLoggedIn(Boolean(localStorage.getItem('authToken')))
        }
        window.addEventListener('authStateChanged', handler)
        return () => window.removeEventListener('authStateChanged', handler)
    }, [])

    //close mobile menu when clicked outside-> when the menu is open in mobile device and when the user clicks outside the menu box the menu box closes without explictly clicking the close button
    //*menu is open *menu panel is showing on the right side *user taps outside the menu * the below condition becomes true *setIsOpen(false) closes the menu
    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(isOpen &&                                     //the menu is currently open
                mobileMenuRef.current &&                     //the menu exists in the dom
                !mobileMenuRef.current.contains(event.target)){    //and the user clicked outside it
                setIsOpen(false)                               //this closes the menu
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    },[isOpen])

    
    //Logout Function
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.clear();
        window.dispatchEvent(new Event('authStateChanged')); //builtin browser method to send out an event //Creates a custom event named 'authStateChanged' //useCase: To tell parts of your app (like Navbar) that login/logout has happened
        navigate('/')
    }
    return (
        <nav className={`${navbarStyles.nav} ${scrolled ? navbarStyles.scrolledNav : navbarStyles.unscrolledNav}`}>
            <div className={navbarStyles.borderGradient} />
            {/* <div className={navbarStyles.particlesContainer}></div> */}

            {/* Logo */}
            <div className={navbarStyles.container}>
                <div className={navbarStyles.innerContainer}>
                    <Link to='/' className={navbarStyles.logoLink}>
                        <img src={logo} alt="Farm Fresh Logo" className={`${navbarStyles.logoImage}`} />
                        <span className={navbarStyles.logoText}>FarmFresh</span>
                    </Link>
                    {/* Desktop Navigation  */}
                    <div className={navbarStyles.desktopNav}>
                        {navItems.map(item => (
                            <Link key={item.name} to={item.path} className={`${navbarStyles.navItem} ${activeTab === item.path ? navbarStyles.activeNavItem : navbarStyles.inactiveNavItem}`}>
                                <div className='flex items-center'>
                                    <span className={`${navbarStyles.navIcon} ${activeTab === item.path ? navbarStyles.activeNavIcon : navbarStyles.inactiveNavIcon}`}>{item.icon}</span>
                                    <span>{item.name}</span>
                                </div>
                                <div className={`${navbarStyles.navIndicator} ${activeTab === item.path ? navbarStyles.activeIndicator : navbarStyles.inactiveIndicator}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className={navbarStyles.iconsContainer}>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className={navbarStyles.loginLink}>
                                <FiUser className={navbarStyles.loginIcon} />
                                <span className='ml-1 text-white'>Logout</span>
                            </button>
                        ) : (
                            <Link to='/login' className={navbarStyles.loginLink}>
                                <FiUser className={navbarStyles.loginIcon} />
                                <span className='ml-1 text-white'>Login</span>
                            </Link>
                        )}
                        <Link to='/cart' className={navbarStyles.cartLink}>
                            <FaShoppingCart className={`${navbarStyles.cartIcon}`} />
                            {cartCount > 0 && (<span className={navbarStyles.cartBadge}>{cartCount}</span>)}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className={navbarStyles.hamburgerButton}>{/**if we set isOpen to true it always opens the menu and if set it to close it always sets to close so to toggle between we use !isOpen */}
                            {isOpen ? (<FiX className='h-6 w-6 text-white' />) : (<FiMenu className='h-6 w-6 text-white' />)}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu Overlay */}
            <div className={`${navbarStyles.mobileOverlay} ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
            fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300`} onClick={() => setIsOpen(false)}>
                <div className={`${navbarStyles.mobilePanel} ${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 bottom-0 z-50 w-4/5 max-w-sm`} onClick={(e => e.stopPropagation())} ref={mobileMenuRef}>
                    <div className={navbarStyles.mobileHeader}>
                        {/* <div className={navbarStyles.mobileLogo}> */}
                        <img src={logo} alt="logo" className={navbarStyles.mobileLogoImage} />
                        <span className={navbarStyles.mobileLogoText}>FarmFresh</span>
                        {/* </div> */}
                        <button onClick={() => setIsOpen(false)} className={navbarStyles.closeButton}><FiX className='h-6 w-6 text-white' /></button>
                    </div>
                    <div className={navbarStyles.mobileItemsContainer}>
                        {navItems.map((item, idx) => (
                            <Link className={navbarStyles.mobileItem} key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                                <span className={navbarStyles.mobileItemIcon}>{item.icon}</span> <span className={navbarStyles.mobileItemText}>{item.name}</span></Link>
                        ))}
                        <div>
                            {isLoggedIn ? (
                                <button onClick={() => {
                                    handleLogout();
                                    setIsOpen(false)
                                }} className={navbarStyles.loginButton}><FiUser className={navbarStyles.loginButtonIcon} />Logout</button>
                            ) : (
                                <Link to='/login' className={navbarStyles.loginButton} onClick={() => setIsOpen(false)}><FiUser className={navbarStyles.loginButtonIcon} />Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
