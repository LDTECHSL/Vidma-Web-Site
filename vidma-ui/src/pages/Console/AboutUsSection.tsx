import { Backdrop, CircularProgress, Divider } from "@mui/material";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useCallback, useState } from "react";

export default function AboutUsSection() {
    const [open, setOpen] = useState(false);
    const [EnglishDescription, setEnglishDescription] = useState("");
    const [SinhalaDescription, setSinhalaDescription] = useState("");
    const [TamilDescription, setTamilDescription] = useState("");


    const [EnglishDescriptionS1, setEnglishDescriptionS1] = useState("");
    const [SinhalaDescriptionS1, setSinhalaDescriptionS1] = useState("");
    const [TamilDescriptionS1, setTamilDescriptionS1] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>("");

    const [isExisting, setIsExisting] = useState(false);
    const [isExisting1, setIsExisting1] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    const handleSubmit1 = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    const validateAspectRatio = (file: File, expectedRatio = 3 / 2, tolerance = 0.075) =>
        new Promise<{ ok: boolean; message?: string }>((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                const ratio = img.width / img.height;
                URL.revokeObjectURL(url);
                const min = expectedRatio - expectedRatio * tolerance;
                const max = expectedRatio + expectedRatio * tolerance;
                if (ratio >= min && ratio <= max) {
                    resolve({ ok: true });
                } else {
                    resolve({
                        ok: false,
                        message: `Invalid aspect ratio. Found ${ratio.toFixed(
                            2
                        )}:1 — expected ~${expectedRatio.toFixed(2)} (3:2).`,
                    });
                }
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve({ ok: false, message: "Unable to read image." });
            };
            img.src = url;
        });

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

                const { ok, message } = await validateAspectRatio(file);
                if (!ok) {
                    setError(message || "Invalid image.");
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
                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        {isExisting1 && (
                            <button
                                type="button"
                                className="edit-btn"
                                style={{ marginRight: "10px" }}
                                onClick={() => setIsExisting1(false)}
                            >
                                Edit
                            </button>
                        )}

                        {!isExisting1 && (
                            <button type="button" className="submit-btn" onClick={handleSubmit1}>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}