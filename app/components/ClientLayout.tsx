'use client';

import { ReactNode } from 'react';
import Providers from './Providers';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
} 