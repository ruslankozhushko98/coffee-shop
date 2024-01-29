import 'react-native-url-polyfill/auto';

import { QueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, API_KEY } from '@env';

export const queryClient = new QueryClient();

export const supabase = createClient(String(SUPABASE_URL), String(API_KEY));
