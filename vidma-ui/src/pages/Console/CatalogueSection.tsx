import React, { useCallback, useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { createCatalogue, deleteCatalogue, getCatalogues } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function CatalogueSection() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const [albums, setAlbums] = useState<any[]>([]);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const MAX = 1;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === "" || images.length === 0) {
            showError("Please provide a title and at least one PDF file.");
            return;
        }

        setOpen(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", "Catalogue PDF");
        formData.append("catalogue", images[0]);

        try {
            await createCatalogue(formData, token);
            showSuccess("Catalogue created successfully!");
            setName("");
            setImages([]);
            handleGetAllCatalogues();
        } catch (error) {
            showError("Error creating catalogue");
        } finally {
            setOpen(false);
        }
    };

    const handleGetAllCatalogues = async () => {
        try {
            const response = await getCatalogues();
            setAlbums(response.data);
        } catch (error) {
            console.error("Error fetching gallery details:", error);
        }
    };

    useEffect(() => {
        handleGetAllCatalogues();
    }, []);

    const handleFiles = useCallback(
        async (files: FileList | null) => {
            if (!files) return;

            const fileArray = Array.from(files);
            const newErrors: string[] = [];
            const newImages: File[] = [];

            if (images.length >= MAX) {
                newErrors.push(`Only 1 PDF file allowed.`);
                setErrors(newErrors);
                return;
            }

            // Only take the first file
            const file = fileArray[0];
            if (!file) return;

            if (file.type !== "application/pdf") {
                newErrors.push(`${file.name}: Only PDF files are allowed.`);
                setErrors(newErrors);
                return;
            }

            newImages.push(file);
            setImages(newImages);
            setErrors(newErrors);
        },
        [images]
    );

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        e.target.value = ""; // reset
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteCatalogue = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this catalogue?");
        if (!confirmDelete) return;

        setOpen(true);
        try {
            await deleteCatalogue(id.toString(), token);
            showSuccess("Catalogue deleted successfully");
        } catch (error) {
            showError("Error deleting catalogue");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
    return (
        <div>
            <BreadCrumb title="Catalogue Section" />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="admin-form-container">
                <form className="admin-form">
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Enter title"
                            />
                        </div>
                    </div>

                    {/* Dropzone */}
                    <div
                        className="dropzone"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("multi-file-input")?.click()}
                        role="button"
                        tabIndex={0}
                    >
                        <input
                            id="multi-file-input"
                            type="file"
                            accept=".pdf,application/pdf"
                            style={{ display: "none" }}
                            onChange={handleInput}
                        />
                        {images.length === 0 ? (
                            <div className="dropzone-content">
                                <div className="dropzone-icon">📄</div>
                                <div className="dropzone-text">
                                    Drop 1 PDF file here or click to select
                                    <div className="dropzone-hint">Only PDF files are accepted & File size should be less than 30MB</div>
                                </div>
                            </div>
                        ) : (
                            <div className="preview-grid">
                                {images.map((file, index) => (
                                    <div key={index} className="preview-wrap2">
                                        <div style={{ padding: "20px", textAlign: "center" }}>
                                            <div style={{ marginTop: "10px", wordBreak: "break-word" }}>{file.name}</div>
                                            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                        <div className="preview-actions">
                                            <button
                                                type="button"
                                                className="remove-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(index);
                                                }}
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {errors.length > 0 && (
                        <ul className="error-list">
                            {errors.map((err, idx) => (
                                <li key={idx} style={{ color: "red" }}>
                                    {err}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        <button type="submit" onClick={handleSubmit} disabled={!name || images.length === 0} className="submit-btn">
                            Submit
                        </button>
                    </div>

                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albums.map((album, index) => (
                                    <tr key={album.id} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{album.name}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: "#f0ad4e",
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
                                                // open catalogue in new tab (supports byte array or base64 payloads)
                                                onClick={() => {
                                                    const fileData = album.catalogueFile;
                                                    if (!fileData) {
                                                        showError("Catalogue file not found.");
                                                        return;
                                                    }

                                                    let url = "";

                                                    if (Array.isArray(fileData)) {
                                                        const blob = new Blob([new Uint8Array(fileData)], { type: "application/pdf" });
                                                        url = URL.createObjectURL(blob);
                                                    } else if (fileData instanceof ArrayBuffer) {
                                                        const blob = new Blob([fileData], { type: "application/pdf" });
                                                        url = URL.createObjectURL(blob);
                                                    } else if (typeof fileData === "string") {
                                                        const trimmed = fileData.trim();

                                                        // If we received a full data URL or an http/https link, use it directly
                                                        const isHttp = /^https?:\/\//i.test(trimmed);
                                                        const isDataUrl = /^data:application\/pdf/i.test(trimmed);

                                                        if (isHttp || isDataUrl) {
                                                            url = trimmed;
                                                        } else {
                                                            // Treat as base64-encoded PDF bytes
                                                            try {
                                                                const binary = atob(trimmed);
                                                                const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
                                                                const blob = new Blob([bytes], { type: "application/pdf" });
                                                                url = URL.createObjectURL(blob);
                                                            } catch (err) {
                                                                console.error("Failed to decode catalogue base64", err);
                                                            }
                                                        }
                                                    }

                                                    if (!url) {
                                                        showError("Unable to open catalogue file.");
                                                        return;
                                                    }

                                                    window.open(url, "_blank", "noopener,noreferrer");
                                                }}
                                            >
                                                View
                                            </button>
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
                                                onClick={() => handleDeleteCatalogue(album.id)}
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
