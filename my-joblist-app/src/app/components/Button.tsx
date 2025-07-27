export default function Button({ text, onClick }: { text: string, onClick?: () => void }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition"
    >
      {text}
    </button>
  );
}
