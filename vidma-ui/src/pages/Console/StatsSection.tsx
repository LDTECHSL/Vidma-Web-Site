import { Backdrop, CircularProgress } from "@mui/material";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useEffect, useState } from "react";
import { createStats, getStats } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function StatsSection() {
    const [open, setOpen] = useState(false);
    const [experienceYears, setExperienceYears] = useState("");
    const [projectsCompleted, setProjectsCompleted] = useState("");
    const [dealers, setDealers] = useState("");
    const [distributors, setDistributors] = useState("");
    const [isExisting, setIsExisting] = useState(false);
    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    const handleSubmit = async () => {
        setOpen(true);
        const body = {
            experience: experienceYears,
            projects: projectsCompleted,
            dealers: dealers,
            points: distributors
        };

        try {
            await createStats(body, token);
            showSuccess("Stats submitted successfully");
        } catch (error) {
            showError("Error submitting stats");
        } finally {
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleGetStats = async () => {
        try {
            const response = await getStats();
            setExperienceYears(response.data.experience);
            setProjectsCompleted(response.data.projects);
            setDealers(response.data.dealers);
            setDistributors(response.data.points);
            if(response.data.id === 0){
                setIsExisting(false);
            } else {
                setIsExisting(true);
            }
        } catch (error) {
            console.error("Error fetching stats details:", error);
        }
    }

    useEffect(() => {
        handleGetStats();
    }, []);
    
    return (
        <div>
            <BreadCrumb title="Stats Section" />
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
                            <label>Experience Years</label>
                            <input
                                type="text"
                                disabled={isExisting}
                                value={experienceYears}
                                onChange={(e) => setExperienceYears(e.target.value)}
                                placeholder="Enter experience years"
                            />
                        </div>
                        <div className="form-group">
                            <label>Projects Completed</label>
                            <input
                                type="text"
                                disabled={isExisting}
                                value={projectsCompleted}
                                onChange={(e) => setProjectsCompleted(e.target.value)}
                                placeholder="Enter projects completed"
                            />
                        </div>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group">
                            <label>Dealers</label>
                            <input
                                type="text"
                                disabled={isExisting}
                                value={dealers}
                                onChange={(e) => setDealers(e.target.value)}
                                placeholder="Enter number of dealers"
                            />
                        </div>
                        <div className="form-group">
                            <label>Distributors</label>
                            <input
                                type="text"
                                disabled={isExisting}
                                value={distributors}
                                onChange={(e) => setDistributors(e.target.value)}
                                placeholder="Enter number of distributors"
                            />
                        </div>
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "20px" }}>
                        {isExisting && (
                            <button
                                className="edit-btn"
                                type="button"
                                onClick={() => setIsExisting(false)}
                            >
                                Edit
                            </button>
                        )}

                        {!isExisting && (
                            <button type="button" disabled={!experienceYears || !projectsCompleted || !dealers || !distributors} className="submit-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}