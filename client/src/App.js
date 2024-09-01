import "./App.css";
import Header from "./Components/Header";
import Loader from "./Components/Loader/Loader";
import { useLoading } from "./Hooks/useLoading";
import { setLoadingInterceptor } from "./Interceptors/LoadingInterceptor";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <div className="scroll_bar min-h-[100vh] back overflow-hidden bg-gradient-to-b from-[#379298] to-[#084d50] h-max font-['Merriweather']">
      <Loader />
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
