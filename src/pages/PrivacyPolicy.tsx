export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen text-gray-800">
      <h1 className="text-3xl font-extrabold mb-6 text-green-600">Privacy Policy</h1>
      
      <p className="mb-6 leading-relaxed">
        Your privacy is our top priority. At <strong>ZelenTools</strong>, we believe in keeping things simple and safe.
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">1. No Accounts or Login</h2>
          <p className="leading-relaxed text-sm md:text-base">
            You do not need to create an account or provide any personal information to use ZelenTools. We do not have a login system, so your identity remains completely anonymous.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">2. Data Security</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We do not store or save any files you upload. All the work happens inside your browser. Once you close the tab or finish your task, your data is gone. We never see your files.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">3. No Tracking</h2>
          <p className="leading-relaxed text-sm md:text-base">
            We do not use any advanced tracking tools to follow your activity. We only look at basic website traffic to see how many people are using our tools, but we cannot identify who you are.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">4. Your Consent</h2>
          <p className="leading-relaxed text-sm md:text-base">
            By using ZelenTools, you agree to this simple privacy policy. We promise to keep our tools free, safe, and private for everyone.
          </p>
        </div>

        
      </section>
    </div>
  );
}