interface CometColumnProps {
  align?: string;
  hasDividers?: boolean;
  paddingHorizontal?: number;
  spacing?: number;
}

interface CometRowProps {
  spacingHorizontal: number;
  spacingVertical: number;
}

interface CometContainerPressableProp {}

interface PressableGroupContextProps {
  register?: any;
  onTouchStart?: any;
  unRegister?: any;
}

export {
  CometColumnProps,
  CometRowProps,
  CometContainerPressableProp,
  PressableGroupContextProps,
};
