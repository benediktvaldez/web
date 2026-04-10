'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  options: string[];
  href: string;
  className?: string;
}

export function RandomCta({ options, href, className }: Props) {
  const [text] = useState(() => options[Math.floor(Math.random() * options.length)]);

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
