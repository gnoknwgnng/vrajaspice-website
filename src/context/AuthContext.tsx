"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface CustomerProfile {
  id: number;
  full_name: string;
  email: string | null;
  mobile: string | null;
  whatsapp_number: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: CustomerProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  // Helper to fetch customer profile from customers table
  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("id, full_name, email, mobile, whatsapp_number")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching customer profile:", error.message);
        return null;
      }

      if (!data) {
        // Auto-create profile row if it's missing in customers table (self-healing)
        const { data: newProfile, error: createError } = await supabase
          .from("customers")
          .insert([
            {
              full_name: "Valued Customer",
              email: email || null,
              user_id: userId,
            },
          ])
          .select("id, full_name, email, mobile, whatsapp_number")
          .maybeSingle();

        if (createError) {
          console.error("Failed to auto-create customer profile:", createError.message);
          return null;
        }
        return newProfile;
      }

      return data;
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      return null;
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // Get current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const customerData = await fetchProfile(session.user.id, session.user.email || "");
        setProfile(customerData);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        if (session?.user) {
          setUser(session.user);
          const customerData = await fetchProfile(session.user.id, session.user.email || "");
          setProfile(customerData);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signOut = async () => {
    if (!isConfigured) return;
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
