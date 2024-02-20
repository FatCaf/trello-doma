import { useAppSelector } from '../store/hooks';

export default function Slot(): JSX.Element {
  const { placeholder } = useAppSelector((state) => state.dnd);

  return <div className="slot" style={placeholder} />;
}
