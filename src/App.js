import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import GetDomain from "./Auth/Get Domain/GetDomain";
import AdminLogin from "./Auth/Login/AdminLogin";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import VerifayPassword from "./Auth/Verivation Code/VerifayPassword";
import CreateNewPassword from "./Auth/Create Password/CreateNewPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MainInfo from "./Pesonal Information/Main For Personal Information/MainInfo";
import PersonalInformation from "./Pesonal Information/Personal Information/PersonalInformation";
import EditInfo from "./Pesonal Information/Edit Personal Information/EditInfo";
import Shops from "./Pages/Shops/Shops";
import Users from "./Pages/Users/Users";
import AddUser from "./Pages/Users/AddUser";
import Support from "./Pages/Support/Support";
import Faqs from "./Pages/Faqs/Faqs";
import Home from "./Pages/Home/Home";
import AllPermissions from "./Pages/Permissions/AllPermissions";
import StoreTheme from "./Profile/Store/ThemStore";
import StoreInformation from "./Profile/Store/StoreInformation";
import Pricing from "./Profile/Store/PrincingPlan";
import ViewUserDetails from "./Pages/Users/ViewUserDetails";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PulseLoader color="#E0A75E" size={17} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetDomain />} />
        {/* auth */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminLogin/ForgotPassword" element={<ForgotPassword />} />
        <Route
          path="/AdminLogin/VerifayPassword"
          element={<VerifayPassword />}
        />
        <Route
          path="/AdminLogin/CreateNewPassword"
          element={<CreateNewPassword />}
        />
        {/* dashboard routes */}
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="MainInfo" element={<MainInfo />}>
            <Route index element={<PersonalInformation />} />
            <Route path="EditInfo" element={<EditInfo />} />
            <Route path="StoreTheme" element={<StoreTheme/>}/>
            <Route path="StoreInformation" element={<StoreInformation/>}/>
            <Route path="Pricing" element={<Pricing/>}/>
          </Route>
          {/* shops */}
          <Route path="Shops" element={<Shops />} />
          {/* users */}
          <Route path="Users" element={<Users />} />
          <Route path="Users/:userId" element={<ViewUserDetails/>}/>
          <Route path="AddUser" element={<AddUser />} />
          {/* pages */}
          <Route path="Home" element={<Home />} />
          <Route path="Support" element={<Support />} />
          <Route path="Faqs" element={<Faqs />} />
          <Route path="AllPermissions" element={<AllPermissions/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;