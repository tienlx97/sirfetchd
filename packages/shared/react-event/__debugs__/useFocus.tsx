import React, { createRef } from "react";

import { useFocus } from "../src/ReactFocusEvent.react"

type OwnProps = {
  example: number
}

const UseFocus_disabled = ({ example = 0 }: OwnProps) => {
  const ref = createRef<HTMLInputElement>();

  const onBlur = (e) => {
    alert("blur")
  };

  const onFocus = (e) => {
    alert("focus")
  }

  useFocus(ref, {
    disabled: true,
    onBlur,
    onFocus
  })

  return (
    <input ref={ref} placeholder="disabled" />
  );
};


const UseFocus_onBlur = ({ example = 0 }: OwnProps) => {
  const ref = createRef<HTMLInputElement>();

  const onBlur = (e) => {
    console.log(e)
  };


  useFocus(ref, {
    onBlur,
  })

  return <input ref={ref} placeholder="on blur" />

};

const UseFocus_onFocus = ({ example }: OwnProps) => {
  const inputRef = createRef<HTMLInputElement>();
  const divRef = createRef<HTMLDivElement>();

  const onFocus = (e) => {
    console.log(e)
  };

  switch (example) {
    case 1:
      useFocus(divRef, {
        onFocus,
      })
      break;
    default:
      useFocus(inputRef, {
        onFocus,
      })
      break;
  }


  return example == 0
    ? (<input ref={inputRef} placeholder="on focus" />)
    : (
      <div ref={divRef} style={{ padding: "15px", border: "solid" }}>
        <input ref={inputRef} placeholder="on focus" />
      </div>
    )
};


export {
  UseFocus_disabled,
  UseFocus_onBlur,
  UseFocus_onFocus
}