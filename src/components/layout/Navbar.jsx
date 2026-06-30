"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
                <Link href="/"
                    className="text-2xl font-bold tracking-[0.3em]">BLOOD EAGLE</Link>
                <div className="flex gap-8 uppercase text-sm tracking-widest">
                    <Link href="/" className="hover:text-gray-400 transition">Home</Link>
                    <Link href="/events" className="hover:text-gray-400 transition">Events</Link>
                    <Link href="/about" className="hover:text-gray-400 transition">About</Link>
                    <Link href="/gallery" className="hover:text-gray-400 transition">Gallery</Link>
                    <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
                </div>
            </div>
        </nav>
    );
}