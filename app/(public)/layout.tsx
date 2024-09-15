import ConstructionGreeting from "@/components/construction";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConstructionGreeting />
      <main className="flex flex-col items-center justify-center p-4">
        {children}
      </main>
    </>
  );
}
