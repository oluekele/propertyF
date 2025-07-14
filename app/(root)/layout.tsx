// 'use client';

// import { useAdminGuard } from '@/utils/useAuth';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode} from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // const [client] = useState(() => new QueryClient());
  //  useAdminGuard();
  return (
    // <QueryClientProvider client={client}>
    //   {children}
    // </QueryClientProvider>
    <div>
      {children}
    </div>
  );
}
