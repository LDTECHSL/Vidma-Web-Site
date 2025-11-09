import React, { useCallback, useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { createGallery, createGalleryImage, deleteGalleryById, deleteGalleryImageById, getGallery, getGalleryById, updateGallery } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albumId, setAlbumId] = useState<any>(null);

  const token = sessionStorage.getItem("vidmaAuthToken") || "";

  const MAX_IMAGES = 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (albumId === null) {
      const formData = new FormData();
      formData.append("Title", name);
      images.forEach((image) => {
        formData.append("Images", image);
      });

      setOpen(true);
      try {
        await createGallery(formData, token);
        showSuccess("Gallery created successfully");
      } catch (error) {
        showError("Error creating gallery");
      } finally {
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      const formData = new FormData();
      formData.append("GalleryId", albumId);
      formData.append("Title", name);
      // formData.append("Image", images[0]);
      images.forEach((image) => {
        formData.append("Image", image);
      });

      setOpen(true);
      try {
        await createGalleryImage(formData, token);
        showSuccess("Gallery updated successfully");
      } catch (error) {
        showError("Error updating gallery");
      } finally {
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const handleUpdateGalleryName = async (name1:any) => {
    if(albumId === null) return;

    setOpen(true);

    try {
      await updateGallery({ galleryId: albumId, title: name1 }, token);
      showSuccess("Saved!");
    } catch (error) {
      showError("Error updating gallery");
    } finally {
      setOpen(false);
      handleGetAllGalleries();
    }
  };

  const handleGetAllGalleries = async () => {
    try {
      const response = await getGallery();
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching gallery details:", error);
    }
  };

  useEffect(() => {
    handleGetAllGalleries();
  }, []);

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

  const handleDeleteAlbum = async (albumId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;

    setOpen(true);
    try {
      await deleteGalleryById(albumId.toString(), token);
      showSuccess("Album deleted successfully");
    } catch (error) {
      showError("Error deleting album");
    } finally {
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    const confirmDelete1 = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete1) return;
    setOpen(true);
    try {
      await deleteGalleryImageById(imageId.toString(), token);
      showSuccess("Image deleted successfully");
      setSelectedAlbum((prev: any) => ({
        ...prev,
        images: prev.images.filter((img: any) => img.imageId !== imageId),
      }));
      if (albumId) {
        await rowClick(albumId);
      }
    } catch (error) {
      showError("Error deleting image");
    } finally {
      setOpen(false);
    }
  };

  const rowClick = async (albumId: number) => {
    try {
      const response = await getGalleryById(albumId.toString());
      setSelectedAlbum(response.data);
      setName(response.data.title);
    } catch (error) {
      showError("Error fetching album");
    }
  }

  return (
    <div>
      <BreadCrumb title="Gallery Section" />
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
                  handleUpdateGalleryName(e.target.value);
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
                  <div className="dropzone-hint">Each image must be 3:2 aspect ratio & Images size need to less than 30MB</div>
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

          <div>
            {selectedAlbum && (
              <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
                {selectedAlbum.images?.map((img: { imageId: number; imageUrl: string }, index: number) => (
                  <div key={img.imageId} style={{ position: "relative", marginRight: "10px" }}>
                    <img
                      src={img.imageUrl.replace("dl=0", "raw=1")}
                      alt={`Album Img ${index + 1}`}
                      style={{ width: "150px", borderRadius: "6px" }}
                    />
                    {/* Optional remove button */}
                    <button type="button" className="remove-btn" onClick={() => handleDeleteImage(img.imageId)}>🗑️</button>
                  </div>
                ))}
              </div>
            )}

          </div>

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
                  <tr key={album.id} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }} onClick={() => {
                    rowClick(album.galleryId);
                    setAlbumId(album.galleryId);
                  }}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{album.title}</td>
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
                        onClick={() => handleDeleteAlbum(album.galleryId)}
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
