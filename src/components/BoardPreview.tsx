import '../styles/BoardPreview.scss';
import { BoardPreviewTile } from '../models/models';

export default function BoardPreview({ title, custom }: BoardPreviewTile): JSX.Element {
  return (
    <div className="board__preview" style={custom}>
      <h4 className="board__title">{title}</h4>
    </div>
  );
}
