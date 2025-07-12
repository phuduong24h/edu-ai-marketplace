'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';

const RootLayout = ({ children }) => {
  return (
    <>
      <AppProgressBar height="2px" color="var(--secondary)" options={{ showSpinner: false }} shallowRouting />
      <Toaster position="top-center" richColors />
      {children}
    </>
  );
};

export default RootLayout;
