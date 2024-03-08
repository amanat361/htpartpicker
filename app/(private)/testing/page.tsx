import TagForm from "./ProductFormTesting";

export default function TestingPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Testing Page</h1>
      <TagForm category="Testing" />
    </div>
  );
}
