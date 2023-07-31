import Dashboard from "../examples-dashboards/Dashboard";
import Divider from "../components/Divider";

export default function DashboardPage() {
  return (
    <div className="w-full bg-white p-4 shadow-xl rounded-lg min-h-[100vh]">
      <article className="prose mt-2 font-optimistic  ml-0 2xl:mx-auto">
        <header>
          <h1 className="text-5xl font-optimistic font-bold">Dashboard</h1>
          <p className="whitespace my-4 font-optimistic"></p>
        </header>
        <Divider />
        <Dashboard />

      </article>
    </div>
  );
}
