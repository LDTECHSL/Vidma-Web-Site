import "../common/main.css";
import "../common/contact.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationPin from "@mui/icons-material/LocationPin";
import LocalPhone from "@mui/icons-material/LocalPhone";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import AccessTimeFilled from "@mui/icons-material/AccessTimeFilled";
import { useEffect, useState } from "react";
import { getContactUsData } from "../services/home-api";
import { useTranslation } from "react-i18next";

// Fix default Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type Place = { name: string; lat: number; lng: number; type: string };

export default function ContactUsMap() {
  const places: Place[] = [
    { name: "Colombo Showroom", lat: 6.9271, lng: 79.8612, type: "showroom" },
    { name: "Kandy Showroom", lat: 7.2906, lng: 80.6337, type: "showroom" },
    { name: "Galle Hardware", lat: 6.0535, lng: 80.221, type: "hardware" },
    { name: "Kurunegala Hardware", lat: 7.4863, lng: 80.36, type: "hardware" },
  ];

  const [contactDetails, setContactDetails] = useState<any>({});

  const {t} = useTranslation();

  // Define Sri Lanka map bounds (southwest, northeast)
  const sriLankaBounds: L.LatLngBoundsExpression = [
    [5.7, 79.5], // southwest corner
    [10.1, 82.0], // northeast corner
  ];

  const handleGetContactDetails = async () => {
    try {
      const response = await getContactUsData();
      setContactDetails(response.data);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  }

  useEffect(() => {
    handleGetContactDetails();
  }, []);

  return (
    <div className="contact-outer">
      <div className="title-outer white" data-aos="fade-down">
        {t("contact")}
      </div>
      <div className="title-sub-outer white" data-aos="fade-up">
        {t("contactSub")}
      </div>

      <div className="contact-sub-outer">
        {/* Contact Details Left */}
        <div className="contact-inner ci">
          <div className="contact-card" data-aos="fade-right">
            <div className="cc-sub">
              <LocationPin style={{ fontSize: 40, color: "#1976d2" }} />
              <div className="cc-title">Address</div>
            </div>
            <div className="cc-desc">
              {contactDetails.address}
            </div>
          </div>
          <div className="contact-card" data-aos="fade-right" data-aos-delay="100">
            <LocalPhone style={{ fontSize: 40, color: "#1976d2" }} />
            <div className="cc-title">Phone</div>
            {/* 0718471520,0719765413 Need to br after comma */}
            <div className="cc-desc">
              {contactDetails?.phone?.split(',').map((num:any, index:any) => (
                <div key={index}>{num.trim()}</div>
              ))}
            </div>

          </div>
          <div className="contact-card" data-aos="fade-right" data-aos-delay="200">
            <AlternateEmail style={{ fontSize: 40, color: "#1976d2" }} />
            <div className="cc-title">Email</div>
            <div className="cc-desc">{contactDetails.email}</div>
          </div>
          <div className="contact-card" data-aos="fade-right" data-aos-delay="300">
            <AccessTimeFilled style={{ fontSize: 40, color: "#1976d2" }} />
            <div className="cc-title">Working Hours</div>
            <div className="cc-desc">{contactDetails.workingHours}</div>
          </div>
        </div>

        {/* Map Right */}
        <div className="contact-inner" data-aos="fade-left">
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={7}
            minZoom={6}
            maxZoom={10}
            maxBounds={sriLankaBounds}
            maxBoundsViscosity={1.0} // Prevent panning outside bounds
            scrollWheelZoom={false} // Disable excessive zooming
            style={{
              height: "500px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {places.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lng]}>
                <Popup>
                  <strong>{p.name}</strong>
                  <br />
                  {p.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
