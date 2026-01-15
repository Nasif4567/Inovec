"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useSession, signOut } from "next-auth/react"; // Added signOut
import { User, Settings, LogOut, Mail, Phone, MapPin, Save, X, Hash, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // New state for deletion
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    
    if (status === "authenticated" && session?.user) {
      setFormData({
        name: session.user.name || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
        city: session.user.city || "",
        zipCode: session.user.zipCode || session.user.zip || "", 
      });
      setLoading(false);
    }
  }, [status, session, router]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/profile/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await update({ ...session, user: { ...session?.user, ...formData } });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setSaving(false);
    }
  };

  // --- NEW DELETE HANDLER ---
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will permanently remove your data from our system and Zoho Inventory."
    );

    if (!confirmed) return;

    setDeleting(true);
    try {
      const response = await fetch("/api/profile/deleteProfile", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        await signOut({ callbackUrl: "/" }); // Clears session and redirects
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Deletion failed", error);
      alert("An error occurred. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#2563eb" size={35} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-28">
      <main className="max-w-5xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <input 
                className="text-2xl font-bold text-slate-900 border-b-2 border-blue-500 focus:outline-none bg-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            ) : (
              <h1 className="text-2xl font-bold text-slate-900">{formData.name}</h1>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
              disabled={saving || deleting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing ? "bg-blue-600 text-white" : "border border-slate-200 hover:bg-slate-50 text-black"
              }`}
            >
              {saving ? <ClipLoader size={14} color="#fff" /> : isEditing ? <Save size={16} /> : <Settings size={16} />}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            {isEditing && (
              <button onClick={() => setIsEditing(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
             <nav className="flex flex-col gap-1">
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-md shadow-blue-100">
                  <User size={18} /> Overview
                </button>
                <hr className="my-2 border-slate-200" />
                
                {/* UPDATED DELETE BUTTON */}
                <button 
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                >
                  {deleting ? (
                    <ClipLoader size={18} color="#dc2626" />
                  ) : (
                    <LogOut size={18} />
                  )}
                  {deleting ? "Deleting..." : "Delete Account"}
                </button>
             </nav>
          </aside>

          {/* Main Content */}
          <section className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900">Contact & Location</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="p-2 bg-slate-100 rounded-lg"><Mail size={18} /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                      <p className="text-sm font-medium text-slate-800">{session?.user?.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg"><Phone size={18} /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</p>
                      {isEditing ? (
                        <input 
                          type="text"
                          className="w-full p-2 border rounded-lg text-sm text-black"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{formData.phone || "Add phone number"}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="border-t pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-slate-100 rounded-lg"><MapPin size={18} /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Delivery Address</p>
                      
                      {isEditing ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Address (Building, Street, Zone)"
                            className="w-full p-3 border rounded-xl text-black"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />

                          <div className="grid grid-cols-3 gap-4">
                            <select 
                              className="p-3 border rounded-xl text-black bg-white text-sm"
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                            >
                              <option value="" disabled>Select City</option>
                              <option value="Doha">Doha</option>
                              <option value="Al Rayyan">Al Rayyan</option>
                              <option value="Al Wakrah">Al Wakrah</option>
                              <option value="Al Khor">Al Khor</option>
                              <option value="Al Shahaniya">Al Shahaniya</option>
                              <option value="Al Daayen">Al Daayen</option>
                              <option value="Umm Salal">Umm Salal</option>
                              <option value="Madinat ash Shamal">Madinat ash Shamal</option>
                            </select>

                            <input
                              type="text"
                              placeholder="Zip Code"
                              className="p-3 border rounded-xl text-black text-sm"
                              value={formData.zipCode}
                              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                            />

                            <div className="p-3 border rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-medium text-sm">
                              Qatar
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-slate-800">
                          <p>{formData.address || "No address set"}</p>
                          <p className="text-slate-500 mt-1">
                            {formData.city ? `${formData.city}, ` : ""}
                            {formData.zipCode ? `PO Box ${formData.zipCode}, ` : ""}
                            Qatar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}