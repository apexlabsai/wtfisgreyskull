import { useState } from 'react';
import Head from 'next/head';
import ArchetypeSelector from '../components/ArchetypeSelector';

export default function Home() {
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [formData, setFormData] = useState({
    height_ft: '5',
    height_in: '10',
    weight_lbs: '180',
    age: '25'
  });

  const handleArchetypeChange = (archetypeId) => {
    setSelectedArchetype(archetypeId);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedArchetype) {
      alert('Please select a fitness archetype');
      return;
    }
    
    // Redirect to plan page with form data as URL parameters
    const queryParams = new URLSearchParams({
      archetype: selectedArchetype,
      height_ft: formData.height_ft,
      height_in: formData.height_in,
      weight_lbs: formData.weight_lbs,
      age: formData.age
    });
    
    window.location.href = `/plan?${queryParams.toString()}`;
  };

  return (
    <>
      <Head>
        <title>Pick Your Fitness Archetype. Get the Exact Plan — WTF is Greyskull?</title>
        <meta name="description" content="Choose from Lean/Athletic, Bulky/Powerlifter, Classic Bodybuilder, K-pop Aesthetic, or Hollywood Superhero. We translate gym-speak into a plan you can actually follow." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pick your fitness archetype. Get the exact plan.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Choose your ideal physique style. We translate gym-speak into a clear, doable routine.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Archetype Selection */}
              <ArchetypeSelector 
                selectedArchetype={selectedArchetype}
                onArchetypeChange={handleArchetypeChange}
              />

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="height_ft" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (ft)
                  </label>
                  <input
                    type="number"
                    id="height_ft"
                    name="height_ft"
                    value={formData.height_ft}
                    onChange={handleInputChange}
                    min="4"
                    max="7"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="height_in" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (in)
                  </label>
                  <input
                    type="number"
                    id="height_in"
                    name="height_in"
                    value={formData.height_in}
                    onChange={handleInputChange}
                    min="0"
                    max="11"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="weight_lbs" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    id="weight_lbs"
                    name="weight_lbs"
                    value={formData.weight_lbs}
                    onChange={handleInputChange}
                    min="80"
                    max="400"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="13"
                    max="90"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Get My Free Plan
              </button>
              
              <p className="text-center text-sm text-gray-500">
                No signup. No jargon. Just the cheat sheet.
              </p>
            </form>
          </div>

          {/* Trust Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Science-backed templates, no jargon</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">90-day timeline with weekly tweaks</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Mobile-friendly plan you can follow at the gym</span>
              </div>
            </div>
          </div>

          {/* Preview Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              What you'll get in 60 seconds
            </h2>
            <p className="text-center text-gray-600 mb-8 text-sm">
              Personalized 3–5 day split • Calories & macros • Simple meals • Cardio & steps • Sleep & supplement notes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Workout Split</h4>
                <p className="text-sm text-gray-600">
                  4 days: Upper A / Lower A / Upper B / Lower B. 8–12 reps, stop 1–3 reps before failure. No 1RMs.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Calories & Macros</h4>
                <p className="text-sm text-gray-600">
                  Example (5'10", 180 lbs): ~2,300 kcal; 180 g protein / 70 g fat / rest carbs. Illustration only; actual output varies.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Lifestyle Rules</h4>
                <p className="text-sm text-gray-600">
                  8k–10k steps/day, 7.5 h sleep, creatine 5 g/day, 2–3 coffees max, 2–3 cardio sessions weekly (20–30 min).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
