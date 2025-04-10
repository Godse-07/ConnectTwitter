"use client";

import { Twitter, Github, Mail, Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 py-10 flex flex-col items-center text-white">
      <div className="flex items-center gap-4 mb-4">
        <Blocks className="h-10 w-10" />
        <span className="text-2xl font-semibold">TwitBlock</span>
        <p className="text-[12px]">© {new Date().getFullYear()} All rights reserved</p>
      </div>
      <div className="flex gap-6">
        <Link href="https://twitter.com" target="_blank">
          <Twitter className="hover:text-blue-400 transition" />
        </Link>
        <Link href="https://github.com/Godse-07" target="_blank">
          <Github className="hover:text-gray-400 transition" />
        </Link>
        <Link href="mailto:mukhopadhyaypushan42@gmail.com">
          <Mail className="hover:text-red-400 transition" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
