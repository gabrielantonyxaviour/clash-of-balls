import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { validateFramesPost } from "@xmtp/frames-validator";
import { Next, Context } from "hono";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://tzfytpqfslcatnstvjkw.supabase.co/";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Znl0cHFmc2xjYXRuc3R2amt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTU4OTI3MywiZXhwIjoyMDMxMTY1MjczfQ.F3oPO1-ex5suwo69cRgzZBuWwxcVAMuO-a2rZrknFZo";
const supabase = createClient(supabaseUrl, supabaseKey);

const addMetaTags = (client: string, version?: string) => {
  return {
    unstable_metaTags: [
      { property: `of:accepts`, content: version || "vNext" },
      { property: `of:accepts:${client}`, content: version || "vNext" },
    ],
  };
};

type State = {
  count: number;
};

export const app = new Frog<{ State: State }>({
  title: "Clash Of Balls",
  initialState: {
    count: 0,
  },
  ...addMetaTags("xmtp"),
});

const xmtpSupport = async (c: Context, next: Next) => {
  if (c.req.method === "POST") {
    const requestBody = (await c.req.json().catch(() => {})) || {};
    if (requestBody?.clientProtocol?.includes("xmtp")) {
      c.set("client", "xmtp");
      const { verifiedWalletAddress } = await validateFramesPost(requestBody);
      c.set("verifiedWalletAddress", verifiedWalletAddress);
    } else {
      c.set("client", "farcaster");
    }
  }
  await next();
};

app.use(xmtpSupport);

app.use("/*", serveStatic({ root: "./public" }));

app.composerAction(
  "/",
  (c) => {
    return c.res({
      title: "Clash Of Balls",
      url: "https://clash-of-balls.vercel.app?fid=" + c.actionData.fid,
    });
  },
  {
    name: "Clash Of Balls Composer action",
    description:
      "1v1 Football Prediction Battle on Chiliz with encrypted predictions using FHE.",
    icon: "image",
    imageUrl: "https://clash-of-balls.vercel.app/logo.png",
  }
);

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <img key={0} src="https://clash-of-balls-frames.vercel.app/home.png" />
      </div>
    ),
    intents: [
      <Button.Link href="https://clash-of-balls.vercel.app/">
        Try now
      </Button.Link>,
    ],
  });
});

app.frame("/challenge", (c) => {
  // const params = c.req.param();
  // const { data: fetchedChallenge } = await supabase
  //   .from("clash")
  //   .select("*")
  //   .eq("id", params["id"]);
  // let response;
  // if (fetchedChallenge == null)
  //   response = {
  //     gameId: "1",
  //     f_id: "0x",
  //     bet: "100",
  //   };
  // else {
  //   response = fetchedChallenge[0];
  // }
  const response = {
    id: "1",
    gameId: "1",
    f_id: "10",
    bet: "100",
  };
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            style={{ zIndex: 1, width: "102%" }}
            src={`https://clash-of-balls-frames.vercel.app/games/${response.gameId}.png`}
          />
        </div>
      </div>
    ),
    intents: [
      <Button.Link
        href={`https://clash-of-balls.vercel.app/challenge/${response.id}`}
      >
        Negotiate
      </Button.Link>,
      <Button.Link
        href={`https://clash-of-balls.vercel.app/challenge/${response.id}`}
      >
        Accept
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });
