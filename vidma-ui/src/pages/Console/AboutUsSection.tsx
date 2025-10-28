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

    const [EnglishDescriptionS2, setEnglishDescriptionS2] = useState("");
    const [SinhalaDescriptionS2, setSinhalaDescriptionS2] = useState("");
    const [TamilDescriptionS2, setTamilDescriptionS2] = useState("");
    const [imageS2, setImageS2] = useState<File | null>(null);
    const [imageS2Error, setImageS2Error] = useState<string | null>("");


    const [EnglishDescriptionS3, setEnglishDescriptionS3] = useState("");
    const [SinhalaDescriptionS3, setSinhalaDescriptionS3] = useState("");
    const [TamilDescriptionS3, setTamilDescriptionS3] = useState("");
    const [imageS3, setImageS3] = useState<File | null>(null);
    const [imageS3Error, setImageS3Error] = useState<string | null>("");

    const [EnglishDescriptionS4, setEnglishDescriptionS4] = useState("");
    const [SinhalaDescriptionS4, setSinhalaDescriptionS4] = useState("");
    const [TamilDescriptionS4, setTamilDescriptionS4] = useState("");
    const [imageS4, setImageS4] = useState<File | null>(null);
    const [imageS4Error, setImageS4Error] = useState<string | null>("");

    const [EnglishDescriptionS5, setEnglishDescriptionS5] = useState("");
    const [SinhalaDescriptionS5, setSinhalaDescriptionS5] = useState("");
    const [TamilDescriptionS5, setTamilDescriptionS5] = useState("");
    const [imageS5, setImageS5] = useState<File | null>(null);
    const [imageS5Error, setImageS5Error] = useState<string | null>("");
    const [isExisting, setIsExisting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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
    const handleSecondDrop = makeDropHandler(setImageS2, setImageS2Error);
    const handleThirdDrop = makeDropHandler(setImageS3, setImageS3Error);
    const handleFourthDrop = makeDropHandler(setImageS4, setImageS4Error);
    const handleFifthDrop = makeDropHandler(setImageS5, setImageS5Error);

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

                    {/* Slide 1 */}
                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ margin: "15px 0", textAlign: "left" }}>Slide 1</div>
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

                    {/* Slide 2 */}
                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ margin: "15px 0", textAlign: "left" }}>Slide 2</div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescriptionS2}
                                onChange={(e) => setEnglishDescriptionS2(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescriptionS2}
                                onChange={(e) => setSinhalaDescriptionS2(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescriptionS2}
                                onChange={(e) => setTamilDescriptionS2(e.target.value)}
                            />
                        </div>

                    </div>
                    <div
                        className="dropzone"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                            handleSecondDrop(file);
                        }}
                        onClick={() => {
                            const el = document.getElementById("second-file-input") as HTMLInputElement | null;
                            el?.click();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="second-file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileInput(e, handleSecondDrop)}
                        />
                        {!imageS2 ? (
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
                                    src={URL.createObjectURL(imageS2)}
                                    alt="Slide 2 Preview"
                                    className="preview-img1"
                                />
                                <div className="preview-actions">
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeFile(setImageS2, setImageS2Error);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Slide 3 */}

                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ margin: "15px 0", textAlign: "left" }}>Slide 3</div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescriptionS3}
                                onChange={(e) => setEnglishDescriptionS3(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescriptionS3}
                                onChange={(e) => setSinhalaDescriptionS3(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescriptionS3}
                                onChange={(e) => setTamilDescriptionS3(e.target.value)}
                            />
                        </div>

                    </div>
                    <div
                        className="dropzone"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                            handleThirdDrop(file);
                        }}
                        onClick={() => {
                            const el = document.getElementById("third-file-input") as HTMLInputElement | null;
                            el?.click();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="third-file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileInput(e, handleThirdDrop)}
                        />
                        {!imageS3 ? (
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
                                    src={URL.createObjectURL(imageS3)}
                                    alt="Slide 3 Preview"
                                    className="preview-img1"
                                />
                                <div className="preview-actions">
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeFile(setImageS3, setImageS3Error);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Slide 4 */}

                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ margin: "15px 0", textAlign: "left" }}>Slide 4</div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescriptionS4}
                                onChange={(e) => setEnglishDescriptionS4(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescriptionS4}
                                onChange={(e) => setSinhalaDescriptionS4(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescriptionS4}
                                onChange={(e) => setTamilDescriptionS4(e.target.value)}
                            />
                        </div>

                    </div>
                    <div
                        className="dropzone"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                            handleFourthDrop(file);
                        }}
                        onClick={() => {
                            const el = document.getElementById("fourth-file-input") as HTMLInputElement | null;
                            el?.click();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="fourth-file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileInput(e, handleFourthDrop)}
                        />
                        {!imageS4 ? (
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
                                    src={URL.createObjectURL(imageS4)}
                                    alt="Slide 4 Preview"
                                    className="preview-img1"
                                />
                                <div className="preview-actions">
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeFile(setImageS4, setImageS4Error);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Slide 5 */}

                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ margin: "15px 0", textAlign: "left" }}>Slide 5</div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>English Description</label>
                            <textarea
                                placeholder="Enter English description"
                                value={EnglishDescriptionS5}
                                onChange={(e) => setEnglishDescriptionS5(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sinhala Description</label>
                            <textarea
                                placeholder="Enter Sinhala description"
                                value={SinhalaDescriptionS5}
                                onChange={(e) => setSinhalaDescriptionS5(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tamil Description</label>
                            <textarea
                                placeholder="Enter Tamil description"
                                value={TamilDescriptionS5}
                                onChange={(e) => setTamilDescriptionS5(e.target.value)}
                            />
                        </div>

                    </div>
                    <div
                        className="dropzone"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                            handleFifthDrop(file);
                        }}
                        onClick={() => {
                            const el = document.getElementById("fifth-file-input") as HTMLInputElement | null;
                            el?.click();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="fifth-file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileInput(e, handleFifthDrop)}
                        />
                        {!imageS5 ? (
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
                                    src={URL.createObjectURL(imageS5)}
                                    alt="Slide 5 Preview"
                                    className="preview-img1"
                                />
                                <div className="preview-actions">
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeFile(setImageS5, setImageS5Error);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
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
    );
}