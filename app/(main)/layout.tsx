import TopNav from "@/components/common/TopNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="container mx-auto max-w-7xl p-3 md:p-6">{children}</main>
    </>
  );
}
