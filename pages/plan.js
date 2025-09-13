import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

// Archetype data - in a real app this would come from a database
const archetypeData = {
  lean_athletic: {
    name: 'Lean / Athletic',
    goal: 'cut',
    split: [
      'Full Body A — compound movements, moderate weights',
      'Full Body B — different variations, bodyweight focus', 
      'Conditioning — HIIT, sprints, or sport-specific training',
      'Mobility — yoga, stretching, movement prep'
    ],
    focus_notes: [
      'Functional strength with athletic performance focus.',
      'Mix of strength training and conditioning work.',
      'Emphasis on movement quality and injury prevention.'
    ],
    macro_ratio: [30, 45, 25],
    lifestyle: [
      'Balanced approach to training and nutrition.',
      'Regular cardio and movement throughout the week.',
      'Focus on performance goals, not just aesthetics.',
      'Listen to your body and adjust intensity as needed.'
    ]
  },
  bulky_powerlifter: {
    name: 'Bulky / Powerlifter',
    goal: 'bulk',
    split: [
      'Squat Day — squats, leg press, lunges, calves',
      'Bench Day — bench press, overhead press, triceps',
      'Deadlift Day — deadlifts, rows, pull-ups, biceps',
      'Accessory Day — arms, core, weak point training'
    ],
    focus_notes: [
      'Maximum strength development on big three lifts.',
      'Progressive overload with proper form.',
      'Focus on powerlifting technique and competition prep.'
    ],
    macro_ratio: [30, 45, 25],
    lifestyle: [
      'High caloric surplus for strength gains.',
      'Adequate rest between heavy training sessions.',
      'Track your lifts and aim for consistent progression.',
      'Focus on recovery and injury prevention.'
    ]
  },
  classic_bodybuilder: {
    name: 'Classic Bodybuilder',
    goal: 'bulk',
    split: [
      'Chest & Triceps — bench, incline press, flyes, dips, tricep work',
      'Back & Biceps — pull-ups, rows, deadlifts, curls, hammer curls',
      'Shoulders & Traps — OHP, lateral raises, rear delts, shrugs',
      'Legs — squats, leg press, lunges, RDLs, calves',
      'Arms & Core — isolation work, planks, hanging leg raises'
    ],
    focus_notes: [
      'Focus on progressive overload and mind-muscle connection.',
      'Higher volume training with 8-12 rep ranges for hypertrophy.',
      'Prioritize compound movements but don\'t skip isolation work.'
    ],
    macro_ratio: [30, 45, 25],
    lifestyle: [
      'Eat in a caloric surplus for muscle growth.',
      'Get 7-9 hours of sleep for optimal recovery.',
      'Creatine 5g daily, protein 1g per lb bodyweight.',
      'Track your lifts and aim to add weight weekly.'
    ]
  },
  kpop_aesthetic: {
    name: 'K-pop Aesthetic',
    goal: 'cut',
    split: [
      'Upper Body — push-ups, rows, shoulder work, light weights',
      'Lower Body — squats, lunges, glute bridges, calf raises',
      'Core & Stability — planks, Russian twists, leg raises',
      'Cardio & Dance — 20-30 min dance practice or HIIT'
    ],
    focus_notes: [
      'Lean, toned physique with emphasis on definition over size.',
      'Focus on bodyweight exercises and light resistance training.',
      'Prioritize flexibility and mobility work.'
    ],
    macro_ratio: [25, 50, 25],
    lifestyle: [
      'Maintain a slight caloric deficit for fat loss.',
      'High step count daily (10k+ steps).',
      'Stay hydrated and eat mostly whole foods.',
      'Practice good posture and body awareness.'
    ]
  },
  hollywood_superhero: {
    name: 'Hollywood Superhero',
    goal: 'bulk',
    split: [
      'Push — bench, OHP, incline press, dips, triceps',
      'Pull — deadlifts, rows, pull-ups, biceps, rear delts',
      'Legs — squats, leg press, lunges, RDLs, calves',
      'Accessory — arms, traps, core work',
      'Conditioning — light cardio 2-3x per week'
    ],
    focus_notes: [
      'Build impressive, camera-ready muscle mass.',
      'Focus on compound movements for overall development.',
      'Progressive overload with good form is key.'
    ],
    macro_ratio: [28, 47, 25],
    lifestyle: [
      'Caloric surplus of 300-500 calories above maintenance.',
      'High protein intake (1g per lb bodyweight).',
      'Creatine and other proven supplements.',
      'Adequate sleep and recovery between sessions.'
    ]
  }
};

export default function Plan() {
  const router = useRouter();
  const [planData, setPlanData] = useState(null);
  const [calculations, setCalculations] = useState(null);

  useEffect(() => {
    // Get data from URL params or localStorage
    const { archetype, height_ft, height_in, weight_lbs, age } = router.query;
    
    if (archetype && height_ft && height_in && weight_lbs && age) {
      const heightCm = Math.round((parseInt(height_ft) * 12 + parseInt(height_in)) * 2.54);
      const weightKg = Math.round(parseFloat(weight_lbs) * 0.453592 * 10) / 10;
      
      setPlanData({
        archetype,
        height_ft,
        height_in,
        height_cm: heightCm,
        weight_lbs,
        weight_kg: weightKg,
        age: parseInt(age)
      });
      
      // Calculate TDEE and macros
      const bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
      const tdee = bmr * 1.45; // Activity multiplier
      const archetypeInfo = archetypeData[archetype];
      
      let targetCalories;
      if (archetypeInfo.goal === 'cut') {
        targetCalories = Math.round(tdee * 0.82);
      } else if (archetypeInfo.goal === 'bulk') {
        targetCalories = Math.round(tdee * 1.12);
      } else {
        targetCalories = Math.round(tdee);
      }
      
      const [proteinPct, carbPct, fatPct] = archetypeInfo.macro_ratio;
      const proteinG = Math.round(targetCalories * (proteinPct / 100) / 4);
      const carbsG = Math.round(targetCalories * (carbPct / 100) / 4);
      const fatG = Math.round(targetCalories * (fatPct / 100) / 9);
      
      setCalculations({
        tdee: Math.round(tdee),
        targetCalories,
        macros: { protein: proteinG, carbs: carbsG, fat: fatG }
      });
    }
  }, [router.query]);

  if (!planData || !calculations) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized plan...</p>
        </div>
      </div>
    );
  }

  const archetypeInfo = archetypeData[planData.archetype];

  return (
    <>
      <Head>
        <title>Your {archetypeInfo.name} Plan — WTF is Greyskull?</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your {archetypeInfo.name} Plan
            </h1>
            <p className="text-gray-600 mb-6">
              {planData.height_ft}'{planData.height_in}" • {planData.weight_lbs} lbs • {planData.age} years old
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Daily Calories</h3>
                <p className="text-2xl font-bold text-blue-900">{calculations.targetCalories}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Protein</h3>
                <p className="text-2xl font-bold text-green-900">{calculations.macros.protein}g</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Carbs / Fat</h3>
                <p className="text-2xl font-bold text-purple-900">{calculations.macros.carbs}g / {calculations.macros.fat}g</p>
              </div>
            </div>
          </div>

          {/* Workout Split */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Workout Split</h2>
            <div className="space-y-4">
              {archetypeInfo.split.map((day, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-gray-800">{day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Notes */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Focus Notes</h2>
            <ul className="space-y-3">
              {archetypeInfo.focus_notes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span className="text-gray-700">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lifestyle */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lifestyle Guidelines</h2>
            <ul className="space-y-3">
              {archetypeInfo.lifestyle.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Archetype Selection
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
