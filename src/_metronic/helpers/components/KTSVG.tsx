import {FC} from 'react';
import SVG from 'react-inlinesvg';
import {toAbsoluteUrl} from '../AssetHelpers';
type Props = {
  className?: string;
  path: string;
  svgClassName?: string;
  viewBox?: string;
};

export const KTSVG: FC<Props> = ({className = '', path, viewBox, svgClassName = 'mh-50px'}) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} {...(viewBox ? {viewBox} : {})} />
    </span>
  );
};
