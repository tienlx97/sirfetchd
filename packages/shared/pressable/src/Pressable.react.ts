import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import stylex from "@ladifire-opensource/stylex";

const R = require("react");

import Pressability from "./Pressability";
import UserAgent from "@reacttips/useragent";
import { PressableGroupContext } from "@farfetchd/context";
import { joinClasses } from "@farfetchd/utils";

const _5403 = false;
const isSafari =
  UserAgent.isBrowser("Safari") || UserAgent.isBrowser("Mobile Safari");
const items = ["menuitem", "tab", "none"];
const p = {
  article: "article",
  banner: "header",
  complementary: "aside",
  contentinfo: "footer",
  figure: "figure",
  form: "form",
  heading: "h1",
  label: "label",
  link: "a",
  list: "ul",
  listitem: "li",
  main: "main",
  navigation: "nav",
  none: "div",
  region: "section",
};

function createJsxComp(accessibilityRole, linkk) {
  let htmlTag = "div";
  if (items.includes(accessibilityRole) && linkk != null && linkk.url != null) {
    htmlTag = "a";
  } else if (accessibilityRole != null) {
    linkk = p[accessibilityRole];
    if (linkk != null) {
      htmlTag = linkk;
    }
  }
  return htmlTag;
}

function setAccessibilityRole(a) {
  switch (a) {
    case "none":
      return "presentation";
    case "label":
      return undefined;
    default:
      return a;
  }
}

const tagNameAndRoleCheck = function (a) {
  const target = a.target;
  let tagName = target.tagName;

  tagName =
    target.isContentEditable ||
    (tagName === "A" && target.href != null) ||
    tagName === "BUTTON" ||
    tagName === "INPUT" ||
    tagName === "SELECT" ||
    tagName === "TEXTAREA";

  if (target.tabIndex === 0 && !tagName) {
    const key = a.key;
    if (key === "Enter") {
      return true;
    }
    const roleAttr = target.getAttribute("role");
    if (
      (key === " " || key === "Spacebar") &&
      (roleAttr === "button" ||
        roleAttr === "checkbox" ||
        roleAttr === "combobox" ||
        roleAttr === "menuitem" ||
        roleAttr === "menuitemcheckbox" ||
        roleAttr === "menuitemradio" ||
        roleAttr === "option" ||
        roleAttr === "radio" ||
        roleAttr === "switch" ||
        roleAttr === "tab")
    ) {
      return true;
    }
  }
  return false;
};

function isContainTargetWithTag(a) {
  let parent = a;
  while (parent != null) {
    if (parent.tagName === "A" && parent.href != null) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

function shouldPreventDefault(event, preventDefault) {
  const { altKey, ctrlKey, metaKey, shiftKey, target } = event;
  const isContainTarget = isContainTargetWithTag(target);
  const key = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && isContainTarget && !key;
}

type OwnProps = {
  accessibilityLabel?: any;
  accessibilityRelationship?: any;
  accessibilityRole?: any;
  accessibilityState?: any;
  accessibilityValue?: any;
  children?: any;
  className_DEPRECATED?: any;
  disabled?: any;
  focusable?: any;
  forwardedRef?: any;
  link?: any;
  nativeID?: any;
  onBlur?: any;
  onContextMenu?: any;
  onFocus?: any;
  onFocusChange?: any;
  onFocusVisibleChange?: any;
  onHoverChange?: any;
  onHoverEnd?: any;
  onHoverMove?: any;
  onHoverStart?: any;
  onPress?: any;
  onPressChange?: any;
  onPressEnd?: any;
  onPressMove?: any;
  onPressStart?: any;
  preventContextMenu?: any;
  preventDefault?: any;
  style?: any;
  suppressFocusRing?: any;
  testID?: any;
  testOnly_state?: any;
  xstyle?: any;
};

function pressable_React({
  accessibilityLabel,
  accessibilityRelationship,
  accessibilityRole,
  accessibilityState,
  accessibilityValue,
  children,
  className_DEPRECATED,
  disabled,
  focusable,
  forwardedRef,
  link,
  nativeID,
  onBlur,
  onContextMenu,
  onFocus,
  onFocusChange,
  onFocusVisibleChange,
  onHoverChange,
  onHoverEnd,
  onHoverMove,
  onHoverStart,
  onPress,
  onPressChange,
  onPressEnd,
  onPressMove,
  onPressStart,
  preventContextMenu,
  preventDefault,
  style,
  suppressFocusRing,
  testID,
  testOnly_state,
  xstyle,
  ...restProps
}: OwnProps) {
  const stateRef = useRef<null | Node>(null);

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  const context = useContext(PressableGroupContext);

  // const accessibilityLabel = a.accessibilityLabel,
  //   accessibilityRelationship = a.accessibilityRelationship,
  //   accessibilityRole = a.accessibilityRole,
  //   accessibilityState = a.accessibilityState,
  //   accessibilityValue = a.accessibilityValue,
  //   children = a.children,
  //   className_DEPRECATED = a.className_DEPRECATED;
  // let disabled = a.disabled;
  // const focusable = a.focusable,
  //   forwardedRef = a.forwardedRef,
  //   link = a.link,
  //   nativeID = a.nativeID,
  //   onBlur = a.onBlur,
  //   onContextMenu = a.onContextMenu,
  //   onFocus = a.onFocus,
  //   onFocusChange = a.onFocusChange,
  //   onFocusVisibleChange = a.onFocusVisibleChange,
  //   onHoverChange = a.onHoverChange,
  //   onHoverEnd = a.onHoverEnd,
  //   onHoverMove = a.onHoverMove,
  //   onHoverStart = a.onHoverStart,
  //   onPress = a.onPress,
  //   onPressChange = a.onPressChange,
  //   onPressEnd = a.onPressEnd,
  //   onPressMove = a.onPressMove,
  //   onPressStart = a.onPressStart,
  //   preventContextMenu = a.preventContextMenu,
  //   preventDefault = a.preventDefault,
  //   style = a.style;
  // let _suppressFocusRing = a.suppressFocusRing;
  // _suppressFocusRing = _suppressFocusRing === undefined ? false : _suppressFocusRing;
  const _suppressFocusRing =
    suppressFocusRing === undefined ? false : suppressFocusRing;

  // let _testOnly_state = a.testID;
  const _testOnly_state = testOnly_state;
  // const restProps = babelHelpers.objectWithoutPropertiesLoose(restProps, [
  //   "accessibilityLabel",
  //   "accessibilityRelationship",
  //   "accessibilityRole",
  //   "accessibilityState",
  //   "accessibilityValue",
  //   "children",
  //   "className_DEPRECATED",
  //   "disabled",
  //   "focusable",
  //   "forwardedRef",
  //   "link",
  //   "nativeID",
  //   "onBlur",
  //   "onContextMenu",
  //   "onFocus",
  //   "onFocusChange",
  //   "onFocusVisibleChange",
  //   "onHoverChange",
  //   "onHoverEnd",
  //   "onHoverMove",
  //   "onHoverStart",
  //   "onPress",
  //   "onPressChange",
  //   "onPressEnd",
  //   "onPressMove",
  //   "onPressStart",
  //   "preventContextMenu",
  //   "preventDefault",
  //   "style",
  //   "suppressFocusRing",
  //   "testID",
  //   "testOnly_state",
  //   "xstyle",
  // ]);

  const jsxComp = createJsxComp(accessibilityRole, link);

  disabled =
    disabled === true ||
    (accessibilityState == null ? undefined : accessibilityState.disabled) ===
      true;

  const ariaHidden =
    accessibilityState == null ? undefined : accessibilityState.hidden;
  const isRoleAccessDisabled = jsxComp === "a" && disabled !== true;

  const obj = {
    disabled:
      disabled === true ||
      (_testOnly_state == null ? undefined : _testOnly_state.disabled) ===
        true ||
      false,
    focusVisible:
      state2 ||
      (_testOnly_state == null ? undefined : _testOnly_state.focusVisible) ===
        true,
    focused:
      state1 ||
      (_testOnly_state == null ? undefined : _testOnly_state.focused) === true,
    hovered:
      state3 ||
      (_testOnly_state == null ? undefined : _testOnly_state.hovered) === true,
    pressed:
      state4 ||
      (_testOnly_state == null ? undefined : _testOnly_state.pressed) === true,
  };

  const childrenNor = typeof children === "function" ? children(obj) : children;

  const className_DEPRECATEDValue =
    typeof className_DEPRECATED === "function"
      ? className_DEPRECATED(obj)
      : className_DEPRECATED;

  const styleValue = typeof style === "function" ? style(obj) : style;

  const _xstyle = typeof xstyle === "function" ? xstyle(obj) : xstyle;

  Pressability(stateRef, {
    disabled: disabled,
    onBlur: onBlur,
    onContextMenu: onContextMenu,
    onFocus: onFocus,
    onFocusChange: v(setState1, onFocusChange),
    onFocusVisibleChange: v(setState2, onFocusVisibleChange),
    onHoverChange: v(setState3, onHoverChange),
    onHoverEnd: onHoverEnd,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverStart,
    onPressChange: v(setState4, onPressChange),
    onPressEnd: onPressEnd,
    onPressMove: onPressMove,
    onPressStart: onPressStart,
    preventContextMenu: preventContextMenu,
    preventDefault: preventDefault == null ? true : preventDefault,
  });

  const onClickCallBack = useCallback(
    (event) => {
      onPress && onPress(event),
        (onPress || link != null) && event.stopPropagation(),
        shouldPreventDefault(event, preventDefault) &&
          event.nativeEvent.preventDefault();
    },
    [link, onPress, preventDefault]
  );

  const childrenCallback = useCallback(
    (event) => {
      if (tagNameAndRoleCheck(event)) {
        const key = event.key;
        (key === " " || key === "Spacebar") && event.preventDefault();
        onPress && (onPress(event), event.stopPropagation());
      }
    },
    [onPress]
  );

  const className_DEPRECATEDCallback = useCallback(
    (obj) => {
      stateRef.current = obj;
      typeof forwardedRef === "function"
        ? forwardedRef(obj)
        : forwardedRef != null && (forwardedRef.current = obj);
    },
    [forwardedRef]
  );

  useEffect(() => {
    const state = stateRef.current;
    if (state == null || state.addEventListener == null) {
      return;
    }

    context && context.register(state, onClickCallBack);

    const touchStartListener = (event) => {
      context && (event.preventDefault(), context.onTouchStart());

      if (!isSafari) {
        return;
      }

      const eventVal =
        (event = window) == null
          ? undefined
          : (event = event.document) == null
          ? undefined
          : event.body;

      if (eventVal == null) {
        return;
      }

      eventVal.style.WebkitUserSelect = "none";

      const _touchendListener = function touchendListener() {
        eventVal.style.WebkitUserSelect = null;
        document.removeEventListener("touchend", touchendListener);
      };
      document.addEventListener("touchend", _touchendListener);
    };

    state.addEventListener("touchstart", touchStartListener);

    return function () {
      context && context.unRegister(state),
        state.removeEventListener("touchstart", touchStartListener);
    };
  }, [context, onClickCallBack]);

  style = -1;

  let _disabled, _focusNotVisible, _rootInGroup;

  obj.disabled && (_disabled = $1.disabled);

  (!obj.focusVisible || _suppressFocusRing === true) &&
    (_focusNotVisible = $1.focusNotVisible);

  context && (_rootInGroup = $1.rootInGroup);

  if (_5403) {
    ariaHidden !== true && focusable !== false && (style = 0);
  } else {
    disabled !== true &&
      ariaHidden !== true &&
      focusable !== false &&
      (style = 0);
  }

  // _5403
  //   ? Y !== true && focusable !== false && (style = 0)
  //   : disabled !== true && Y !== true && focusable !== false && (style = 0);

  xstyle = link == null ? undefined : link.download;

  onBlur =
    (xstyle === true || typeof xstyle === "string") && isRoleAccessDisabled;

  return R.jsx(
    jsxComp,
    Object.assign({}, restProps, {
      "aria-activedescendant":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.activedescendant,
      "aria-busy":
        accessibilityState == null ? undefined : accessibilityState.busy,
      "aria-checked":
        accessibilityState == null ? undefined : accessibilityState.checked,
      "aria-controls":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.controls,
      "aria-current":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.current,
      "aria-describedby":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.describedby,
      "aria-details":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.details,
      "aria-disabled": disabled === true ? disabled : undefined,
      "aria-errormessage":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.errormessage,
      "aria-expanded":
        accessibilityState == null ? undefined : accessibilityState.expanded,
      "aria-haspopup":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.haspopup,
      "aria-hidden": ariaHidden,
      "aria-invalid":
        accessibilityState == null ? undefined : accessibilityState.invalid,
      "aria-label": accessibilityLabel,
      "aria-labelledby":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.labelledby,
      "aria-modal":
        accessibilityState == null ? undefined : accessibilityState.modal,
      "aria-orientation":
        accessibilityState == null ? undefined : accessibilityState.orientation,
      "aria-owns":
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.owns,
      "aria-pressed":
        accessibilityState == null ? undefined : accessibilityState.pressed,
      "aria-readonly":
        accessibilityState == null ? undefined : accessibilityState.readonly,
      "aria-required":
        accessibilityState == null ? undefined : accessibilityState.required,
      "aria-selected":
        accessibilityState == null ? undefined : accessibilityState.selected,
      "aria-valuemax":
        accessibilityValue == null ? undefined : accessibilityValue.max,
      "aria-valuemin":
        accessibilityValue == null ? undefined : accessibilityValue.min,
      "aria-valuenow":
        accessibilityValue == null ? undefined : accessibilityValue.now,
      "aria-valuetext":
        accessibilityValue == null ? undefined : accessibilityValue.text,
      children: childrenNor,
      className: joinClasses(
        stylex($1.root, _disabled, _focusNotVisible, _xstyle, _rootInGroup),
        className_DEPRECATEDValue
      ),
      "data-testid": undefined,
      download: onBlur ? xstyle : undefined,
      href: isRoleAccessDisabled
        ? link == null
          ? undefined
          : link.url
        : undefined,
      id: nativeID,
      onClick: disabled ? undefined : onClickCallBack,
      onKeyDown: disabled ? undefined : childrenCallback,
      ref: className_DEPRECATEDCallback,
      rel: isRoleAccessDisabled
        ? link == null
          ? undefined
          : link.rel
        : undefined,
      role: setAccessibilityRole(accessibilityRole),
      style: styleValue,
      tabIndex: style,
      target: isRoleAccessDisabled
        ? link == null
          ? undefined
          : link.target
        : undefined,
    })
  );
}

function v(a, b) {
  return useCallback(
    function (c) {
      a(c);
      b && b(c);
    },
    [b, a]
  );
}

const $1 = stylex.create({
  disabled: {
    cursor: "not-allowed",
  },
  focusNotVisible: {
    outline: "none",
  },
  root: {
    // start L
    WebkitTapHighlightColor: "transparent",
    alignItems: "stretch",
    backgroundColor: "transparent",
    borderTopColor: "var(--always-dark-overlay)",
    borderRightColor: "var(--always-dark-overlay)",
    borderBottomColor: "var(--always-dark-overlay)",
    borderLeftColor: "var(--always-dark-overlay)",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    boxSizing: "border-box",
    cursor: "pointer",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    listStyle: "none",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: "relative",
    textAlign: "inherit",
    textDecoration: "none",
    touchAction: "manipulation",
    zIndex: "unset",
  },
  rootInGroup: {
    touchAction: "none",
  },
});

pressable_React.displayName = `${pressable_React.name} [from Pressable.react]`;

export default pressable_React;
export { pressable_React as Pressable_React };
