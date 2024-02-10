import Link from "next/link";
import "./navbar.css";
import Image from "next/image";
import Search from "../SearchWrapperHome";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="menuLeft">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  width={150}
                  height={40}
                  alt="Logo"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
