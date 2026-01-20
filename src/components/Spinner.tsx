type SpinnerProps = {
  label?: string;
};

export default function Spinner({ label = "Loading..." }: SpinnerProps) {
  return (
    <>
      <div
        className="flex items-center justify-center gap-3 text-gray-600"
        role="status"
      >
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
          aria-hidden="true"
        />
        <span className="text-sm">{label}</span>
      </div>
    </>
  );
}
