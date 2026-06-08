import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FeatureCard from "../components/FeatureCard";
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Brain,
  FileText,
  Mic,
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-32">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                AI-Powered Learning & Productivity
              </span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Transform Your
              <br />
              <span className="gradient-text">Study & Meetings</span>
            </h1>

            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Upload documents, record meetings, and let AI generate summaries,
              key points, and study materials in seconds.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                to="/study"
                className="cosmic-button inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Try Study Assistant
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/meeting"
                className="px-8 py-4 rounded-lg font-semibold border border-border text-foreground hover:bg-secondary/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Meeting Assistant
              </Link>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 border border-primary/30 rounded-full animate-float opacity-50" />
          <div
            className="absolute bottom-1/3 right-10 w-16 h-16 border border-accent/30 rounded-lg rotate-45 animate-float"
            style={{ animationDelay: "2s" }}
          />
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to{" "}
                <span className="gradient-text">Excel</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Powerful AI tools designed for students, professionals, and
                teams.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={BookOpen}
                title="Smart Summaries"
                description="Get concise summaries from any document, lecture, or meeting recording."
                delay={0}
              />
              <FeatureCard
                icon={Brain}
                title="Key Points Extraction"
                description="AI identifies and highlights the most important concepts automatically."
                delay={100}
              />
              <FeatureCard
                icon={FileText}
                title="Study Questions"
                description="Generate practice questions and flashcards from your study materials."
                delay={200}
              />
              <FeatureCard
                icon={Mic}
                title="Meeting Transcription"
                description="Record and transcribe meetings with speaker identification."
                delay={300}
              />
              <FeatureCard
                icon={Users}
                title="Action Items"
                description="Automatically extract action items and decisions from meeting notes."
                delay={400}
              />
              <FeatureCard
                icon={Zap}
                title="Instant Analysis"
                description="Get detailed insights and analysis within seconds, not hours."
                delay={500}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Ready to Supercharge Your Learning?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join thousands of students and professionals who are saving
                  hours every week.
                </p>
                <Link
                  to="/study"
                  className="cosmic-button inline-flex items-center gap-2 text-lg px-8 py-4"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

// const FeatureCard = ({ icon: Icon, title, description, delay }) => (
//   <div
//     className="glass-card-glow p-6 animate-fade-in"
//     style={{ animationDelay: `${delay}ms` }}
//   >
//     <div className="relative z-10">
//       <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
//         <Icon className="w-6 h-6 text-accent" />
//       </div>
//       <h3 className="font-display text-lg font-semibold mb-2">
//         {title}
//       </h3>
//       <p className="text-muted-foreground text-sm">
//         {description}
//       </p>
//     </div>
//   </div>
// );

export default Index;
