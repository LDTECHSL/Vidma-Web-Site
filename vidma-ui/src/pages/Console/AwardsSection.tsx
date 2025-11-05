import { useCallback, useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { createAchievements, deleteAchievements, getAchievements, updateAchievements } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function AwardsSection() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>("");
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [img, setImg] = useState<string>("");
    const [id, setId] = useState<number | null>(null);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    console.log(imageS1Error);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            const formData = new FormData();
            formData.append("AchievementId", id?.toString() || "");
            formData.append("Name", title);
            formData.append("Year", year);
            if (imageS1) {
                formData.append("Image", imageS1);
            }

            setOpen(true);
            try {
                await updateAchievements(formData, token);
                showSuccess("Award updated successfully");
            } catch (error) {
                showError("Error updating award");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            const formData = new FormData();
            formData.append("Name", title);
            formData.append("Year", year);
            if (imageS1) {
                formData.append("Image", imageS1);
            }

            setOpen(true);

            try {
                await createAchievements(formData, token);
                showSuccess("Award created successfully");
            } catch (error) {
                showError("Error creating award");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    }

    const handleGetAchievements = async () => {
        try {
            const response = await getAchievements();
            setAchievements(response.data);
        } catch (error) {
            console.error("Error fetching achievements:", error);
        }
    }

    useEffect(() => {
        handleGetAchievements();
    }, []);

    // Generic drop handler factory for re-use
    const makeDropHandler = useCallback(
        (setFile: (f: File | null) => void, setError: (s: string | null) => void) => {
            return async (file?: File | null) => {
                setError(null);
                if (!file) {
                    setFile(null);
                    return;
                }
                // only single file allowed
                if (!file.type.startsWith("image/")) {
                    setError("Only image files are allowed.");
                    return;
                }

                setFile(file);
            };
        },
        []
    );
    // Handlers for each zone
    const handleFirstDrop = makeDropHandler(setImageS1, setImageS1Error);

    // helpers to wire drag events on elements
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, dropFn: (f: File | null) => void) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        dropFn(file);
        // reset input value so same file can be picked again if needed
        e.currentTarget.value = "";
    };

    // Remove helpers
    const removeFile = (setFile: (f: File | null) => void, setError: (s: string | null) => void) => {
        setFile(null);
        setError(null);
    };

    const rowClick = async (achievement: any) => {
        setIsEditing(true);
        setTitle(achievement.name);
        setYear(achievement.year);
        setImg(achievement.imageUrl);
        setId(achievement.id);
    }

    const handleDeleteAchievement = async (achievementId: number) => {
        // confirmation alert
        const confirmed = window.confirm("Are you sure you want to delete this award?");
        if (!confirmed) return;
        try {
            await deleteAchievements(achievementId.toString(), token);
            showSuccess("Award deleted successfully");
        } catch (error) {
            showError("Error deleting award");
        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <div>
            <BreadCrumb title="Awards Section" />
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
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter award title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Year</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Enter award year"
                            />
                        </div>
                    </div>
                    <div
                        className="dropzone"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                            handleFirstDrop(file);
                        }}
                        onClick={() => {
                            const el = document.getElementById("first-file-input") as HTMLInputElement | null;
                            el?.click();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="first-file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileInput(e, handleFirstDrop)}
                        />
                        {!imageS1 ? (
                            <div className="dropzone-content">
                                <div className="dropzone-icon">⤓</div>
                                <div className="dropzone-text">
                                    Drop image here or click to select
                                    <div className="dropzone-hint">Only one image (3:2 aspect ratio)</div>
                                </div>
                            </div>
                        ) : (
                            <div className="preview-wrap1">
                                <img
                                    src={URL.createObjectURL(imageS1)}
                                    alt="Slide 1 Preview"
                                    className="preview-img1"
                                />
                                <div className="preview-actions">
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeFile(setImageS1, setImageS1Error);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        {isEditing && (
                            <div style={{ marginTop: "10px" }}>
                                <label>Existing Image:</label>
                                <div className="preview-wrap1">
                                    {img && <img src={img.replace("dl=0", "raw=1")} alt="Existing" className="preview-img1" />}
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        <button type="button" disabled={!title || !year} className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Year</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {achievements.map((achievement, index) => (
                                    <tr key={achievement.id} onClick={() => rowClick(achievement)} style={{ cursor: "pointer" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{achievement.name}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{achievement.year}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                            <button
                                                type="button"
                                                style={{
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
                                                }}
                                                className="remove-btn"
                                                onClick={() => handleDeleteAchievement(achievement.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div >
        </div >
    );
}