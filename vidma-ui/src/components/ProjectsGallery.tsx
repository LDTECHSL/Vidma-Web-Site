import { useState } from "react";
import "../common/main.css";
import "../common/gallery.css";
import { useTranslation } from "react-i18next";

export default function ProjectsGallery() {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const projects = [
        {
            id: 1,
            title: "The Japan Cup",
            images: [
                "https://picsum.photos/id/1011/800/600",
                "https://picsum.photos/id/1012/800/600",
                "https://picsum.photos/id/1013/800/600",
                "https://picsum.photos/id/1014/800/600",
                "https://picsum.photos/id/1012/800/600",
                "https://picsum.photos/id/1013/800/600",
                "https://picsum.photos/id/1014/800/600",
                "https://picsum.photos/id/1012/800/600",
                "https://picsum.photos/id/1013/800/600",
                "https://picsum.photos/id/1014/800/600",
            ],
        },
        {
            id: 2,
            title: "Galactic Gallop Classic",
            images: [
                "https://picsum.photos/id/1021/800/600",
                "https://picsum.photos/id/1022/800/600",
                "https://picsum.photos/id/1023/800/600",
            ],
        },
        {
            id: 3,
            title: "Dreamland Derby Delight",
            images: [
                "https://picsum.photos/id/1031/800/600",
                "https://picsum.photos/id/1032/800/600",
                "https://picsum.photos/id/1033/800/600",
                "https://picsum.photos/id/1034/800/600",
            ],
        },
        {
            id: 4,
            title: "The Japan Cup",
            images: [
                "https://picsum.photos/id/1011/800/600",
                "https://picsum.photos/id/1012/800/600",
                "https://picsum.photos/id/1013/800/600",
                "https://picsum.photos/id/1014/800/600",
            ],
        },
        {
            id: 5,
            title: "Galactic Gallop Classic",
            images: [
                "https://picsum.photos/id/1021/800/600",
                "https://picsum.photos/id/1022/800/600",
                "https://picsum.photos/id/1023/800/600",
            ],
        },
        {
            id: 6,
            title: "Dreamland Derby Delight",
            images: [
                "https://picsum.photos/id/1031/800/600",
                "https://picsum.photos/id/1032/800/600",
                "https://picsum.photos/id/1033/800/600",
                "https://picsum.photos/id/1034/800/600",
            ],
        },
    ];

    const {t} = useTranslation();

    return (
        <div className="gallery-outer">
            <div className="title-outer white" data-aos="fade-down">
                {t("projects1")}
            </div>
            <div className="title-sub-outer white" data-aos="fade-up">
                {t("projects1Sub")}
            </div>
            <div className="gallery-sub-outer">
                {projects.slice(0, 3).map((project) => (
                    <div
                        className="gallery-item"
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        data-aos="fade-up"
                    >
                        {/* Thumbnail layout */}
                        <div className="gallery-thumbnail">
                            <div className="thumb-left">
                                {project.images.slice(0, 2).map((img, index) => (
                                    <img key={index} src={img} alt="" />
                                ))}
                            </div>
                            <div className="thumb-right">
                                <img src={project.images[2]} alt="" />
                            </div>
                        </div>

                        {/* Title and count below the thumbnail */}
                        <div className="gallery-info">
                            <h3>{project.title}</h3>
                            <p>{project.images.length} Photos</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="gallery-sub-outer">
                {projects.slice(3, 6).map((project) => (
                    <div
                        className="gallery-item"
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        data-aos="fade-up"
                    >
                        {/* Thumbnail layout */}
                        <div className="gallery-thumbnail">
                            <div className="thumb-left">
                                {project.images.slice(0, 2).map((img, index) => (
                                    <img key={index} src={img} alt="" />
                                ))}
                            </div>
                            <div className="thumb-right">
                                <img src={project.images[2]} alt="" />
                            </div>
                        </div>

                        {/* Title and count below the thumbnail */}
                        <div className="gallery-info">
                            <h3>{project.title}</h3>
                            <p>{project.images.length} Photos</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <>
                {selectedProject && (
                    <div className="gallery-modal" onClick={() => setSelectedProject(null)}>
                        <div
                            className="gallery-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2>{selectedProject.title}</h2>
                            <div className="gallery-modal-grid">
                                {selectedProject.images.map((img: any, index: any) => (
                                    <img key={index} src={img} alt="" />
                                ))}
                            </div>
                            <button
                                className="gallery-close-btn"
                                onClick={() => setSelectedProject(null)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </>

        </div>
    );
}
