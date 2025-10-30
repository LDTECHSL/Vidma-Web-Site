import React, { useEffect } from "react";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { createLocation, deleteLocation, getLocations } from "../../services/home-api";
import { Backdrop, CircularProgress } from "@mui/material";
import { showError, showSuccess } from "../../components/Toast";

export default function ShowroomsSection() {

    const [open, setOpen] = React.useState(false);
    const [isExisting, setIsExisting] = React.useState(false);
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    const [locations, setLocations] = React.useState<any[]>([]);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleSubmit = async () => {

        setOpen(true);

        if (isExisting) {
            try {
                await createLocation({ id: selectedId, locationName: name, locationType: 1, googleMapLink: link }, token);
                showSuccess("Location created successfully");
            } catch (error) {
                showError("Error creating location");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            try {
                await createLocation({ locationName: name, locationType: 1, googleMapLink: link }, token);
                showSuccess("Location created successfully");
            } catch (error) {
                showError("Error creating location");
            } finally {
                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }

    }

    const handleGetLocationDetails = async () => {
        try {
            const response = await getLocations();
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching location details:", error);
        }
    }

    useEffect(() => {
        handleGetLocationDetails();
    }, []);

    const handleDelete = async (id: number) => {
        // confirmation alert
        const confirmed = window.confirm("Are you sure you want to delete this location?");
        if (!confirmed) return;
        try {
            await deleteLocation(id.toString(), token);
            showSuccess("Location deleted successfully");
        } catch (error) {
            showError("Error deleting location");
        } finally {
            setTimeout(() => {
                // window.location.reload();
            }, 1000);
        }
    }

    const onRowClick = (location: any) => {
        setName(location.locationName);
        setLink(location.googleMapLink);
        setSelectedId(location.id);
        setIsExisting(true);
    }

    return (
        <div>
            <BreadCrumb title="Showrooms Section" />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="admin-form-container">
                <form className="admin-form">
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>Location Name</label>
                            <input
                                type="text"
                                placeholder="Enter Location Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Location Link</label>
                            <input
                                type="text"
                                placeholder="Enter Location Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>

                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        <button type="button" disabled={!name || !link} className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                    <div>
                        {locations.length > 0 && (
                            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location Name</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Google Map Link</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.map((location) => (
                                        <tr key={location.id} onClick={() => onRowClick(location)} style={{ cursor: "pointer" }}>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{location.id}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{location.locationName}</td>
                                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{location.googleMapLink}</td>
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
                                                    onClick={() => handleDelete(location.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}