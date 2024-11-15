import InventorySummary from "./components/InventorySummary";
import MostSoldProductsDashboard from "./components/MostSoldProductsDashboard";
import PurchaseOverviewDashboard from "./components/PurchaseOverviewDashboard";
import SalesDashboard from "./components/SalesDashboard";
import SalesOverviewDashboard from "./components/SalesOverviewDashboard";

function App() {
  return (
    <main className="flex gap-5 bg-gray-50 p-10 min-h-screen">
      <div className="w-1/2 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <SalesOverviewDashboard />
          <div className="flex gap-5">
            <PurchaseOverviewDashboard />
            <InventorySummary />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SalesDashboard/>
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <MostSoldProductsDashboard/>
      </div>
    </main>
  );
}

export default App;
