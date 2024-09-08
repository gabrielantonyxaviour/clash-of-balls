import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { validateFramesPost } from "@xmtp/frames-validator";
import { Next, Context } from "hono";
import { handle } from "frog/next";
import { createClient } from "@supabase/supabase-js";
import { parseUnits, encodeFunctionData, erc20Abi, Abi } from "viem";
import { baseSepolia } from "viem/chains";

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
  "/create",
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

app.frame("/challenge/:id", async (c) => {
  const params = c.req.param();
  const { data: fetchedChallenge } = await supabase
    .from("clash")
    .select("*")
    .eq("id", params["id"]);
  let response;
  console.log(fetchedChallenge);
  if (fetchedChallenge == null)
    response = {
      id: "1",
      game_id: "1",
      f_image:
        "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/1dc540bc-60b4-40eb-4dde-85e23acd6200/original",
      bet: "10",
    };
  else {
    response = fetchedChallenge[0];
  }

  return c.res({
    image: (
      <div
        style={{
          position: "relative",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          style={{
            position: "absolute",
            display: "flex",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 4,
          }}
          src={`https://clash-of-balls-frames.vercel.app/games/${response.game_id}.png`}
          alt="Game Frame"
        />

        <div
          style={{
            display: "flex",
            position: "relative", // Text should be on top of the image
            backgroundColor: "rgba(0, 0, 0, 0)",
            zIndex: 2, // Ensure text is above the image
          }}
        >
          <img
            style={{
              position: "absolute",
              display: "flex",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              top: "95%",
              right: "25%",
              zIndex: 3,
            }}
            src={`${response.f_image}`}
            alt="Game Frame"
          />
          <h1
            style={{
              fontSize: "30px",
              top: "80%",
              right: "4%",
              fontWeight: "bold",
            }}
          >
            {response.f_name}
          </h1>
          <p
            style={{
              fontSize: "26px",
              top: "90%",
              left: "14%",
              fontWeight: "normal",
            }}
          >
            {response.bet} CHZ
          </p>
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

app.transaction("/tx", (c) => {
  let address: `0x${string}`;

  const { verifiedWalletAddress } = (c?.var as any) || {};

  if (verifiedWalletAddress) {
    address = verifiedWalletAddress as `0x${string}`;
  } else {
    address = c.address as `0x${string}`;
  }

  // Prepare the amount to transfer
  const amount = BigInt(parseUnits("1", 6));

  // Transfering 1 USDC to yourself
  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [address as `0x${string}`, amount] as const,
  });

  const BASE_SEPOLIA_USDC_ADDRESS =
    "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  return c.res({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi as Abi,
      to: BASE_SEPOLIA_USDC_ADDRESS,
      data: calldata,
      value: BigInt(0),
    },
  });
});

app.frame("/start", (c) => {
  const url = "https://clash-of-balls-frames.vercel.app/home.png";
  console.log(url);

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
        <img
          style={{
            position: "absolute",
            display: "flex",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 4,
          }}
          src={url}
          alt="Game Frame"
        />
      </div>
    ),
    intents: [
      <Button.Link href="https://clash-of-balls.vercel.app/">
        Try now
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
