import { Backdrop, CircularProgress } from "@mui/material";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useCallback, useEffect, useState } from "react";
import { createTeams, deleteTeams, getTeams, updateTeams } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function TeamsSection() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>("");
    const [isEditing, setIsEditing] = useState(false);
    const [teamsData, setTeamsData] = useState<any[]>([]);
    const [img, setImg] = useState<string>("");
    const [id, setId] = useState<number | null>(null);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    console.log(imageS1Error);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            const formData = new FormData();
            formData.append("MemberId", id ? id.toString() : "");
            formData.append("Name", name);
            formData.append("Position", position);
            if (imageS1) {
                formData.append("ImageUrl", imageS1);
            }

            setOpen(true);
            try {
                await updateTeams(formData, token);
            } catch (error) {
                showError("Error updating team member");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Position", position);
            if (imageS1) {
                formData.append("ImageUrl", imageS1);
            }

            setOpen(true);
            try {
                await createTeams(formData, token);
                showSuccess("Team member created successfully");
            } catch (error) {
                showError("Error creating team member");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    }

    const handleDeleteTeam = async (id: number) => {

        const confirmed = window.confirm("Are you sure you want to delete this team member?");
        if (!confirmed) return;

        try {
            await deleteTeams(id.toString(), token);
            showSuccess("Team member deleted successfully");
        } catch (error) {
            showError("Error deleting team member");
        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleGetTeams = async () => {
        try {
            const response = await getTeams();
            setTeamsData(response.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }

    useEffect(() => {
        handleGetTeams();
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

    const rowClick = (team: any) => {
        setIsEditing(true);
        setName(team.name);
        setPosition(team.position);
        setImg(team.imageUrl);
        setId(team.id);
    }

    return (
        <div>
            <BreadCrumb title="Teams Section" />
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
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Enter position"
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
                                    {/* <div className="dropzone-hint">Only one image (3:2 aspect ratio)</div> */}
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
                            <div>Existing Image : <img src={img.replace("dl=0", "raw=1")} alt="Existing" style={{ width: "100px", height: "auto" }} /></div>

                        )}
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        <button type="button" disabled={!name || !position} className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Position</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamsData.map((team) => (
                                    <tr key={team.id} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }} onClick={() => rowClick(team)}>
                                        <td style={{ padding: "8px" }}>{team.id}</td>
                                        <td style={{ padding: "8px" }}>{team.name}</td>
                                        <td style={{ padding: "8px" }}>{team.position}</td>
                                        <td style={{ padding: "8px" }}>
                                            <button
                                                type="button"
                                                className="remove-btn"
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
                                                onClick={() => handleDeleteTeam(team.id)}
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
            </div>
        </div>
    );
}
