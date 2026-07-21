'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useDemoModal } from '@/context/DemoModalContext';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  Menu,
  X,
  Code2,
  Video,
  Rocket,
  Award,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Users,
  Building,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

const productItems = [
  {
    name: 'Placement Mastery Program',
    href: '/products/placement-mastery-program',
    tagline: 'Flagship bundled PEP solution (TheEduCode + TheEduLive)',
    icon: Award,
    badge: 'Flagship',
  },
  {
    name: 'TheEduCode',
    href: '/products/theedu-code',
    tagline: 'Question & autograder platform with real-time analytics',
    icon: Code2,
    badge: 'Platform',
  },
  {
    name: 'TheEduLive',
    href: '/products/theedu-live',
    tagline: 'Mentor-led industry training & interactive sessions',
    icon: Video,
    badge: 'Live Mentorship',
  },
  {
    name: 'TheEduBootCamp',
    href: '/products/theedu-bootcamp',
    tagline: 'Placement enhancement program deployed at LPU',
    icon: Rocket,
    badge: 'BootCamp',
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-md' : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/assets/Company Logo.png"
              alt="Eduniketan Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              EDUNIKETAN
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-teal-600 uppercase -mt-1">
              Private Limited
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/products"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                pathname.startsWith('/products') ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
            </Link>

            {productsOpen && (
              <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Our Platforms & Programs
                  </div>
                  {productItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-700 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.tagline}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-1 border-t border-slate-100 mt-1">
                    <Link
                      href="/products"
                      className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-800 py-1.5 flex items-center justify-center gap-1"
                    >
                      View All Offerings <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/journey"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/journey' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            Journey
          </Link>

          <Link
            href="/albums"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/albums' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            Albums
          </Link>

          <Link
            href="/about"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/about' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            About
          </Link>

          <Link
            href="/clients"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/clients' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            Clients
          </Link>

          <Link
            href="/contact"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === '/contact' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Button onClick={() => openDemoModal('Placement Mastery Program')} size="sm" variant="primary">
            Request a Demo
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Button onClick={() => openDemoModal()} size="sm" variant="primary" className="text-xs px-3 py-1.5">
            Demo
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <div className="py-2">
              <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Products</div>
              <div className="pl-2 space-y-1">
                {productItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                  >
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/journey"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              Our Journey
            </Link>

            <Link
              href="/albums"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              Albums & Gallery
            </Link>

            <Link
              href="/about"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              About Us
            </Link>

            <Link
              href="/clients"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              Clients & Partners
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                openDemoModal();
              }}
              variant="primary"
              className="w-full"
            >
              Request a Live Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
