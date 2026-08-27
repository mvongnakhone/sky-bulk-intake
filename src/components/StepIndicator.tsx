type StepIndicatorProps = {
  currentStep: number;
};

const steps = [
  "Upload",
  "Map Fields",
  "Review",
  "Form Preview",
];

function StepIndicator({
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isComplete =
          stepNumber < currentStep ||
          (stepNumber === currentStep &&
            stepNumber === steps.length);

        const isActive =
          stepNumber === currentStep && !isComplete;

        return (
          <div
            className={`step ${
              isActive ? "step-active" : ""
            } ${
              isComplete ? "step-complete" : ""
            }`}
            key={step}
          >
            <div className="step-number">
              {isComplete ? "✓" : stepNumber}
            </div>

            <span>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
