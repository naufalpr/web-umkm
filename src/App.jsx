import { useEffect, useState } from "react";
import "./App.css";
import UMKMList from "./components/UMKMList";
import UMKMDetail from "./components/UMKMDetail";

function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // route patterns: #/ or #/umkm/:id
  if (route.startsWith("#/umkm/")) {
    const id = route.replace("#/umkm/", "");
    return (
      <div>
        <header>
          <h1>Daftar UMKM</h1>
        </header>
        <main>
          <UMKMDetail id={id} />
        </main>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Daftar UMKM</h1>
      </header>
      <main>
        <UMKMList />
      </main>
    </div>
  );
}

export default App;
