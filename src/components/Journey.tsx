import Particles from '@/components/ui/particles';

const Journey: React.FC = () => {
  return (
    <section id="journey" className="relative py-20">
      <Particles 
        className="opacity-20"
        color="hsla(280, 70%, 60%, 0.7)"
        particleCount={15}
        maxDistance={60}
        lineColor="#8b5cf6"
        interactive={true}
      />
      
      {/* Rest of your Journey section content */}
    </section>
  );
};

export default Journey; 