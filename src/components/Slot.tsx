import { useAppSelector } from '../store/hooks';

export default function Slot(): JSX.Element {
  const { width, height } = useAppSelector((state) => state.dnd.placeholder);

  const styles: React.CSSProperties = {
    width,
    height,
    backgroundColor: '#172b4d',
    opacity: '0.6',
    borderRadius: '6px',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    pointerEvents: 'none',
  };

  return <div className="slot" style={styles} />;
}
