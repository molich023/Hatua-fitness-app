export default function LandingPage() {
  return (
    <div className="min-h-screen bg-savanna text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-10 px-6 text-center">
        <h1 className="text-6xl font-black text-solar mb-4 italic">HATUA</h1>
        <p className="text-xl mb-8 max-w-md">
          Turn your daily walk into <b>Simba Points</b>. 
          The first fitness app built for the Kenyan spirit.
        </p>
        
        <a href="/api/auth/login" 
           className="bg-solar text-earth text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
          GET STARTED NOW
        </a>
      </section>

      {/* Features Table */}
      <section className="bg-white text-earth p-8 rounded-t-[3rem]">
        <h2 className="text-2xl font-bold text-center mb-6">Why join the pride?</h2>
        <div className="grid gap-6">
          <div className="flex gap-4 items-start">
            <div className="bg-solar p-3 rounded-lg">🏃</div>
            <div>
              <h3 className="font-bold">10km = 10 Points</h3>
              <p className="text-sm text-gray-600">Every step counts toward your next reward.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-solar p-3 rounded-lg">🦁</div>
            <div>
              <h3 className="font-bold">Simba Tiers</h3>
              <p className="text-sm text-gray-600">Level up from Cheetah to the Elite Simba Lounge.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
