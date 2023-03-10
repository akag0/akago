import Navbar from "../components/organisms/Navbar";

interface Props {
  children: React.ReactNode;
}

const ProductLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProductLayout;
