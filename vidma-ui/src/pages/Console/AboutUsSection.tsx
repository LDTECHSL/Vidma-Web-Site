import { Backdrop, CircularProgress } from "@mui/material";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useCallback, useEffect, useState } from "react";
import { createAboutUsMain, createAboutUsSub, getAboutUsMain, getAboutUsSub } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function AboutUsSection() {
    const [open, setOpen] = useState(false);
    const [EnglishDescription, setEnglishDescription] = useState("");
    const [SinhalaDescription, setSinhalaDescription] = useState("");
    const [TamilDescription, setTamilDescription] = useState("");


    const [EnglishDescriptionS1, setEnglishDescriptionS1] = useState("");
    const [SinhalaDescriptionS1, setSinhalaDescriptionS1] = useState("");
    const [TamilDescriptionS1, setTamilDescriptionS1] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageNo, setImageNo] = useState<string>("");
    const [imageLinkS1, setImageLinkS1] = useState<string>("");
    const [imageS1Error, setImageS1Error] = useState<string | null>("");
    const [sub, setSub] = useState<any[]>([]);

    const [isExisting, setIsExisting] = useState(false);
    const [isExisting1, setIsExisting1] = useState(false);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    console.log(imageS1Error);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            englishDesc: EnglishDescription,
            sinhalaDesc: SinhalaDescription,
            tamilDesc: TamilDescription
        }

        setOpen(true);
        try {
            await createAboutUsMain(body, token);
            showSuccess("About Us Main Content section created successfully");
        } catch (error) {
            showError("Failed to create About Us Main Content section");
        } finally {
            setOpen(false);
            handleGetAboutUsMain();
        }
    }

    const handleGetAboutUsMain = async () => {
        try {
            const res = await getAboutUsMain();
            setEnglishDescription(res.data.englishDesc);
            setSinhalaDescription(res.data.sinhalaDesc);
            setTamilDescription(res.data.tamilDesc);
            setIsExisting(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetAboutUsSub = async () => {
        try {
            const res = await getAboutUsSub();
            setSub(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetAboutUsMain();
        handleGetAboutUsSub();
    }, []);

    const handleSubmit1 = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const form = new FormData();
        form.append("EnglishDesc", EnglishDescriptionS1);
        form.append("SinhalaDesc", SinhalaDescriptionS1);
        form.append("TamilDesc", TamilDescriptionS1);
        form.append("ImageNumber", imageNo);
        if (imageS1) {
            form.append("Image", imageS1);
        }

        setOpen(true);
        try {
            await createAboutUsSub(form, token);
            showSuccess("About Us Sub Content section created successfully");
        } catch (error) {
            showError("Failed to create About Us Sub Content section");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

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

    const rowClick = (item: any) => {
        console.log(item);
        setEnglishDescriptionS1(item.englishDesc);
        setSinhalaDescriptionS1(item.sinhalaDesc);
        setTamilDescriptionS1(item.tamilDesc);
        setImageNo(item.imageNumber);
        setImageLinkS1(item.imageLink);
        setIsExisting1(true);
    }

    return (
        <div>
            <BreadCrumb title="About Us Section" />
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
            </div>

            <div style={{ margin: "35px 0", textAlign: "center", fontSize: "15px" }}>
                ____________________________________ Slides Section ____________________________________
            </div>
            <div className="admin-form-container">
                <form onSubmit={handleSubmit1} className="admin-form">
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescriptionS1}
                                onChange={(e) => setEnglishDescriptionS1(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescriptionS1}
                                onChange={(e) => setSinhalaDescriptionS1(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescriptionS1}
                                onChange={(e) => setTamilDescriptionS1(e.target.value)}
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

                    <div style={{ marginTop: "10px", color: "red" }}>
                        <img style={{width: "200px"}} src={imageLinkS1.replace("dl=0", "raw=1")} alt="" />
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>

                        {isExisting1 && (
                            <button type="button" className="submit-btn" onClick={handleSubmit1}>
                                Submit
                            </button>
                        )}
                    </div>

                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>English Description</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sinhala Description</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tamil Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.map((item, index) => (
                                    <tr key={index} onClick={() => rowClick(item)}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.englishDesc}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.sinhalaDesc}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.tamilDesc}</td>
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