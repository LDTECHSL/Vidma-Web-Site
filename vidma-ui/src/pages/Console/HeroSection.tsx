import { useEffect, useState, useCallback } from "react";
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

  // ---------- SLIDE 1 ----------
  const [FirstHeroEnglishTitle, setFirstHeroEnglishTitle] = useState("");
  const [FirstHeroSinhalaTitle, setFirstHeroSinhalaTitle] = useState("");
  const [FirstHeroTamilTitle, setFirstHeroTamilTitle] = useState("");
  const [FirstHeroEnglishText, setFirstHeroEnglishText] = useState("");
  const [FirstHeroSinhalaText, setFirstHeroSinhalaText] = useState("");
  const [FirstHeroTamilText, setFirstHeroTamilText] = useState("");
  const [FirstHeroImage, setFirstHeroImage] = useState<File | null>(null);
  const [FirstHeroImageError, setFirstHeroImageError] = useState<string | null>(null);

  // ---------- SLIDE 2 ----------
  const [SecondHeroEnglishTitle, setSecondHeroEnglishTitle] = useState("");
  const [SecondHeroSinhalaTitle, setSecondHeroSinhalaTitle] = useState("");
  const [SecondHeroTamilTitle, setSecondHeroTamilTitle] = useState("");
  const [SecondHeroEnglishText, setSecondHeroEnglishText] = useState("");
  const [SecondHeroSinhalaText, setSecondHeroSinhalaText] = useState("");
  const [SecondHeroTamilText, setSecondHeroTamilText] = useState("");
  const [SecondHeroImage, setSecondHeroImage] = useState<File | null>(null);
  const [SecondHeroImageError, setSecondHeroImageError] = useState<string | null>(null);

  // ---------- SLIDE 3 ----------
  const [ThirdHeroEnglishTitle, setThirdHeroEnglishTitle] = useState("");
  const [ThirdHeroSinhalaTitle, setThirdHeroSinhalaTitle] = useState("");
  const [ThirdHeroTamilTitle, setThirdHeroTamilTitle] = useState("");
  const [ThirdHeroEnglishText, setThirdHeroEnglishText] = useState("");
  const [ThirdHeroSinhalaText, setThirdHeroSinhalaText] = useState("");
  const [ThirdHeroTamilText, setThirdHeroTamilText] = useState("");
  const [ThirdHeroImage, setThirdHeroImage] = useState<File | null>(null);
  const [ThirdHeroImageError, setThirdHeroImageError] = useState<string | null>(null);

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

  const handleSubmit = () => {
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

    console.log("Submitting Hero Section Data...");
    // TODO: make API request, e.g. fetch('/api/hero', { method: 'POST', body: data })
  };

  return (
    <div>
      <BreadCrumb title="Hero Section" />

      <div className="hero-section-container">
        {/* ---------- SLIDE 1 ---------- */}
        <div className="hero-form">
          <h3>Slide 1</h3>

          <div className="form-group">
            <label>English Title</label>
            <input
              type="text"
              value={FirstHeroEnglishTitle}
              onChange={(e) => setFirstHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              value={FirstHeroSinhalaTitle}
              onChange={(e) => setFirstHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              value={FirstHeroTamilTitle}
              onChange={(e) => setFirstHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={FirstHeroEnglishText}
              onChange={(e) => setFirstHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={FirstHeroSinhalaText}
              onChange={(e) => setFirstHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={FirstHeroTamilText}
              onChange={(e) => setFirstHeroTamilText(e.target.value)}
            ></textarea>
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
          </div>

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
              onChange={(e) => setSecondHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              value={SecondHeroSinhalaTitle}
              onChange={(e) => setSecondHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              value={SecondHeroTamilTitle}
              onChange={(e) => setSecondHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={SecondHeroEnglishText}
              onChange={(e) => setSecondHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={SecondHeroSinhalaText}
              onChange={(e) => setSecondHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={SecondHeroTamilText}
              onChange={(e) => setSecondHeroTamilText(e.target.value)}
            ></textarea>
          </div>

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
              onChange={(e) => setThirdHeroEnglishTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sinhala Title</label>
            <input
              type="text"
              value={ThirdHeroSinhalaTitle}
              onChange={(e) => setThirdHeroSinhalaTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tamil Title</label>
            <input
              type="text"
              value={ThirdHeroTamilTitle}
              onChange={(e) => setThirdHeroTamilTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Text</label>
            <textarea
              value={ThirdHeroEnglishText}
              onChange={(e) => setThirdHeroEnglishText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Sinhala Text</label>
            <textarea
              value={ThirdHeroSinhalaText}
              onChange={(e) => setThirdHeroSinhalaText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tamil Text</label>
            <textarea
              value={ThirdHeroTamilText}
              onChange={(e) => setThirdHeroTamilText(e.target.value)}
            ></textarea>
          </div>

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

          {ThirdHeroImageError && <div className="error-text">{ThirdHeroImageError}</div>}
        </div>


      </div>{/* ---------- SUBMIT BUTTON ---------- */}
      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit All Slides
        </button>
      </div>
    </div>
  );
}
