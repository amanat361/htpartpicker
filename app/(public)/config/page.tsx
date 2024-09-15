export default function ConfigPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Config</h1>
      <div className="space-y-4">
        <a href="/config/random">Random</a>
        <a href="/config/all">All</a>
      </div>
    </div>
  );
}