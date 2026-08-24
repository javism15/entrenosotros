'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { getFirebaseServices, isFirebaseConfigured } from '@/lib/firebase';

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const services = getFirebaseServices();
    if (!services) {
      setReady(true);
      return;
    }
    services.auth.useDeviceLanguage();
    return onAuthStateChanged(services.auth, (nextUser) => {
      setUser(nextUser);
      setReady(true);
    });
  }, []);

  const signIn = useCallback(async () => {
    const services = getFirebaseServices();
    if (!services) return;
    setBusy(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(services.auth, provider);
    } catch (reason) {
      const code = typeof reason === 'object' && reason && 'code' in reason ? String(reason.code) : '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(services.auth, provider);
      } else if (code !== 'auth/popup-closed-by-user') {
        setError('No se ha podido iniciar sesión con Google. Inténtalo de nuevo.');
      }
    } finally {
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const services = getFirebaseServices();
    if (services) await firebaseSignOut(services.auth);
  }, []);

  return { user, ready, busy, error, configured: isFirebaseConfigured, signIn, signOut };
}

