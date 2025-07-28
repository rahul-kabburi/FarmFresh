import React, { useState } from 'react'
import contactStyles from '../assets/dummyStyles'
import { FaCheck, FaComment, FaEnvelope, FaPhone, FaRegPaperPlane, FaTag, FaUser } from 'react-icons/fa'

const ContsctUs = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        }
    )
    const [showToast, setShowToast] = useState(false)

    const whatsappNumber = '9876543219'
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    //web API whatsapp
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, subject, message } = formData;
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill all fields')
            return
        }
        //Build whatsapp message
        const text =
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Subject: ${subject}\n` +
            `Message: ${message}\n`;

        //open whatsapp message with pre-filled message
        const url = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');

        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <div className={contactStyles.pageContainer}>
            {showToast && (
                <div className=' toast-notification'>
                    <div className={contactStyles.toast}>
                        <FaCheck className=' mr-2' /> Message Opened in whatsapp
                    </div>
                </div>
            )}
            {/**Centre Container */}
            <div className={contactStyles.centeredContainer}>
                <div className={contactStyles.headingContainer}>
                    <h1 className={contactStyles.heading}>
                        Contact FarmGrocers
                    </h1>
                    <div className={contactStyles.divider} />
                </div>
                <br />

                {/**contact area */}
                <div className={contactStyles.contactFormContainer}>
                    <div className=' absolute inset-0 bg-emerald-900 bg-opacity-90 backdrop-blur-sm z-0'></div>
                    <form onSubmit={handleSubmit} className={contactStyles.form}>
                        <div className={contactStyles.formField}>
                            <div className={contactStyles.inputContainer}>
                                <div className={contactStyles.inputIconContainer}>
                                    <FaUser className={contactStyles.inputIcon} />
                                </div>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={contactStyles.formInput} placeholder='John Doe' required />
                            </div>
                        </div>

                        <div className={contactStyles.formField}>
                            <div className={contactStyles.inputContainer}>
                                <div className={contactStyles.inputIconContainer}>
                                    <FaEnvelope className={contactStyles.inputIcon} />
                                </div>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={contactStyles.formInput} placeholder='john@expample.com' required />
                            </div>
                        </div>

                        <div className={contactStyles.formField}>
                            <div className={contactStyles.inputContainer}>
                                <div className={contactStyles.inputIconContainer}>
                                    <FaPhone className={contactStyles.inputIcon} />
                                </div>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={contactStyles.formInput} placeholder='4786387369' required />
                            </div>
                        </div>

                        <div className={contactStyles.formField}>
                            <div className={contactStyles.inputContainer}>
                                <div className={contactStyles.inputIconContainer}>
                                    <FaTag className={contactStyles.inputIcon} />
                                </div>
                                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className={contactStyles.formInput} placeholder='Order Enquiry' required />
                            </div>
                        </div>

                        <div className={contactStyles.formField}>
                            <div className={contactStyles.inputContainer}>
                                <div className={contactStyles.inputIconContainer}>
                                    <FaComment className={contactStyles.inputIcon} />
                                </div>
                                <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} className={contactStyles.formTextarea} placeholder='Type your message here...' required></textarea>
                            </div>
                        </div>
                        {/**submit button */}
                        <button type='submit' className={contactStyles.submitButton}>
                            <span className={contactStyles.submitButtonText}>
                                Send Message
                            </span>
                            <FaRegPaperPlane className=' h-5 w-5 text-black'/>
                        </button>
                    </form>
                </div>
            </div>
            <style>{contactStyles.customCSS}</style>
        </div>
    )
}

export default ContsctUs
