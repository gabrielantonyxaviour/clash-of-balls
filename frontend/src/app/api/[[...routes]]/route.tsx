/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { Next, Context } from "hono";
import { validateFramesPost } from "@xmtp/frames-validator";

const addMetaTags = (client: string, version?: string) => {
  // Follow the OpenFrames meta tags spec
  return {
    unstable_metaTags: [
      { property: `of:accepts`, content: version || "vNext" },
      { property: `of:accepts:${client}`, content: version || "vNext" },
    ],
  };
};

type State = {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  optionsCreated: number;
  theme: number;
  validity: {
    day: number; // Update the type of 'day' property to 'number'
    hours: number;
    minutes: number;
  };
};

const app = new Frog<{ State: State }>({
  title: "Clash Of Balls",
  assetsPath: "/",
  basePath: "/api",
  initialState: {
    question: "",
    options: {
      a: "",
      b: "",
      c: "",
      d: "",
    },
    optionsCreated: 0,
    theme: 0,
    validity: {
      day: 0,
      hours: 0,
      minutes: 0,
    },
  },
  imageOptions: {
    fonts: [{ name: "Krona One", source: "google" }],
  },
  ...addMetaTags("xmtp"),
});
const xmtpSupport = async (c: Context, next: Next) => {
  // Check if the request is a POST and relevant for XMTP processing
  if (c.req.method === "POST") {
    const requestBody = (await c.req.json().catch(() => {})) || {};
    if (requestBody?.clientProtocol?.includes("xmtp")) {
      c.set("client", "xmtp");
      const { verifiedWalletAddress } = await validateFramesPost(requestBody);
      c.set("verifiedWalletAddress", verifiedWalletAddress);
    } else {
      // Add farcaster check
      c.set("client", "farcaster");
    }
  }
  await next();
};
app.use(xmtpSupport);
app.composerAction(
  "/create",
  (c) => {
    return c.res({
      title: "Clash Of Balls",
      url: "https://clash-of-balls.vercel.app/create?fid=" + c.actionData.fid,
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
        <img key={2} src="/frames/home.png" />
      </div>
    ),
    intents: [
      <Button action="/createqn">Create 🪄</Button>,
      <Button.Link href="http://privcast.com/">Visit PrivCast</Button.Link>,
    ],
  });
});

app.frame(
  "/visualize/:question/a/:a/b/:b/c/:c/d/:d/theme/:theme",
  async (context) => {
    const { a, b, c, d, question, theme } = context.req.param();
    return context.res({
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
              src={`/frames/theme${theme}.png`}
            />
          </div>
          <div
            style={{
              fontFamily: "fantasy",
              fontSize: "50px",
              position: "absolute",
              top: "210px",
              left: "200px",
              width: "800px",
              textWrap: "wrap",
              zIndex: 10,
              color: theme == "0" || theme == "6" ? "black" : "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {question}
          </div>
          <div
            style={{
              fontFamily: "fantasy",
              fontSize: "30px",
              position: "absolute",
              top: "418px",
              left: "230px",
              width: "800px",
              textWrap: "wrap",
              zIndex: 10,
              color: theme == "0" || theme == "6" ? "black" : "white",
            }}
          >
            {a}
          </div>
          <div
            style={{
              fontFamily: "fantasy",
              fontSize: "30px",
              position: "absolute",
              top: "418px",
              left: "670px",
              width: "800px",
              textWrap: "wrap",
              zIndex: 10,
              color: theme == "0" || theme == "6" ? "black" : "white",
            }}
          >
            {b}
          </div>
          <div
            style={{
              fontFamily: "fantasy",
              fontSize: "30px",
              position: "absolute",
              top: "535px",
              left: "230px",
              width: "800px",
              textWrap: "wrap",
              zIndex: 10,
              color: theme == "0" || theme == "6" ? "black" : "white",
            }}
          >
            {c}
          </div>
          <div
            style={{
              fontFamily: "fantasy",
              fontSize: "30px",
              position: "absolute",
              top: "535px",
              left: "670px",
              width: "800px",
              textWrap: "wrap",
              zIndex: 10,
              color: theme == "0" || theme == "6" ? "black" : "white",
            }}
          >
            {d}
          </div>
        </div>
      ),
    });
  }
);

// app.frame("/polls/:[pollid]", async (c) => {
//   const params = c.req.param();
//   const fetched = await fetchEntryById(parseInt(params["[pollid]"]));
//   return c.res({
//     title: fetched?.question,

//     image: (
//       <div
//         style={{
//           alignItems: "center",
//           background: "white",
//           backgroundSize: "100% 100%",
//           display: "flex",
//           flexDirection: "column",
//           flexWrap: "nowrap",
//           height: "100%",
//           justifyContent: "center",
//           textAlign: "center",
//           width: "100%",
//         }}
//       >
//         <div style={{ display: "flex" }}>
//           <img
//             style={{ zIndex: 1, width: "102%" }}
//             src={`https://privcast.com/frames/theme${fetched?.theme}.png`}
//           />
//         </div>
//         <div
//           style={{
//             fontFamily: "fantasy",
//             fontSize: "50px",
//             position: "absolute",
//             top: "210px",
//             left: "200px",
//             width: "800px",
//             textWrap: "wrap",
//             zIndex: 10,
//             color:
//               fetched?.theme == 0 || fetched?.theme == 6 ? "black" : "white",

//             justifyContent: "center",
//             textAlign: "center",
//           }}
//         >
//           {fetched?.question}
//         </div>
//         <div
//           style={{
//             fontFamily: "fantasy",
//             fontSize: "30px",
//             position: "absolute",
//             top: "418px",
//             left: "230px",
//             width: "800px",
//             textWrap: "wrap",
//             zIndex: 10,
//             color:
//               fetched?.theme == 0 || fetched?.theme == 6 ? "black" : "white",
//           }}
//         >
//           {fetched?.op1}
//         </div>
//         <div
//           style={{
//             fontFamily: "fantasy",
//             fontSize: "30px",
//             position: "absolute",
//             top: "418px",
//             left: "670px",
//             width: "800px",
//             textWrap: "wrap",
//             zIndex: 10,
//             color:
//               fetched?.theme == 0 || fetched?.theme == 6 ? "black" : "white",
//           }}
//         >
//           {fetched?.op2}
//         </div>
//         <div
//           style={{
//             fontFamily: "fantasy",
//             fontSize: "30px",
//             position: "absolute",
//             top: "535px",
//             left: "230px",
//             width: "800px",
//             textWrap: "wrap",
//             zIndex: 10,
//             color:
//               fetched?.theme == 0 || fetched?.theme == 6 ? "black" : "white",
//           }}
//         >
//           {fetched?.op3}
//         </div>
//         <div
//           style={{
//             fontFamily: "fantasy",
//             fontSize: "30px",
//             position: "absolute",
//             top: "535px",
//             left: "670px",
//             width: "800px",
//             textWrap: "wrap",
//             zIndex: 10,
//             color:
//               fetched?.theme == 0 || fetched?.theme == 6 ? "black" : "white",
//           }}
//         >
//           {fetched?.op4}
//         </div>
//       </div>
//     ),

//     intents: [
//       <Button.Link href={`https://privcast.com/polls/${params["[pollid]"]}`}>
//         Vote privately
//       </Button.Link>,
//     ],
//   });
// });

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
