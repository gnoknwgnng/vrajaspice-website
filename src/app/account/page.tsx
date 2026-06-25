"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LogOut, Package, MapPin, User, ChevronDown, CheckCircle, Clock, Truck, ShieldAlert, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: number;
  order_number: string;
  created_at: string;
  total_amount: number;
  order_status: string;
  payment_method: string;
  payment_status: string;
  shipping_charge: number;
  order_items: OrderItem[];
}

interface SavedAddress {
  id: number;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pin_code: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Address Form States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [addingAddress, setAddingAddress] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/account");
    }
  }, [user, authLoading, router]);

  // Load Profile Fields when profile is fetched
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setMobile(profile.mobile || "");
      setWhatsapp(profile.whatsapp_number || "");
    }
  }, [profile]);

  // Fetch Orders
  useEffect(() => {
    if (!profile?.id) return;

    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            id,
            order_number,
            created_at,
            total_amount,
            order_status,
            payment_method,
            payment_status,
            shipping_charge,
            order_items (
              id,
              product_name,
              quantity,
              unit_price,
              total_price
            )
          `)
          .eq("customer_id", profile.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders((data as any) || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [profile?.id]);

  // Fetch Addresses
  useEffect(() => {
    if (!profile?.id) return;

    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const { data, error } = await supabase
          .from("addresses")
          .select("id, line1, line2, city, state, pin_code")
          .eq("customer_id", profile.id);

        if (error) throw error;
        setAddresses(data || []);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [profile?.id]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.replace("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-[#8B1A1A] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-[#2C1810] font-sans font-medium text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-[#FAF6EB] border border-[#E6D7B8] p-8 rounded-2xl shadow-sm">
          <ShieldAlert className="w-12 h-12 text-[#8B1A1A] mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-[#2C1810] mb-2">Profile Not Found</h2>
          <p className="text-sm text-[#8B4513]/70 mb-6">
            We couldn&apos;t load your customer profile. This is usually caused by database permissions (Row Level Security policies) or connection limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              Retry
            </button>
            <button
              onClick={handleLogout}
              className="border border-[#8B1A1A]/30 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);

    try {
      const { error } = await supabase
        .from("customers")
        .update({
          full_name: fullName,
          mobile: mobile || null,
          whatsapp_number: whatsapp || null,
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile details.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingAddress(true);

    try {
      const { data, error } = await supabase
        .from("addresses")
        .insert([
          {
            customer_id: profile.id,
            line1,
            line2: line2 || null,
            city,
            state,
            pin_code: pinCode,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setAddresses((prev) => [...prev, data[0]]);
      }

      toast.success("Address added successfully!");
      setShowAddressForm(false);
      setLine1("");
      setLine2("");
      setCity("");
      setState("");
      setPinCode("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to add address.");
    } finally {
      setAddingAddress(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const { error } = await supabase.from("addresses").delete().eq("id", id);
      if (error) throw error;

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete address.");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600 shrink-0" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600 shrink-0" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDD8] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* User Card */}
        <div className="bg-[#FAF6EB] border border-[#E6D7B8] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full bg-[#8B1A1A] text-[#F5EDD8] flex items-center justify-center font-serif text-2xl font-bold">
              {profile.full_name?.charAt(0).toUpperCase() || "C"}
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810]">
                {profile.full_name}
              </h1>
              <p className="text-[#8B4513]/60 text-sm">{profile.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#8B1A1A]/30 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="bg-[#FAF6EB] border border-[#E6D7B8] rounded-2xl overflow-hidden p-2">
            {[
              { id: "orders", label: "Order History", icon: Package },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
              { id: "profile", label: "Profile details", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#2C1810] text-[#F5EDD8]"
                      : "text-[#8B4513] hover:bg-[#EDE0C4]/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 bg-[#FAF6EB] border border-[#E6D7B8] rounded-2xl p-6 md:p-8 shadow-sm min-h-[400px]">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-6">Your Orders</h2>
                {loadingOrders ? (
                  <div className="text-center py-10">
                    <svg className="w-6 h-6 animate-spin text-[#8B1A1A] mx-auto mb-2" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-xs text-[#8B4513]">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-12 h-12 text-[#8B4513]/30 mx-auto mb-4" />
                    <p className="text-[#8B4513]/60 text-sm mb-4">You haven&apos;t placed any orders yet.</p>
                    <button
                      onClick={() => router.push("/shop")}
                      className="bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                      Shop Spices
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const isExpanded = expandedOrderId === order.id;
                      return (
                        <div
                          key={order.id}
                          className="border border-[#E6D7B8] rounded-xl overflow-hidden bg-[#FAF6EB] hover:border-[#D4A017] transition-all duration-200"
                        >
                          <div
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 cursor-pointer select-none"
                          >
                            <div>
                              <p className="font-semibold text-sm text-[#2C1810]">
                                Order #{order.order_number}
                              </p>
                              <p className="text-xs text-[#8B4513]/60 mt-0.5">
                                Placed on {new Date(order.created_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap">
                              <span className="text-sm font-bold text-[#2C1810]">
                                ₹{order.total_amount}
                              </span>
                              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E6D7B8] rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C1810]">
                                {getStatusIcon(order.order_status)}
                                <span className="ml-1">{order.order_status}</span>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-[#8B4513] transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t border-[#E6D7B8] p-5 bg-[#FAF6EB]/40">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B4513] mb-3">
                                Items Ordered
                              </h3>
                              <ul className="divide-y divide-[#E6D7B8]/40 mb-4">
                                {order.order_items.map((item) => (
                                  <li key={item.id} className="py-2.5 flex items-center justify-between text-sm">
                                    <div className="min-w-0">
                                      <p className="font-semibold text-[#2C1810] truncate">
                                        {item.product_name}
                                      </p>
                                      <p className="text-xs text-[#8B4513]/60">
                                        Qty: {item.quantity} · Price: ₹{item.unit_price}
                                      </p>
                                    </div>
                                    <span className="font-bold text-[#2C1810]">
                                      ₹{item.total_price}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex justify-between border-t border-[#E6D7B8]/40 pt-3 text-sm">
                                <span className="text-[#8B4513]/60">Payment Method</span>
                                <span className="font-semibold capitalize text-[#2C1810]">
                                  {order.payment_method} ({order.payment_status})
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Saved Addresses</h2>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-1.5 bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Add New
                    </button>
                  )}
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-white border border-[#E6D7B8] rounded-xl p-5 mb-6 space-y-4 shadow-sm">
                    <h3 className="font-semibold text-sm text-[#2C1810] uppercase tracking-wider mb-2">New Address</h3>
                    <div>
                      <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">ADDRESS LINE 1</label>
                      <input
                        type="text"
                        required
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        placeholder="House No, Apartment, Street"
                        className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">ADDRESS LINE 2 (OPTIONAL)</label>
                      <input
                        type="text"
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                        placeholder="Landmark, Area"
                        className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">CITY</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Mumbai"
                          className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">STATE</label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">PIN CODE</label>
                        <input
                          type="text"
                          required
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="6-digit code"
                          className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="border border-[#E6D7B8] text-[#8B4513] hover:bg-[#EDE0C4]/30 px-5 py-2 rounded-xl text-sm font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={addingAddress}
                        className="bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                      >
                        {addingAddress ? "Saving..." : "Save Address"}
                      </button>
                    </div>
                  </form>
                )}

                {loadingAddresses ? (
                  <div className="text-center py-10">
                    <svg className="w-6 h-6 animate-spin text-[#8B1A1A] mx-auto mb-2" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-xs text-[#8B4513]">Loading addresses...</p>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-[#E6D7B8] rounded-xl bg-[#FAF6EB]/40">
                    <MapPin className="w-10 h-10 text-[#8B4513]/20 mx-auto mb-3" />
                    <p className="text-sm text-[#8B4513]/60">No saved addresses found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white border border-[#E6D7B8] rounded-xl p-5 relative shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#2C1810] leading-snug">
                            {addr.line1}
                          </p>
                          {addr.line2 && (
                            <p className="text-sm text-[#8B4513]/80 leading-snug mt-0.5">
                              {addr.line2}
                            </p>
                          )}
                          <p className="text-xs font-semibold text-[#8B4513] mt-2">
                            {addr.city}, {addr.state} — {addr.pin_code}
                          </p>
                        </div>
                        <div className="flex justify-end mt-4 border-t border-[#F2E7CD] pt-3">
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[#8B1A1A] hover:text-red-700 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-6">Profile details</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      disabled
                      value={profile.email || ""}
                      className="w-full px-4 py-2.5 bg-[#EDE0C4]/40 border border-[#E6D7B8] text-[#2C1810]/50 rounded-xl text-sm cursor-not-allowed"
                    />
                    <p className="text-[10px] text-[#8B4513]/50 mt-1">Email cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">MOBILE NUMBER</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 9999999999"
                      className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8B4513] mb-1.5">WHATSAPP NUMBER</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. 9999999999"
                      className="w-full px-4 py-2.5 bg-[#F5EDD8]/20 border border-[#E6D7B8] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
                  >
                    {updatingProfile ? "Saving changes..." : "Save changes"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
