import Footer from "@/components/common/Footer";
import TopNav from "@/components/common/TopNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="container p-3 md:p-6 mx-auto max-w-7xl">{children}</main>
      <Footer />
    </>
  );
}
