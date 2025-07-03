import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to the Music Client privacy policy. We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">The Data We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><span className="font-medium">Identity Data</span> includes first name, last name, username or similar identifier.</li>
            <li><span className="font-medium">Contact Data</span> includes email address and telephone numbers.</li>
            <li><span className="font-medium">Technical Data</span> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><span className="font-medium">Usage Data</span> includes information about how you use our website, products, and services, including listening history and playlists created.</li>
            <li><span className="font-medium">Marketing and Communications Data</span> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">How We Use Your Data</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To register you as a new customer.</li>
            <li>To process and deliver your service including managing payments, fees, and charges.</li>
            <li>To manage our relationship with you.</li>
            <li>To personalize your experience and deliver relevant content and music recommendations.</li>
            <li>To administer and protect our business and this website.</li>
            <li>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Your Legal Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
          </p>
          <p className="text-gray-600 leading-relaxed">Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="text-gray-600 leading-relaxed">Email: labi44347@gmail.com</p>
          <p className="text-gray-600 leading-relaxed">Phone: +251 93 035 7207</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;