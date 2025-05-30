import Image from "next/image";
import StatsHeader from './components/StatsHeader';
import SalesAnalytics from './components/SalesAnalytics';
import ActivityFeed from './components/ActivityFeed';
import ProductSellingTable from './components/ProductSellingTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
      </div>
      <StatsHeader />
      <div className="p-6 space-y-6">
        <SalesAnalytics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductSellingTable />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
