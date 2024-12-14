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
              <a
                href="/login"
                onClick={handleLogout}
                className="nav-link px-4 fs-5 text-white"
              >{t('header.logout')}</a></li>
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
          <Language/>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
