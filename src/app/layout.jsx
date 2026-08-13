import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Modal } from '@/components/ui/Modal';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { DemoModalProvider } from '@/context/DemoModalContext';

export const metadata = {
  title: 'Eduniketan Private Limited — Institutional Placement & Training Solutions',
  description: 'Eduniketan provides autograder coding platforms (TheEduCode), mentor-led training (TheEduLive), placement bootcamps (TheEduBootCamp), and full PEP integration for top universities.',
  keywords: ['Eduniketan', 'TheEduCode', 'TheEduLive', 'Placement Mastery Program', 'Campus Placement Training', 'Autograder Platform', 'LPU PEP'],
  other: {
    'facebook-domain-verification': 'y621bqxd7gvduob9mihlejv9wmbl5d',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50 flex flex-col min-h-screen">
        <SplashScreen />
        <DemoModalProvider>
          <Navbar />
          <main className="flex-grow pt-[72px]">
            {children}
          </main>
          <Modal />
          <Footer />
        </DemoModalProvider>
      </body>
    </html>
  );
}
