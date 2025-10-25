import { useMemo, useState } from "react";
import { UMKMS, CATEGORIES } from "../data/umkms";
import "./umkm.css";

export default function UMKMList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return UMKMS.filter((u) => {
      const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || u.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="umkm-list">
      <div className="controls">
        <input className="search" placeholder="Cari UMKM berdasarkan nama..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filtered.map((u) => (
          <article key={u.id} className="card" onClick={() => (window.location.hash = `#/umkm/${u.id}`)}>
            <div className="thumb">{u.photos && u.photos.length ? <img src={u.photos[0].startsWith("/") ? u.photos[0].replace("/public", "") : u.photos[0]} alt={u.name} /> : <div className="placeholder">No Image</div>}</div>
            <div className="info">
              <h3>{u.name}</h3>
              <p className="category">{u.category}</p>
              <p className="desc">{u.shortDescription}</p>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p>Tidak ada UMKM yang cocok.</p>}
      </div>
    </div>
  );
}
