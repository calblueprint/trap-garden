import React from 'react';
import { IconSvgs, IconType } from '@/lib/icons';

interface Props {
  className?: string;
  type: IconType;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ className, type, onClick }: Props) =>
  React.cloneElement(IconSvgs[type], {
    className,
    onClick,
  });

export default Icon;
