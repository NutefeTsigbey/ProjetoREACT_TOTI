import "./styles/App.css";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
import AppContext from "./utils/AppContext";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Suspense fallback={<div className="error-loading">Loading...</div>}>
      <AppContext>
        <Loading />
        <Home />
      </AppContext>
    </Suspense>
  );
}

export default App;
