import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function CalenderIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13 2.5H3a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5zM11 1.5v2M5 1.5v2M2.5 5.5h11"
        stroke="#92929D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CalenderIcon;
