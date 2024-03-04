export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 xl:p-12">
      {children}
    </main>
  );
}
