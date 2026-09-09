'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { profile } from '@/data/profile';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll state for the header.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-border bg-background/80 py-4 shadow-sm backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
          aria-label={`${profile.name} home`}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-primary/20 bg-surface-muted">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <span>{profile.name.split(' ')[0]}.</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="btn btn-primary h-9 px-5"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-md p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={
            isMobileMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`absolute left-0 top-full w-full overflow-hidden border-b border-border bg-background shadow-lg transition-[max-height,opacity] duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'max-h-[calc(100vh-80px)] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="container flex flex-col gap-1 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-surface-muted hover:text-primary"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="btn btn-primary mt-2 w-full"
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}

