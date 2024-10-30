import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="px-3 mb-3 border-bottom bg-dark">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <Image
            src="/images/logo.png"
            className="rounded"
            alt="Logo"
            width={260}
            height={60}
          />
        </a>

        <div className="me-auto">
          <Link href="/" className="nav-link px-4 fs-5 text-white">
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
