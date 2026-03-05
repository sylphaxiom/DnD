interface Props {
  version: string;
}
export default function TestingForm({ version }: Props) {
  let message = ``;
  switch (version) {
    case "player":
      message = `This form has a player level security form`;
      break;
    case "dm":
      message = `This form has a dm level security form`;
      break;
    case "homebrewer":
      message = `This form has a homebrewer level security form`;
      break;
    case "admin":
      message = `This form has a admin level security form`;
      break;
    default:
      message = `This form has a default level security form`;
  }
  return <div>{message}</div>;
}
