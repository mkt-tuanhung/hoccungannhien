// Sinh ảnh nền painterly cho các game world bằng OpenAI gpt-image-1.
// Chạy: node scripts/generate-scenes.mjs [tên-scene]
import fs from "fs";
import path from "path";
import OpenAI from "openai";

// Nạp OPENAI_API_KEY từ .env.local
const envPath = path.join(process.cwd(), ".env.local");
const env = fs.readFileSync(envPath, "utf8");
const keyLine = env.split("\n").find((l) => l.startsWith("OPENAI_API_KEY="));
const apiKey = keyLine?.split("=").slice(1).join("=").trim();
if (!apiKey) {
  console.error("❌ Không tìm thấy OPENAI_API_KEY trong .env.local");
  process.exit(1);
}

const client = new OpenAI({ apiKey });

const STYLE =
  "Highly polished glossy 2.5D casual mobile game background art, in the style of Gardenscapes, Royal Match and Candy Crush splash screens. " +
  "Vibrant saturated candy colors, smooth glossy 3D-rendered shapes, shiny specular highlights, rich depth, " +
  "shallow depth of field with the foreground hill in sharp focus and the background softly blurred with dreamy bokeh, " +
  "magical glowing sparkles and floating light particles, bright cheerful sunny atmosphere, lush volume, " +
  "professional AAA game studio quality, crisp clean modern rendering, octane render look. " +
  "ABSOLUTELY NO numbers, NO digits, NO letters, NO text, NO symbols, NO UI elements, NO buttons, NO characters anywhere in the image.";

// Quy tắc bố cục chung: giữa SẠCH, thoáng; chi tiết chỉ ở rìa; nền mờ nhẹ.
const COMP =
  " Composition: a large CALM EMPTY center with a smooth soft gradient and almost no detail in the middle. " +
  "All decorations ONLY along the very bottom edge and the two side corners, small and softly blurred. " +
  "Lots of negative space, heavy soft background blur, a few faint magical sparkles. Vertical portrait. " +
  "CRITICAL: keep the entire upper and center area clean, smooth and empty so game content sits on a calm background. Do NOT fill the middle with objects.";

const SCENES = {
  garden: {
    file: "garden.png",
    prompt: `${STYLE} A magical garden world: soft blue-to-mint sky, smooth glossy green meadow, a few glossy trees and a tiny cute cottage in the blurred bottom corners, glossy flowers only at the bottom edge.${COMP}`,
  },
  ocean: {
    file: "ocean.png",
    prompt: `${STYLE} An underwater world: smooth turquoise water gradient, soft glowing sun rays from top, a few glossy colorful corals and seaweed only in the bottom corners, gentle bubbles, smooth sandy seabed at the bottom.${COMP}`,
  },
  candy: {
    file: "candy.png",
    prompt: `${STYLE} A candy land world: soft pink-to-lavender sky, smooth glossy cream meadow, a few giant glossy lollipops and gumdrops only in the bottom corners, cotton candy clouds at the top edges, a chocolate path hint at the bottom.${COMP}`,
  },
  space: {
    file: "space.png",
    prompt: `${STYLE} A dreamy outer space world: smooth deep purple-to-blue gradient sky with soft nebula glow, a few glossy planets and a cute rocket only in the bottom corners, twinkling stars sparse at the edges, a soft glowing moon small at the top corner.${COMP}`,
  },
  fairyforest: {
    file: "fairyforest.png",
    prompt: `${STYLE} A magical fairy forest world: soft teal-to-mint misty gradient, glowing mushrooms and a few tall glossy trees only in the bottom corners, gentle fireflies as faint sparkles, soft light rays, dreamy misty atmosphere.${COMP}`,
  },
  crystalcave: {
    file: "crystalcave.png",
    prompt: `${STYLE} A glowing crystal cave world: smooth deep blue-to-violet gradient, a few glossy glowing gem crystals and rock formations only in the bottom corners, soft magical glow, faint floating light specks.${COMP}`,
  },
  dinovalley: {
    file: "dinovalley.png",
    prompt: `${STYLE} A cute friendly dinosaur valley world (NOT scary): soft warm green-to-peach gradient sky, a few glossy palm trees and friendly cartoon dino eggs only in the bottom corners, a tiny gentle volcano far in the blurred distance, soft prehistoric vibe.${COMP}`,
  },
  robotcity: {
    file: "robotcity.png",
    prompt: `${STYLE} A cute robot city world: soft blue-to-purple gradient sky, a few glossy rounded skyscrapers with soft neon glow only in the bottom corners, tiny cute floating robots blurred in the distance, gentle tech sparkles.${COMP}`,
  },
  castle: {
    file: "castle.png",
    prompt: `${STYLE} A magical kingdom world: soft pink-to-gold sunset gradient sky, a glossy fairytale castle small and blurred in the far distance at the bottom center, a few glossy bushes and flags only in the bottom corners, dreamy royal atmosphere.${COMP}`,
  },
};

async function generate(name) {
  const scene = SCENES[name];
  if (!scene) {
    console.error(`❌ Không có scene "${name}". Có: ${Object.keys(SCENES).join(", ")}`);
    return;
  }
  console.log(`🎨 Đang sinh "${name}"...`);
  const res = await client.images.generate({
    model: "gpt-image-1",
    prompt: scene.prompt,
    size: "1024x1536",
    quality: "high",
  });
  const b64 = res.data[0].b64_json;
  const outDir = path.join(process.cwd(), "public", "scenes");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, scene.file);
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`✅ Lưu: public/scenes/${scene.file}`);
}

// ===== SPRITES (vật đếm + mascot) — nền trong suốt, đồng bộ style glossy =====

const SPRITE_STYLE =
  "Single cute glossy 3D-rendered game asset icon, Royal Match / Gardenscapes / Toon Blast style, " +
  "vibrant saturated colors, shiny specular highlights, soft rounded shapes, smooth soft shadow, " +
  "thick subtle outline, adorable kawaii, centered, isolated object, transparent background, " +
  "NO text, NO numbers, NO background scene.";

const SPRITES = {
  cat: { file: "cat.png", prompt: "a cute fluffy white kitten sitting, big sparkly eyes, pink ears" },
  rabbit: { file: "rabbit.png", prompt: "a cute chubby white bunny rabbit sitting, long ears, pink cheeks" },
  apple: { file: "apple.png", prompt: "a glossy shiny red apple with a green leaf" },
  diamond: { file: "diamond.png", prompt: "a sparkling blue gem diamond crystal, shiny facets" },
  star: { file: "star.png", prompt: "a glossy golden yellow five-point star, smiling, shiny" },
  candy: { file: "candy.png", prompt: "a cute wrapped candy sweet, pink and white swirl" },
  ball: { file: "ball.png", prompt: "a glossy colorful beach ball, red blue yellow" },
  coin: { file: "coin.png", prompt: "a shiny golden coin with a star engraved" },
  flower: { file: "flower.png", prompt: "a cute glossy pink flower with yellow center" },
  mascot: { file: "mascot.png", prompt: "a super cute chubby happy cat mascot character, big round head, huge sparkly eyes, rosy cheeks, friendly smile, waving, mascot full body sitting" },

  // Đại dương
  fish: { file: "fish.png", prompt: "a cute glossy orange clownfish, friendly smile" },
  starfish: { file: "starfish.png", prompt: "a cute glossy pink starfish, smiling" },
  // Kẹo
  lollipop: { file: "lollipop.png", prompt: "a glossy rainbow swirl lollipop on a stick" },
  cupcake: { file: "cupcake.png", prompt: "a cute glossy cupcake with pink frosting and a cherry" },
  // Rừng tiên
  mushroom: { file: "mushroom.png", prompt: "a cute glossy red mushroom with white dots, smiling" },
  butterfly: { file: "butterfly.png", prompt: "a cute glossy purple and pink butterfly" },
  // Hang pha lê
  gempink: { file: "gempink.png", prompt: "a sparkling glossy pink gem crystal, shiny facets" },
  gemgreen: { file: "gemgreen.png", prompt: "a sparkling glossy green emerald gem, shiny facets" },
  // Khủng long
  dinoegg: { file: "dinoegg.png", prompt: "a cute glossy spotted dinosaur egg" },
  dino: { file: "dino.png", prompt: "a cute tiny friendly green cartoon baby dinosaur, smiling, not scary" },
  // Robot
  robot: { file: "robot.png", prompt: "a cute glossy little robot with round eyes, friendly" },
  gear: { file: "gear.png", prompt: "a glossy shiny metal gear cog, blue and silver" },
  // Vũ trụ
  planet: { file: "planet.png", prompt: "a cute glossy purple planet with a ring" },
  rocket: { file: "rocket.png", prompt: "a cute glossy red and white rocket ship" },
  // Vương quốc
  crown: { file: "crown.png", prompt: "a glossy golden royal crown with gems" },
  shield: { file: "shield.png", prompt: "a glossy blue and gold royal shield with a star" },

  // Phần tử game-mode (thay cho emoji xấu)
  dragon: { file: "dragon.png", prompt: "a super cute chubby friendly baby dragon, big sparkly eyes, tiny wings, soft green and yellow belly, smiling, NOT scary, full body sitting" },
  dino: { file: "dino.png", prompt: "a super cute tiny green baby dinosaur, big round eyes, smiling, sitting" },
  egg: { file: "egg.png", prompt: "a cute glossy spotted dinosaur egg, pastel shell" },
  traincar: { file: "traincar.png", prompt: "a cute glossy cartoon train wagon car, rounded, colorful, with wheels, side view" },
  trainengine: { file: "trainengine.png", prompt: "a cute glossy cartoon steam train engine locomotive, rounded friendly, with a face, side view" },
  rocket: { file: "rocket.png", prompt: "a cute glossy red and white cartoon rocket ship with fins and flames" },
  basket: { file: "basket.png", prompt: "a cute glossy woven wicker basket, empty, front view" },
  pot: { file: "pot.png", prompt: "a cute glossy cartoon cooking pot with handles, steam, front view" },
  house: { file: "house.png", prompt: "a cute tiny glossy cartoon cottage house with red roof" },
  mouse: { file: "mouse.png", prompt: "a super cute tiny grey cartoon mouse, big ears, sitting, smiling" },
  portal: { file: "portal.png", prompt: "a glowing magical swirling time portal ring, purple blue, sparkles, front view" },
  fuelcan: { file: "fuelcan.png", prompt: "a cute glossy cartoon fuel canister, blue, with a star label" },
  magnifier: { file: "magnifier.png", prompt: "a cute glossy cartoon magnifying glass, gold rim" },
  cheese: { file: "cheese.png", prompt: "a cute glossy wedge of cartoon cheese with holes" },
  frog: { file: "frog.png", prompt: "a super cute chubby green cartoon frog, big sparkly eyes, smiling, sitting" },
  boat: { file: "boat.png", prompt: "a cute glossy cartoon sailboat with a pink sail, side view" },
  castle: { file: "castle.png", prompt: "a cute glossy cartoon fairytale castle with pink towers and flags" },
  robot: { file: "robot.png", prompt: "a cute friendly glossy cartoon robot, rounded, big eyes, waving" },
  mushroom: { file: "mushroom.png", prompt: "a cute glossy red and white spotted cartoon mushroom" },
  sun: { file: "sun.png", prompt: "a cute glossy smiling cartoon sun with rays" },
  rainbow: { file: "rainbow.png", prompt: "a cute glossy cartoon rainbow with fluffy clouds at the ends" },
  carrot: { file: "carrot.png", prompt: "a cute glossy cartoon carrot with green leaves" },
  palmtree: { file: "palmtree.png", prompt: "a cute small glossy cartoon palm tree on a tiny sand island" },
  strawberry: { file: "strawberry.png", prompt: "a cute glossy cartoon strawberry" },
};

async function generateSprite(name) {
  const sp = SPRITES[name];
  if (!sp) {
    console.error(`❌ Không có sprite "${name}". Có: ${Object.keys(SPRITES).join(", ")}`);
    return;
  }
  console.log(`✨ Đang sinh sprite "${name}"...`);
  const res = await client.images.generate({
    model: "gpt-image-1",
    prompt: `${SPRITE_STYLE} The object: ${sp.prompt}.`,
    size: "1024x1024",
    quality: "high",
    background: "transparent",
  });
  const b64 = res.data[0].b64_json;
  const outDir = path.join(process.cwd(), "public", "sprites");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, sp.file), Buffer.from(b64, "base64"));
  console.log(`✅ Lưu: public/sprites/${sp.file}`);
}

// CLI: node generate-scenes.mjs scene garden  |  node generate-scenes.mjs sprite cat  |  node generate-scenes.mjs sprites-all
const mode = process.argv[2] || "scene";
const arg = process.argv[3];

(async () => {
  try {
    if (mode === "scene") await generate(arg || "garden");
    else if (mode === "sprite") await generateSprite(arg);
    else if (mode === "sprites-all") {
      for (const n of Object.keys(SPRITES)) await generateSprite(n);
    } else if (mode === "scenes-all") {
      for (const n of Object.keys(SCENES)) await generate(n);
    } else {
      // tương thích cũ: tham số đầu là tên scene
      await generate(mode);
    }
  } catch (e) {
    console.error("❌ Lỗi:", e.message);
    process.exit(1);
  }
})();
