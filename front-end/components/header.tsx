import Link from 'next/link';
import Image from 'next/image';
import { AuthResponse } from '@types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Language from './language/Language';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const [authData, setAuthData] = useState<AuthResponse | null>(null);

  useEffect(() => {
    setAuthData(JSON.parse(localStorage.getItem("auth") ?? "null"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuthData(null);
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            src="/images/logo.png"
            className="rounded"
            alt="Logo"
            width={260}
            height={60}
          />
        </Link>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarList"
          aria-controls="navbarList"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarList">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link href="/" className="nav-link px-4 fs-5 text-white">
                {t('header.home')}
              </Link>
            </li>
            {authData && (<>
              <li className="navbar-item">
                <Link href="/sprints" className="nav-link px-4 fs-5 text-white">
                  {t('header.sprints')}
                </Link>
              </li>
              <li className="navbar-item">
                <Link href="/users" className="nav-link px-4 fs-5 text-white">
                  {t('header.users')}
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="nav-link px-4 fs-5 text-white"
                >
                  {t('header.logout')}
                </Link>
              </li>
            </>)}
            {!authData && (<>
              <li className="navbar-item">
                <Link
                  href="/login"
                  className="nav-link px-4 fs-5 text-white">
                  {t('header.login')}
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  href="/signup"
                  className="nav-link px-4 fs-5 text-white">
                  {t('header.signup')}
                </Link>
              </li>
            </>)}
            <li className="navbar-item my-auto">
              <Language />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
