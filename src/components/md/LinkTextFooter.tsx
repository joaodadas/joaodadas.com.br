import Link from "next/link";

interface LinkTextFooterProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkTextFooter = ({
  children,
  href,
  className = "",
}: LinkTextFooterProps) => {
  return (
    <Link
      href={href}
      className={`text-neutral-400 transition duration-200 ease-in-out hover:text-neutral-600 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkTextFooter;
