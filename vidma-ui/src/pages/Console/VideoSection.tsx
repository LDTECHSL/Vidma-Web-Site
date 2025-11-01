import { useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { showError, showSuccess } from "../../components/Toast";
import { createVideoSection, createVideoSectionVideos, deleteVideoSectionVideo, getVideoSection, getVideoSectionVideos } from "../../services/home-api";

export default function VideoSection() {
    const [open, setOpen] = useState(false);
    const [EnglishDescription, setEnglishDescription] = useState("");
    const [SinhalaDescription, setSinhalaDescription] = useState("");
    const [TamilDescription, setTamilDescription] = useState("");
    const [isExisting, setIsExisting] = useState(false);
    const [video, setVideo] = useState<string>("");
    const [videos, setVideos] = useState<any[]>([]);

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

    const handleSubmitVideo = async () => {
        const body = {
            video: video
        }

        setOpen(true);
        try {
            await createVideoSectionVideos(body, token);
            showSuccess("Video added successfully");
        } catch (error) {
            console.error("Error creating video section:", error);
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

            if (response.data.englishDesc === "") {
                setIsExisting(false);
            } else {
                setIsExisting(true);
            }
        } catch (error) {
            console.error("Error fetching video section:", error);
        }
    }

    const handleGetVideos = async () => {
        try {
            const response = await getVideoSectionVideos();
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    const handleDeleteVideo = async (index: number) => {
        try {
            await deleteVideoSectionVideo(index.toString(), token);
            showSuccess("Video deleted successfully");
        } catch (error) {
            showError("Error deleting video");
        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    useEffect(() => {
        handleGetVideoSection();
        handleGetVideos();
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
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                    <button type="button" disabled={!video} className="submit-btn" onClick={handleSubmitVideo}>
                        Submit
                    </button>
                </div>

                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Video Link</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.map((vid, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "8px" }}>{index + 1}</td>
                                    <td style={{ padding: "8px" }}>{vid.videoLink}</td>
                                    <td style={{ padding: "8px" }}>
                                        <button type="button" style={{
                                            backgroundColor: "#f44336",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            textAlign: "center",
                                            textDecoration: "none",
                                            display: "inline-block",
                                            margin: "4px 2px",
                                            cursor: "pointer",
                                            borderRadius: "4px"
                                        }} onClick={() => handleDeleteVideo(vid.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    )
}