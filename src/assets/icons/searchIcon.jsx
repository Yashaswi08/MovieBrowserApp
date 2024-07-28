import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SearchIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_77_336)">
        <Path
          d="M19.737 18.475l-3.021-3.012a7.037 7.037 0 001.502-4.354 7.109 7.109 0 10-7.11 7.109 7.037 7.037 0 004.355-1.502l3.012 3.021a.891.891 0 101.262-1.262zM5.777 11.11a5.331 5.331 0 1110.663 0 5.331 5.331 0 01-10.663 0z"
          fill={props.color || '#000'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_77_336">
          <Path fill={props.color || '#000'} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SearchIcon;
