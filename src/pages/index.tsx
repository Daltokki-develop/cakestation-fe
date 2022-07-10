import Link from 'next/link';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Cakestation FE"
          description="Cakestation FE 진행 상황 공유"
        />
      }
    >
      <h1 className="text-2xl font-bold">Cakestation</h1>
      <div>
        <Link href="/designsystem">
          <a>🎨 Design System</a>
        </Link>
        <Link href="/mapview">
          <a>🚉 Map</a>
        </Link>
        <Link href="/reviews">
          <a>💬 Review</a>
        </Link>
      </div>
    </Main>
  );
};

export default Index;
