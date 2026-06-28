export default function Terms() {
  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen text-gray-800">
      <h1 className="text-3xl font-extrabold mb-6 text-green-600 border-b pb-4">Terms & Conditions</h1>
      
      <p className="mb-6 leading-relaxed text-gray-600">
        Welcome to <span className="font-bold text-green-700">ZelenTools</span>. By using our website, you agree to the following simple rules. These terms protect both you and our service.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Use of Services</h2>
          <p className="leading-relaxed text-sm md:text-base text-gray-700">
            You are free to use our tools for personal or professional work. However, you must not use ZelenTools for any illegal activities or to spread harmful content. We provide these tools for free to help the community.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Privacy & Data Processing</h2>
          <p className="leading-relaxed text-sm md:text-base text-gray-700">
            ZelenTools processes all images **locally in your browser**. We do not upload your files to any server. Your privacy is guaranteed as your data never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. No Guarantees (As-Is)</h2>
          <p className="leading-relaxed text-sm md:text-base text-gray-700">
            Our tools are provided "as-is." While we try our best to provide high-quality results using modern browser technology, we do not guarantee that the tools will always be 100% accurate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p className="leading-relaxed text-sm md:text-base text-gray-700">
            ZelenTools will not be responsible for any data loss or damages that happen while using our website. Please ensure you have backups of your original images before processing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Changes to Terms</h2>
          <p className="leading-relaxed text-sm md:text-base text-gray-700">
            We may update these terms from time to time to keep up with new features or legal requirements. Continued use of the site signifies your acceptance of these changes.
          </p>
        </section>
      </div>

      
    </div>
  );
}