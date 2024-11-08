import Link from "next/link";

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
}

const LinkText = ({ children, href }: LinkTextProps) => {
  return (
    <Link
      href={href}
      className={`text-neutral-200 underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[#D21044]`}
    >
      {children}
    </Link>
  );
};

export default LinkText;
