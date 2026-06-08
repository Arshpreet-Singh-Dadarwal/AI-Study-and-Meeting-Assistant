import Layout from "@/components/Layout";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div
              className="glass-card p-8 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  Free
                </h3>
                <p className="text-muted-foreground text-sm">
                  Perfect for getting started
                </p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <PricingFeature>5 documents per month</PricingFeature>
                <PricingFeature>30 minutes of recording</PricingFeature>
                <PricingFeature>Basic summaries</PricingFeature>
                <PricingFeature>Email support</PricingFeature>
              </ul>

              <Link
                to="/study"
                className="block w-full text-center py-3 rounded-lg border border-border font-semibold hover:bg-secondary/50 transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </span>
              </div>

              <div className="glass-card p-8 border-primary/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Pro
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      For serious students & professionals
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold">$19</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <PricingFeature>Unlimited documents</PricingFeature>
                    <PricingFeature>10 hours of recording</PricingFeature>
                    <PricingFeature>Advanced AI summaries</PricingFeature>
                    <PricingFeature>Study questions & flashcards</PricingFeature>
                    <PricingFeature>Action item extraction</PricingFeature>
                    <PricingFeature>Priority support</PricingFeature>
                  </ul>

                  <Link
                    to="/study"
                    className="cosmic-button block w-full text-center py-3"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>

            {/* Team Plan */}
            <div
              className="glass-card p-8 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  Team
                </h3>
                <p className="text-muted-foreground text-sm">
                  For teams and organizations
                </p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/user/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <PricingFeature>Everything in Pro</PricingFeature>
                <PricingFeature>Unlimited recordings</PricingFeature>
                <PricingFeature>Team collaboration</PricingFeature>
                <PricingFeature>Admin dashboard</PricingFeature>
                <PricingFeature>SSO & advanced security</PricingFeature>
                <PricingFeature>Dedicated support</PricingFeature>
              </ul>

              <Link
                to="/study"
                className="block w-full text-center py-3 rounded-lg border border-border font-semibold hover:bg-secondary/50 transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <FaqItem
                question="Can I try before I buy?"
                answer="Yes! All plans come with a 14-day free trial. No credit card required to start."
              />
              <FaqItem
                question="What file formats are supported?"
                answer="We support PDF, DOCX, PPTX, TXT, MP3, MP4, and many more formats for document upload and audio/video recording."
              />
              <FaqItem
                question="How accurate is the transcription?"
                answer="Our AI achieves over 95% accuracy for clear audio in supported languages. Accuracy may vary based on audio quality and accents."
              />
              <FaqItem
                question="Can I cancel anytime?"
                answer="Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PricingFeature = ({ children }) => (
  <li className="flex items-center gap-2 text-sm">
    <Check className="w-4 h-4 text-accent shrink-0" />
    <span>{children}</span>
  </li>
);

const FaqItem = ({ question, answer }) => (
  <div className="glass-card p-6">
    <h3 className="font-display font-semibold mb-2">{question}</h3>
    <p className="text-muted-foreground text-sm">{answer}</p>
  </div>
);

export default Pricing;
