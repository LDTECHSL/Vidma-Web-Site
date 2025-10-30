import React, { useCallback, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const MAX_IMAGES = 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", { name, images });
  };

  const validateAspectRatio = (
    file: File,
    expectedRatio = 3 / 2,
    tolerance = 0.075
  ) =>
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
            message: `Invalid aspect ratio (${ratio.toFixed(
              2
            )}:1). Expected ~${expectedRatio.toFixed(2)} (3:2).`,
          });
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ ok: false, message: "Unable to read image." });
      };
      img.src = url;
    });

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const newImages: File[] = [];

      if (images.length + fileArray.length > MAX_IMAGES) {
        newErrors.push(`Maximum ${MAX_IMAGES} images allowed.`);
        setErrors(newErrors);
        return;
      }

      for (const file of fileArray) {
        if (!file.type.startsWith("image/")) {
          newErrors.push(`${file.name}: Not an image file.`);
          continue;
        }

        const { ok, message } = await validateAspectRatio(file);
        if (!ok) {
          newErrors.push(`${file.name}: ${message}`);
          continue;
        }

        newImages.push(file);
      }

      setImages((prev) => [...prev, ...newImages]);
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

  return (
    <div>
      <BreadCrumb title="Gallery Section" />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleInput}
            />
            {images.length === 0 ? (
              <div className="dropzone-content">
                <div className="dropzone-icon">⤓</div>
                <div className="dropzone-text">
                  Drop up to {MAX_IMAGES} images here or click to select
                  <div className="dropzone-hint">Each image must be 3:2 aspect ratio</div>
                </div>
              </div>
            ) : (
              <div className="preview-grid">
                {images.map((file, index) => (
                  <div key={index} className="preview-wrap2">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="preview-img1"
                    />
                    <div className="preview-actions">
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        Remove
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
        </form>
      </div>
    </div>
  );
}
