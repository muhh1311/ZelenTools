import { Mail, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen text-gray-800">
      <h1 className="text-3xl font-extrabold mb-6 text-green-600">Contact Us</h1>
      
      <p className="mb-8 leading-relaxed text-gray-600">
        Have any questions, feedback, or suggestions for a new tool? We are here to help. 
        The best way to reach us is via email.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Email Us</h3>
              <p className="text-sm text-gray-600 font-medium">rm13111311@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Support</h3>
              <p className="text-sm text-gray-600">Available for feature requests and bug reports.</p>
            </div>
          </div>
        </div>

        {/* Action Box */}
        <div className="bg-green-600 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            Quick Feedback <Send size={18} />
          </h3>
          <p className="text-sm text-green-50 mb-6">
            Want us to add a specific tool? Drop us an email and we will try our best to build it for you.
          </p>
          <a 
            href="mailto:rm13111311@gmail.com" 
            className="inline-block w-full text-center bg-white text-green-600 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-md"
          >
            Send Email Now
          </a>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-400 italic">
          Your communication with ZelenTools is 100% private. We value your feedback.
        </p>
      </div>
    </div>
  );
}