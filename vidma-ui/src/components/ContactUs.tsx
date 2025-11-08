import "../common/main.css";
import "../common/contact.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationPin from "@mui/icons-material/LocationOn";
import LocalPhone from "@mui/icons-material/LocalPhone";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import AccessTimeFilled from "@mui/icons-material/AccessTimeFilled";
import { useEffect, useState } from "react";
import { getContactUsData, getLocations } from "../services/home-api";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";

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

// Convert DMS ("6°19'11.2\"N 80°51'53.0\"E") → decimal { lat, lng }
function parseDMS(dmsString: string) {
  const regex =
    /(\d+)[°](\d+)'([\d.]+)"([NSEW])\s+(\d+)[°](\d+)'([\d.]+)"([NSEW])/;
  const match = dmsString.match(regex);
  if (!match) return null;

  const lat =
    parseInt(match[1]) +
    parseInt(match[2]) / 60 +
    parseFloat(match[3]) / 3600;
  const lng =
    parseInt(match[5]) +
    parseInt(match[6]) / 60 +
    parseFloat(match[7]) / 3600;

  const latFinal = match[4] === "S" ? -lat : lat;
  const lngFinal = match[8] === "W" ? -lng : lng;

  return { lat: latFinal, lng: lngFinal };
}

export default function ContactUsMap() {
  const [contactDetails, setContactDetails] = useState<any>({});
  const [locations, setLocations] = useState<any[]>([]);
  const { t } = useTranslation();

  const sriLankaBounds: L.LatLngBoundsExpression = [
    [5.7, 79.5],
    [10.1, 82.0],
  ];

  const handleGetContactDetails = async () => {
    try {
      const response = await getContactUsData();
      setContactDetails(response.data);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleGetLocations = async () => {
    try {
      const response = await getLocations();

      // Convert each googleMapLink (DMS) into lat/lng
      const mapped = response.data
        .map((loc: any) => {
          const coords = parseDMS(loc.googleMapLink);
          if (!coords) return null;
          return {
            id: loc.id,
            name: loc.locationName,
            ...coords,
          };
        })
        .filter(Boolean); // remove invalid ones

      setLocations(mapped);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    handleGetContactDetails();
    handleGetLocations();
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
            <LocationPin style={{ fontSize: 30, color: "#1976d2" }} />

            <Divider orientation="vertical" flexItem style={{ margin: "0 25px", border: "1px solid gray" }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "10px", alignItems: "flex-start", gap: "8px" }}>
              <div className="cc-title">Vidma Engineering and Trading Co. (Pvt) Ltd</div>
              <div className="cc-desc">{contactDetails.address}</div>
            </div>
          </div>

          <div className="contact-card" data-aos="fade-right">
            <LocalPhone style={{ fontSize: 30, color: "#1976d2" }} />

            <Divider orientation="vertical" flexItem style={{ margin: "0 25px", border: "1px solid gray" }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "10px", alignItems: "flex-start", gap: "8px" }}>
              <div className="cc-title">Phone</div>
              <div className="cc-desc">
                {contactDetails?.phone?.split(",").map((num: any, i: any) => (
                  <div key={i}>{num.trim()}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-card" data-aos="fade-right">
            <AlternateEmail style={{ fontSize: 30, color: "#1976d2" }} />

            <Divider orientation="vertical" flexItem style={{ margin: "0 25px", border: "1px solid gray" }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "10px", alignItems: "flex-start", gap: "8px" }}>
              <div className="cc-title">Email</div>
              <div className="cc-desc">{contactDetails.email}</div>
            </div>
          </div>

          <div className="contact-card" data-aos="fade-right">
            <AccessTimeFilled style={{ fontSize: 30, color: "#1976d2" }} />

            <Divider orientation="vertical" flexItem style={{ margin: "0 25px", border: "1px solid gray" }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "10px", alignItems: "flex-start", gap: "8px" }}>
              <div className="cc-title">Working Hours</div>
              <div className="cc-desc">{contactDetails.workingHours}</div>
            </div>
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
            maxBoundsViscosity={1.0}
            scrollWheelZoom={false}
            style={{
              height: "500px",
              width: "90%",
              borderRadius: "5px",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((loc, i) => (
              <Marker key={i} position={[loc.lat, loc.lng]}>
                <Popup>
                  <strong>{loc.name}</strong>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
