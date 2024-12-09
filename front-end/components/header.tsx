import Link from 'next/link';
import Image from 'next/image';
import { AuthResponse } from '@types';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);

  useEffect(() => {
    setAuthData(JSON.parse(localStorage.getItem("auth") ?? "null"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuthData(null);
  };

  return (
    <header className="px-3 mb-3 border-bottom bg-dark">
      <nav className="navbar justify-content-center">
        <a className="navbar-brand" href="/">
          <Image
            src="/images/logo.png"
            className="rounded"
            alt="Logo"
            width={260}
            height={60}
          />
        </a>
        <ul className="navbar-nav">
          <li className="navbar-item">
            <Link href="/" className="nav-link px-4 fs-5 text-white">
              Home
            </Link>
          </li>
          {authData && (<>
            <li className="navbar-item">
              <Link href="/sprints" className="nav-link px-4 fs-5 text-white">
                Sprints
              </Link>
            </li>
            <li className="navbar-item">
              <a
                href="/login"
                onClick={handleLogout}
                className="nav-link px-4 fs-5 text-white"
              >Logout</a></li>
          </>)}
          {!authData && (<>
            <li className="navbar-item">
              <Link
                href="/login"
                className="nav-link px-4 fs-5 text-white">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="/signup"
                className="nav-link px-4 fs-5 text-white">
                Sign-up
              </Link>
            </li>
          </>)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
