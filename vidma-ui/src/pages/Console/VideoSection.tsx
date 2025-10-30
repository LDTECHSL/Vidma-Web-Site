import { useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";

export default function VideoSection() {
    const [open, setOpen] = useState(false);
    const [EnglishDescription, setEnglishDescription] = useState("");
    const [SinhalaDescription, setSinhalaDescription] = useState("");
    const [TamilDescription, setTamilDescription] = useState("");
    const [isExisting, setIsExisting] = useState(false);

    const handleSubmit = async () => {
        // Handle form submission logic here
    };

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