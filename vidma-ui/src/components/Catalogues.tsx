import { useEffect, useMemo, useRef, useState } from "react";
import "../common/main.css";
import { getCatalogues } from "../services/home-api";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// Use Vite's ?url to load worker as a URL string bundled with the app
// Fallback to CDN if bundling fails
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useTranslation } from "react-i18next";

export default function Catalogues() {
    const [cats, setCats] = useState<any[]>([]);
    const [thumbs, setThumbs] = useState<Record<number, string>>({});
    const { t } = useTranslation();
    const rowRef = useRef<HTMLDivElement | null>(null);

    const handleGetCatalogues = async () => {
        try {
            const res = await getCatalogues();
            setCats(res.data);
        } catch (error) {
            setCats([]);
        }
    }

    useEffect(() => {
        handleGetCatalogues();
    }, []);

    // Configure PDF.js worker
    useEffect(() => {
        try {
            // Prefer local bundled worker
            (GlobalWorkerOptions as any).workerSrc = workerSrc ||
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";
        } catch (_) {
            // Fallback to CDN
            (GlobalWorkerOptions as any).workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";
        }
    }, []);

    const toPdfSource = useMemo(() => {
        return (fileData: any): { url?: string; data?: Uint8Array } => {
            if (!fileData) return {};

            if (Array.isArray(fileData)) {
                try {
                    const bytes = new Uint8Array(fileData as number[]);
                    return { data: bytes };
                } catch {
                    return {};
                }
            }

            if (fileData instanceof ArrayBuffer) {
                return { data: new Uint8Array(fileData) };
            }

            if (typeof fileData === "string") {
                const trimmed = fileData.trim();
                const isHttp = /^https?:\/\//i.test(trimmed);
                const isDataUrl = /^data:application\/pdf/i.test(trimmed);
                if (isHttp || isDataUrl) {
                    return { url: trimmed };
                }
                // Assume base64 string
                try {
                    const binary = atob(trimmed);
                    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
                    return { data: bytes };
                } catch {
                    return {};
                }
            }

            // If it's a Blob
            if (fileData instanceof Blob) {
                return { url: URL.createObjectURL(fileData) };
            }

            return {};
        };
    }, []);

    // Generate first-page thumbnails when we have catalogues
    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            const nextThumbs: Record<number, string> = {};
            for (const cat of cats) {
                const id: number = cat.id;
                const src = toPdfSource(cat.catalogueFile);
                if (!src.url && !src.data) continue;
                try {
                    const loadingTask = getDocument(src);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);

                    // Normalize thumbnails to a consistent height so landscape PDFs do not look tiny
                    const viewport = page.getViewport({ scale: 1, rotation: page.rotate || 0 });
                    const targetHeight = 280; // px
                    const scale = targetHeight / viewport.height;
                    const scaledViewport = page.getViewport({ scale, rotation: page.rotate || 0 });

                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (!ctx) continue;
                    canvas.width = Math.ceil(scaledViewport.width);
                    canvas.height = Math.ceil(scaledViewport.height);

                    await page.render({ canvas, canvasContext: ctx, viewport: scaledViewport }).promise;
                    const dataUrl = canvas.toDataURL("image/png");
                    nextThumbs[id] = dataUrl;
                } catch (_) {
                    // ignore individual failures
                }
            }
            if (!cancelled) setThumbs(nextThumbs);
        };
        if (cats && cats.length > 0) run();
        return () => { cancelled = true; };
    }, [cats, toPdfSource]);

    const openPdf = (fileData: any) => {
        if (!fileData) return;
        let url = "";
        if (Array.isArray(fileData)) {
            const blob = new Blob([new Uint8Array(fileData)], { type: "application/pdf" });
            url = URL.createObjectURL(blob);
        } else if (fileData instanceof ArrayBuffer) {
            const blob = new Blob([fileData], { type: "application/pdf" });
            url = URL.createObjectURL(blob);
        } else if (typeof fileData === "string") {
            const trimmed = fileData.trim();
            const isHttp = /^https?:\/\//i.test(trimmed);
            const isDataUrl = /^data:application\/pdf/i.test(trimmed);
            if (isHttp || isDataUrl) {
                url = trimmed;
            } else {
                try {
                    const binary = atob(trimmed);
                    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
                    const blob = new Blob([bytes], { type: "application/pdf" });
                    url = URL.createObjectURL(blob);
                } catch {
                    url = "";
                }
            }
        }
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const scrollRow = (offset: number) => {
        if (!rowRef.current) return;
        rowRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    return (
        <div className="products-outer" style={{ padding: "20px 0" }}>
                <div className="title-outer" data-aos="fade-up">
                    {t("catalogues")}
                </div>
                <div className="title-sub-outer" data-aos="fade-up">
                    {t("cataloguesSub")}
                </div>
                <div style={{ position: "relative", maxWidth: "90%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button
                        type="button"
                        onClick={() => scrollRow(-320)}
                        aria-label="Scroll catalogues left"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "40%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            border: "none",
                            background: "rgba(255,255,255,0.9)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollRow(320)}
                        aria-label="Scroll catalogues right"
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "40%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            border: "none",
                            background: "rgba(255,255,255,0.9)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        →
                    </button>
                    <div
                        ref={rowRef}
                        className="catalogues-row"
                        style={{
                            width: "100%",
                            display: "grid",
                            gridAutoFlow: "column",
                            gridAutoColumns: "minmax(250px, 250px)",
                            columnGap: 40,
                            overflowX: "auto",
                            padding: "0 50px 10px", // leave space for arrows
                            scrollbarWidth: "thin",
                            msOverflowStyle: "auto",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {cats.map((cat) => (
                            <div
                                key={cat.id}
                                className="catalogue-card"
                                style={{
                                    minWidth: 250,
                                    maxWidth: 250,
                                    border: "1px solid #eee",
                                    borderRadius: 8,
                                    background: "#fff",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                    overflow: "hidden",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => openPdf(cat.catalogueFile)}
                                    style={{
                                        width: "100%",
                                        display: "block",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                    aria-label={`Open catalogue ${cat.name}`}
                                    title="Open catalogue"
                                >
                                    <div style={{ width: "100%", background: "#f9f9f9" }}>
                                        {thumbs[cat.id] ? (
                                            <img
                                                src={thumbs[cat.id]}
                                                alt={`${cat.name} thumbnail`}
                                                style={{ width: "100%", height: 280, objectFit: "contain", background: "#f9f9f9", display: "block" }}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: 280,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#888",
                                                    fontSize: 14,
                                                }}
                                            >
                                                Generating preview...
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: "10px 12px" }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{cat.name}</div>
                                        <div style={{ fontSize: 12, color: "#666" }}>Tap to view PDF</div>
                                    </div>
                                </button>
                            </div>
                        ))}
                        {cats.length === 0 && (
                            <div style={{ color: "#666" }}>No catalogues available.</div>
                        )}
                    </div>
                </div>
            </div>
    );
}