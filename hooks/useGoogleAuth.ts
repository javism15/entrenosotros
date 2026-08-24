'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
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
    void getRedirectResult(services.auth).catch(() => {
      setError('No se ha podido completar el acceso con Google. Inténtalo de nuevo.');
    });
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
      await signInWithRedirect(services.auth, provider);
    } catch {
      setError('No se ha podido iniciar sesión con Google. Inténtalo de nuevo.');
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const services = getFirebaseServices();
    if (services) await firebaseSignOut(services.auth);
  }, []);

  return { user, ready, busy, error, configured: isFirebaseConfigured, signIn, signOut };
}

