import Config from 'react-native-config';
import { QueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

export const queryClient = new QueryClient();

// export const supabase = createClient(
//   String(Config.SUPABASE_URL),
//   String(Config.API_KEY),
// );
