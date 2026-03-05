export interface ErrorProps {
  error_type: string;
  description: string;
}
export default function ErrorForm({ error_type, description }: ErrorProps) {
  console.log(
    `There was an error found. A(n) ${error_type} occurred:\n${description}`
  );
  return (
    <div>{`There was an error found. A(n) ${error_type} occurred:\n${description}`}</div>
  );
}
