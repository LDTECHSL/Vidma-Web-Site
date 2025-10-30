import { useCallback, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";

export default function AwardsSection() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
        <BreadCrumb title="Awards Section" />
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
                </form>
            </div>
    </div>
  );
}