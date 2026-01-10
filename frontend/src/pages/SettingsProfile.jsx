import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useUpdateUser } from '../hooks/useUsers';
import { ProfileInfoForm } from '../components/export';
import { useAuthStore } from '../store/export';
import toast from 'react-hot-toast';

const SettingsProfile = () => {
    const { user, setUser } = useOutletContext();
    const setAuthUser = useAuthStore((state) => state.setUser);
    const [isEditing, setIsEditing] = useState(false);

    const { mutateAsync: updateUserMutation, isPending: isLoading } = useUpdateUser();

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
        />
    );
};

export default SettingsProfile;
