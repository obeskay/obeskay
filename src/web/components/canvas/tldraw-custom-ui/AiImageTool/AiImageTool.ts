import { StateNode, TLCancelEvent, TLInterruptEvent } from "@tldraw/tldraw";
import * as https from "https";

export class AiImageTool extends StateNode {
  static override id = "aiImage";
  static override initial = "idle";

  override onEnter = () => {
    const options = {
      method: "POST",
      hostname: "api.getimg.ai",
      port: null,
      path: "/v1/stable-diffusion-xl/text-to-image",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    const req = https.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(
      JSON.stringify({
        model: "stable-diffusion-xl-v1-0",
        prompt: "a photo of an astronaut riding a horse on mars",
        negative_prompt: "Disfigured, cartoon, blurry",
        prompt_2: "a photo of an astronaut riding a horse on mars",
        negative_prompt_2: "Disfigured, cartoon, blurry",
        width: 1024,
        height: 1024,
        steps: 30,
        guidance: 7.5,
        seed: 0,
        scheduler: "euler",
        output_format: "jpeg",
      })
    );
    req.end();
  };

  override onExit = () => {
    // Clean up any resources if needed
  };

  override onInterrupt: TLInterruptEvent = () => {
    // Handle interruption if needed
  };

  override onCancel: TLCancelEvent = () => {
    // Handle cancellation if needed
  };
}
