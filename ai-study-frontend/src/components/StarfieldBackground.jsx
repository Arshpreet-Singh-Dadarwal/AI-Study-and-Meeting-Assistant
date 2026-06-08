const StarfieldBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Starfield layers */}
      <div className="absolute inset-0 starfield opacity-60" />
      <div
        className="absolute inset-0 starfield opacity-40"
        style={{ backgroundPosition: "100px 50px" }}
      />
      <div
        className="absolute inset-0 starfield opacity-30"
        style={{ backgroundPosition: "200px 100px" }}
      />
      
      {/* Cosmic nebula effect */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(280 70% 50%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(190 90% 50%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(330 80% 50%) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default StarfieldBackground;
