import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { showError, showSuccess } from "../../components/Toast";
import { createVideoSection, getVideoSection } from "../../services/home-api";

export default function VideoSection() {
    const [open, setOpen] = useState(false);
    const [EnglishDescription, setEnglishDescription] = useState("");
    const [SinhalaDescription, setSinhalaDescription] = useState("");
    const [TamilDescription, setTamilDescription] = useState("");
    const [isExisting, setIsExisting] = useState(false);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleSubmit = async () => {
        const body = {
            englishDesc: EnglishDescription,
            sinhalaDesc: SinhalaDescription,
            tamilDesc: TamilDescription
        }

        setOpen(true);
        try {
            await createVideoSection(body, token);
            showSuccess("Video section updated successfully");
        } catch (error) {
            showError("Error updating video section");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const handleGetVideoSection = async () => {
        try {
            const response = await getVideoSection();
            setEnglishDescription(response.data.englishDesc);
            setSinhalaDescription(response.data.sinhalaDesc);
            setTamilDescription(response.data.tamilDesc);

            if(response.data.englishDesc === ""){
                setIsExisting(false);
            } else {
                setIsExisting(true);
            }
        } catch (error) {
            console.error("Error fetching video section:", error);
        }
    }

    useEffect(() => {
        handleGetVideoSection();
    }, []);

    return (
        <div>
            <BreadCrumb title="Video Section" />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form className="admin-form">
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group">
                        <label>English Description</label>
                        <textarea
                            placeholder="Enter English description"
                            disabled={isExisting}
                            value={EnglishDescription}
                            onChange={(e) => setEnglishDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sinhala Description</label>
                        <textarea
                            placeholder="Enter Sinhala description"
                            disabled={isExisting}
                            value={SinhalaDescription}
                            onChange={(e) => setSinhalaDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tamil Description</label>
                        <textarea
                            placeholder="Enter Tamil description"
                            disabled={isExisting}
                            value={TamilDescription}
                            onChange={(e) => setTamilDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
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
                        <button type="button" disabled={!EnglishDescription || !SinhalaDescription || !TamilDescription} className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                </div>
            </form>

            <div style={{ margin: "35px 0", textAlign: "center", fontSize: "15px" }}>
                ____________________________________ Videos Section ____________________________________
            </div>

            <form className="admin-form">
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group">
                        <label>Video Link (Youtube) </label>
                        <input
                            type="text"
                            placeholder="Enter Video Link"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}