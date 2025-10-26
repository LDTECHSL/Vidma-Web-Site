import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../layouts/BreadCrumb";
import "../../common/admin.css";

export default function HeroSection() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("vidmaAuthToken") || "";

  useEffect(() => {
    if (!token) {
      navigate("/console/login");
    }
  }, [navigate, token]);

  // 3 forms data
  const [slides, setSlides] = useState([
    {
      id: 1,
      englishTitle: "",
      sinhalaTitle: "",
      tamilTitle: "",
      englishText: "",
      sinhalaText: "",
      tamilText: "",
      image: null as File | null,
    },
    {
      id: 2,
      englishTitle: "",
      sinhalaTitle: "",
      tamilTitle: "",
      englishText: "",
      sinhalaText: "",
      tamilText: "",
      image: null as File | null,
    },
    {
      id: 3,
      englishTitle: "",
      sinhalaTitle: "",
      tamilTitle: "",
      englishText: "",
      sinhalaText: "",
      tamilText: "",
      image: null as File | null,
    },
  ]);

  // handle change
  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...slides];
    (updated[index] as any)[field] = value;
    setSlides(updated);
  };

  const handleSubmit = (index: number) => {
    const slide = slides[index];
    console.log("Submitting slide", slide);
    // here you can send to API using FormData if needed
  };

  return (
    <div>
      <BreadCrumb title="Hero Section" />
      <div className="hero-section-container">
        {slides.map((slide, index) => (
          <div className="hero-form" key={slide.id}>
            <h3>Slide {slide.id}</h3>

            <div className="form-group">
              <label>English Title</label>
              <input
                type="text"
                value={slide.englishTitle}
                onChange={(e) => handleChange(index, "englishTitle", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Sinhala Title</label>
              <input
                type="text"
                value={slide.sinhalaTitle}
                onChange={(e) => handleChange(index, "sinhalaTitle", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tamil Title</label>
              <input
                type="text"
                value={slide.tamilTitle}
                onChange={(e) => handleChange(index, "tamilTitle", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>English Text</label>
              <textarea
                value={slide.englishText}
                onChange={(e) => handleChange(index, "englishText", e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Sinhala Text</label>
              <textarea
                value={slide.sinhalaText}
                onChange={(e) => handleChange(index, "sinhalaText", e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Tamil Text</label>
              <textarea
                value={slide.tamilText}
                onChange={(e) => handleChange(index, "tamilText", e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(index, "image", e.target.files ? e.target.files[0] : null)
                }
              />
              {slide.image && (
                <img
                  src={URL.createObjectURL(slide.image)}
                  alt="preview"
                  style={{ width: "100%", maxHeight: "200px", marginTop: "10px", borderRadius: "8px" }}
                />
              )}
            </div>

            <button className="submit-btn" onClick={() => handleSubmit(index)}>
              Save Slide {slide.id}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
