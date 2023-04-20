export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>
      <div className="w-full rounded-md bg-white p-6 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/3">
        {children}
      </div>
    </div>
  );
}
