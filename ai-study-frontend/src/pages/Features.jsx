import Layout from "@/components/Layout";
import {
  BookOpen,
  Brain,
  FileText,
  Mic,
  Users,
  Zap,
  Globe,
  Lock,
  Cloud,
  Smartphone,
  Download,
  Share2,
} from "lucide-react";

const Features = () => {
  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to transform how you study and conduct meetings.
            </p>
          </div>

          {/* Study Features */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="font-display text-2xl font-bold">
                Study Assistant
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureItem
                icon={Brain}
                title="AI-Powered Summaries"
                description="Advanced AI analyzes your documents and creates comprehensive summaries that capture key concepts and important details."
                delay={0}
              />
              <FeatureItem
                icon={FileText}
                title="Document Analysis"
                description="Upload PDFs, Word docs, PowerPoints, and more. Our AI understands context and extracts meaningful insights."
                delay={100}
              />
              <FeatureItem
                icon={Zap}
                title="Instant Processing"
                description="Get results in seconds, not hours. Our optimized AI processes documents at lightning speed."
                delay={200}
              />
              <FeatureItem
                icon={BookOpen}
                title="Study Guides"
                description="Automatically generate structured study guides with chapters, sections, and key takeaways."
                delay={300}
              />
              <FeatureItem
                icon={Share2}
                title="Flashcard Generation"
                description="Create flashcards from your materials for active recall practice and efficient memorization."
                delay={400}
              />
              <FeatureItem
                icon={Download}
                title="Export Anywhere"
                description="Export your summaries and study materials to PDF, Word, Notion, or your favorite note-taking app."
                delay={500}
              />
            </div>
          </section>

          {/* Meeting Features */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Mic className="w-8 h-8 text-primary" />
              <h2 className="font-display text-2xl font-bold">
                Meeting Assistant
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureItem
                icon={Mic}
                title="Real-Time Transcription"
                description="Accurate speech-to-text conversion with support for multiple languages and accents."
                delay={0}
              />
              <FeatureItem
                icon={Users}
                title="Speaker Identification"
                description="Automatically identify and label different speakers throughout the meeting."
                delay={100}
              />
              <FeatureItem
                icon={FileText}
                title="Meeting Summaries"
                description="Get concise summaries highlighting decisions, action items, and key discussion points."
                delay={200}
              />
              <FeatureItem
                icon={Zap}
                title="Action Item Extraction"
                description="AI identifies tasks, assignments, and deadlines mentioned during meetings."
                delay={300}
              />
              <FeatureItem
                icon={Globe}
                title="Integration Ready"
                description="Connect with Zoom, Teams, Google Meet, and other popular meeting platforms."
                delay={400}
              />
              <FeatureItem
                icon={Share2}
                title="Easy Sharing"
                description="Share meeting notes and summaries with team members instantly."
                delay={500}
              />
            </div>
          </section>

          {/* Platform Features */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Cloud className="w-8 h-8 text-accent" />
              <h2 className="font-display text-2xl font-bold">
                Platform Features
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureItem
                icon={Cloud}
                title="Cloud Storage"
                description="All your documents and recordings are securely stored in the cloud and accessible anywhere."
                delay={0}
              />
              <FeatureItem
                icon={Lock}
                title="Enterprise Security"
                description="Bank-level encryption and security measures to protect your sensitive data."
                delay={100}
              />
              <FeatureItem
                icon={Smartphone}
                title="Mobile Ready"
                description="Access your study materials and meeting notes from any device, anywhere."
                delay={200}
              />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

const FeatureItem = ({ icon: Icon, title, description, delay }) => (
  <div
    className="glass-card-glow p-6 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default Features;
