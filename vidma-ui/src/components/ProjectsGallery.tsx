import { useEffect, useState } from "react";
import "../common/main.css";
import "../common/gallery.css";
import { useTranslation } from "react-i18next";
import { getGallery, getGalleryById } from "../services/home-api";

export default function ProjectsGallery() {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [albums, setAlbums] = useState<any[]>([]);
    const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});
    
    const handleGetAlbums = async () => {
        try {
            const response = await getGallery();
            setAlbums(response.data);
        } catch (error) {
            console.error("Error fetching gallery albums:", error);            
        }
    }

    const handleAlbumClick = async (album: any) => {
        try {
            const response = await getGalleryById(album.galleryId);
            const albumData = response.data;
            setSelectedProject(albumData);
            
            // Initialize loading state for all images
            const initialLoadingState: { [key: number]: boolean } = {};
            albumData.images.forEach((_: any, index: number) => {
                initialLoadingState[index] = true;
            });
            setLoadingImages(initialLoadingState);
        } catch (error) {
            console.error("Error fetching album data:", error);
        }
    }

    const handleImageLoad = (index: number) => {
        setLoadingImages(prev => ({
            ...prev,
            [index]: false
        }));
    }

    useEffect(() => {
        handleGetAlbums();
    }, []);

    const {t} = useTranslation();

    return (
        <div className="gallery-outer">
            <div className="title-outer white" data-aos="fade-down">
                {t("gallery")}
            </div>
            <div className="title-sub-outer white" data-aos="fade-up">
                {t("projects1Sub")}
            </div>
            <div className="gallery-sub-outer">
                {albums.map((album) => (
                    <div
                        className="gallery-item"
                        key={album.id}
                        onClick={() => handleAlbumClick(album)}
                        data-aos="fade-up"
                    >
                        <div className="gallery-thumbnail">
                            <div className="thumb-left">
                                {album.images.slice(0, 2).map((img:any, index:any) => (
                                    <img key={index} src={img.imageUrl.replace("dl=0", "raw=1")} alt="" />
                                ))}
                            </div>
                            <div className="thumb-right">
                                <img src={album.images[2].imageUrl.replace("dl=0", "raw=1")} alt="" />
                            </div>
                        </div>

                        <div className="gallery-info">
                            <h3>{album.title}</h3>
                            <p>{album.count} Photos</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="gallery-modal" onClick={() => setSelectedProject(null)}>
                    <div
                        className="gallery-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selectedProject.title}</h2>
                        <div className="gallery-modal-grid">
                            {selectedProject.images.map((img: any, index: any) => (
                                <div key={index} className="gallery-image-wrapper">
                                    {loadingImages[index] && (
                                        <div className="image-spinner-overlay">
                                            <div className="image-spinner"></div>
                                        </div>
                                    )}
                                    <img 
                                        src={img.imageUrl.replace("dl=0", "raw=1")} 
                                        alt=""
                                        onLoad={() => handleImageLoad(index)}
                                        style={{ opacity: loadingImages[index] ? 0 : 1 }}
                                    />
                                </div>
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
        </div>
    );
}