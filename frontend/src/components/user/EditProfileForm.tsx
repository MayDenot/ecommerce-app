import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axiosConfig";

type Section = "profile" | "password";

interface ProfileForm {
    name: string;
    email: string;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface FeedbackState {
    type: "success" | "error";
    message: string;
}

const EditProfileForm = ({ onClose }: { onClose: () => void }) => {
    const { user, updateUser } = useAuth();
    const [activeSection, setActiveSection] = useState<Section>("profile");

    const [profileForm, setProfileForm] = useState<ProfileForm>({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const showFeedback = (type: "success" | "error", message: string) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 3500);
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingProfile(true);
        try {
            const { data } = await api.put("/users/me", {
                name: profileForm.name,
                email: profileForm.email,
            });
            updateUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            showFeedback("success", "Perfil actualizado correctamente.");
        } catch (err: any) {
            const msg = err.response?.data?.message ?? "Error al actualizar el perfil.";
            showFeedback("error", msg);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showFeedback("error", "Las contraseñas nuevas no coinciden.");
            return;
        }
        setLoadingPassword(true);
        try {
            await api.put("/users/me/password", {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            showFeedback("success", "Contraseña actualizada correctamente.");
        } catch (err: any) {
            const msg = err.response?.data?.message ?? "Contraseña actual incorrecta.";
            showFeedback("error", msg);
        } finally {
            setLoadingPassword(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Editar perfil
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition hover:text-gray-600 cursor-pointer"
                        aria-label="Cerrar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    {(["profile", "password"] as Section[]).map((section) => (
                        <button
                            key={section}
                            onClick={() => {
                                setActiveSection(section);
                                setFeedback(null);
                            }}
                            className={`flex-1 py-3 text-sm font-medium transition cursor-pointer
                                ${activeSection === section
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {section === "profile" ? "Datos personales" : "Contraseña"}
                        </button>
                    ))}
                </div>

                <div className="px-6 py-6">

                    {/* Feedback */}
                    {feedback && (
                        <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium
                            ${feedback.type === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                        >
                            {feedback.message}
                        </div>
                    )}

                    {/* Sección: Datos personales */}
                    {activeSection === "profile" && (
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.name}
                                    onChange={(e) =>
                                        setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.email}
                                    onChange={(e) =>
                                        setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loadingProfile}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {loadingProfile ? "Guardando..." : "Guardar cambios"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Sección: Contraseña */}
                    {activeSection === "password" && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Contraseña actual
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) =>
                                        setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) =>
                                        setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Mínimo 8 caracteres"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Confirmar nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Repetí la nueva contraseña"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loadingPassword}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {loadingPassword ? "Actualizando..." : "Cambiar contraseña"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfileForm;