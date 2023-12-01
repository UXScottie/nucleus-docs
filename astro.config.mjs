import { defineConfig } from "astro/config";
import deepmerge from "deepmerge";
import starlight from "@astrojs/starlight";
import { astroExpressiveCode } from "astro-expressive-code";
import cem from "@connectedhomes/nucleus/custom-elements.json";
import lit from "@astrojs/lit";

const componentSidebar = {
  label: "Components",
  items: cem.tags
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((component) => ({
      label: component.name,
      badge: "Deprecated",
      collapsed: true,
      items: [
        {
          label: "Overview",
          attrs: {
            class: `sidebar-${component.name}`,
          },
          link: `/components/${component.name}`,
        },
        {
          label: "Guidance",
          link: `/components/${component.name}/guidance`,
        },
        {
          label: "Implementation",
          link: `/components/${component.name}/implementation`,
        },
      ],
    })),
};

const astroExpressiveCodeOptions = {
  theme: "github-dark",
  getBlockLocale: ({ file }) => {
    return "en";
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Nucleus",
      logo: {
        light: "./public/logo-light.svg",
        dark: "./public/logo-dark.svg",
        replacesTitle: true,
      },
      editLink: {
        baseUrl:
          "https://github.com/centrica-engineering/nucleus-docs/edit/main/",
      },
      customCss: [
        "./src/styles/custom.css",
        // Fontsource files for to regular and medium font weights.
        "@fontsource/roboto/300.css",
        "@fontsource/roboto/400.css",
      ],
      components: {
        TableOfContents: "./src/components/toc.astro",
      },
      sidebar: [
        componentSidebar,
        {
          label: "Guidelines",
          items: [
            {
              label: "Colours",
              link: `/guidelines/colours`,
            },
          ],
        },
        {
          label: "Patterns",
          items: [
            {
              label: "Journeys",
              link: `/patterns/journeys`,
            },
            {
              label: "Asking for information",
              link: `/patterns/asking-for-information`,
            },
            {
              label: "Experiences",
              link: `/patterns/experiences`,
            },
            {
              label: "Loading",
              link: `/patterns/loading`,
            },
            {
              label: "Messaging",
              link: `/patterns/messaging`,
            },
            {
              label: "Telephone numbers",
              link: `/patterns/telephone-numbers`,
            },
          ],
        },
        {
          label: "Page types",
          autogenerate: { directory: 'page-types' },
        },
      ],
    }),
    astroExpressiveCode(astroExpressiveCodeOptions),
    lit(),
  ],
  outDir: "./build",
});
