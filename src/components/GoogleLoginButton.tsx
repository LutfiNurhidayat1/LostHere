import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';
import { FcGoogle } from 'react-icons/fc';

export function GoogleLoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Button fullWidth onClick={handleLogin}>
      <FcGoogle className="mr-2" />
      Login dengan Google
    </Button>
  );
}
