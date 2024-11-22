'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function AccountSettings() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    location: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      sms: false,
      browser: true
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showPhone: false
    }
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setFormData(prev => ({
          ...prev,
          fullName: profile.full_name || '',
          email: user.email || '',
          company: profile.company || '',
          role: profile.role || '',
          phone: profile.phone || '',
          location: profile.location || '',
          bio: profile.bio || '',
          notifications: profile.notifications || prev.notifications,
          privacy: profile.privacy || prev.privacy
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const [section, key] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [key]: checkbox.checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }

        const { error } = await supabase.auth.updateUser({
          password: formData.newPassword
        });

        if (error) throw error;
        toast.success('Password updated successfully');
      }

      // Update profile data
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          company: formData.company,
          role: formData.role,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          notifications: formData.notifications,
          privacy: formData.privacy,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;
      toast.success('Profile updated successfully');
      router.refresh();

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 className="card-title fw-semibold mb-0">Account Settings</h5>
              <small className="text-muted">Manage your account preferences and settings</small>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="border-bottom pb-3 mb-4">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="ti ti-user me-2"></i>Profile
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <i className="ti ti-lock me-2"></i>Security
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="ti ti-bell me-2"></i>Notifications
                </button>
              </li>
            </ul>
          </div>

          <form>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div className="position-relative">
                      <Image
                        src="/placeholder-avatar.jpg"
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-circle"
                      />
                      <button className="btn btn-sm btn-primary position-absolute bottom-0 end-0">
                        <i className="ti ti-pencil"></i>
                      </button>
                    </div>
                    <div>
                      <h6 className="mb-1">{formData.fullName || 'Your Name'}</h6>
                      <p className="text-muted mb-0">{formData.role || 'Your Role'}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Change Password</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Privacy Settings</h6>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="privacy.profilePublic"
                      checked={formData.privacy.profilePublic}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Make my profile public</label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="privacy.showEmail"
                      checked={formData.privacy.showEmail}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Show my email on profile</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="privacy.showPhone"
                      checked={formData.privacy.showPhone}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Show my phone number on profile</label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Notification Preferences</h6>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Email Notifications</label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="notifications.sms"
                      checked={formData.notifications.sms}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">SMS Notifications</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="notifications.browser"
                      checked={formData.notifications.browser}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Browser Notifications</label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
