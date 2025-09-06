import CommonLayout from "./components/layout/CommonLayout";
import { BackButtonController } from "./components/BackButtonController";
import DebugOverlay from "./components/DebutOverlay";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      className=" min-h-screen w-full bg-[var(--tma-primary)]
  text-white"
    >
      {/* keep content above bg */}
      <BackButtonController />
      {/* add bottom padding so navbar doesn't cover content (adjust if your navbar height changes) */}
      <div className="relative z-10 container mx-auto px-4 py-6 pb-28">
        <CommonLayout>
          <Outlet />
          <DebugOverlay />
        </CommonLayout>
      </div>
    </div>
  );
}
export default App;
