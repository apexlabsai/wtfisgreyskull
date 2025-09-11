from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Tuple

from flask import Flask, redirect, render_template, request, url_for


app = Flask(__name__)


@dataclass(frozen=True)
class Profile:
    name: str
    goal: str  # "cut" | "recomp" | "bulk"
    split: List[str]
    focus_notes: List[str]
    macro_ratio: Tuple[int, int, int]  # (protein, carbs, fat) in %
    lifestyle: List[str]


PROFILES: Dict[str, Profile] = {
    "brad_pitt_fc": Profile(
        name="Brad Pitt (Fight Club)",
        goal="cut",
        split=[
            "Upper — pull-up party, rows, curls, some shoulder sprinkles",
            "Lower — squats or leg press, lunges, RDLs, calves",
            "Push — bench or push-ups, overhead press, dips, triceps",
            "Optional: Conditioning — 20–30 min incline walk or intervals",
        ],
        focus_notes=[
            "Keep reps mostly 8–15. Leave 1–2 reps in the tank.",
            "Add short supersets or circuits for a sweat without dying.",
            "Prioritize back/shoulders to get that lean, carved look.",
        ],
        macro_ratio=(35, 40, 25),
        lifestyle=[
            "Aim 7–9 hours of sleep. Lean looks are built at night.",
            "Walk daily — 8–12k steps. Save HIIT for 1–2 days/week.",
            "Supps: Creatine 3–5g, caffeine if helpful, vitamin D if low.",
            "Don’t ego-lift. We want definition, not a powerlifting total.",
        ],
    ),
    "ryan_gosling_drive": Profile(
        name="Ryan Gosling (Drive)",
        goal="cut",
        split=[
            "Full Body A — squat/hinge, press, row, core",
            "Full Body B — hinge/squat, pull-up, incline press, core",
            "Accessory — delts, arms, calves, light conditioning",
        ],
        focus_notes=[
            "Minimalist lifts, clean technique, keep total volume modest.",
            "Add 15–25 min zone-2 cardio post-lift or on off days.",
        ],
        macro_ratio=(30, 45, 25),
        lifestyle=[
            "Keep stress low — chill walks, good music, easy cooking.",
            "If appetite is high, front-load protein and veggies.",
        ],
    ),
    "henry_cavill_supes": Profile(
        name="Henry Cavill (Superman)",
        goal="bulk",
        split=[
            "Push — bench, OHP, incline DB, triceps",
            "Pull — deadlift or RDLs, rows, pull-ups, biceps",
            "Legs — squats or leg press, lunges, hamstrings, calves",
            "Accessory — rear delts, traps, core",
            "Optional: Conditioning — easy cardio 20 min",
        ],
        focus_notes=[
            "Progressively overload big lifts. Add weight or reps weekly.",
            "Keep form tight; more muscle, not more joint pain.",
        ],
        macro_ratio=(30, 45, 25),
        lifestyle=[
            "Slight surplus, not a dirty bulk. Aim quality carbs.",
            "Creatine daily. Hydrate like you’re on set tomorrow.",
        ],
    ),
    "chris_hemsworth_thor": Profile(
        name="Chris Hemsworth (Thor)",
        goal="bulk",
        split=[
            "Upper — heavy press/row, delts, arms",
            "Lower — heavy squats/hinge, glutes, hamstrings, calves",
            "Upper — volume day, chest/back focus",
            "Lower — volume day, hamstring/quads balance",
            "Optional arms/conditioning finisher",
        ],
        focus_notes=[
            "Alternate heavy and volume days to grow without frying CNS.",
            "Don’t skip back/legs — wide frame needs the base.",
        ],
        macro_ratio=(28, 47, 25),
        lifestyle=[
            "Surplus ~10–15%. Keep waist in check; adjust if it climbs fast.",
            "Protein spread over 3–5 meals. Add a shake when convenient.",
        ],
    ),
    "jimin_bts": Profile(
        name="Jimin (BTS)",
        goal="cut",
        split=[
            "Day 1 — full body light: presses, rows, bodyweight work",
            "Day 2 — mobility + core + 20–30 min dance/cardio practice",
            "Day 3 — full body light (different variations)",
            "Day 4 — steps + mobility + optional intervals",
        ],
        focus_notes=[
            "Lean, athletic look — prioritize movement quality and posture.",
            "Plenty of core and scapular control work.",
        ],
        macro_ratio=(30, 45, 25),
        lifestyle=[
            "Lots of steps. Keep cardio fun so you actually do it.",
            "Eat mostly whole foods; simple meals win the day.",
        ],
    ),
}


def cm_to_m(height_cm: float) -> float:
    return height_cm / 100.0


def estimate_bmr_mifflin_st_jeor(weight_kg: float, height_cm: float, age: int) -> float:
    """Assume male equation for simplicity in this MVP."""
    return 10 * weight_kg + 6.25 * height_cm - 5 * age + 5


def estimate_tdee(weight_kg: float, height_cm: float, age: int, activity_multiplier: float = 1.45) -> float:
    bmr = estimate_bmr_mifflin_st_jeor(weight_kg, height_cm, age)
    return bmr * activity_multiplier


def goal_calories(tdee: float, goal: str) -> float:
    if goal == "cut":
        return tdee * 0.82  # ~18% deficit
    if goal == "bulk":
        return tdee * 1.12  # ~12% surplus
    return tdee


def macro_grams(total_calories: float, ratio: Tuple[int, int, int]) -> Tuple[int, int, int]:
    p_pct, c_pct, f_pct = ratio
    protein_cal = total_calories * (p_pct / 100.0)
    carb_cal = total_calories * (c_pct / 100.0)
    fat_cal = total_calories * (f_pct / 100.0)
    protein_g = round(protein_cal / 4)
    carbs_g = round(carb_cal / 4)
    fat_g = round(fat_cal / 9)
    return protein_g, carbs_g, fat_g


def simple_meals(protein_g: int) -> List[str]:
    # Keep it super simple: protein-forward staples
    return [
        "Chicken, rice, veggies bowl — olive oil drizzle",
        "Greek yogurt + berries + honey + granola",
        "Eggs and oats with fruit (yes, it slaps)",
        "Beef or tofu stir-fry with frozen veggies and noodles",
        "Protein shake + banana + peanut butter (emergency meal)",
    ]


@app.route("/")
def index():
    return render_template("index.html", profiles=PROFILES)


@app.route("/plan", methods=["POST"]) 
def plan():
    target_key = request.form.get("target")
    height_cm_raw = request.form.get("height_cm")
    weight_kg_raw = request.form.get("weight_kg")
    age_raw = request.form.get("age")

    if not target_key or target_key not in PROFILES:
        return redirect(url_for("index"))

    try:
        height_cm = float(height_cm_raw)
        weight_kg = float(weight_kg_raw)
        age = int(age_raw)
    except (TypeError, ValueError):
        return redirect(url_for("index"))

    profile = PROFILES[target_key]

    tdee = estimate_tdee(weight_kg, height_cm, age)
    target_kcal = round(goal_calories(tdee, profile.goal))
    protein_g, carbs_g, fat_g = macro_grams(target_kcal, profile.macro_ratio)

    height_m = cm_to_m(height_cm)
    bmi = weight_kg / (height_m * height_m) if height_m > 0 else 0

    # Conversational hooks
    vibe_line = {
        "cut": "We’re carving you up like a marble statue — sharp, lean, cinematic.",
        "bulk": "We’re adding the armor — strong, broad, and camera-ready.",
        "recomp": "We’re tightening the screws while adding muscle — steady and sleek.",
    }.get(profile.goal, "Let’s get you looking like a movie still.")

    meals = simple_meals(protein_g)

    return render_template(
        "plan.html",
        user=dict(height_cm=height_cm, weight_kg=weight_kg, age=age, bmi=round(bmi, 1)),
        profile=profile,
        vibe_line=vibe_line,
        calories=target_kcal,
        macros=dict(protein_g=protein_g, carbs_g=carbs_g, fat_g=fat_g),
        meals=meals,
    )


if __name__ == "__main__":
    import os
    # Bind to all interfaces for Replit/Render convenience
    port = int(os.environ.get("PORT", 4000))
    app.run(host="0.0.0.0", port=port, debug=False)


