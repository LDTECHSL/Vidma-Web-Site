import { Backdrop, CircularProgress } from "@mui/material";
import "../../common/admin.css";
import BreadCrumb from "../../layouts/BreadCrumb";
import { useState } from "react";

export default function StatsSection() {
    const [open, setOpen] = useState(false);
    const [experienceYears, setExperienceYears] = useState("");
    const [projectsCompleted, setProjectsCompleted] = useState("");
    const [dealers, setDealers] = useState("");
    const [distributors, setDistributors] = useState("");
    
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
                                value={experienceYears}
                                onChange={(e) => setExperienceYears(e.target.value)}
                                placeholder="Enter experience years"
                            />
                        </div>
                        <div className="form-group">
                            <label>Projects Completed</label>
                            <input
                                type="text"
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
                                value={dealers}
                                onChange={(e) => setDealers(e.target.value)}
                                placeholder="Enter number of dealers"
                            />
                        </div>
                        <div className="form-group">
                            <label>Distributors</label>
                            <input
                                type="text"
                                value={distributors}
                                onChange={(e) => setDistributors(e.target.value)}
                                placeholder="Enter number of distributors"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}