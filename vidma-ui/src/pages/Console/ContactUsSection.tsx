import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useEffect, useState } from "react";
import { FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { createContactUsData, getContactUsData } from "../../services/home-api";
import { Backdrop, CircularProgress } from "@mui/material";
import { showError, showSuccess } from "../../components/Toast";

export default function ContactUsSection() {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [tikTokLink, setTikTokLink] = useState("");

    const [isExisting, setIsExisting] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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

        setOpen(true);
        try {
            await createContactUsData(data, sessionStorage.getItem("vidmaAuthToken") || "");
            setIsExisting(true);
            showSuccess("Contact us data created successfully");
        } catch (error) {
            showError("Error creating contact us data");            
        } finally {
            setOpen(false);
            window.location.reload();
        }
    };

    const handleGetContactUsData = async () => {
        try {
            const res = await getContactUsData();
            console.log(res.data);
            if (res.data.address === "") {
                setIsExisting(false);
            } else {
                setIsExisting(true);
                setAddress(res.data.address);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setWorkingHours(res.data.workingHours);
                setFacebookLink(res.data.facebookLink);
                setWhatsappLink(res.data.whatsappLink);
                setTikTokLink(res.data.tikTokLink);
            }
        } catch (error) {
            console.error("Error fetching contact us data:", error);
        }
    }

    useEffect(() => {
        handleGetContactUsData();
    }, []);

    return (
        <div>
            <BreadCrumb title="Contact Us Section" />

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="admin-form-container">
                <form onSubmit={handleSubmit} className="admin-form">

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            value={address}
                            disabled={isExisting}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                        />
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                disabled={isExisting}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone numbers"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                disabled={isExisting}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Working Hours</label>
                            <input
                                type="text"
                                disabled={isExisting}
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
                                disabled={isExisting}
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
                                disabled={isExisting}
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
                                disabled={isExisting}
                                value={tikTokLink}
                                onChange={(e) => setTikTokLink(e.target.value)}
                                placeholder="Enter TikTok profile URL"
                            />
                        </div>
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                        {isExisting && (
                            <button
                                type="button"
                                className="edit-btn"
                                style={{ marginRight: "10px" }}
                                onClick={() => setIsExisting(false)}
                            >
                                Edit
                            </button>
                        )}

                        {!isExisting && (
                            <button type="button" disabled={
                                address === "" || phone === "" ||
                                email === "" ||
                                workingHours === "" ||
                                facebookLink === "" ||
                                whatsappLink === "" ||
                                tikTokLink === ""
                            } className="submit-btn" onClick={handleSubmit}> 
                                Submit
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}
