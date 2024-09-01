'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "../navLinks/navlink.module.css"
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";


// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/dashboard', icon: FaHome },
  { name: 'Aadhaar verification', href: '/dashboard/aadhaar', icon: HiOutlineDocumentCheck },
  { name: 'PAN verification', href: '/dashboard/pan', icon: HiOutlineDocumentCheck },
  { name: 'GST verification', href: '/dashboard/gst', icon: HiOutlineDocumentCheck },
  { name: 'Pincode verification', href: '/dashboard/pincode', icon: HiOutlineDocumentCheck },
  { name: 'Bank Verifcation', href: '/dashboard/bank', icon: HiOutlineDocumentCheck },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className={styles.linkIcons} />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
