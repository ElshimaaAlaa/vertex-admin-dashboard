import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import EditUserInfo from "./Pages/Users/EditUser";
import { SearchProvider } from "./Context/SearchContext";
import Plans from "./Pages/SubScriptions/Plans/Plans";
import ShopSub from "./Pages/SubScriptions/Shop Sub/ShopSub";
import ViewSubscription from "./Pages/SubScriptions/Shop Sub/ViewSubscription";
import AddPlan from "./Pages/SubScriptions/Plans/AddPlan";
import AddRole from "./Pages/Permissions/AddRole";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PulseLoader color="#E0A75E" size={17} />
      </div>
    );
  }

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetDomain />} />
          <Route
            path="/Dashboard"
            element={<Navigate to="/Dashboard/Home" replace />}
          />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route
            path="/AdminLogin/ForgotPassword"
            element={<ForgotPassword />}
          />
          <Route
            path="/AdminLogin/VerifayPassword"
            element={<VerifayPassword />}
          />
          <Route
            path="/AdminLogin/CreateNewPassword"
            element={<CreateNewPassword />}
          />

          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="MainInfo" element={<MainInfo />}>
              <Route index element={<PersonalInformation />} />
              <Route path="EditInfo" element={<EditInfo />} />
              <Route path="StoreTheme" element={<StoreTheme />} />
              <Route path="StoreInformation" element={<StoreInformation />} />
              <Route path="Pricing" element={<Pricing />} />
            </Route>
            <Route path="Shops" element={<Shops />} />
            <Route path="Users" element={<Users />} />
            <Route path="Users" element={<Users />} />
            <Route path="Users/AddUser" element={<AddUser />} />
            <Route path="Users/View/:id" element={<ViewUserDetails />} />
            <Route path="Users/Edit/:id" element={<EditUserInfo />} />
            <Route path="AddUser" element={<AddUser />} />
            <Route path="Home" element={<Home />} />
            <Route path="Support" element={<Support />} />
            <Route path="Faqs" element={<Faqs />} />
            <Route path="Plans" element={<Plans />} />
            <Route path="AddPlan" element={<AddPlan/>} />
            <Route path="ShopSub" element={<ShopSub />} />
            <Route path="ShopSub/:id" element={<ViewSubscription />} />
            <Route path="AllPermissions" element={<AllPermissions />} />
            <Route path="AddRole" element={<AddRole/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
