import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef } from "react";
import checkPassiveEventsSupported from "./checkPassiveEventsSupported"
import ReactEventHelpers from "./ReactEventHelpers"
import ReactUseEvent_React from "./ReactUseEvent.react"
import ReactEventHookPropagation from "./ReactEventHookPropagation"

import { useLayoutEffect_SAFE_FOR_SSR } from "@farfetchd/experimental";

const globalFocusVisibleEvents = ReactEventHelpers.hasPointerEvents
  ? ["keydown", "pointermove", "pointerdown", "pointerup"]
  : [
    "keydown",
    "mousedown",
    "mousemove",
    "mouseup",
    "touchmove",
    "touchstart",
    "touchend"
  ]

const useEventProps = {
  passive: true
}

// Global state for tracking focus visible and emulation of mouse
let isGlobalFocusVisible = true
let hasTrackedGlobalFocusVisible = false;

const _5403 = false


function trackGlobalFocusVisible() {
  globalFocusVisibleEvents.forEach((type) => {
    window.addEventListener(
      type,
      handleGlobalFocusVisibleEvent,
      checkPassiveEventsSupported ? { capture: true, passive: true } : true)
  })
}

function isValidKey(nativeEvent: KeyboardEvent): boolean {
  const { metaKey, altKey, ctrlKey } = nativeEvent
  return !(metaKey || (!ReactEventHelpers.isMac && altKey) || ctrlKey)
}

function isTextInput(nativeEvent: KeyboardEvent) {

  const { key, target } = nativeEvent
  if (key === "Tab" || key === "Escape")
    return false;
  const { isContentEditable, tagName } = target as any
  return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable
}

function handleGlobalFocusVisibleEvent(
  nativeEvent: any //MouseEvent | TouchEvent | KeyboardEvent
): void {
  if (nativeEvent.type === "keydown") {
    if (isValidKey(nativeEvent as any)) {
      isGlobalFocusVisible = true
    }
  }
  else {
    const nodeName = (nativeEvent.target as any).nodeName;
    // Safari calls mousemove/pointermove events when you tab out of the active
    // Safari frame.
    if (nodeName === "HTML")
      return;
    // Handle all the other mouse/touch/pointer events
    isGlobalFocusVisible = false
  }
}

function handleFocusVisibleTargetEvents(event: SyntheticEvent<EventTarget>, callback) {
  if (event.type === "keydown") {
    const { nativeEvent } = event;
    if (isValidKey(nativeEvent as any) && !isTextInput(nativeEvent as any)) {
      callback(true)
    }
  } else {
    isGlobalFocusVisible = false
    callback(false)
  }
}

function setFocusVisibleListeners(
  focusVisibleHandles,
  focusTarget: EventTarget,
  callback
) {
  focusVisibleHandles.forEach(focusVisibleHandle => {
    focusVisibleHandle.setListener(focusTarget, event =>
      handleFocusVisibleTargetEvents(event, callback)
    )
  })
}

function useFocusVisibleInputHandles() {
  const mousedownHandle = ReactUseEvent_React("mousedown", useEventProps)
  const pointTouchHandle = ReactUseEvent_React(ReactEventHelpers.hasPointerEvents
    ? "pointerdown"
    : "touchstart", useEventProps)
  const keydownHandle = ReactUseEvent_React("keydown", useEventProps);

  return useMemo(() => [mousedownHandle, pointTouchHandle, keydownHandle],
    [keydownHandle, mousedownHandle, pointTouchHandle])
}

function useFocusLifecycles() {
  useEffect(() => {
    hasTrackedGlobalFocusVisible || (hasTrackedGlobalFocusVisible = true,
      trackGlobalFocusVisible())
  }, [])
}

type FocusEvent = SyntheticEvent<EventTarget>;

type UseFocusOptions = {
  disabled?: boolean,
  onBlur?: (e: FocusEvent) => void,
  onFocus?: (e: FocusEvent) => void,
  onFocusChange?: (e: boolean) => void,
  onFocusVisibleChange?: (e: boolean) => void,
}

function useFocus(focusTargetRef: { current: null | Node }, props: UseFocusOptions) {

  const {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange
  } = props;

  const stateRef = useRef<undefined | { isFocused: boolean, isFocusVisible: boolean }>({
    isFocused: false, isFocusVisible: false
  })

  const focusHandle = ReactUseEvent_React("focusin", useEventProps)
  const blurHandle = ReactUseEvent_React("focusout", useEventProps)
  const focusVisibleHandles = useFocusVisibleInputHandles();

  useLayoutEffect_SAFE_FOR_SSR(() => {
    const focusTarget = focusTargetRef.current
    const state = stateRef.current; // EventTarget | ReactScopeInstance

    if (focusTarget != null && state != null && focusTarget.nodeType === 1) {

      // Handle focus visible
      setFocusVisibleListeners(
        focusVisibleHandles,
        focusTarget, isFocusVisible => {
          if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
            state.isFocusVisible = isFocusVisible
            if (onFocusVisibleChange) {
              onFocusVisibleChange(isFocusVisible)
            }
          }
        }
      );

      // Handle focus
      focusHandle.setListener(focusTarget, (event: FocusEvent) => {

        if (!_5403 && disabled === true) {
          return;
        }

        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, "useFocus"))
          return;
        ReactEventHookPropagation.stopEventHookPropagation(event, "useFocus");

        if (!state.isFocused && focusTarget === event.target) {
          state.isFocused = true
          state.isFocusVisible = isGlobalFocusVisible
          if (onFocus) {
            onFocus(event)
          }
          if (onFocusChange) {
            onFocusChange(true)
          }
          if (state.isFocusVisible && onFocusVisibleChange) {
            onFocusVisibleChange(true)
          }
        }
      });

      // Handle blur
      blurHandle.setListener(focusTarget, (event: FocusEvent) => {
        if (!_5403 && disabled === true)
          return;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, "useFocus"))
          return;
        ReactEventHookPropagation.stopEventHookPropagation(event, "useFocus");

        if (state.isFocused) {
          state.isFocused = false
          state.isFocusVisible = isGlobalFocusVisible;
          if (onBlur) {
            onBlur(event)
          }
          if (onFocusChange) {
            onFocusChange(false)
          }
        }
      })
    }
  }, [
    blurHandle,
    disabled,
    focusHandle,
    focusTargetRef,
    focusVisibleHandles,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange
  ]);

  useEffect(() => {
    const focusTarget = focusTargetRef.current
    const state = stateRef.current;
    return function () {
      if (focusTargetRef.current == null && state != null && state.isFocused) {
        state.isFocused = false;
        const focusEvent = new window.FocusEvent("blur");
        Object.defineProperty(focusEvent, "target", {
          value: focusTarget
        });

        if (onBlur) {
          onBlur(focusEvent as any)
        }

        if (onFocusChange) {
          onFocusChange(false)
        }

        if (state.isFocusVisible && onFocusVisibleChange) {
          onFocusVisibleChange(false)
        }

        state.isFocusVisible = isGlobalFocusVisible
      }
    }
  });

  // Mount/Unmount logic
  useFocusLifecycles()
}

type UseFocusWithinOptions = {
  disabled?: boolean,
  onAfterBlurWithin?: (e: FocusEvent) => void,
  onBeforeBlurWithin?: (e: FocusEvent) => void,
  onBlurWithin?: (e: FocusEvent) => void,
  onFocusWithin?: (e: FocusEvent) => void,
  onFocusWithinChange?: (e: boolean) => void,
  onFocusWithinVisibleChange?: (value: boolean) => void,
};

function useFocusWithin<T>(
  focusWithinTargetRef: ((focusWithinTarget?: T) => void) | { current?: T },
  props: UseFocusWithinOptions
) {

  const {
    disabled,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange
  } = props;

  // Setup controlled state for this useFocus hook
  const stateRef = useRef<undefined | { isFocused: boolean, isFocusVisible: boolean }>({
    isFocused: false, isFocusVisible: false
  })

  const focusHandle = ReactUseEvent_React("focusin", useEventProps)
  const blurHandle = ReactUseEvent_React("focusout", useEventProps)
  const afterBlurHandle = ReactUseEvent_React("afterblur", useEventProps)
  const beforeBlurHandle = ReactUseEvent_React("beforeblur", useEventProps)

  const focusVisibleHandles = useFocusVisibleInputHandles();


  const useFocusWithinRef = useCallback((focusWithinTarget?: T) => {

    if (typeof focusWithinTargetRef === "function") {
      focusWithinTargetRef(focusWithinTarget)
    } else {
      focusWithinTargetRef.current = focusWithinTarget;
    }

    // typeof focusWithinTargetRef === "function" ? focusWithinTargetRef(focusWithinTarget) : focusWithinTargetRef.current = focusWithinTarget;
    const state = stateRef.current;

    if (focusWithinTarget != null && state != null) {

      setFocusVisibleListeners(
        focusVisibleHandles,
        // $FlowFixMe focusWithinTarget is not null here
        focusWithinTarget as any,
        isFocusVisible => {
          if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
            state.isFocusVisible = isFocusVisible;
            if (onFocusWithinVisibleChange) {
              onFocusWithinVisibleChange(isFocusVisible);
            }
          }
        }
      )

      // Handle focus
      // $FlowFixMe focusWithinTarget is not null here
      focusHandle.setListener(focusWithinTarget as any, (event: FocusEvent) => {
        if (!_5403 && disabled === true) {
          return;
        }
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, "useFocusWithin")) {
          return;
        }

        if (!state.isFocused || state.isFocused) {
          state.isFocused = true
          state.isFocusVisible = isGlobalFocusVisible
          if (onFocusWithinChange) {
            onFocusWithinChange(true)
          }
          if (state.isFocusVisible && onFocusWithinVisibleChange) {
            onFocusWithinVisibleChange(true)
          }
        }

        if (!state.isFocusVisible && isGlobalFocusVisible) {
          state.isFocusVisible = isGlobalFocusVisible
          if (onFocusWithinVisibleChange) {
            onFocusWithinVisibleChange(true)
          }
        }

        if (onFocusWithin) {
          onFocusWithin(event);
        }
      })

      // Handle blur
      // $FlowFixMe focusWithinTarget is not null here
      blurHandle.setListener(focusWithinTarget as any, (event: FocusEvent) => {
        if (!_5403 && disabled === true) {
          return;
        }
        const { relatedTarget } = event.nativeEvent as any;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, "useFocusWithin")) {
          return;
        }

        if (
          state.isFocused &&
          !ReactEventHelpers.isRelatedTargetWithin(focusWithinTarget, relatedTarget)
        ) {
          state.isFocused = false;
          if (onFocusWithinChange) {
            onFocusWithinChange(false);
          }
          if (state.isFocusVisible && onFocusWithinVisibleChange) {
            onFocusWithinVisibleChange(false);
          }
          if (onBlurWithin) {
            onBlurWithin(event);
          }
        } else {
          ReactEventHookPropagation.stopEventHookPropagation(event, "useFocusWithin")
        }

      })

      // Handle before blur. This is a special
      // React provided event.
      // $FlowFixMe focusWithinTarget is not null here
      beforeBlurHandle.setListener(focusWithinTarget as any, (event: FocusEvent) => {
        if (!_5403 && disabled === true) {
          return;
        }
        if (onBeforeBlurWithin) {
          onBeforeBlurWithin(event)
          afterBlurHandle.setListener(document, (afterBlurEvent: FocusEvent) => {
            if (onAfterBlurWithin) {
              onAfterBlurWithin(afterBlurEvent);
            }
            afterBlurHandle.setListener(document, undefined)
          })
        }
      })
    }
  }, [
    afterBlurHandle,
    beforeBlurHandle,
    blurHandle,
    disabled,
    focusHandle,
    focusVisibleHandles,
    focusWithinTargetRef,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange
  ]);

  // Mount/Unmount logic
  useFocusLifecycles();

  return useFocusWithinRef
}

const ReactFocusEvent_React = {
  useFocus,
  useFocusWithin
}

export default ReactFocusEvent_React
export { ReactFocusEvent_React }

