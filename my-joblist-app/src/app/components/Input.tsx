type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      {...props}
    />
  );
}
