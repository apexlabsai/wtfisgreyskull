"""
Utility functions to convert between US and metric measurements
for integration with the Flask backend.
"""

def feet_inches_to_cm(feet, inches):
    """Convert feet and inches to centimeters."""
    total_inches = feet * 12 + inches
    return total_inches * 2.54

def lbs_to_kg(pounds):
    """Convert pounds to kilograms."""
    return pounds * 0.453592

def convert_us_to_metric(height_ft, height_in, weight_lbs):
    """Convert US measurements to metric for backend processing."""
    height_cm = feet_inches_to_cm(height_ft, height_in)
    weight_kg = lbs_to_kg(weight_lbs)
    return {
        'height_cm': round(height_cm, 1),
        'weight_kg': round(weight_kg, 1)
    }

# Example usage:
if __name__ == "__main__":
    # Default values from the form
    result = convert_us_to_metric(5, 10, 180)
    print(f"5'10\" 180 lbs = {result['height_cm']} cm {result['weight_kg']} kg")
    # Output: 5'10" 180 lbs = 177.8 cm 81.6 kg
