export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex items-center gap-3 text-muted">
        <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
}
