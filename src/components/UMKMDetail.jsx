import { useEffect, useState } from "react";
import { UMKMS } from "../data/umkms";
import "./umkm.css";

export default function UMKMDetail({ id }) {
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    const found = UMKMS.find((u) => u.id === id);
    setUmkm(found || null);
  }, [id]);

  if (!umkm) return <p>UMKM tidak ditemukan.</p>;

  const mapSrc = umkm.mapsLink || `https://www.google.com/maps?q=${encodeURIComponent(umkm.address)}&z=15&output=embed`;

  return (
    <div className="umkm-detail">
      <button className="back" onClick={() => (window.location.hash = "#/")}>
        &larr; Kembali
      </button>
      <h2>{umkm.name}</h2>
      <p className="short">{umkm.shortDescription}</p>
      <p className="address">
        <strong>Alamat:</strong> {umkm.address}
      </p>

      <div className="map-wrap">
        <iframe title="map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

      <div className="gallery">
        <h3>Foto</h3>
        {umkm.photos && umkm.photos.length ? (
          <div className="photos">
            {umkm.photos.map((p, i) => (
              <img key={i} src={p.startsWith("/") ? p.replace("/public", "") : p} alt={`${umkm.name} ${i + 1}`} />
            ))}
          </div>
        ) : (
          <p>Tidak ada foto.</p>
        )}
      </div>
    </div>
  );
}
