import { useCallback, useEffect, useRef, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

const DEFAULT_MARKETPLACE_COLORS = [
    "#7e2b4a",
    "#ef3d2f",
    "#6f2d33",
    "#ead29a",
    "#2f3138",
    "#868b60",
    "#2e6b54",
    "#2f4fa3",
    "#0d7f8a",
    "#ffffff",
    "#c7c1c1",
    "#8f939b"
];

const MATERIAL_OPTIONS = ["Supershine", "Vidma", "Union"];

export default function MarketPlaceSection() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColors, setSelectedColors] = useState<string[]>(DEFAULT_MARKETPLACE_COLORS);
    const [colorPickerValue, setColorPickerValue] = useState(DEFAULT_MARKETPLACE_COLORS[0]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [isMaterialDropdownOpen, setIsMaterialDropdownOpen] = useState(false);
    const [thicknessInput, setThicknessInput] = useState("");
    const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
    const [thicknessError, setThicknessError] = useState("");
    const [lengthInput, setLengthInput] = useState("");
    const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
    const [lengthError, setLengthError] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [img, setImg] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const colorInputRef = useRef<HTMLInputElement | null>(null);
    const materialDropdownRef = useRef<HTMLDivElement | null>(null);

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

                const isSquareImage = await new Promise<boolean>((resolve) => {
                    const tempImage = new Image();
                    const tempUrl = URL.createObjectURL(file);

                    tempImage.onload = () => {
                        const isSquare = tempImage.width === tempImage.height;
                        URL.revokeObjectURL(tempUrl);
                        resolve(isSquare);
                    };

                    tempImage.onerror = () => {
                        URL.revokeObjectURL(tempUrl);
                        resolve(false);
                    };

                    tempImage.src = tempUrl;
                });

                if (!isSquareImage) {
                    setError("Only square images are allowed (1:1 ratio).");
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

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const normalizeColorHex = (value: string) => value.trim().toLowerCase();

    const addColor = (value: string) => {
        const normalized = normalizeColorHex(value);
        if (!normalized) {
            return;
        }

        setSelectedColors((prev) => {
            if (prev.includes(normalized)) {
                return prev;
            }
            return [...prev, normalized];
        });
    };

    const removeColor = (value: string) => {
        setSelectedColors((prev) => prev.filter((color) => color !== value));
    };

    const toggleMaterial = (material: string) => {
        setSelectedMaterials((prev) => {
            if (prev.includes(material)) {
                return prev.filter((item) => item !== material);
            }
            return [...prev, material];
        });
    };

    const removeMaterial = (material: string) => {
        setSelectedMaterials((prev) => prev.filter((item) => item !== material));
    };

    const addThickness = (value: string) => {
        const normalized = value.trim();
        const decimalPattern = /^\d*\.?\d+$/;

        if (!normalized) {
            return;
        }

        if (!decimalPattern.test(normalized)) {
            setThicknessError("Only numbers with decimals are allowed.");
            return;
        }

        setSelectedThicknesses((prev) => {
            if (prev.includes(normalized)) {
                return prev;
            }
            return [...prev, normalized];
        });
        setThicknessInput("");
        setThicknessError("");
    };

    const removeThickness = (value: string) => {
        setSelectedThicknesses((prev) => prev.filter((item) => item !== value));
    };

    const handleThicknessInputChange = (value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setThicknessInput(value);
            if (thicknessError) {
                setThicknessError("");
            }
        }
    };

    const addLength = (value: string) => {
        const normalized = value.trim();
        const decimalPattern = /^\d*\.?\d+$/;

        if (!normalized) {
            return;
        }

        if (!decimalPattern.test(normalized)) {
            setLengthError("Only numbers with decimals are allowed.");
            return;
        }

        setSelectedLengths((prev) => {
            if (prev.includes(normalized)) {
                return prev;
            }
            return [...prev, normalized];
        });
        setLengthInput("");
        setLengthError("");
    };

    const removeLength = (value: string) => {
        setSelectedLengths((prev) => prev.filter((item) => item !== value));
    };

    const handleLengthInputChange = (value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setLengthInput(value);
            if (lengthError) {
                setLengthError("");
            }
        }
    };

    const handleSubmit = async () => {
        const trimmedName = name.trim();
        const colors = selectedColors.join(",");
        const materials = selectedMaterials.join(",");
        const thicknesses = selectedThicknesses.join(",");
        const lengths = selectedLengths.join(",");

        if (!trimmedName) {
            showError("Product name is required.");
            return;
        }

        const hasImage = !!imageS1 || !!img;
        if (!hasImage) {
            showError("Image is required.");
            return;
        }

        if (id === 0) {
            const formData = new FormData();
            formData.append("ProductName", trimmedName);
            formData.append("Description", description);
            formData.append("Color", colors);
            formData.append("Material", materials);
            formData.append("Thickness", thicknesses);
            formData.append("Length", lengths);
            if (imageS1) {
                formData.append("Image", imageS1);
            }

            setOpen(true);
            try {
                await addProduct(formData, token);
                showSuccess("Product added successfully!");
            } catch (error) {
                showError("Failed to add product. Please try again.");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            const formData = new FormData();
            formData.append("ProductId", id.toString());
            formData.append("ProductName", trimmedName);
            formData.append("Description", description);
            formData.append("Color", colors);
            formData.append("Material", materials);
            formData.append("Thickness", thicknesses);
            if (imageS1) {
                formData.append("Image", imageS1);
            }

            setOpen(true);
            try {
                await updateProduct(formData, token);
                showSuccess("Product updated successfully!");
            } catch (error) {
                showError("Failed to update product. Please try again.");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setOpen(true);
        try {
            await deleteProduct(id.toString(), token);
            showSuccess("Product deleted successfully!");
        } catch (error) {
            showError("Failed to delete product. Please try again.");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const handleGetProducts = async () => {
        try {
            const response = await getAllProducts()
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (materialDropdownRef.current && !materialDropdownRef.current.contains(event.target as Node)) {
                setIsMaterialDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const rowClick = (product: any) => {
        setName(product.productName);
        setDescription(product.description);
        const productColors = (product.color || "")
            .split(",")
            .map((color: string) => normalizeColorHex(color))
            .filter((color: string) => !!color);
        setSelectedColors(productColors);
        if (productColors.length > 0) {
            setColorPickerValue(productColors[0]);
        }
        const productMaterials = (product.material || "")
            .split(",")
            .map((material: string) => material.trim())
            .filter((material: string) => !!material);
        setSelectedMaterials(productMaterials);
        const productThicknesses = (product.thickness || "")
            .split(",")
            .map((thickness: string) => thickness.trim())
            .filter((thickness: string) => !!thickness);
        setSelectedThicknesses(productThicknesses);
        const productLengths = (product.length || "")
            .split(",")
            .map((length: string) => length.trim())
            .filter((length: string) => !!length);
        setSelectedLengths(productLengths);
        setThicknessInput("");
        setThicknessError("");
        setLengthInput("");
        setLengthError("");
        setImg(product.imageUrl);
        setId(product.id);
    }

    return (
        <div>
            <BreadCrumb title="MarketPlace" />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <form className="admin-form">
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Colors</label>
                    <div className="multi-color-picker">
                        <div className="multi-color-picker-controls">
                            <input
                                type="color"
                                ref={colorInputRef}
                                value={colorPickerValue}
                                onChange={(e) => setColorPickerValue(normalizeColorHex(e.target.value))}
                                className="hidden-color-input"
                                aria-label="Pick color"
                            />
                            <button
                                type="button"
                                className="color-picker-trigger"
                                onClick={() => colorInputRef.current?.click()}
                                aria-label="Open color picker"
                            >
                                <span className="picker-current-color" style={{ backgroundColor: colorPickerValue }} />
                                <span className="picker-icon">🎨</span>
                            </button>
                            <button
                                type="button"
                                className="add-color-btn"
                                onClick={() => addColor(colorPickerValue)}
                                aria-label="Add selected color"
                            >
                                +
                            </button>
                        </div>

                        <div className="selected-colors-list">
                            {selectedColors.length === 0 ? (
                                <span className="selected-colors-empty">No colors selected yet</span>
                            ) : (
                                selectedColors.map((color) => (
                                    <div className="selected-color-chip" key={color}>
                                        <span className="selected-color-swatch" style={{ backgroundColor: color }} />
                                        <span className="selected-color-value">{color.toUpperCase()}</span>
                                        <button
                                            type="button"
                                            className="selected-color-remove"
                                            onClick={() => removeColor(color)}
                                            aria-label={`Remove ${color}`}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Materials</label>
                    <div className="multi-select-dropdown" ref={materialDropdownRef}>
                        <button
                            type="button"
                            className="multi-select-trigger"
                            onClick={() => setIsMaterialDropdownOpen((prev) => !prev)}
                            aria-expanded={isMaterialDropdownOpen}
                            aria-label="Select materials"
                        >
                            <span>
                                {selectedMaterials.length > 0
                                    ? `${selectedMaterials.length} material${selectedMaterials.length > 1 ? "s" : ""} selected`
                                    : "Select materials"}
                            </span>
                            <span className={`multi-select-arrow ${isMaterialDropdownOpen ? "open" : ""}`}>⌄</span>
                        </button>

                        {isMaterialDropdownOpen && (
                            <div className="multi-select-menu">
                                {MATERIAL_OPTIONS.map((material) => {
                                    const isChecked = selectedMaterials.includes(material);
                                    return (
                                        <label key={material} className="multi-select-option">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleMaterial(material)}
                                            />
                                            <span>{material}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        <div className="selected-materials-list">
                            {selectedMaterials.length === 0 ? (
                                <span className="selected-materials-empty">No materials selected yet</span>
                            ) : (
                                selectedMaterials.map((material) => (
                                    <div key={material} className="selected-material-chip">
                                        <span className="selected-material-value">{material}</span>
                                        <button
                                            type="button"
                                            className="selected-material-remove"
                                            onClick={() => removeMaterial(material)}
                                            aria-label={`Remove ${material}`}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Thickness (mm)</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={thicknessInput}
                            onChange={(e) => handleThicknessInputChange(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addThickness(thicknessInput);
                                }
                            }}
                            placeholder="Type thickness and press Enter"
                            className="decimal-input-no-spinner"
                            aria-label="Thickness value"
                        />
                    {thicknessError && <div className="thickness-error-text">{thicknessError}</div>}

                    <div className="selected-thicknesses-list">
                        {selectedThicknesses.length === 0 ? (
                            <span className="selected-thicknesses-empty">No thickness values added yet</span>
                        ) : (
                            selectedThicknesses.map((thickness) => (
                                <div className="selected-thickness-chip" key={thickness}>
                                    <span className="selected-thickness-value">{thickness}</span>
                                    <button
                                        type="button"
                                        className="selected-thickness-remove"
                                        onClick={() => removeThickness(thickness)}
                                        aria-label={`Remove ${thickness}`}
                                    >
                                        x
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Length (ft)</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={lengthInput}
                        onChange={(e) => handleLengthInputChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addLength(lengthInput);
                            }
                        }}
                        placeholder="Type length and press Enter"
                        className="decimal-input-no-spinner"
                        aria-label="Length value"
                    />
                    {lengthError && <div className="length-error-text">{lengthError}</div>}

                    <div className="selected-lengths-list">
                        {selectedLengths.length === 0 ? (
                            <span className="selected-lengths-empty">No length values added yet</span>
                        ) : (
                            selectedLengths.map((length) => (
                                <div className="selected-length-chip" key={length}>
                                    <span className="selected-length-value">{length}</span>
                                    <button
                                        type="button"
                                        className="selected-length-remove"
                                        onClick={() => removeLength(length)}
                                        aria-label={`Remove ${length}`}
                                    >
                                        x
                                    </button>
                                </div>
                            ))
                        )}
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
                                <div className="dropzone-hint">Only one image</div>
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

                {imageS1Error && <div className="error-text">{imageS1Error}</div>}

                <div style={{ marginTop: "10px", color: "red" }}>
                    {
                        img !== null && (
                            <img style={{ width: "200px" }} src={img.replace("dl=0", "raw=1")} alt="" />
                        )
                    }

                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>

                    <button type="button" className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Product Name</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) => (
                                    <tr key={item.id} onClick={() => rowClick(item)} style={{ cursor: "pointer" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.productName}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                            <button
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.id);
                                                }}
                                                type="button" >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}