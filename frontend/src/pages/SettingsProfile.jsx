import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useUpdateUser } from '../hooks/useUsers';
import { ProfileInfoForm } from '../components/export';
import { useAuthStore } from '../store/export';
import toast from 'react-hot-toast';

const SettingsProfile = () => {
    const { user, setUser } = useOutletContext();
    const setAuthUser = useAuthStore((state) => state.setUser);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImageViewUrl, setProfileImageViewUrl] = useState(user?.profile || "/Images/Default/user.png");

    const { mutateAsync: updateUserMutation, isPending: isLoading } = useUpdateUser();

    // Update profile image view when user changes (e.g. after successful update)
    useEffect(() => {
        if (user?.profile) {
            setProfileImageViewUrl(user.profile);
        }
    }, [user?.profile]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setProfileImageViewUrl(previewUrl);
    };

    const updateImage = async () => {
        if (!selectedFile) return;
        try {
            const formData = new FormData();
            formData.append('profileImage', selectedFile);
            const data = await updateUserMutation(formData);
            if (data) {
                // Update local and global user state
                const updatedUser = { ...user, profile: data.profile };
                setUser(updatedUser);
                setAuthUser(data);
                setSelectedFile(null);
                toast.success("Profile image updated!");
            }
        } catch (error) {
            console.log(error.stack);
            toast.error("Failed to update profile image!");
        }
    };

    useEffect(() => {
        if (selectedFile) {
            updateImage();
        }
    }, [selectedFile]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cross-field validation for phone and countryCode
        if ((user.phone && !user.countryCode) || (!user.phone && user.countryCode)) {
            toast.error("Both Country Code and Phone Number are required if one is provided!");
            return;
        }

        try {
            const formData = new FormData();
            const fields = [
                'name', 'jobTitle', 'headline', 'bio', 'location',
                'countryCode', 'phone', 'linkedinUsername',
                'twitterUsername', 'portfolioWebsiteLink', 'resumeLink'
            ];

            fields.forEach(field => {
                let value = user[field] || '';
                if (field === 'countryCode' && value.startsWith('+')) {
                    value = value.substring(1); // Strip '+' for backend enum compliance
                }
                formData.append(field, value);
            });

            const data = await updateUserMutation(formData);

            if (data) {
                setUser(data);
                setAuthUser(data);
                setIsEditing(false);
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.log(error.stack);
            toast.error("Failed to update profile!");
        }
    };

    return (
        <ProfileInfoForm
            user={user}
            handleChange={handleChange}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            profileImageViewUrl={profileImageViewUrl}
            handleImageUpload={handleImageUpload}
        />
    );
};

export default SettingsProfile;
