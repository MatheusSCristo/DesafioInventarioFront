import InventorySummary from "./components/InventorySummary";
import PurchaseOverviewDashboard from "./components/PurchaseOverviewDashboard";
import SalesOverviewDashboard from "./components/SalesOverviewDashboard";

function App() {
  return (
    <main className="flex gap-5 bg-gray-50 p-10 min-h-screen">
      <div className="w-1/2 flex flex-col gap-5">
        <SalesOverviewDashboard/>
        <div className="flex gap-5">
          <PurchaseOverviewDashboard/>
          <InventorySummary/>
        </div>
      </div>

    </main>
  );
}

export default App;
