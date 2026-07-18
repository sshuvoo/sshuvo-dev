import type {
  NextFont,
  NextFontWithVariable,
  CssVariable,
  Display,
} from "next/dist/compiled/@next/font";

export type FontLoader<T extends CssVariable | undefined = undefined> =
  (options?: {
    weight?:
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900"
      | "variable"
      | Array<
          "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
        >;
    style?: "normal" | "italic" | Array<"normal" | "italic">;
    display?: Display;
    variable?: T;
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean;
    subsets?: Array<
      | "cyrillic"
      | "cyrillic-ext"
      | "greek"
      | "greek-ext"
      | "latin"
      | "latin-ext"
      | "vietnamese"
    >;
    axes?: "opsz"[];
  }) => T extends undefined ? NextFont : NextFontWithVariable;
