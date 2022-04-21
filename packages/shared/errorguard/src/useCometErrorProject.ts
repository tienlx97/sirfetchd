import React, { useContext } from "react";
import { CometErrorProjectContext } from "@farfetchd/context";

function useCometErrorProject() {
  return useContext(CometErrorProjectContext);
}
export default useCometErrorProject;
export { useCometErrorProject };
