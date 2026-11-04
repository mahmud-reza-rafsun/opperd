import Footer from "@/components/Layout/Footer/Footer";
import Navbar from "@/components/Layout/Navbar/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="">
            <Navbar />
            <div className="f">
                {children}
            </div>
            <Footer />
        </div>
    );
}
