import { useState } from 'react';
import { FaSave, FaCog, FaBell, FaShieldAlt, FaGlobe, FaDatabase } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    platform: {
      siteName: 'TuneDownloader',
      siteDescription: 'Your gateway to unlimited music',
      maintenanceMode: false,
      allowRegistration: true
    },
    notifications: {
      emailNotifications: true,
      newUserAlerts: true,
      downloadAlerts: false,
      weeklyReports: true
    },
    security: {
      requireEmailVerification: true,
      maxLoginAttempts: 5,
      sessionTimeout: 24,
      enableTwoFactor: false
    },
    content: {
      autoApproveSongs: false,
      maxFileSize: 10,
      allowedFormats: ['mp3', 'wav', 'm4a'],
      enableComments: true
    }
  });

  const [activeTab, setActiveTab] = useState('platform');
  const [saving, setSaving] = useState(false);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, you would save to your API
      // await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'platform', name: 'Platform', icon: FaGlobe },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'content', name: 'Content', icon: FaDatabase }
  ];

  const renderSettingField = (category, key, label, type = 'text', options = null) => {
    const value = settings[category][key];
    
    switch (type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button
              onClick={() => handleSettingChange(category, key, !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        );
      
      case 'select':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <select
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'number':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleSettingChange(category, key, parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSave className="mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'platform' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Configuration</h3>
              
              {renderSettingField('platform', 'siteName', 'Site Name')}
              {renderSettingField('platform', 'siteDescription', 'Site Description')}
              {renderSettingField('platform', 'maintenanceMode', 'Maintenance Mode', 'boolean')}
              {renderSettingField('platform', 'allowRegistration', 'Allow User Registration', 'boolean')}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
              
              {renderSettingField('notifications', 'emailNotifications', 'Enable Email Notifications', 'boolean')}
              {renderSettingField('notifications', 'newUserAlerts', 'New User Registration Alerts', 'boolean')}
              {renderSettingField('notifications', 'downloadAlerts', 'Download Activity Alerts', 'boolean')}
              {renderSettingField('notifications', 'weeklyReports', 'Weekly Analytics Reports', 'boolean')}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
              
              {renderSettingField('security', 'requireEmailVerification', 'Require Email Verification', 'boolean')}
              {renderSettingField('security', 'maxLoginAttempts', 'Maximum Login Attempts', 'number')}
              {renderSettingField('security', 'sessionTimeout', 'Session Timeout (hours)', 'number')}
              {renderSettingField('security', 'enableTwoFactor', 'Enable Two-Factor Authentication', 'boolean')}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Management</h3>
              
              {renderSettingField('content', 'autoApproveSongs', 'Auto-approve Song Uploads', 'boolean')}
              {renderSettingField('content', 'maxFileSize', 'Maximum File Size (MB)', 'number')}
              {renderSettingField('content', 'enableComments', 'Enable User Comments', 'boolean')}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Formats</label>
                <div className="flex flex-wrap gap-2">
                  {settings.content.allowedFormats.map((format, index) => (
                    <span
                      key={format}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {format}
                      <button
                        onClick={() => {
                          const newFormats = settings.content.allowedFormats.filter((_, i) => i !== index);
                          handleSettingChange('content', 'allowedFormats', newFormats);
                        }}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
