import React from "react"
import stylex from "@ladifire-opensource/stylex"
import { BaseRowItemReact } from "../src/BaseRowItem.react"

type style = "height"
const styles = stylex.create<style>({
  height: {
    height: "100px"
  }
})

const BaseRowItem_Test1 = () => {
  return (
    <BaseRowItemReact role="main" useDeprecatedStyles={undefined} xstyle={styles.height}>
      <div>Test</div>
    </BaseRowItemReact>
  )
}

export {
  BaseRowItem_Test1
}
