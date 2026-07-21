'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function LinkedinIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
                <Image
                  src="/assets/Company Logo.png"
                  alt="Eduniketan Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">EDUNIKETAN</span>
                <span className="block text-[10px] font-bold tracking-widest text-teal-400 uppercase -mt-1">
                  Private Limited
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Bridging the gap between university curriculum and industry online assessments through autograder platforms, mentor-led live training, and placement mastery programs.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                Stay Updated with Placement Insights
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm py-2">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter official email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-white transition-colors">
                  Our Journey
                </Link>
              </li>
              <li>
                <Link href="/albums" className="hover:text-white transition-colors">
                  Albums & Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Founders
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white transition-colors">
                  Clients & MoU Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Offerings</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products/placement-mastery-program" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> Placement Mastery
                </Link>
              </li>
              <li>
                <Link href="/products/theedu-code" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> TheEduCode Platform
                </Link>
              </li>
              <li>
                <Link href="/products/theedu-live" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> TheEduLive Mentorship
                </Link>
              </li>
              <li>
                <Link href="/products/theedu-bootcamp" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> TheEduBootCamp (LPU PEP)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Ground Floor, Shri Ravi Building, Garthama Bazar, Sindhora Road, Varanasi, Uttar Pradesh, 221208</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:hr.shreya@eduniketanpvtltd.com" className="hover:text-white transition-colors">
                  hr.shreya@eduniketanpvtltd.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919596400127" className="hover:text-white transition-colors">
                  +91 95964 00127 (Ms. Shreya Khajuria, HR)
                </a>
              </li>
              <li className="pt-2 flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/company/eduniketan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-semibold"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" /> LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/eduniketan_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-semibold"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Eduniketan Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
