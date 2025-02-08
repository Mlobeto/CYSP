import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Panel from "./Components/Admin/Panel";




import LoginAdmin from "./Components/Admin/Login/Login";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Ruta protegida: solo los administradores pueden ver el Panel */}
      <Route
        path="/panel"
        element={
          //  <ProtectedRoutes>
          <Panel />
          //  </ProtectedRoutes>
        }
      />
       
     
      <Route path="/login" element={<LoginAdmin />} />
    </Routes>
  );
}

export default App;

