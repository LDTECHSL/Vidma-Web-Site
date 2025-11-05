import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../layouts/BreadCrumb";
import "../../common/admin.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { createHeroData, getHeroAllData } from "../../services/home-api";
import { showError, showSuccess } from "../../components/Toast";

export default function HeroSection() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("vidmaAuthToken") || "";

  useEffect(() => {
    if (!token) {
      navigate("/console/login");
    }
  }, [navigate, token]);

  const [open, setOpen] = useState(false);
  const [isExisting, setIsExisting] = useState(false);

  // ---------- SLIDE 1 ----------
  const [FirstHeroEnglishTitle, setFirstHeroEnglishTitle] = useState("");
  const [FirstHeroSinhalaTitle, setFirstHeroSinhalaTitle] = useState("");
  const [FirstHeroTamilTitle, setFirstHeroTamilTitle] = useState("");
  const [FirstHeroEnglishText, setFirstHeroEnglishText] = useState("");
  const [FirstHeroSinhalaText, setFirstHeroSinhalaText] = useState("");
  const [FirstHeroTamilText, setFirstHeroTamilText] = useState("");
  const [FirstHeroImage, setFirstHeroImage] = useState<File | null>(null);
  const [FirstHeroImageError, setFirstHeroImageError] = useState<string | null>(null);
  const [FirstImage, setFirstImage] = useState<string>("");

  // ---------- SLIDE 2 ----------
  const [SecondHeroEnglishTitle, setSecondHeroEnglishTitle] = useState("");
  const [SecondHeroSinhalaTitle, setSecondHeroSinhalaTitle] = useState("");
  const [SecondHeroTamilTitle, setSecondHeroTamilTitle] = useState("");
  const [SecondHeroEnglishText, setSecondHeroEnglishText] = useState("");
  const [SecondHeroSinhalaText, setSecondHeroSinhalaText] = useState("");
  const [SecondHeroTamilText, setSecondHeroTamilText] = useState("");
  const [SecondHeroImage, setSecondHeroImage] = useState<File | null>(null);
  const [SecondHeroImageError, setSecondHeroImageError] = useState<string | null>(null);
  const [SecondImage, setSecondImage] = useState<string>("");

  // ---------- SLIDE 3 ----------
  const [ThirdHeroEnglishTitle, setThirdHeroEnglishTitle] = useState("");
  const [ThirdHeroSinhalaTitle, setThirdHeroSinhalaTitle] = useState("");
  const [ThirdHeroTamilTitle, setThirdHeroTamilTitle] = useState("");
  const [ThirdHeroEnglishText, setThirdHeroEnglishText] = useState("");
  const [ThirdHeroSinhalaText, setThirdHeroSinhalaText] = useState("");
  const [ThirdHeroTamilText, setThirdHeroTamilText] = useState("");
  const [ThirdHeroImage, setThirdHeroImage] = useState<File | null>(null);
  const [ThirdHeroImageError, setThirdHeroImageError] = useState<string | null>(null);
  const [ThirdImage, setThirdImage] = useState<string>("");

  const getHeroDetails = async () => {
    try {
      const response = await getHeroAllData(token);
      console.log(response.data.slides);
      const slides = response.data.slides;
      if (slides.length > 0) {
        setIsExisting(true);
        const slide1 = slides[0];
        setFirstHeroEnglishTitle(slide1.english.title || "");
        setFirstHeroSinhalaTitle(slide1.sinhala.title || "");
        setFirstHeroTamilTitle(slide1.tamil.title || "");
        setFirstHeroEnglishText(slide1.english.text || "");
        setFirstHeroSinhalaText(slide1.sinhala.text || "");
        setFirstHeroTamilText(slide1.tamil.text || "");
        setFirstImage(slide1.image.replace("dl=0", "raw=1")|| "");
        const slide2 = slides[1];
        setSecondHeroEnglishTitle(slide2.english.title || "");
        setSecondHeroSinhalaTitle(slide2.sinhala.title || "");
        setSecondHeroTamilTitle(slide2.tamil.title || "");
        setSecondHeroEnglishText(slide2.english.text || "");
        setSecondHeroSinhalaText(slide2.sinhala.text || "");
        setSecondHeroTamilText(slide2.tamil.text || "");
        setSecondImage(slide2.image.replace("dl=0", "raw=1")|| "");
        const slide3 = slides[2];
        setThirdHeroEnglishTitle(slide3.english.title || "");
        setThirdHeroSinhalaTitle(slide3.sinhala.title || "");
        setThirdHeroTamilTitle(slide3.tamil.title || "");
        setThirdHeroEnglishText(slide3.english.text || "");
        setThirdHeroSinhalaText(slide3.sinhala.text || "");
        setThirdHeroTamilText(slide3.tamil.text || "");
        setThirdImage(slide3.image.replace("dl=0", "raw=1")|| "");
      } else {
        setIsExisting(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getHeroDetails();
  }, []);

  // aspect ratio validation: 3:2 => width / height = 1.5
  const validateAspectRatio = (file: File, expectedRatio = 3 / 2, tolerance = 0.075) =>
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
            message: `Invalid aspect ratio. Found ${ratio.toFixed(
              2
            )}:1 — expected ~${expectedRatio.toFixed(2)} (3:2).`,
          });
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ ok: false, message: "Unable to read image." });
      };
      img.src = url;
    });

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

        const { ok, message } = await validateAspectRatio(file);
        if (!ok) {
          setError(message || "Invalid image.");
          return;
        }

        setFile(file);
      };
    },
    []
  );

  // Handlers for each zone
  const handleFirstDrop = makeDropHandler(setFirstHeroImage, setFirstHeroImageError);
  const handleSecondDrop = makeDropHandler(setSecondHeroImage, setSecondHeroImageError);
  const handleThirdDrop = makeDropHandler(setThirdHeroImage, setThirdHeroImageError);

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

  const handleSubmit = async () => {

    if( FirstHeroImageError || SecondHeroImageError || ThirdHeroImageError ) {
      showError("Please fix image errors before submitting.");
      return;
    }

    const data = new FormData();

    // Slide 1
    data.append("FirstHeroEnglishTitle", FirstHeroEnglishTitle);
    data.append("FirstHeroSinhalaTitle", FirstHeroSinhalaTitle);
    data.append("FirstHeroTamilTitle", FirstHeroTamilTitle);
    data.append("FirstHeroEnglishText", FirstHeroEnglishText);
    data.append("FirstHeroSinhalaText", FirstHeroSinhalaText);
    data.append("FirstHeroTamilText", FirstHeroTamilText);
    if (FirstHeroImage) data.append("FirstHeroImage", FirstHeroImage);

    // Slide 2
    data.append("SecondHeroEnglishTitle", SecondHeroEnglishTitle);
    data.append("SecondHeroSinhalaTitle", SecondHeroSinhalaTitle);
    data.append("SecondHeroTamilTitle", SecondHeroTamilTitle);
    data.append("SecondHeroEnglishText", SecondHeroEnglishText);
    data.append("SecondHeroSinhalaText", SecondHeroSinhalaText);
    data.append("SecondHeroTamilText", SecondHeroTamilText);
    if (SecondHeroImage) data.append("SecondHeroImage", SecondHeroImage);

    // Slide 3
    data.append("ThirdHeroEnglishTitle", ThirdHeroEnglishTitle);
    data.append("ThirdHeroSinhalaTitle", ThirdHeroSinhalaTitle);
    data.append("ThirdHeroTamilTitle", ThirdHeroTamilTitle);
    data.append("ThirdHeroEnglishText", ThirdHeroEnglishText);
    data.append("ThirdHeroSinhalaText", ThirdHeroSinhalaText);
    data.append("ThirdHeroTamilText", ThirdHeroTamilText);
    if (ThirdHeroImage) data.append("ThirdHeroImage", ThirdHeroImage);

    setOpen(true);
    try {
      await createHeroData(data, token);
      showSuccess("Hero section updated successfully.");
    } catch (error) {
      showError("Failed to update hero section.");
    } finally {
      getHeroDetails();
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div>
      <BreadCrumb title="Hero Section" />

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="hero-section-container">
        {/* ---------- SLIDE 1 ---------- */}
        <div className="hero-form">
          <h3>Slide 1</h3>

          <div className="form-group">
            <label>English Title</label>
            <input
              type="text"
              disabled={isExisting}
              value={FirstHeroEnglishTitle}
              onChange={(e) => setFirstHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              disabled={isExisting}
              value={FirstHeroSinhalaTitle}
              onChange={(e) => setFirstHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              disabled={isExisting}
              value={FirstHeroTamilTitle}
              onChange={(e) => setFirstHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={FirstHeroEnglishText}
              disabled={isExisting}
              onChange={(e) => setFirstHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={FirstHeroSinhalaText}
              disabled={isExisting}
              onChange={(e) => setFirstHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={FirstHeroTamilText}
              disabled={isExisting}
              onChange={(e) => setFirstHeroTamilText(e.target.value)}
            ></textarea>
          </div>

          {!isExisting && (
            <div
              className="dropzone"
              onDragOver={onDragOver}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                handleFirstDrop(file);
              }}
              onClick={() => {
                // click to open hidden input
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


              <>
                {!FirstHeroImage ? (
                  <div className="dropzone-content">
                    <div className="dropzone-icon">⤓</div>
                    <div className="dropzone-text">
                      Drop image here or click to select
                      <div className="dropzone-hint">Only one image (3:2 aspect ratio)</div>
                    </div>
                  </div>
                ) : (
                  <div className="preview-wrap">
                    <img
                      src={URL.createObjectURL(FirstHeroImage)}
                      alt="Slide 1 Preview"
                      className="preview-img"
                    />
                    <div className="preview-actions">
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          removeFile(setFirstHeroImage, setFirstHeroImageError);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </>


            </div>
          )}

          {isExisting && (
            <img style={{marginTop: "35px", borderRadius: "10px"}} src={FirstImage} alt="" />
          )}
          {FirstHeroImageError && <div className="error-text">{FirstHeroImageError}</div>}
        </div>

        {/* ---------- SLIDE 2 ---------- */}
        <div className="hero-form">
          <h3>Slide 2</h3>

          <div className="form-group">
            <label>English Title</label>
            <input
              type="text"
              value={SecondHeroEnglishTitle}
              disabled={isExisting}
              onChange={(e) => setSecondHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              value={SecondHeroSinhalaTitle}
              disabled={isExisting}
              onChange={(e) => setSecondHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              value={SecondHeroTamilTitle}
              disabled={isExisting}
              onChange={(e) => setSecondHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={SecondHeroEnglishText}
              disabled={isExisting}
              onChange={(e) => setSecondHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={SecondHeroSinhalaText}
              disabled={isExisting}
              onChange={(e) => setSecondHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={SecondHeroTamilText}
              disabled={isExisting}
              onChange={(e) => setSecondHeroTamilText(e.target.value)}
            ></textarea>
          </div>

          {!isExisting && (
            <div
              className="dropzone"
              onDragOver={onDragOver}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                handleSecondDrop(file);
              }}
              onClick={() => {
                const el = document.getElementById("second-file-input") as HTMLInputElement | null;
                el?.click();
              }}
              role="button"
              tabIndex={0}
            >
              <input
                id="second-file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileInput(e, handleSecondDrop)}
              />
              {!SecondHeroImage ? (
                <div className="dropzone-content">
                  <div className="dropzone-icon">⤓</div>
                  <div className="dropzone-text">
                    Drop image here or click to select
                    <div className="dropzone-hint">Only one image (3:2 aspect ratio)</div>
                  </div>
                </div>
              ) : (
                <div className="preview-wrap">
                  <img
                    src={URL.createObjectURL(SecondHeroImage)}
                    alt="Slide 2 Preview"
                    className="preview-img"
                  />
                  <div className="preview-actions">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        removeFile(setSecondHeroImage, setSecondHeroImageError);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isExisting && (
            <img style={{marginTop: "35px", borderRadius: "10px"}} src={SecondImage} alt="" />
          )}

          {SecondHeroImageError && <div className="error-text">{SecondHeroImageError}</div>}
        </div>

        {/* ---------- SLIDE 3 ---------- */}
        <div className="hero-form">
          <h3>Slide 3</h3>

          <div className="form-group">
            <label>English Title</label>
            <input
              type="text"
              value={ThirdHeroEnglishTitle}
              disabled={isExisting}
              onChange={(e) => setThirdHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              value={ThirdHeroSinhalaTitle}
              disabled={isExisting}
              onChange={(e) => setThirdHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              value={ThirdHeroTamilTitle}
              disabled={isExisting}
              onChange={(e) => setThirdHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={ThirdHeroEnglishText}
              disabled={isExisting}
              onChange={(e) => setThirdHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={ThirdHeroSinhalaText}
              disabled={isExisting}
              onChange={(e) => setThirdHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={ThirdHeroTamilText}
              disabled={isExisting}
              onChange={(e) => setThirdHeroTamilText(e.target.value)}
            ></textarea>
          </div>

          {!isExisting && (
            <div
              className="dropzone"
              onDragOver={onDragOver}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
                handleThirdDrop(file);
              }}
              onClick={() => {
                const el = document.getElementById("third-file-input") as HTMLInputElement | null;
                el?.click();
              }}
              role="button"
              tabIndex={0}
            >
              <input
                id="third-file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileInput(e, handleThirdDrop)}
              />
              {!ThirdHeroImage ? (
                <div className="dropzone-content">
                  <div className="dropzone-icon">⤓</div>
                  <div className="dropzone-text">
                    Drop image here or click to select
                    <div className="dropzone-hint">Only one image (3:2 aspect ratio)</div>
                  </div>
                </div>
              ) : (
                <div className="preview-wrap">
                  <img
                    src={URL.createObjectURL(ThirdHeroImage)}
                    alt="Slide 3 Preview"
                    className="preview-img"
                  />
                  <div className="preview-actions">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        removeFile(setThirdHeroImage, setThirdHeroImageError);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isExisting && (
            <img style={{marginTop: "35px", borderRadius: "10px"}} src={ThirdImage} alt="" />
          )}

          {ThirdHeroImageError && <div className="error-text">{ThirdHeroImageError}</div>}
        </div>


      </div>{/* ---------- SUBMIT BUTTON ---------- */}
      <div className="submit-container">
        {isExisting && (
          <button className="edit-btn" onClick={() => setIsExisting(!isExisting)} style={{marginRight: "15px"}}>
          Edit
        </button>
        )}        
        {!isExisting && (
          <button className="submit-btn" disabled={
            FirstHeroEnglishTitle.trim() === "" ||
            FirstHeroSinhalaTitle.trim() === "" ||
            FirstHeroTamilTitle.trim() === "" ||
            FirstHeroEnglishText.trim() === "" ||
            FirstHeroSinhalaText.trim() === "" ||
            FirstHeroTamilText.trim() === "" ||
            SecondHeroEnglishTitle.trim() === "" ||
            SecondHeroSinhalaTitle.trim() === "" ||
            SecondHeroTamilTitle.trim() === "" ||
            SecondHeroEnglishText.trim() === "" ||
            SecondHeroSinhalaText.trim() === "" ||
            SecondHeroTamilText.trim() === "" ||
            ThirdHeroEnglishTitle.trim() === "" ||
            ThirdHeroSinhalaTitle.trim() === "" ||
            ThirdHeroTamilTitle.trim() === "" ||
            ThirdHeroEnglishText.trim() === "" ||
            ThirdHeroSinhalaText.trim() === "" ||
            ThirdHeroTamilText.trim() === ""
          } onClick={handleSubmit}>
            Submit
          </button> 
        )}        
      </div>
    </div>
  );
}
