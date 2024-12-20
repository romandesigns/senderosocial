"use client";

export function PhoneInputExamples() {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Default</p>
        <PhoneInputDefault />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Form</p>
        <PhoneInputForm />
      </div>
    </div>
  );
}
