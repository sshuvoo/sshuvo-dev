import * as fs from "node:fs/promises";
import * as path from "node:path";
import themeConfig from "@/configs/theme.json";

const fontBase = themeConfig.typography.fontSize / 16;
const scale = themeConfig.typography.scale;
const rootColors = themeConfig.colors.root;

const sizePrefix = [
  { prefix: "xs", step: -2 },
  { prefix: "sm", step: -1 },
  { prefix: "base", step: 0 },
  { prefix: "lg", step: 1 },
];

async function genTypography(): Promise<string> {
  const typography: string[] = [];

  sizePrefix.forEach(({ prefix, step }) => {
    typography.push(
      `--text-${prefix}: ${(fontBase * Math.pow(scale, step)).toFixed(3)}rem;`,
    );
  });

  for (let i = 2; i <= 10; i++) {
    typography.push(
      `--text-${i == 2 ? "" : i - 1}xl: ${(fontBase * Math.pow(scale, i)).toFixed(3)}rem;`,
    );
  }

  return "\n" + typography.join("\n");
}

async function genColors(): Promise<string> {
  const colors: string[] = [];
  Object.keys(rootColors).forEach((key) => {
    colors.push(`--color-${key}: var(--${key});`);
  });
  return "\n" + colors.join("\n");
}

async function genFonts(): Promise<string> {
  const fonts: string[] = [];
  ["primary", "secondary", "heading"].forEach((key) => {
    fonts.push(`--font-${key}: var(--font-${key});`);
  });
  return "\n" + fonts.join("\n");
}

async function genRadiuses(): Promise<string> {
  const radiuses: string[] = [];
  ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].forEach((key, index) => {
    if (index <= 2) {
      radiuses.push(
        `--radius-${key}: calc(var(--radius) * ${0.6 + index * 0.2});`,
      );
    } else {
      radiuses.push(
        `--radius-${key}: calc(var(--radius) * ${1 + (index - 2) * 0.4});`,
      );
    }
  });
  return "\n" + radiuses.join("\n");
}

(async function generateThemes() {
  try {
    const typography = await genTypography();
    const colors = await genColors();
    const fonts = await genFonts();
    const radiuses = await genRadiuses();

    const theme: string = `
@theme inline {
  ${colors}
  ${typography}
  ${fonts}
  ${radiuses}
}
  `;

    const outputPath = path.join(process.cwd(), "styles", "themes.css");
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, theme.trim() + "\n", "utf-8");
    console.log(`\n[✓] Successfully generated themes in: ${outputPath}`);
  } catch (error) {
    console.error("\n[✗] Failed to generate themes:", error);
    process.exit(1);
  }
})();
