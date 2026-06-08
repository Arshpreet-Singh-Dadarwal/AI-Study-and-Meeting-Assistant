// const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
//   return (
//     <div
//       className="glass-card-glow p-6 group cursor-pointer"
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       <div className="relative z-10">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="p-2 rounded-lg bg-primary/10 text-accent group-hover:bg-primary/20 transition-colors duration-300">
//             <Icon className="w-5 h-5" />
//           </div>
//           <h3 className="font-display font-semibold text-foreground">
//             {title}
//           </h3>
//         </div>
//         <p className="text-muted-foreground text-sm leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div
      className="glass-card-glow p-6 group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-accent group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <h3 className="font-display font-semibold text-foreground">
            {title}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

