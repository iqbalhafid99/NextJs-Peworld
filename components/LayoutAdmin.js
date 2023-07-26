import Footer from "./Footer";
import NavAdmin from "./NavAdmin";

export default function LayoutAdmin({ children }) {
  return (
    <div>
      <NavAdmin />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
