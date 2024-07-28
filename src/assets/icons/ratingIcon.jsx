import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  ClipPath,
  Circle,
  LinearGradient,
  Stop,
} from 'react-native-svg';

function RatingIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={4} fill="url(#paint0_linear_82_270)" />
      <G filter="url(#filter0_b_82_270)">
        <Path
          d="M19.483 9.39l-4.797-.7-2.144-4.353a.607.607 0 00-1.084 0L9.314 8.69l-4.797.698A.603.603 0 004 9.996c.002.16.068.314.183.426l3.47 3.39-.82 4.785a.606.606 0 00.877.637L12 16.975l4.29 2.26a.605.605 0 00.877-.638l-.82-4.786 3.47-3.389a.605.605 0 00-.334-1.033z"
          fill="url(#paint1_linear_82_270)"
        />
        <Path
          d="M14.238 8.912l.116.236.26.038 4.795.698s0 0 0 0c.062.01.098.064.09.116h0l-.001.005a.105.105 0 01-.03.06h-.001l-3.47 3.389-.187.183.044.259.82 4.785h0a.104.104 0 01-.085.121h-.001a.1.1 0 01-.063-.009l-.002-.001-4.29-2.26L12 16.41l-.233.123-4.29 2.259h0a.103.103 0 01-.145-.053.106.106 0 01-.006-.057h0l.82-4.786.044-.26-.188-.182-3.47-3.39h0a.107.107 0 01-.002-.15.103.103 0 01.058-.03h.001l4.797-.698.26-.038.116-.236 2.144-4.353a.107.107 0 01.14-.048h.001a.1.1 0 01.046.046h0l2.145 4.355z"
          stroke="url(#paint2_linear_82_270)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_82_270"
          x1={7.68182}
          y1={16.4848}
          x2={17.5163}
          y2={11.0436}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F3BE00" />
          <Stop offset={1} stopColor="#FBEC65" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_82_270"
          x1={3.36364}
          y1={20.2319}
          x2={22.6132}
          y2={9.09742}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F3BE00" />
          <Stop offset={1} stopColor="#FBEC65" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_82_270"
          x1={6.54694}
          y1={5.78298}
          x2={16.2094}
          y2={18.2941}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#fff" stopOpacity={0.25} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
    // <Svg
    //   width={16}
    //   height={16}
    //   viewBox="0 0 16 16"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}>
    //   <Path
    //     d="M8.276 11.92l3.152 1.998c.403.255.903-.124.783-.595l-.91-3.582a.548.548 0 01.177-.555l2.827-2.353c.371-.31.18-.925-.298-.956l-3.691-.24a.526.526 0 01-.453-.334L8.486 1.835a.52.52 0 00-.972 0L6.137 5.303a.526.526 0 01-.453.334l-3.691.24c-.478.03-.67.647-.298.956l2.827 2.353a.547.547 0 01.177.555l-.844 3.322c-.144.564.456 1.02.94.714l2.93-1.856a.513.513 0 01.55 0v0z"
    //     stroke="#FF8700"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </Svg>
  );
}

export default RatingIcon;
