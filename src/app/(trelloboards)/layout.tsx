import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default BoardLayout;
