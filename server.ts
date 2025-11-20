import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { html } from "lit";
import { render } from "@lit-labs/ssr";
//import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import "./src/hello-world.ts";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

// This returns a server-side rendered Lit component.
app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  console.log("server.ts : name =", name);
  const template = html`
    <p>The following are server-side rendered Lit components.</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  const result = render(template);

  // This streams the response.
  //return new Response(new RenderResultReadable(result));

  // This also works, but does not stream the response.
  const newContent = await collectResult(result);
  console.log("server.ts : newContent =", newContent);
  return c.html(newContent);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
