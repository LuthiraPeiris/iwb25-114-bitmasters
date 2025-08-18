import React from "react";
import aboutUsImage from "../assets/AboutUs.png";
import aboutUs2Image from "../assets/AboutUs2.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-800 text-white font-sans border-t-4 border-cyan-400">
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About DeviceCare
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          DeviceCare is a friendly tech helper for everyone—students,
          technicians, and everyday device users. Get instant guidance through
          our AI chatbot and connect with our helpful community forum.
        </p>
      </section>

      <div className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          <div className="flex justify-center">
            <img
              src={aboutUsImage}
              alt="DeviceCare - AI Assistant"
              className="w-full max-w-sm rounded-xl shadow-2xl border border-white/20"
            />
          </div>

          <div className="flex justify-center">
            <img
              src={aboutUs2Image}
              alt="DeviceCare - Community Forum"
              className="w-full max-w-sm rounded-xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 pb-20">
        <section className="mb-16 text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">
              Our Mission
            </h2>
            <p className="text-lg">
              To make reliable tech support simple, fast, and accessible for
              everyone—anytime, anywhere.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Instant Answers</h3>
              <p>
                Chat with our AI assistant to troubleshoot problems in real
                time—no jargon, just clear steps you can follow.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Community Wisdom</h3>
              <p>
                Post your issue in the forum to get help from experienced users
                and technicians. Share fixes, tips, and lessons learned.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Learn as You Go</h3>
              <p>
                Save solutions, follow threads, and build your personal
                knowledge base so you can solve future issues faster.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            How DeviceCare Works
          </h2>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-400 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-2">Describe the problem</h4>
                  <p>Tell the chatbot what's wrong with your device.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-400 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-2">Try guided steps</h4>
                  <p>
                    Follow a step-by-step fix tailored to your device and
                    symptoms.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-400 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-2">Ask the community</h4>
                  <p>
                    If you still need help, post to the forum to get human
                    insight and alternative solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-400 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold mb-2">Resolve & share</h4>
                  <p>Mark what worked and help others by sharing your fix.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            Who We Serve
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Students</h3>
              <p>Who need fast fixes during classes, exams, or projects.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Technicians</h3>
              <p>
                Who want to share expertise, build reputation, and help more
                people.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Everyday Users</h3>
              <p>Who want dependable answers without the stress.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            Why DeviceCare
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-3">Fast</h3>
              <p className="text-sm">
                Get immediate troubleshooting steps from the chatbot.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-3">Trustworthy</h3>
              <p className="text-sm">
                Community-vetted solutions and guidance from verified
                technicians.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-3">Friendly</h3>
              <p className="text-sm">
                Clear language, simple steps, and supportive contributors.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-3">Transparent</h3>
              <p className="text-sm">
                Marked answers, success rates, and safety notes.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Care First</h3>
              <p>
                People over problems. We focus on clarity, patience, and
                empathy.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p>Knowledge grows when it's shared. Everyone can contribute.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Credibility</h3>
              <p>
                We encourage verified sources, tested solutions, and honest
                feedback.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Privacy & Safety</h3>
              <p>We protect user data and promote safe repair practices.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
              Privacy & Safety
            </h2>
            <div className="space-y-4">
              <p>• We never ask for unnecessary personal details.</p>
              <p>
                • We avoid risky procedures and always recommend safe,
                reversible steps first.
              </p>
              <p>
                • For complex or warranty-sensitive issues, we'll recommend
                professional service.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400">
            Get Involved
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Ask</h3>
              <p>Use the chatbot or start a forum thread.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Answer</h3>
              <p>Share your fix and help others.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Improve</h3>
              <p>
                Suggest features, report bugs, and help us build a better
                platform.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
