import React, { useState, useEffect } from "react";
import {
    ArrowRight,
    User,
    FileText,
    Settings,
    LogOut,
    Plus,
    ChevronRight,
    Clock,
    CheckCircle,
    AlertCircle,
    Mail,
    Phone,
    Globe,
    Linkedin,
    Building2,
    Briefcase,
    MapPin
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../api/api";

const THEME = {
    deep: "#0B1220",
    sand: "#E9E7DF",
    pink: "#C91D67",
    accent: "#C51F5D",
    accent2: "#356BB0",
    accent3: "#0D9488",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B"
};

const StatusBadge = ({ status }) => {
    const configs = {
        pending: { color: THEME.warning, icon: Clock, label: "Pending Review" },
        approved: { color: THEME.success, icon: CheckCircle, label: "Approved" },
        rejected: { color: THEME.error, icon: AlertCircle, label: "Declined" },
        received: { color: THEME.accent2, icon: Clock, label: "Received" }
    };

    const config = configs[status.toLowerCase()] || configs.pending;
    const Icon = config.icon;

    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: `${config.color}15`, color: config.color }}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </div>
    );
};

export default function ExpertDashboardPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [showIncompleteModal, setShowIncompleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [profileRes, appsRes] = await Promise.all([
                apiClient.get("/experts/profile"),
                apiClient.get("/experts/applications")
            ]);
            if (profileRes.data.has_profile === false || appsRes.data.applications.length === 0) {
                // If no profile or applications, show the completion modal
                setShowIncompleteModal(true);
            }
            setProfile(profileRes.data.profile);
            setApplications(appsRes.data.applications);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/portal?mode=login&redirect=/experts/dashboard");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        try {
            await apiClient.put("/experts/profile", profile);
            setEditing(false);
            // Optional: Show success toast
        } catch (error) {
            console.error("Error updating profile", error);
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.sand }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-4 border-[#C91D67] border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6" style={{ background: THEME.sand }}>
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: THEME.pink }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: '#356BB0' }} />
            </div>

            <div className="relative mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full lg:w-72 space-y-4">
                        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-xl shadow-black/5 ring-1 ring-black/5">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#C91D67] flex items-center justify-center text-white text-2xl font-bold">
                                    {profile?.full_name?.charAt(0) || "E"}
                                </div>
                                <div>
                                    <h2 className="font-bold text-[#0B1220] leading-tight">{profile?.full_name}</h2>
                                    <p className="text-xs text-[#0B1220]/50">Expert Network Member</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === "profile" ? "bg-[#C91D67] text-white shadow-lg shadow-[#C91D67]/20" : "text-[#0B1220]/60 hover:bg-black/5"}`}
                                >
                                    <User size={18} /> Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab("applications")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === "applications" ? "bg-[#C91D67] text-white shadow-lg shadow-[#C91D67]/20" : "text-[#0B1220]/60 hover:bg-black/5"}`}
                                >
                                    <FileText size={18} /> My Applications
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-black/5">
                                <button
                                    onClick={async () => {
                                        await apiClient.post("/logout");
                                        localStorage.removeItem("app_auth");
                                        navigate("/portal");
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        </div>

                        <Link
                            to="/experts/register"
                            className="block bg-white/80 hover:bg-white text-center py-4 rounded-2xl font-bold border-2 border-dashed border-black/10 hover:border-[#C91D67]/30 transition-all group"
                        >
                            <Plus size={20} className="mx-auto mb-1 text-[#C91D67] group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-[#0B1220]/70">New Application</span>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === "profile" ? (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white/90 backdrop-blur-xl rounded-[40px] p-8 sm:p-10 shadow-xl shadow-black/5 ring-1 ring-black/5"
                                >
                                    <div className="flex items-center justify-between mb-10">
                                        <div>
                                            <h1 className="text-3xl font-bold text-[#0B1220]">Profile Settings</h1>
                                            <p className="text-[#0B1220]/50">Manage your expert identity and credentials</p>
                                        </div>
                                        <button
                                            onClick={() => setEditing(!editing)}
                                            className="px-6 py-2.5 rounded-xl font-bold border-2 border-black/10 hover:bg-black/5 transition-all"
                                        >
                                            {editing ? "Cancel" : "Edit Profile"}
                                        </button>
                                    </div>

                                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.full_name || ""}
                                                        onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled
                                                        value={profile?.email || ""}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.phone || ""}
                                                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Country</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.country || ""}
                                                        onChange={e => setProfile({ ...profile, country: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Organization</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.organization || ""}
                                                        onChange={e => setProfile({ ...profile, organization: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Position</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.position || ""}
                                                        onChange={e => setProfile({ ...profile, position: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">LinkedIn Profile</label>
                                                <div className="relative">
                                                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.linkedin || ""}
                                                        onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1220]/40 ml-1">Website / Portfolio</label>
                                                <div className="relative">
                                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1220]/30 w-4 h-4" />
                                                    <input
                                                        disabled={!editing}
                                                        value={profile?.website || ""}
                                                        onChange={e => setProfile({ ...profile, website: e.target.value })}
                                                        className="w-full bg-black/5 rounded-2xl pl-11 pr-5 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C91D67]/20 transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {editing && (
                                            <div className="flex justify-end pt-6">
                                                <button
                                                    disabled={saveLoading}
                                                    type="submit"
                                                    className="px-10 py-4 rounded-2xl bg-[#C91D67] text-white font-bold shadow-xl shadow-[#C91D67]/20 hover:brightness-110 transition-all disabled:opacity-50"
                                                >
                                                    {saveLoading ? "Saving Changes..." : "Save Profile"}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="applications"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between px-2">
                                        <h2 className="text-2xl font-bold text-[#0B1220]">My Applications</h2>
                                        <span className="text-sm font-bold text-[#0B1220]/40 bg-black/5 px-4 py-1.5 rounded-full">{applications.length} Total</span>
                                    </div>

                                    {applications.length === 0 ? (
                                        <div className="bg-white/90 backdrop-blur-xl rounded-[40px] p-16 text-center shadow-xl shadow-black/5 ring-1 ring-black/5">
                                            <div className="w-16 h-16 bg-[#C91D67]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <FileText className="text-[#C91D67]" size={28} />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0B1220] mb-2">No applications yet</h3>
                                            <p className="text-[#0B1220]/50 mb-8 max-w-sm mx-auto">You haven't submitted any expert applications. Join the network to share your knowledge.</p>
                                            <Link to="/experts/register" className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#C91D67] text-white font-bold hover:brightness-110 shadow-lg shadow-[#C91D67]/20 transition-all">
                                                <Plus size={18} /> Submit First Application
                                            </Link>
                                        </div>
                                    ) : (
                                        applications.map((app) => (
                                            <div key={app.id} className="bg-white/90 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 hover:ring-[#C91D67]/20 transition-all group">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-[#0B1220] group-hover:bg-[#C91D67]/10 transition-colors">
                                                            <FileText size={22} className="group-hover:text-[#C91D67] transition-colors" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <h3 className="font-bold text-[#0B1220]">Application #{app.id}</h3>
                                                                <StatusBadge status={app.status} />
                                                            </div>
                                                            <p className="text-xs text-[#0B1220]/40 font-semibold tracking-wide flex items-center gap-1.5">
                                                                <Clock size={12} /> SUBMITTED ON {new Date(app.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 sm:self-center">
                                                        <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold border-2 border-black/5 hover:bg-black/5 transition-all text-sm text-[#0B1220]/60">
                                                            View Details
                                                        </button>
                                                        <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#0B1220]/30 group-hover:translate-x-1 transition-transform">
                                                            <ChevronRight size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showIncompleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl text-center ring-1 ring-black/5"
                        >
                            <div className="w-20 h-20 bg-[#C91D67]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="text-[#C91D67]" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#0B1220] mb-4">Complete Your Profile</h2>
                            <p className="text-[#0B1220]/60 mb-8 leading-relaxed">
                                To access the expert dashboard, you need to complete your profile data and submit your first application.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate("/experts/register")}
                                    className="w-full py-4 rounded-2xl bg-[#C91D67] text-white font-bold shadow-xl shadow-[#C91D67]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                >
                                    Complete Data & Submit <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        apiClient.post("/logout");
                                        localStorage.removeItem("app_auth");
                                        navigate("/portal");
                                    }}
                                    className="w-full py-3 text-sm font-bold text-[#0B1220]/40 hover:text-[#0B1220]/60 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
