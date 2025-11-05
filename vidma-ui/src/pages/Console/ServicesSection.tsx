import { Backdrop, CircularProgress } from "@mui/material"
import "../../common/admin.css"
import BreadCrumb from "../../layouts/BreadCrumb"
import React, { useEffect } from "react";
import { createServices, getServices } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function ServicesSection() {

    const [open, setOpen] = React.useState(false);
    const [isExisting, setIsExisting] = React.useState(false);

    const [EnglishTitle, setEnglishTitle] = React.useState("");
    const [SinhalaTitle, setSinhalaTitle] = React.useState("");
    const [TamilTitle, setTamilTitle] = React.useState("");
    const [EnglishDescription, setEnglishDescription] = React.useState("");
    const [SinhalaDescription, setSinhalaDescription] = React.useState("");
    const [TamilDescription, setTamilDescription] = React.useState("");

    const [servicesData, setServicesData] = React.useState<any[]>([]);
    const [serviceName, setServiceName] = React.useState("");

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleSubmit = async () => {

        const body = {
            serviceName: serviceName,
            englishTitle: EnglishTitle,
            sinhalaTitle: SinhalaTitle,
            tamilTitle: TamilTitle,
            englishDesc: EnglishDescription,
            sinhalaDesc: SinhalaDescription,
            tamilDesc: TamilDescription
        }

        setOpen(true);
        try {
            await createServices(body, token);
            showSuccess("Service updated successfully");
        } catch (error) {
            showError("Error updating service");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleGetServices = async () => {
        try {
            const response = await getServices();
            setServicesData(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    useEffect(() => {
        handleGetServices();
    }, []);

    const rowClick = (service:any) => {
        setIsExisting(true);
        setServiceName(service.serviceName);
        setEnglishTitle(service.englishTitle);
        setSinhalaTitle(service.sinhalaTitle);
        setTamilTitle(service.tamilTitle);
        setEnglishDescription(service.englishDesc);
        setSinhalaDescription(service.sinhalaDesc);
        setTamilDescription(service.tamilDesc);
    }

    return (
        <div>
            <BreadCrumb title="Services Section" />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="admin-form-container">
                <form className="admin-form">
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Title</label>
                            <input
                                type="text"
                                placeholder="Enter English Title"
                                value={EnglishTitle}
                                onChange={(e) => setEnglishTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Title</label>
                            <input
                                type="text"
                                placeholder="Enter Sinhala Title"
                                value={SinhalaTitle}
                                onChange={(e) => setSinhalaTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Title</label>
                            <input
                                type="text"
                                placeholder="Enter Tamil Title"
                                value={TamilTitle}
                                onChange={(e) => setTamilTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescription}
                                onChange={(e) => setEnglishDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescription}
                                onChange={(e) => setSinhalaDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescription}
                                onChange={(e) => setTamilDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>

                        {isExisting && (
                            <button type="button" disabled={EnglishTitle === "" || SinhalaTitle === "" || TamilTitle === "" || EnglishDescription === "" || SinhalaDescription === "" || TamilDescription === ""} className="submit-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>

                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title (EN)</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title (SI)</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title (TA)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicesData.map((service) => (
                                    <tr key={service.id} onClick={() => rowClick(service)} style={{ cursor: "pointer" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{service.serviceName.split("Service")[1]}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{service.englishTitle}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{service.sinhalaTitle}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{service.tamilTitle}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}