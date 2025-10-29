import { Backdrop, CircularProgress } from "@mui/material"
import "../../common/admin.css"
import BreadCrumb from "../../layouts/BreadCrumb"
import React from "react";

export default function ServicesSection() {

    const [open, setOpen] = React.useState(false);
    const [isExisting, setIsExisting] = React.useState(false);

    const [EnglishTitle, setEnglishTitle] = React.useState("");
    const [SinhalaTitle, setSinhalaTitle] = React.useState("");
    const [TamilTitle, setTamilTitle] = React.useState("");
    const [EnglishDescription, setEnglishDescription] = React.useState("");
    const [SinhalaDescription, setSinhalaDescription] = React.useState("");
    const [TamilDescription, setTamilDescription] = React.useState("");

    const handleSubmit = async () => {

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
                <form onSubmit={handleSubmit} className="admin-form">
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
                            <button type="button" className="submit-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}