import { CalcState } from '../../interfaces';
import './Display.scss';

const Display = ({ calcState }: { calcState: CalcState }): JSX.Element => {
  return (
    <div className="display">
      <div className="prev">{calcState.prevValue}</div>
      <div className="current">{calcState.currentValue}</div>
    </div>
  );
};

export default Display;
