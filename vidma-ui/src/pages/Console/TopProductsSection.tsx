import { useCallback, useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { createTopProducts, getTopProducts } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";
import { Backdrop, CircularProgress } from "@mui/material";

export default function TopProductsSection() {

    const [open, setOpen] = useState(false);
    const [isExisting, setIsExisting] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState("");
    const [materials, setMaterials] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>("");
    const [imageLinkS1, setImageLinkS1] = useState<string>("");
    const [productsList, setProductsList] = useState<any[]>([]);
    const [ProductName, setProductName] = useState("");

    console.log(imageS1Error);

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

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Description", description);
        formData.append("Colors", colors);
        formData.append("Materials", materials);
        if (imageS1) {
            formData.append("Image", imageS1);
        }
        formData.append("ProductName", ProductName);

        setOpen(true);
        try {
            await createTopProducts(formData, token);
            showSuccess("Top product created successfully");
        } catch (error) {
            showError("Error creating top product");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleGetProducts = async () => {
        try {
            const response = await getTopProducts();
            setProductsList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    const rowClick = (product: any) => {
        setIsExisting(true);
        setName(product.name);
        setDescription(product.description);
        setColors(product.colors);
        setMaterials(product.materials);
        setImageLinkS1(product.imageLink);
        setProductName(product.productName);
    };

    return (
        <div>
            <BreadCrumb title="Top Products Section" />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                        <label>Colors</label>
                        <input
                            type="text"
                            value={colors}
                            onChange={(e) => setColors(e.target.value)}
                            placeholder="Enter colors"
                        />
                    </div>

                    <div className="form-group">
                        <label>Materials</label>
                        <input
                            type="text"
                            value={materials}
                            onChange={(e) => setMaterials(e.target.value)}
                            placeholder="Enter materials"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
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
                <div style={{ marginTop: "10px", color: "red" }}>
                    {
                        imageLinkS1 !== null && (
                            <img style={{ width: "200px" }} src={imageLinkS1.replace("dl=0", "raw=1")} alt="" />
                        )
                    }

                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>

                    {isExisting && (
                        <button type="button" className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                </div>

                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product Name</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Colors</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Materials</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((product, index) => (
                                <tr key={product.id} onClick={() => rowClick(product)} style={{ cursor: "pointer" }}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.description}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.colors}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.materials}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}
