import { useCallback, useEffect, useState } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { Backdrop, CircularProgress } from "@mui/material";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function MarketPlaceSection() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState("");
    const [imageS1, setImageS1] = useState<File | null>(null);
    const [imageS1Error, setImageS1Error] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [img, setImg] = useState<string>("");
    const [id, setId] = useState<number>(0);

    console.log(imageS1Error);    

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

        if (id === 0) {
            const formData = new FormData();
            formData.append("ProductName", name);
            formData.append("Description", description);
            formData.append("Color", colors);
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
            formData.append("ProductName", name);
            formData.append("Description", description);
            formData.append("Color", colors);
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

    const rowClick = (product: any) => {
        setName(product.productName);
        setDescription(product.description);
        setColors(product.color);
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