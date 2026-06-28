export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      {/* Main Title */}
      <h1 className="text-3xl font-extrabold mb-6 text-green-600">
        About ZelenTools
      </h1>

      <section className="space-y-8 text-gray-800">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Our Goal:</h2>
          <p className="leading-relaxed">
            Welcome to <strong>ZelenTools</strong>! We provide free and easy-to-use <strong>online tools</strong> for everyone. Our mission is to help you finish your digital tasks quickly without needing to download any heavy software.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Why Use ZelenTools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-green-700 underline mb-1">Safe & Private</h3>
              <p className="text-sm text-gray-600">We care about your privacy. Your files are never stored on our servers. Everything is processed safely in your browser.</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-green-700 underline mb-1">100% Free</h3>
              <p className="text-sm text-gray-600">All tools on ZelenTools are completely free to use. There are no hidden fees or monthly subscriptions.</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-green-700 underline mb-1">No Sign-up</h3>
              <p className="text-sm text-gray-600">You don't need to create an account. Just open the site and start using the tools immediately.</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-green-700 underline mb-1">Works Everywhere</h3>
              <p className="text-sm text-gray-600">Our website works perfectly on all devices, including mobile phones, tablets, and computers.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">What's Next?</h2>
          <p className="leading-relaxed">
            We are always adding new and better <strong>web tools</strong> to our list. We want ZelenTools to be the only place you need for all your file management and digital editing work.
          </p>
        </div>

        {/* Contact Box */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
          <h3 className="text-green-800 font-bold text-lg mb-2">Have a Question?</h3>
          <p className="text-green-700 text-sm">
            If you have any suggestions or need help, feel free to contact us. We love to hear from our users!
          </p>
        </div>
      </section>
    </div>
  );
}