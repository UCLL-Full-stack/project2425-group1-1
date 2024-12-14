import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    router.push({ pathname, query }, asPath, { locale: event.target.value });
  };

  return (
    <select
      className="form-select"
      value={locale}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="tr">Turkish</option>
      <option value="sr">Serbian</option>
    </select>
  );
};

export default Language;
