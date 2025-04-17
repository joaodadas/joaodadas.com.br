import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = ({ href }: { href: string }) => {
  return (
    <div className="pb-6 pt-12">
      <Link href={href}>
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer text-xl transition duration-200 ease-in-out hover:text-[#C49B66]`}
        />
      </Link>
    </div>
  );
};

export default BackButton;
