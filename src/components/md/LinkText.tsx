import Link from "next/link";

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkText = ({ children, href, className = "" }: LinkTextProps) => {
  return (
    <Link
      href={href}
      className={`text-neutral-700 transition duration-200 ease-in-out hover:text-neutral-400 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkText;
