import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useState } from "react";
import { FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function ContactUsSection() {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [tikTokLink, setTikTokLink] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            address,
            phone,
            email,
            workingHours,
            facebookLink,
            whatsappLink,
            tikTokLink,
        };
        console.log("Submitting:", data);
        // TODO: Replace with API call (fetch/axios POST)
    };

    return (
        <div>
            <BreadCrumb title="Contact Us Section" />

            <div className="admin-form-container">
                <form onSubmit={handleSubmit} className="admin-form">

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                        />
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone numbers"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Working Hours</label>
                            <input
                                type="text"
                                value={workingHours}
                                onChange={(e) => setWorkingHours(e.target.value)}
                                placeholder="e.g. Mon - Fri, 9:00 AM - 5:00 PM"
                            />
                        </div>
                    </div>


                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                        <div className="form-group social-field">
                            <label>
                                <FaFacebookF className="social-icon facebook" /> Facebook
                            </label>
                            <input
                                type="url"
                                value={facebookLink}
                                onChange={(e) => setFacebookLink(e.target.value)}
                                placeholder="Enter Facebook page URL"
                            />
                        </div>

                        <div className="form-group social-field">
                            <label>
                                <FaWhatsapp className="social-icon whatsapp" /> WhatsApp
                            </label>
                            <input
                                type="url"
                                value={whatsappLink}
                                onChange={(e) => setWhatsappLink(e.target.value)}
                                placeholder="Enter WhatsApp link"
                            />
                        </div>

                        <div className="form-group social-field">
                            <label>
                                <FaTiktok className="social-icon tiktok" /> TikTok
                            </label>
                            <input
                                type="url"
                                value={tikTokLink}
                                onChange={(e) => setTikTokLink(e.target.value)}
                                placeholder="Enter TikTok profile URL"
                            />
                        </div>
                    </div>


                    <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                        <button type="submit" className="submit-btn">
                            Save Contact Details
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
