import "../common/main.css";
import "../common/contact.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type Place = { name: string; lat: number; lng: number; type: string };

export default function ContactUsMap() {
  const places: Place[] = [
    { name: "Colombo Showroom", lat: 6.9271, lng: 79.8612, type: "showroom" },
    { name: "Kandy Showroom", lat: 7.2906, lng: 80.6337, type: "showroom" },
    { name: "Galle Hardware", lat: 6.0535, lng: 80.2210, type: "hardware" },
    { name: "Kurunegala Hardware", lat: 7.4863, lng: 80.3600, type: "hardware" },
  ];

  return (
    <div className="contact-outer">
      <div className="title-outer white" data-aos="fade-down">
        Contact Us
      </div>
      <div className="title-sub-outer white" data-aos="fade-up">
        Built on Trust & Excellence
      </div>

      <div className="contact-sub-outer">
        {/* Contact Details Left */}
        <div className="contact-inner">
          <p>No. 123, Main Street, Colombo, Sri Lanka</p>
          <p>📞 +94 77 123 4567</p>
          <p>📧 info@vidmaengineering.lk</p>
          <p>🕒 Mon - Fri: 8:00 AM - 5:00 PM</p>
        </div>

        {/* Map Right */}
        <div className="contact-inner">
          <MapContainer
            center={[7.8731, 80.7718] as [number, number]}
            zoom={7}
            style={{ height: "420px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {places.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lng] as [number, number]}>
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
