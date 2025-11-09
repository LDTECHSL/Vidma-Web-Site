import "../common/main.css";
import banner from "../assets/awards-banner.png";
import banner2 from "../assets/brands-banner.png";
import Divider from "@mui/material/Divider";
import Lottie from "lottie-react";
import world from "../assets/world.json";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getContactUsData, getDomainInfo } from "../services/home-api";
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Footer() {
    const [data, setData] = useState<any>({});
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const { t } = useTranslation();
    const [domainLink, setDomainLink] = useState<{ domainValue?: string }>({})

    const getSocialMediaLinks = async () => {
        try {
            const res = await getContactUsData();
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetDomainInfo = async () => {
        try {
            const res = await getDomainInfo()
            setDomainLink(res.data)
        } catch (error) {
            console.error(error);            
        }
    }

    useEffect(() => {
        getSocialMediaLinks();
        handleGetDomainInfo();
    }, []);

    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("services")}</div>
                    <div className="f-link"><a href="#gallery">{t("gallery")}</a></div>
                    <div className="f-link"><a href="#products">{t("products")}</a></div>
                    <div className="f-link"><a href="#about">{t("about")}</a></div>
                    <div className="f-link"><a href="#contact">{t("contact")}</a></div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("getHelp")}</div>
                    <div className="f-link"><a href="#contact">{t("contact")}</a></div>
                    <div className="f-link" onClick={() => window.open(data.whatsappLink, "_blank")}>
                        {t("whatsApp")}
                    </div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("legal")}</div>
                    <div className="f-link" onClick={() => setOpenPrivacy(true)} style={{ cursor: "pointer" }}>
                        {t("privacyPolicy")}
                    </div>
                    <div className="f-link" onClick={() => setOpenTerms(true)} style={{ cursor: "pointer" }}>
                        {t("termsOfService")}
                    </div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("followUs")}</div>
                    <div className="f-link" onClick={() => window.open(data.facebookLink, "_blank")}>{t("facebook")}</div>
                    <div className="f-link" onClick={() => window.open(data.whatsappLink, "_blank")}>{t("whatsApp")}</div>
                    <div className="f-link" onClick={() => window.open(data.tikTokLink, "_blank")}>{t("tiktok")}</div>
                </div>
            </div>

            <div className="footer-awards-outer" data-aos="fade-up">
                <div className="f">
                    <div className="f-title">{t("awards")}</div>
                    <img className="footer-awards-banner" src={banner} alt={t("awards")} />
                </div>

                <div className="footer-lottie" data-aos="fade-up">
                    <Lottie animationData={world} loop autoplay style={{ width: 180, height: 180 }} />
                </div>

                <div className="f f1" data-aos="fade-up">
                    <div className="f-title">{t("companies")}</div>
                    <img className="footer-awards-banner" src={banner2} alt={t("companies")} />
                </div>
            </div>

            <Divider
                style={{
                    width: "65%",
                    marginTop: "20px",
                    marginBottom: "10px",
                    backgroundColor: "white",
                }}
            />

            <div className="footer-bottom">
                <div className="fb-text">
                    © {new Date().getFullYear()} Vidma. All Rights Reserved. | Design and Developed by
                    <span style={{ color: "rgba(7, 115, 223, 1)", fontWeight: "bold", cursor: "pointer" }}>
                        {" "}
                        <a href={domainLink.domainValue ?? "#"} target="_blank" rel="noopener noreferrer">2D-Coders</a>
                    </span>
                </div>
            </div>

            {/* ✅ Full Page Privacy Policy Modal */}
            <Dialog
                fullScreen
                open={openPrivacy}
                onClose={() => setOpenPrivacy(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "fixed", background: "#02192fff" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenPrivacy(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {t("privacyPolicy")}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="privacy-policy-page1">
                    <div className="container">
                        <h1>Privacy Policy</h1>
                        <p className="last-updated">Last Updated: November 2, 2025</p>

                        <p>
                            Vidma Super ("we," "our," or "us") is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your
                            information when you visit our website or interact with our business, including
                            our showrooms and distributor network.
                        </p>

                        <p>
                            Please read this privacy policy carefully. If you do not agree with the terms
                            of this privacy policy, please do not access the website or use our services.
                        </p>

                        <section>
                            <h2>1. Information We Collect</h2>

                            <h3>1.1 Personal Information</h3>
                            <p>We may collect personal information that you voluntarily provide to us when you:</p>
                            <ul>
                                <li>Fill out our contact form</li>
                                <li>Submit a feedback form</li>
                                <li>Inquire about our roofing sheets and roofing products</li>
                                <li>Contact us via phone or email</li>
                                <li>Visit our showrooms or interact with our distributors</li>
                            </ul>

                            <p>The personal information we collect may include:</p>
                            <ul>
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company name (if applicable)</li>
                                <li>Postal address</li>
                                <li>Any other information you choose to provide in your feedback or inquiries</li>
                            </ul>

                            <h3>1.2 Automatically Collected Information</h3>
                            <p>
                                When you visit our website, we may automatically collect certain information
                                about your device, including information about your web browser, IP address,
                                time zone, and some of the cookies that are installed on your device. This
                                helps us improve our website functionality and user experience.
                            </p>
                        </section>

                        <section>
                            <h2>2. How We Use Your Information</h2>
                            <p>We use the information we collect in the following ways:</p>
                            <ul>
                                <li>To respond to your inquiries and provide customer support</li>
                                <li>To process your feedback and improve our products and services</li>
                                <li>To communicate with you about our roofing products, including roofing sheets and related items</li>
                                <li>To connect you with our showrooms or distributors in your area</li>
                                <li>To send you marketing communications about our products and special offers (with your consent)</li>
                                <li>To maintain and improve our website</li>
                                <li>To comply with legal obligations and protect our business interests</li>
                            </ul>
                        </section>

                        <section>
                            <h2>3. Sharing Your Information</h2>
                            <p>We may share your information with third parties in the following circumstances:</p>

                            <h3>3.1 Business Partners and Distributors</h3>
                            <p>
                                We share your information with our authorized showrooms and distributor network
                                to fulfill your product inquiries, provide quotations, process orders, and deliver
                                products. Our partners are required to maintain the confidentiality of your information.
                            </p>

                            <h3>3.2 Service Providers</h3>
                            <p>
                                We may share your information with third-party service providers who assist us in
                                operating our website, conducting our business, or servicing you, as long as those
                                parties agree to keep this information confidential.
                            </p>

                            <h3>3.3 Legal Requirements</h3>
                            <p>
                                We may disclose your information when required by law or to protect our rights,
                                property, or safety, or that of others.
                            </p>

                            <h3>3.4 Business Transfers</h3>
                            <p>
                                In the event of a merger, acquisition, or sale of assets, your information may
                                be transferred to the acquiring entity.
                            </p>
                        </section>

                        <section>
                            <h2>4. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect
                                your personal information against unauthorized access, alteration, disclosure, or
                                destruction. However, no method of transmission over the internet or electronic
                                storage is completely secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2>5. Data Retention</h2>
                            <p>
                                We retain your personal information only for as long as necessary to fulfill the
                                purposes outlined in this Privacy Policy, unless a longer retention period is
                                required or permitted by law. When we no longer need your information, we will
                                securely delete or anonymize it.
                            </p>
                        </section>

                        <section>
                            <h2>6. Your Rights</h2>
                            <p>
                                Depending on your location, you may have certain rights regarding your personal
                                information, including:
                            </p>
                            <ul>
                                <li>The right to access the personal information we hold about you</li>
                                <li>The right to request correction of inaccurate information</li>
                                <li>The right to request deletion of your information</li>
                                <li>The right to object to or restrict processing of your information</li>
                                <li>The right to withdraw consent for marketing communications</li>
                            </ul>
                            <p>
                                To exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        <section>
                            <h2>7. Cookies and Tracking Technologies</h2>
                            <p>
                                Our website may use cookies and similar tracking technologies to enhance your
                                browsing experience. Cookies are small data files stored on your device. You can
                                configure your browser to refuse cookies, but this may limit your ability to use
                                certain features of our website.
                            </p>
                        </section>

                        <section>
                            <h2>8. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites. We are not responsible for
                                the privacy practices of these external sites. We encourage you to review their
                                privacy policies before providing any personal information.
                            </p>
                        </section>

                        <section>
                            <h2>9. Children's Privacy</h2>
                            <p>
                                Our website and services are not intended for individuals under the age of 18.
                                We do not knowingly collect personal information from children. If we become aware
                                that we have collected information from a child, we will take steps to delete it
                                promptly.
                            </p>
                        </section>

                        <section>
                            <h2>10. Changes to This Privacy Policy</h2>
                            <p>
                                We reserve the right to update or modify this Privacy Policy at any time. Any
                                changes will be effective immediately upon posting the updated policy on our website.
                                We encourage you to review this Privacy Policy periodically. Your continued use of
                                our website or services after changes have been made constitutes your acceptance of
                                the revised policy.
                            </p>
                        </section>

                        <section>
                            <h2>11. International Data Transfers</h2>
                            <p>
                                If you are accessing our website from outside Sri Lanka, please be aware that your
                                information may be transferred to, stored, and processed in Sri Lanka or other
                                countries where our business partners and distributors operate. By using our website
                                and services, you consent to such transfers.
                            </p>
                        </section>

                        <div className="contact-info">
                            <h2>12. Contact Us</h2>
                            <p>
                                If you have any questions, concerns, or requests regarding this Privacy Policy or
                                our data practices, please contact us:
                            </p>
                            <p>
                                <strong>Vidma Super</strong><br />
                                Sri Lanka<br />
                                Phone: <a className="tos-contact-link">076 440 9691 , 077 138 0479</a><br />
                                Email: <a href="mailto:vidmaengineering@yahoo.com" className="tos-contact-link">vidmaengineering@yahoo.com</a>
                            </p>
                            <p>We will respond to your inquiry within a reasonable timeframe.</p>
                        </div>

                        <hr className="divider" />
                        <p className="footer-text">
                            © 2025 Vidma Super. All rights reserved.
                        </p>
                    </div>
                </div>

            </Dialog>

            {/* ✅ Full Page Terms Modal */}
            <Dialog
                fullScreen
                open={openTerms}
                onClose={() => setOpenTerms(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "fixed", background: "#02192fff" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenTerms(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {t("termsOfService")}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className="tos-wrapper">
                    <div className="tos-content-container">
                        <h1 className="tos-main-title">Terms of Service</h1>
                        <p className="tos-last-updated">Last Updated: November 2, 2025</p>

                        <p className="tos-intro-text">
                            Welcome to Vidma Super. These Terms of Service ("Terms") govern your access to and
                            use of our website, products, and services. By accessing or using our website, you
                            agree to be bound by these Terms. If you do not agree to these Terms, please do not
                            use our website or services.
                        </p>

                        <section className="tos-section">
                            <h2 className="tos-section-title">1. Acceptance of Terms</h2>
                            <p className="tos-paragraph">
                                By accessing and using the Vidma Super website and services, you accept and agree
                                to be bound by these Terms of Service and our Privacy Policy. These Terms apply to
                                all visitors, users, customers, and others who access or use our services.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">2. About Our Services</h2>
                            <p className="tos-paragraph">
                                Vidma Super is a leading supplier of roofing sheets and roofing materials in
                                Sri Lanka. We operate through multiple showrooms and an extensive distributor
                                network. Our services include:
                            </p>
                            <ul className="tos-list">
                                <li className="tos-list-item">Sale of roofing sheets and related roofing products</li>
                                <li className="tos-list-item">Product information and specifications</li>
                                <li className="tos-list-item">Customer inquiries and support through contact and feedback forms</li>
                                <li className="tos-list-item">Connection with our showrooms and authorized distributors</li>
                                <li className="tos-list-item">Product quotations and order processing</li>
                            </ul>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">3. Use of Website</h2>

                            <h3 className="tos-subsection-title">3.1 Permitted Use</h3>
                            <p className="tos-paragraph">
                                You may use our website for lawful purposes only. You agree to use the website
                                in accordance with all applicable laws and regulations.
                            </p>

                            <h3 className="tos-subsection-title">3.2 Prohibited Activities</h3>
                            <p className="tos-paragraph">You agree not to:</p>
                            <ul className="tos-list">
                                <li className="tos-list-item">Use the website for any illegal or unauthorized purpose</li>
                                <li className="tos-list-item">Violate any laws in your jurisdiction</li>
                                <li className="tos-list-item">Transmit any viruses, malware, or harmful code</li>
                                <li className="tos-list-item">Attempt to gain unauthorized access to our systems</li>
                                <li className="tos-list-item">Interfere with or disrupt the website or servers</li>
                                <li className="tos-list-item">Collect or harvest information about other users</li>
                                <li className="tos-list-item">Use automated systems to access the website without permission</li>
                                <li className="tos-list-item">Impersonate any person or entity</li>
                            </ul>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">4. Product Information and Pricing</h2>

                            <h3 className="tos-subsection-title">4.1 Product Details</h3>
                            <p className="tos-paragraph">
                                We strive to provide accurate product information, specifications, and images.
                                However, we do not warrant that product descriptions, pricing, or other content
                                on the website is accurate, complete, reliable, current, or error-free.
                            </p>

                            <h3 className="tos-subsection-title">4.2 Pricing</h3>
                            <p className="tos-paragraph">
                                All prices are subject to change without notice. Prices may vary between our
                                showrooms and distributors. We reserve the right to modify prices at any time.
                                Any pricing errors on our website will be corrected, and you will have the
                                opportunity to cancel your order if the correct price is higher than stated.
                            </p>

                            <h3 className="tos-subsection-title">4.3 Product Availability</h3>
                            <p className="tos-paragraph">
                                Product availability may vary by location and distributor. We do not guarantee
                                that products shown on our website will be available at all showrooms or through
                                all distributors.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">5. Orders and Quotations</h2>

                            <h3 className="tos-subsection-title">5.1 Order Process</h3>
                            <p className="tos-paragraph">
                                When you submit an inquiry or request through our contact or feedback forms, it
                                does not constitute a binding order. Our team or authorized distributors will
                                contact you to provide quotations and confirm order details.
                            </p>

                            <h3 className="tos-subsection-title">5.2 Order Acceptance</h3>
                            <p className="tos-paragraph">
                                We reserve the right to refuse or cancel any order for any reason, including
                                product availability, errors in pricing or product information, or suspicion
                                of fraudulent activity.
                            </p>

                            <h3 className="tos-subsection-title">5.3 Payment Terms</h3>
                            <p className="tos-paragraph">
                                Payment terms will be communicated by our showrooms or distributors at the time
                                of order confirmation. All payments must be made in accordance with the agreed terms.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">6. Delivery and Shipping</h2>
                            <p className="tos-paragraph">
                                Delivery terms, shipping costs, and timelines will be provided by our showrooms
                                or distributors based on your location and order details. We are not responsible
                                for delays caused by circumstances beyond our control.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">7. Returns and Refunds</h2>
                            <p className="tos-paragraph">
                                Returns and refund policies may vary by showroom and distributor. Please contact
                                the showroom or distributor from which you purchased products for information about
                                their specific return and refund policies. Generally, products must be in their
                                original condition and packaging to be eligible for return.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">8. Intellectual Property Rights</h2>

                            <h3 className="tos-subsection-title">8.1 Ownership</h3>
                            <p className="tos-paragraph">
                                All content on our website, including but not limited to text, graphics, logos,
                                images, and software, is the property of Vidma Super or its licensors and is
                                protected by copyright, trademark, and other intellectual property laws.
                            </p>

                            <h3 className="tos-subsection-title">8.2 Limited License</h3>
                            <p className="tos-paragraph">
                                We grant you a limited, non-exclusive, non-transferable license to access and use
                                our website for personal, non-commercial purposes. You may not reproduce, distribute,
                                modify, or create derivative works from our content without prior written permission.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">9. User-Generated Content</h2>
                            <p className="tos-paragraph">
                                When you submit feedback, reviews, or other content through our forms, you grant
                                Vidma Super a perpetual, worldwide, royalty-free license to use, reproduce, modify,
                                and display such content for business purposes. You represent that you have all
                                necessary rights to the content you submit.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">10. Warranties and Disclaimers</h2>

                            <h3 className="tos-subsection-title">10.1 Product Warranties</h3>
                            <p className="tos-paragraph">
                                Products sold by Vidma Super may be covered by manufacturer warranties. Specific
                                warranty information will be provided with your purchase. We make no additional
                                warranties beyond those provided by manufacturers.
                            </p>

                            <h3 className="tos-subsection-title">10.2 Website Disclaimer</h3>
                            <p className="tos-paragraph">
                                Our website and services are provided "as is" and "as available" without warranties
                                of any kind, either express or implied. We do not warrant that the website will be
                                uninterrupted, secure, or error-free.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">11. Limitation of Liability</h2>
                            <p className="tos-paragraph">
                                To the maximum extent permitted by law, Vidma Super shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages, or any loss of
                                profits or revenues, whether incurred directly or indirectly, or any loss of data,
                                use, goodwill, or other intangible losses resulting from:
                            </p>
                            <ul className="tos-list">
                                <li className="tos-list-item">Your use or inability to use our website or services</li>
                                <li className="tos-list-item">Any unauthorized access to or use of our servers</li>
                                <li className="tos-list-item">Any errors or omissions in website content</li>
                                <li className="tos-list-item">Any conduct or content of third parties on the website</li>
                            </ul>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">12. Indemnification</h2>
                            <p className="tos-paragraph">
                                You agree to indemnify, defend, and hold harmless Vidma Super, its affiliates,
                                showrooms, distributors, officers, directors, employees, and agents from any claims,
                                liabilities, damages, losses, and expenses, including reasonable attorneys' fees,
                                arising out of or related to your use of the website, violation of these Terms, or
                                infringement of any intellectual property or other rights of any person or entity.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">13. Third-Party Links</h2>
                            <p className="tos-paragraph">
                                Our website may contain links to third-party websites or services. We are not
                                responsible for the content, accuracy, or practices of these external sites.
                                Your use of third-party websites is at your own risk.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">14. Modifications to Terms</h2>
                            <p className="tos-paragraph">
                                We reserve the right to modify these Terms at any time. Changes will be effective
                                immediately upon posting on our website. Your continued use of the website after
                                changes are posted constitutes your acceptance of the modified Terms. We encourage
                                you to review these Terms periodically.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">15. Termination</h2>
                            <p className="tos-paragraph">
                                We reserve the right to terminate or suspend your access to our website immediately,
                                without prior notice or liability, for any reason, including breach of these Terms.
                                Upon termination, your right to use the website will immediately cease.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">16. Governing Law</h2>
                            <p className="tos-paragraph">
                                These Terms shall be governed by and construed in accordance with the laws of
                                Sri Lanka, without regard to its conflict of law provisions. Any disputes arising
                                from these Terms or your use of the website shall be subject to the exclusive
                                jurisdiction of the courts of Sri Lanka.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">17. Severability</h2>
                            <p className="tos-paragraph">
                                If any provision of these Terms is found to be invalid or unenforceable, the
                                remaining provisions will continue to be valid and enforceable to the fullest
                                extent permitted by law.
                            </p>
                        </section>

                        <section className="tos-section">
                            <h2 className="tos-section-title">18. Entire Agreement</h2>
                            <p className="tos-paragraph">
                                These Terms, together with our Privacy Policy, constitute the entire agreement
                                between you and Vidma Super regarding the use of our website and services,
                                superseding any prior agreements.
                            </p>
                        </section>

                        <div className="tos-contact-section">
                            <h2 className="tos-section-title">19. Contact Information</h2>
                            <p className="tos-paragraph">
                                If you have any questions or concerns about these Terms of Service, please
                                contact us:
                            </p>
                            <p className="tos-contact-details">
                                <strong className="tos-company-name">Vidma Super</strong><br />
                                Sri Lanka<br />
                                Phone: <a className="tos-contact-link">076 440 9691 , 077 138 0479</a><br />
                                Email: <a href="mailto:vidmaengineering@yahoo.com" className="tos-contact-link">vidmaengineering@yahoo.com</a>
                            </p>
                            <p className="tos-paragraph">
                                We will respond to your inquiry within a reasonable timeframe.
                            </p>
                        </div>

                        <hr className="tos-separator" />
                        <p className="tos-footer">
                            © 2025 Vidma Super. All rights reserved.
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
